import './App.css';
import React from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownButton}  from "react-bootstrap";
import MyRecipes from './components/MyRecipes';
import MyMealPlan from './components/MyMealPlan';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: {},
      recipes: false,
      mealPlan: false
    };
  }

  handleCallbackResponse = (response) => {
    this.setState({token: response.credential});
    let userObject = jwt_decode(response.credential);
    this.setState({user: userObject});
    document.getElementById("signInDiv").hidden = true;
  }

  handleLogout = () => {
    this.setState({user: {}, recipes: false, mealPlan: false});
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
  }

  render() {
    return (
      <div>
        <SearchAndFilter />
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
      </div>
    );
  }
}

const styles = {
  main: {
    position: "absolute",
    right: 5,
    top: 5
  }
}

export default App;
