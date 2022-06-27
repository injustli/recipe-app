import './App.css';
import React from 'react';
//import Header from './components/Header';
import jwt_decode from "jwt-decode";
import SearchAndFilter from "./components/SearchAndFilter";
import {Dropdown, DropdownButton}  from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
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
    this.setState({user: null});
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

  render() {
    return (
      <div>
        <SearchAndFilter />
        {this.getMenu()}
        <div id="signInDiv" className="Account-Menu"></div>
      </div>
    );
  }
}

export default App;
