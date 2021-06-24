import React from 'react';

type PaginatorProps = {
  page: number;
  lastPage: number;
  pageChange: (page: number) => void
}

const Paginator: React.FC<PaginatorProps> = (props) => {
  const { page, lastPage, pageChange } = props

  const prev = () => {
    if (page >= 1) {
      pageChange(page - 1)
    }
  }

  const next = () => {
    if (page < lastPage) {
      pageChange(page + 1)
    }
  }

  return (
    <>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prev}>Previous</button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={next}>Next</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Paginator;
