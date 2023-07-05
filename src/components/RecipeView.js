import React from 'react';
import Pagination from './Pagination';
import Recipe from './Recipe';
import '../styles/RecipeView.css';

export default function RecipeView(props) {
  const { onPageChange, data, currentPage, totalCount, pageSize, setPageSize } =
    props;

  return (
    <div className="container">
      <div className="grid-container">
        {data.map((recipe) => {
          return <Recipe data={recipe} key={recipe._id} />;
        })}
      </div>
      <div className="d-flex justify-content-around mt-2">
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={(page) => onPageChange(page)}
        />
        <div>
          <label style={{ marginRight: '5px' }}>Recipes per page:</label>
          <select onChange={(e) => setPageSize(e.target.value)}>
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}
