import React from 'react';
import unionClassNames from 'union-class-names';

export default class Giphy extends React.PureComponent {
  render () {
    const {
      block,
      className,
      theme = {},
      ...otherProps
    } = this.props;

    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      blockStyleFn,
      ...elementProps
    } = otherProps;

    const combinedClassName = unionClassNames(theme.giphy, className);
    const gifData = contentState.getEntity(block.getEntityAt(0)).getData();
    const { renditionKey, showBrand, brandPosition, withLink } = blockProps;
    
    const gif = gifData.images[renditionKey];
    const image = (
      <img 
        src={gif.gif_url}
        className={theme.giphyGif}
        alt={gifData.title}
        role="presentation" />
    );

    return (
      <div 
        className={combinedClassName}
        width={gif.width}
        height={gif.height}
        {...elementProps}>

        {withLink ? <a href={gifData.url} target="_blank">{image}</a> : image}

        {showBrand && brandPosition === 'overlay' && <div className={theme.giphyBrandOverlay}>
          <a href={gifData.url} target="_blank">
            <img alt="Powered by GIPHY" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAbCAYAAACKlipAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABNBJREFUeNrsWj1sHEUUnkNO2KCgW0QKhwKuQaTjACG786a7jhM1UjYUdgemo8ulgo4ruaRZSwilvHTuvNeFBjZUV55TJCdAMJaAnMzPsuN8Qx6Pt7uT9Z7vLPlJz7vz9+bN+589N9I0VWewPNCQFXKrnf3xnalMfruoPhv/ilaiBgPtsMoX9piw8Tbe9RHdJ9DKcJbhFO1VtDUZt2s4fY25qzn7+jlrFOun+1vwBLp0P86zh/aMLljJEVY/ww1nhRz+TVtXM4wdVhlhB6xvnOEdjHXZ2HqGEfqNcD7HYUIc/EscNISAJwL9GP0h65+CdjtnjRL6J1ijiJBD4ZxfZ/g+katH5vX55JUl8NJdCNQI+kqGr+N9BuUYYXUgrA48JUBbE8ukHpUQi94llqmF/g7WU+uOmJW32Zp18NomnqvI3gnGDL4CpXaAPni+w70jVyHZiosH2fOSUvd/VGq7VKTfarPxF2jtqa0t87yZha6eg0KmQA2hvEwOb0PJEKHIx+ECCEQzD2oRT1snnjgjwnIJpwEzGMrrBM9PwQNXiOXThtZ7eF4hih0DlZNCMmUc5YOfjpjfLA8/e1vH8ZBQUE4RaAiF5hIPB/YhoJnDvh1h31YNHm/5s3nCAz/GqLbJu3JWSE0QZp4SIMkXeVlCkl+CA1iBaRJWfOIxCYTnwQJ9YtVjgf6UJGOPWP4qrPYeU2LMEjjNE4p437hAIR7mBVCAJsqfLUIhrwHLIGHVlbWgruA9u4Igxjh8gLXjAk+YEGFPsfcq9tI5XhsX0EpyipU2488Z6lKIOcyIdtz+/u03fni8cuHF841LHxUrYpozNkUYsvTHxLJmqKrs+wyJeFagaEXK44hYakTKUmmNFkpyqeydsmJAmheVhVPxHtJQt2KUvaNUbQZVNPTBq4NfDv545DfPXdZfPdh66ezKd7IeUgfYu4e9lNrL4DCnkmkxK04IHb/Em/NCjS/ktrzqi+YyP+fuUkRfnmc8hKNKB3GGqXlK4y44eCeNM0zNs2RuK0MzpwhizLNresK4HSujZUBnuM344OsCgddUmNPP6edn1AU8/4vPLYFXJA5fBTbYZe+40MS9KaqBlrlr7bO+iPEaYU9ysxBv9QtViI9w1BTGRkLftuOl7lngmhCGqhQ0oVBh2lK/KxhcTygeFq6QUCiLPzmqKZ4IqYHvYsb6rh/DmndA5yroHLDxbg1nMbngLuu7gQgQCcbWX8akzq3qpsBoXMPtecKSpxHSx6xd13kmzOO/+/9HEDlULYOHvMnaQ1LJpDnYO0H+9oT9nzV0KddQtYxlbzInugFRZAt5o6xErQpDhKSNnLzYP033EH8OSdtWaEVVXFTzfiGMy6mqWiaFHDCmuxBOggRMQ8e84HpBCNkRxm445qyI5amoLFQtg0JMqHiPtPvq6Y878ZwNYUj2K/KcuIJClODpzp6/SIX0mUKaEMAQ1tSu4Y5gq7eeOiUgK+Thu4fqr3P76s/nvcbP1Q6z9qHyXvhd7V94rA438z1khyXZppB0K1naaQVZIY/eOq+e/p6xVoXwN2v/ialld5FrDiRHc0jAp0QhJ39BjPCpIRA+pdxFGItY4hzllMyJkGSrlN3a4ZOOLkjsowo85P1f1hksCs4UsmTwjwADAPfqw1QnSLBaAAAAAElFTkSuQmCC" />
          </a>
        </div>}

        {showBrand && brandPosition === 'static' && <span className={theme.giphyBrand}>
          <svg
            viewBox="0 0 14 18"
            height="18" 
            width="14"            
            xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
              <path fill="#0CF" d="M12 16H0v2h14v-2"></path>
              <path fill="#0F9" d="M0 2v14h2V2"></path>
              <path fill="#FFF35C" d="M6.21 0H0v2h8V0"></path>
              <path fill="#F66" d="M12 4V2h-2V0H8v6h6V4"></path>
              <path fill="#93F" d="M12 6v10h2V6"></path>
              <path fill="#000" d="M6 2h2V0m6 6h-2v2" opacity=".4"></path>
            </g>
          </svg>
          <a href={gifData.url} target="_blank">Powered by GIPHY</a>
        </span>}
      </div>
    );
  }
}
