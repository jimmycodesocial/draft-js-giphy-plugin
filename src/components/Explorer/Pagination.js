import React from 'react';

export default ({ page, pages, total, onPaginate, theme = {} }) => {
  const prevBtn = (<button 
    onClick={() => onPaginate(page - 1)}
    className={theme.explorerPaginationButton} 
    style={{ textAlign: 'right' }}>
      Previous
    </button>
  );

  const nextBtn = (<button 
    onClick={() => onPaginate(page + 1)}
    className={theme.explorerPaginationButton} 
    style={{ textAlign: 'left' }}>
      Next
    </button>
  );

  const results = (total === 1) 
    ? 'One result' 
    : `${total} results`;

  return (
    <div tabIndex={0} className={theme.explorerPagination} >
      <div tabIndex={1} className={theme.explorerPaginationPrev}>
        {page > 1 && prevBtn}
      </div>

      <div tabIndex={2} className={theme.explorerPaginationTotal}>
        {results}
      </div>

      <div tabIndex={3} className={theme.explorerPaginationNext}>
        {pages !== 0 && page < pages && nextBtn}
      </div>
    </div>
  );
};
