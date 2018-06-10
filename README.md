# draft-js-giphy-plugin
Add Giphy support in your draft-js editor

*This is a plugin for `draft-js-plugins-editor`.*

![Demo](plugin.gif)

## Installation

```
npm install draft-js-giphy-plugin
```

## Usage

```js
import createGiphyPlugin from 'draft-js-giphy-plugin';

const giphyPlugin = createGiphyPlugin({
  options: {
    apiKey: '<my-api-key>'
  },
});

const { GihpyButton } = giphyPlugin;
```

# Acknowledge
* Icon by: https://www.iconfinder.com/icons/315666/file_gif_icon
