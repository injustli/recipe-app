import './App.css';
import React from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import jwt_decode from "jwt-decode";
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownButton}  from "react-bootstrap";
import MyRecipes from './components/MyRecipes';
import MyMealPlan from './components/MyMealPlan';
=======
<<<<<<< HEAD
import SearchAndFilter from "./components/SearchAndFilter";
import {Dropdown, DropdownButton}  from "react-bootstrap";
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownButton}  from "react-bootstrap";
import MyRecipes from './components/MyRecipes';
import MyMealPlan from './components/MyMealPlan';
>>>>>>> Added navigation to dropdown menu
>>>>>>> Added navigation to dropdown menu

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
<<<<<<< HEAD
      page: "Home",
=======
<<<<<<< HEAD
>>>>>>> Added navigation to dropdown menu
      user: null,
=======
      user: {},
      recipes: false,
      mealPlan: false
>>>>>>> Added navigation to dropdown menu
    };
  }

  handleCallbackResponse = (response) => {
    this.setState({token: response.credential});
    let userObject = jwt_decode(response.credential);
    this.setState({user: userObject});
    document.getElementById("signInDiv").hidden = true;
  }

  handleLogout = () => {
<<<<<<< HEAD
    this.setState({user: null, page: "Home"});
=======
<<<<<<< HEAD
    this.setState({user: null});
=======
    this.setState({user: {}, recipes: false, mealPlan: false});
>>>>>>> Added navigation to dropdown menu
>>>>>>> Added navigation to dropdown menu
    document.getElementById("signInDiv").hidden = false;
  }

  componentDidMount() {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: this.handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  }

<<<<<<< HEAD
  navigateTo = (route, event) => {
    this.setState({page: route}, () => {
      if (this.state.page == "Sign out") {
        this.handleLogout();
      }
    });
  }

  searchRender = () => {
    const {page} = this.state;
    switch(page) {
      case "My Recipes":
        return (
          <React.Fragment>
            <SearchAndFilter />
            <MyRecipes />
          </React.Fragment>
        );
      case "My Meal Plan":
        return <MyMealPlan />;
      default:
        return <SearchAndFilter />
    }
  }
  
=======
<<<<<<< HEAD
>>>>>>> Added navigation to dropdown menu
  getMenu = () => {
    if (this.state.user) {
      return (
        <div className="Account-Menu">
          <DropdownButton title="My Account" menuRole="menu" onSelect={(eventKey, event) => this.navigateTo(eventKey, event)}>
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
  navigateTo = (route, event) => {
    switch(route) {
      case "My Recipes":
        this.setState({recipes: true, mealPlan: false});
        break;
      case "My Meal Plan":
        this.setState({recipes: false, mealPlan: true});
        break;
      case "Sign out":
        this.handleLogout();
        break;
      default:
        this.setState({recipes: false, mealPlan: false});
    }
>>>>>>> Added navigation to dropdown menu
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        {this.getMenu()}
        <div id="signInDiv" className="Account-Menu"></div>
        {this.searchRender()}
=======
        <SearchAndFilter />
<<<<<<< HEAD
        {this.getMenu()}
        <div id="signInDiv" className="Account-Menu"></div>
=======
        {
          Object.keys(this.state.user).length != 0 && (
            <div style={styles.main}>
              <DropdownButton title="My Account" menuRole="menu" onSelect={(eventKey, event) => this.navigateTo(eventKey, event)}>
                <Dropdown.Item as="button" eventKey={"Home"}>Home</Dropdown.Item>
                <Dropdown.Item as="button" eventKey={"My Recipes"}>My Recipes</Dropdown.Item>
                <Dropdown.Item as="button" eventKey={"My Meal Plan"}>My Meal Plan</Dropdown.Item>
                <Dropdown.Item as="button" eventKey={"Sign out"}>Sign out</Dropdown.Item>
              </DropdownButton>
            </div>
          )
        }
        <div style={styles.main} id="signInDiv"></div>
        {
          this.state.recipes && <MyRecipes />
        }
        {
          this.state.mealPlan && <MyMealPlan />
        }
>>>>>>> Added navigation to dropdown menu
>>>>>>> Added navigation to dropdown menu
      </div>
    );
  }
}

export default App;
