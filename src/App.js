import './App.css';
import React from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import jwt_decode from "jwt-decode";
import {Dropdown, DropdownButton}  from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyRecipes from './components/MyRecipes';
import MyMealPlan from './components/MyMealPlan';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      page: "Home",
      user: null,
    };
  }

  handleCallbackResponse = (response) => {
    this.setState({token: response.credential});
    let userObject = jwt_decode(response.credential);
    this.setState({user: userObject});
    document.getElementById("signInDiv").hidden = true;
  }

  handleLogout = () => {
    this.setState({user: null, page: "Home"});
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
