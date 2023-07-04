import React from 'react';
import Pagination from './Pagination';
import Recipe from './Recipe';

export default function RecipeView(props) {
  const { onPageChange, data, currentPage, totalCount, pageSize } = props;

  return (
    <>
      {data.map((recipe) => {
        return <Recipe data={recipe} key={recipe._id} />;
      })}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  );
}
