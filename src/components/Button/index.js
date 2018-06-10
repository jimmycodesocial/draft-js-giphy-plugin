import React from 'react';
import PropTypes from 'prop-types';
import unionClassNames from 'union-class-names';
import { isCurrentBlockType } from 'draft-js-toolbox';

/**
 * Icon by: https://www.iconfinder.com/icons/315666/file_gif_icon
 */
class GiphyButton extends React.PureComponent {
  onClick = (event) => {
    event.preventDefault();
    
    const { getEditorState, setEditorState, addGiphy } = this.props;

    setEditorState(addGiphy(getEditorState()));    
  };

  onMouseDown = (event) => {
    event.preventDefault();
  }

  render () {
    const { theme, getEditorState, entityType } = this.props;
    const className = isCurrentBlockType(getEditorState(), entityType)
      ? unionClassNames(theme.button, theme.active)
      : theme.button;

    return (
      <div className={theme.buttonWrapper} onMouseDown={this.onMouseDown}>
        <button 
          className={className}
          onClick={this.onClick} 
          type="button">

          <svg 
            className={theme.svgIcon}
            enableBackground="new 0 0 24 24" 
            viewBox="0 0 32 32" 
            height="24" 
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g fill="#929292">
                <path d="M8.00684834,10 C6.34621185,10 5,11.3422643 5,12.9987856 L5,20.0012144 C5,21.6573979 6.33599155,23 8.00684834,23 L24.9931517,23 C26.6537881,23 28,21.6577357 28,20.0012144 L28,12.9987856 C28,11.3426021 26.6640085,10 24.9931517,10 L8.00684834,10 L8.00684834,10 Z M7.99456145,11 C6.89299558,11 6,11.9001762 6,12.992017 L6,20.007983 C6,21.1081436 6.90234375,22 7.99456145,22 L25.0054385,22 C26.1070044,22 27,21.0998238 27,20.007983 L27,12.992017 C27,11.8918564 26.0976562,11 25.0054385,11 L7.99456145,11 L7.99456145,11 Z M13,17 L13,19 L10.9998075,19 C10.4437166,19 10,18.5523709 10,18.0001925 L10,14.9998075 C10,14.4437166 10.4476291,14 10.9998075,14 L14,14 L14,13 L11.0048815,13 C9.89761602,13 9,13.8865548 9,15.0059191 L9,17.9940809 C9,19.1019194 9.8938998,20 11.0048815,20 L14,20 L14,19.25 L14,19.25 L14,17 L14,16 L11,16 L11,17 L13,17 L13,17 Z M16,14 L16,19 L15,19 L15,20 L18,20 L18,19 L17,19 L17,14 L18,14 L18,13 L15,13 L15,14 L16,14 L16,14 Z M20,16 L20,14 L24,14 L24,13 L19,13 L19,20 L20,20 L20,17 L23,17 L23,16 L20,16 L20,16 Z" />
              </g>
            </g>
          </svg>
        </button>
      </div>
    );
  }
}

GiphyButton.propTypes = {
  theme: PropTypes.object,
  entityType: PropTypes.string.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  addGiphy: PropTypes.func.isRequired,
};

GiphyButton.defaultProps = {
  theme: {},
};

export default GiphyButton;
