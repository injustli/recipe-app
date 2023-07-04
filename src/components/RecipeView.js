import React from 'react';
import Pagination from './Pagination';
import Recipe from './Recipe';

export default function RecipeView(props) {
  const { onPageChange, data, currentPage, total, pageSize } = props;

  return (
    <>
      {data.map((recipe) => {
        return <Recipe data={recipe} key={recipe._id} />;
      })}
      <Pagination
        currentPage={currentPage}
        total={total}
        pageSize={pageSize}
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  );
}
