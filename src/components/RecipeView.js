import React from "react";
import Pagination from "./Pagination";
import Recipe from "./Recipe";
import "../styles/RecipeView.css";

export default function RecipeView(props) {
  const { onPageChange, data, currentPage, total, pageSize } = props;

  return (
    <>
      {data.map((recipe) => {
        return <Recipe data={recipe} key={recipe._id} />;
      })}
      <div className="pagination-bar">
        <Pagination
          currentPage={currentPage}
          total={total}
          pageSize={pageSize}
          onPageChange={(page) => onPageChange(page)}
        />
      </div>
    </>
  );
}
