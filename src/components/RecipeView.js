import React from 'react';
import Pagination from './Pagination';
import Recipe from './Recipe';
import '../styles/RecipeView.css';

export default function RecipeView(props) {
  const {
    onPageChange,
    data,
    currentPage,
    totalCount,
    pageSize,
    setPageSize,
    setCheckedRecipe,
  } = props;

  return (
    <div className="container">
      <div className="grid-container">
        {data.map((recipe) => {
          return setCheckedRecipe ? (
            <Recipe
              data={recipe}
              key={recipe._id}
              setCheckedRecipe={(recipe) => setCheckedRecipe(recipe)}
            />
          ) : (
            <Recipe data={recipe} key={recipe._id} />
          );
        })}
      </div>
      <div className="d-flex justify-content-around mt-3">
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={(page) => onPageChange(page)}
        />
        <div>
          <span style={{ marginRight: '5px' }}>Items per page:</span>
          <select onChange={(e) => setPageSize(e.target.value)}>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}
