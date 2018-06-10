# draft-js-giphy-plugin
Add Giphy support in your draft-js editor

*This is a plugin for `draft-js-plugins-editor`.*

![Demo](plugin.gif)

## Installation

```
npm install draft-js-giphy-plugin
```

## Usage

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
| options        | Default behavior                 | List of options.                                                                                                                                                                                                                                         |
| explorerType   | 'draft-js-giphy-plugin-explorer' | Type of entity created when inserting the explorer block.                                                                                                                                                                                                |
| giphyType      | 'giphy'                          | Type of entity created when inserting the GIF.                                                                                                                                                                                                           |
| descorator     | -                                | Empty decorator that returns the same component. (No decorations)                                                                                                                                                                                        |
| giphyComponent | -                                | Provide your own implementation to show the image.                                                                                                                                                                                                       |
| editable       | false                            | This plugin doesn't support the edition. If you want this functionality you must customize the component `giphyComponent`. The `editable` parameter indicates whether block editing is allowed without having to rewrite the function `blockRendererFn`. |

#### Options

| Option               | Default                            | Description                                                                                                                      |
|----------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| apiKey               | (Required)                         | Your GIPHY Application's API Key.                                                                                                |
| placehoder           | 'Search for GIFs'                  | Text as placeholder for the Explorer.                                                                                            |
| perPage              | 16                                 | Number of GIFs to show in each page of results.                                                                                  |
| columns              | 4                                  | Number of columns in the grid of results.                                                                                        |
| translate            | true                               | Enable text to GIF (like slack)[https://developers.giphy.com/docs/#operation--gifs-translate-get]                                |
| translateRegex       | `/^\/giphy (.*)$/i`                | Regular expression to capture the text and convert it to GIF. (/giphy <text>).                                                   |
| explorerRenditionKey | 'fixed_width_downsampled'          | Determine which image to show in the explorer. See more at: https://developers.giphy.com/docs/#rendition-guide                   |
| renditionKey         | 'original'                         | Determine which image to embed in the editor. Se more at: See more at: https://developers.giphy.com/docs/#rendition-guide        |
| withLink             | true                               | Whether or not embed the GIF with a link to Giphy.                                                                               |
| showBrand            | true                               | Show "Powered by GIPHY"? Be aware of: https://developers.giphy.com/docs/#production-key                                          |
| brandPosition        | static                             | How to show "Powered by GIPHY"?. Options are: 'static' (always visible) and 'overlay' (only when move the cursor over the GIF).  |
| onRequest            | `return (await fetch(url)).json()` | Function to perform the request. It will receive the URL to request and MUST return a JSON.                                      |
| params               | `{sort: 'relevant'}`               | Query parameters to include in the URL. See 'rating', 'sort' and 'lang' at https://developers.giphy.com/docs/#tech-docs          |

# Acknowledge
* Icon by: https://www.iconfinder.com/icons/315666/file_gif_icon
