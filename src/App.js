import './App.css';
import React from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import jwt_decode from "jwt-decode";
<<<<<<< HEAD
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownButton}  from "react-bootstrap";
=======
=======
>>>>>>> fixed save conflicts
import {Dropdown, DropdownButton}  from "react-bootstrap";
=======
>>>>>>> fixed save conflicts
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> Made navigation so search bar is only rendered on certain pages
import MyRecipes from './components/MyRecipes';
import MyMealPlan from './components/MyMealPlan';
import RecipeView from "./components/RecipeView";
<<<<<<< HEAD
=======
import SearchAndFilter from './components/SearchAndFilter';
>>>>>>> fixed save conflicts

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
<<<<<<< HEAD
      page: "Home",
=======
>>>>>>> fixed save conflicts
      user: null,
      recipes: [],
      currentPage: 1,
      totalCount: 0,
<<<<<<< HEAD
      pageSize: 100
=======
      pageSize: 100,
      page: "Home"
>>>>>>> fixed save conflicts
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
<<<<<<< HEAD
    this.setState({user: null, page: "Home"});
<<<<<<< HEAD
<<<<<<< HEAD
    document.getElementById("signInDiv").classList.remove("hide");
=======
=======
=======
    this.setState({ user: null, page: "Home" });
>>>>>>> fixed save conflicts
>>>>>>> fixed save conflicts
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

    /*fetch(`/recipes?page=${this.state.currentPage}&limit=${this.state.pageSize}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
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

<<<<<<< HEAD
=======
  getMenu = () => {
    if (this.state.user) {
      return (
        <div className="Account-Menu">
          <DropdownButton title="My Account">
            <Dropdown.Item as="button">Home</Dropdown.Item>
            <Dropdown.Item as="button">My Recipes</Dropdown.Item>
            <Dropdown.Item as="button">My Meal Plan</Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleLogout}>Sign out</Dropdown.Item>
          </DropdownButton>
        </div>
      )
    }
    return <React.Fragment></React.Fragment>
  }

>>>>>>> fixed save conflicts
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
            <SearchAndFilter page={this.state.currentPage} limit={this.state.pageSize} />
            <MyRecipes />
          </React.Fragment>
        );
      case "My Meal Plan":
        return <MyMealPlan />;
      default:
        return (
          <React.Fragment>
            <SearchAndFilter page={this.state.currentPage} limit={this.state.pageSize} />
            <RecipeView
              data={this.state.recipes}
              currentPage={this.state.currentPage}
              total={this.state.totalCount}
              pageSize={this.state.pageSize}
              onPageChange={page => this.setCurrentPage(page)}
              setRecipes={recipes => this.setRecipes(recipes)}
            />
          </React.Fragment>
        );
    }
<<<<<<< HEAD
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
=======
>>>>>>> fixed save conflicts
  }

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
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
