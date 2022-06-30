import './App.css';
import React from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import jwt_decode from "jwt-decode";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownButton}  from "react-bootstrap";
=======
=======
>>>>>>> fixed save conflicts
=======
>>>>>>> finish recipe/recipeview component front end
import {Dropdown, DropdownButton}  from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> Made navigation so search bar is only rendered on certain pages
import MyRecipes from './components/MyRecipes';
import MyMealPlan from './components/MyMealPlan';
import RecipeView from "./components/RecipeView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: null,
      recipes: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 100,
      page: "Home",
    };
  }

  handleCallbackResponse = (response) => {
    this.setState({ token: response.credential });
    let userObject = jwt_decode(response.credential);
<<<<<<< HEAD
    this.setState({user: userObject});
    document.getElementById("signInDiv").classList.add("hide");
=======
    this.setState({ user: userObject });
    document.getElementById("signInDiv").hidden = true;
>>>>>>> WIP on recipe display and pagination front end
  }

  handleLogout = () => {
    this.setState({user: null, page: "Home"});
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    document.getElementById("signInDiv").classList.remove("hide");
=======
=======
=======
    this.setState({ user: null, page: "Home" });
>>>>>>> fixed save conflicts
>>>>>>> fixed save conflicts
=======
>>>>>>> finish recipe/recipeview component front end
    document.getElementById("signInDiv").hidden = false;
>>>>>>> Made navigation so search bar is only rendered on certain pages
  }

  async componentDidMount() {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: this.handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

<<<<<<< HEAD
    /*fetch(`/recipes?page=${this.state.currentPage}&limit=${this.state.pageSize}`, {
=======
    await this.fetchCurRecipes();
  }

  fetchCurRecipes = async () => {
    fetch(`/recipes?page=${this.state.currentPage}&limit=${this.state.pageSize}`, {
>>>>>>> WIP pagination component
      method: "GET",
      headers: {
        "Accept": "applicatiohn/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ recipes: data.recipes, totalCount: data.count }));*/
    this.state.recipes.push({
      id: 1,
      name: "cheese",
      ingredients: [
        "cheese",
        "foo",
        "bar"
      ],
      method: [
        "Cut slice of cheese into thirds",
        "Serve and Enjoy"
      ],
      createdBy: "Me"
    });
  }

  navigateTo = (route, event) => {
    this.setState({ page: route }, () => {
      if (this.state.page == "Sign out") {
        this.handleLogout();
      }
    });
  }

  searchRender = () => {
    const { page } = this.state;
    switch (page) {
      case "My Recipes":
        return (
          <React.Fragment>
            <SearchAndFilter 
              page={this.state.currentPage} 
              limit={this.state.pageSize}
              setRecipes={recipes => this.setRecipes(recipes)} 
            />
            <MyRecipes />
          </React.Fragment>
        );
      case "My Meal Plan":
        return <MyMealPlan />;
      default:
        return (
          <React.Fragment>
            <SearchAndFilter 
              page={this.state.currentPage} 
              limit={this.state.pageSize}
              setRecipes={recipes => this.setRecipes(recipes)} 
            />
            <RecipeView
              data={this.state.recipes}
              currentPage={this.state.currentPage}
              total={this.state.totalCount}
              pageSize={this.state.pageSize}
              onPageChange={data => this.onPageChange(page)}
              setRecipes={recipes => this.setRecipes(recipes)}
            />
          </React.Fragment>
        );
    }
  }
  
  getMenu = () => {
    if (this.state.user) {
      return (
        <div className="Account-Menu">
          <DropdownButton 
            title="My Account" 
            menuRole="menu" 
            onSelect={(eventKey, event) => this.navigateTo(eventKey, event)}
          >
            <Dropdown.Item as="button" eventKey="Home">Home</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="My Recipes">My Recipes</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="My Meal Plan">My Meal Plan</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="Sign out">Sign out</Dropdown.Item>
          </DropdownButton>
        </div>
      )
    }
    return <React.Fragment></React.Fragment>
  }

  onPageChange = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    
  }

  setRecipes = (recipes) => {
    this.setState({ recipes: recipes });
  }

  render() {
    return (
      <div>
        {this.getMenu()}
        <div id="signInDiv" className="Account-Menu"></div>
        {this.searchRender()}
      </div>
    );
  }
}

export default App;
