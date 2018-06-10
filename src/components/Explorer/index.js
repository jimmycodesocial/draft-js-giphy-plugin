import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Pagination from './Pagination';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      page: 1,
      total: 0,
      results: [],
    };
  }

  /**
   * Initially focused.
   */
  componentDidMount() {
    this.input.focus();

    // Load trendings.
    this.search();
  }

  /**
   * Cancel action. Enable the edition again.
   */
  cancel = () => {
    this.props.blockProps.onCancel(this.props.block);
    this.props.blockProps.setReadOnly(false);
  }  

  /**
   * Perform a search with pagination and current text.
   */
  search = (page = 1) => {
    this.setState({ page }, () => {
      this.props.blockProps
        .onSearch(this.props.block, this.state.text, page)
        .then(json => {
          this.setState({
            total: json.pagination.total_count,
            results: json.data
          });
        });
    });
  };

  /**
   * Check if the focus is inside the container.
   */
  isFocused = ({ relatedTarget, currentTarget }) => {
    if (relatedTarget === null) {
      return false;
    }

    let node = relatedTarget;

    while (node !== null) {
      if (node === currentTarget) {
        return true;
      }

      node = node.parentNode;
    }
  
    return false;
  };
  
  /**
   * Cancel when the focus is lost.
   */
  onBlur = (event) => {
    if (!this.isFocused(event)) {
      this.cancel();
    }
  };

  /**
   * No editing while it has the focus.
   */
  onFocus = (event) => {
    this.props.blockProps.setReadOnly(true);  
  };

  /**
   * Text for searching.
   */
  onChange = (event) => {
    this.setState({ text: event.target.value });
  };

  /**
   * Detect cancellation keys.
   */
  onKeyDown = (event) => {
    // Cancel on Escape or Del.
    if ((event.keyCode === 27) || (event.keyCode === 46 && this.state.text.length === 0)) {
      this.cancel();
    }
  }

  /**
   * Trigger the search.
   */
  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search(1);
    }
  };

  /**
   * Notify when the user selects the image.
   */
  onSelect = (event, { index }) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.blockProps.onSelect(this.props.block, this.state.results[index]);
    this.props.blockProps.setReadOnly(false);
  };  

  render () {
    const { blockProps, theme } = this.props;
    const { placeholder, renditionKey, perPage, columns } = blockProps;
    const { results, total, page } = this.state;
    const pages = Math.ceil(total / perPage);

    const photos = results.map(result => {
      const gif = result.images[renditionKey];
      return {
        src: gif.gif_url,
        width: +gif.width,
        height: +gif.height
      };
    });

    return (
      <div 
        className={theme.explorer} 
        contentEditable={false}
        tabIndex={0}
        onBlur={this.onBlur} 
        onFocus={this.onFocus}>

        <input 
          ref={ref => this.input = ref}
          className={theme.explorerInput}
          placeholder={placeholder}
          value={this.state.text}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress} />

        {results.length !== 0 && <Pagination 
          page={page} 
          pages={pages} 
          total={total} 
          onPaginate={this.search} 
          theme={theme} />}

        <Gallery 
          photos={photos} 
          columns={columns} 
          onClick={this.onSelect} /> 
      </div>
    );
  }
}

Explorer.propTypes = {
  block: PropTypes.object,
  blockProps: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    setReadOnly: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  })
};

export default Explorer;
