# draft-js-giphy-plugin
Add Giphy support in your draft-js editor

*This is a plugin for `draft-js-plugins-editor`.*

![Demo](plugin.gif)

## Installation

```
npm install draft-js-giphy-plugin
```

## Usage

*Get an API Key*

This plugin uses the GIPHY API, so you'll need to obtain an API Key by [creating an app](https://developers.giphy.com/dashboard/?create=true).

```js
import createGiphyPlugin from 'draft-js-giphy-plugin';

const giphyPlugin = createGiphyPlugin({
  options: {
    apiKey: '<my-api-key>'
  },
});

const { GihpyButton } = giphyPlugin;
```

## Configuration

| Param          | Default                          | Description                                                                                                                                                                                                                                              |
|----------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| theme          | Default styles                   | draft-js-giphy-plugin/lib/plugin.css                                                                                                                                                                                                                     |
| options        | Default behavior                 | List of options                                                                                                                                                                                                                                          |
| explorerType   | 'draft-js-giphy-plugin-explorer' | Type of entity created when inserting the explorer block.                                                                                                                                                                                                |
| giphyType      | 'giphy'                          | Type of entity created when inserting the GIF.                                                                                                                                                                                                           |
| descorator     | -                                | Empty decorator that returns the same component. (No decorations)                                                                                                                                                                                        |
| giphyComponent | -                                | Provide your own implementation to show the image.                                                                                                                                                                                                       |
| editable       | false                            | This plugin doesn't support the edition. If you want this functionality you must customize the component `giphyComponent`. The `editable` parameter indicates whether block editing is allowed without having to rewrite the function `blockRendererFn`. |

#### Options

| Param          | Default                          | Description                                                                                                                                                                                                                                              |
|----------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| theme          | Default styles                   | draft-js-giphy-plugin/lib/plugin.css                                                                                                                                                                                                                     |
| options        | Default behavior                 | List of options                                                                                                                                                                                                                                          |
| explorerType   | 'draft-js-giphy-plugin-explorer' | Type of entity created when inserting the explorer block.                                                                                                                                                                                                |
| giphyType      | 'giphy'                          | Type of entity created when inserting the GIF.                                                                                                                                                                                                           |
| descorator     | -                                | Empty decorator that returns the same component. (No decorations)                                                                                                                                                                                        |
| giphyComponent | -                                | Provide your own implementation to show the image.                                                                                                                                                                                                       |
| editable       | false                            | This plugin doesn't support the edition. If you want this functionality you must customize the component `giphyComponent`. The `editable` parameter indicates whether block editing is allowed without having to rewrite the function `blockRendererFn`. |

# Acknowledge
* Icon by: https://www.iconfinder.com/icons/315666/file_gif_icon
