import React from "react";
import Pagination from "./Pagination";
import Recipe from "./Recipe";
import "../styles/RecipeView.css";

class RecipeView extends React.Component {

  createRecipes = () => {
    const recipes = this.props.data.map((recipe) => {
      return <Recipe data={recipe} key={recipe.id}/>
    })
    return recipes;
  }
  
  render() {
    return (
      <div className="container">
        {this.createRecipes()}
        <Pagination 
          className="pagination-bar"
          currentPage={this.props.currentPage}
          total={this.props.total}
          pageSize={this.props.pageSize}
          onPageChange={page => this.props.onPageChange(page)}
        />
      </div>
    );
  }
}

export default RecipeView;
