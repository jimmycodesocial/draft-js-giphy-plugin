import decorateComponentWithProps from 'decorate-component-with-props';
import { getDefaultKeyBinding } from 'draft-js';
import { isBlockWithEntityType, getCurrentBlock, addBlock, addAtomicBlock, removeBlock } from 'draft-js-toolbox';
import { GihpyButton, Explorer, Giphy } from './components';
import { translateTextToGif, trendingGifs, searchGifs } from './utils';
import defaultTheme from './plugin.css';

const defaultOptions = {
  apiKey: null,
  params: {
    sort: 'relevant'
  },

  placeholder: 'Search for GIFs',
  perPage: 16,
  columns: 4,

  translate: true,
  translateRegex: /^\/giphy (.*)$/i,

  // see: https://developers.giphy.com/docs/#rendition-guide
  explorerRenditionKey: 'fixed_width_downsampled',
  renditionKey: 'original',
  withLink: true,

  // see: https://developers.giphy.com/docs/#production-key
  showBrand: true,
  brandPosition: 'static', // or 'overlay'

  // Perform the search.
  onRequest: async (url) => {
    return (await fetch(url)).json();
  }
};

export default ({
  theme = {},
  options = {},
  explorerType = 'draft-js-giphy-plugin-explorer',
  giphyType = 'giphy',
  decorator = (component) => component,
  giphyComponent = Giphy,
}) => {
  // Modifiers.
  const addGiphyExplorer = (editorState, data = {}) => addBlock(editorState, explorerType, data);
  const addGiphy = (editorState, data = {}) => addAtomicBlock(editorState, giphyType, data);

  // Plugin.
  const pluginOptions = Object.assign({}, defaultOptions, options);
  const pluginTheme = Object.assign({}, defaultTheme, theme);

  const ThemedExplorer = decorateComponentWithProps(Explorer, { theme: pluginTheme });
  const DecoratedGiphy = decorator(giphyComponent);
  const ThemedGiphy = decorateComponentWithProps(DecoratedGiphy, { theme: pluginTheme });

  return {
    blockRendererFn: (block, { getEditorState, setEditorState, setReadOnly }) => {
      if (isBlockWithEntityType(getEditorState(), block, giphyType)) {
        return {
          component: ThemedGiphy,
          editable: false,
          props: {
            renditionKey: pluginOptions.renditionKey,
            showBrand: pluginOptions.showBrand,
            brandPosition: pluginOptions.brandPosition,
            withLink: pluginOptions.withLink
          }
        };
      }
      else if (getCurrentBlock(getEditorState()).getType() === explorerType) {
        console.log(getCurrentBlock(getEditorState()));
        return {
          component: ThemedExplorer,
          editable: false,
          props: {
            placeholder: pluginOptions.placeholder,
            renditionKey: pluginOptions.explorerRenditionKey,
            perPage: pluginOptions.perPage,
            columns: pluginOptions.columns,
            setReadOnly,

            // When cancel the action.
            onCancel: (block) => {
              setEditorState(removeBlock(getEditorState(), block.key));
            },

            // When explore the gallery.
            // Search and navigation.            
            onSearch: async (block, text, page) => {
              const { apiKey, perPage, params } = pluginOptions;

              if (!text) {
                return trendingGifs(apiKey, page, perPage, params);
              }
              else {
                return searchGifs(apiKey, text, page, perPage, params);
              }
            },

            // When select the gif.
            onSelect: (block, data) => {
              let editorState = removeBlock(getEditorState(), block.key);
              setEditorState(addGiphy(editorState, data));
            }            
          }
        };
      }
    },

    handleReturn: async (event, editorState, { setEditorState }) => {
      if (!pluginOptions.translate) {
        return 'not-handled';
      }

      const contentBlock = getCurrentBlock(editorState);
      const regexMatch = pluginOptions.translateRegex.exec(contentBlock.getText().trim());

      if (!regexMatch) {
        return 'not-handled';
      }

      const response = await translateTextToGif(
        pluginOptions.apiKey, 
        regexMatch[1], 
        pluginOptions.params
      );

      if (!response || response.meta.status !== 200) {
        return 'not-handled';
      }

      const removeBlockEditorState = removeBlock(editorState, contentBlock.key);
      setEditorState(addGiphy(removeBlockEditorState, response.data));

      return 'handled';
    },

    keyBindingFn: (event, { getEditorState }) => {
      if (event.key === 'Backspace') {
        const editorState = getEditorState();
        const block = getCurrentBlock(editorState);
        
        if (isBlockWithEntityType(editorState, block, giphyType)) {
          return 'remove-giphy';
        }
      }

      return getDefaultKeyBinding(event);
    },

    handleKeyCommand: (command, editorState, { setEditorState }) => {
      if (command === 'remove-giphy') {
        const block = getCurrentBlock(editorState);
        setEditorState(removeBlock(editorState, block.key));

        return 'handled';
      }

      return 'not-handled';
    },

    GihpyButton: decorateComponentWithProps(GihpyButton, {
      entityType: explorerType,
      addGiphy: addGiphyExplorer
    }),

    addGiphyExplorer,
    addGiphy
  };
};
