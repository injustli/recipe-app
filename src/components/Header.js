import React from "react";
import SearchAndFilter from "./SearchAndFilter";
import MyRecipes from './MyRecipes';
import MyMealPlan from './MyMealPlan';
import RecipeView from "./RecipeView";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: [],
      minTime: 0,
      maxTime: 0,
      createdBy: "",
      recipes: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 5,
    };
  }

  // Call back function to set name
  setName = (name) => {
    this.setState({ name: name })
  }

  // Call back function to set min and max time
  setTime = (min, max) => {
    this.setState({ minTime: min, maxTime: max });
  }

  // Call back function to set list of ingredients
  setIngredients = (ingredients) => {
    this.setState({ ingredients: ingredients });
  }

  // Call back function to set creator
  setCreator = (user) => {
    this.setState({ createdBy: user });
  }

  // Filters what gets displayed based on the user inputs
  fetchRecipes = () => {
    fetch(`/recipes?page=${this.state.currentPage}&limit=` +
        `${this.state.pageSize}&${this.createIngredientQueryParam()}name=` +
        `${this.state.name}&minTime=${this.state.minTime}&maxTime=` + 
        `${this.state.maxTime}&user=${this.state.createdBy}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({recipes: data.data, totalCount: data.totalCount});
      this.setState({
        ingredients: [], 
        minTime: 0, 
        maxTime: 0, 
        createdBy: "", 
        name: ""
      });
    })
    .catch(err => console.log("GET recipes error: " + err));
  }

  // Returns a valid query parameter string depending on the ingredients state
  createIngredientQueryParam = () => {
    let res = "";
    let { ingredients } = this.state;
    for (let i in ingredients) {
      res += `ingredients=${ingredients[i]}&`
    }
    return res;
  }

  // Callback method to change page and 
  onPageChange = (page) => {
    this.setState({currentPage: page}, () => this.fetchRecipes());  
  }

  loadSearch = () => {
    return (
      <SearchAndFilter 
        name={this.state.name}
        setIngredients={ingredients => this.setIngredients(ingredients)}
        setCreator={user => this.setCreator(user)}
        setTime={(min,max) => this.setTime(min, max)} 
        setName={name => this.setName(name)}
        onPageChange={page => this.onPageChange(page)}
      />
    );
  }

  viewRender = () => {
    const { page } = this.props;
    switch (page) {
      case "My Recipes":
        return (
          <React.Fragment>
            {this.loadSearch()}
            <MyRecipes />
          </React.Fragment>
        );
      case "My Meal Plan":
        return <MyMealPlan />;
      default:
        return (
          <React.Fragment>
            {this.loadSearch()}
            <RecipeView
              data={this.state.recipes}
              currentPage={this.state.currentPage}
              total={this.state.totalCount}
              pageSize={this.state.pageSize}
              onPageChange={page => this.onPageChange(page)}
            />
          </React.Fragment>
        );
    }
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  render() {
    return (
      <div>
        {this.viewRender()}
      </div>
    )
  }
}

export default Header;
