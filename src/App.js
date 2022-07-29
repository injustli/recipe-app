import './App.css';
import React from 'react';
import jwt_decode from "jwt-decode";
import {Dropdown, DropdownButton}  from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: null,
      page: "Home",
    };
  }

  // Adds a new user if user doesn't exist in database, otherwise do nothing
  handleCallbackResponse = (response) => {
    this.setState({ token: response.credential });
    let userObject = jwt_decode(response.credential);
    fetch("/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userObject.email,
        name: userObject.name
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.data) {
        this.setState({user: data.data});
      }
    })
    .catch(err => console.error("callbackResponse Error: ", err));
    document.getElementById("signInDiv").classList.add("hide");
  }

  handleLogout = () => {
    this.setState({user: null, page: "Home"});
    document.getElementById("signInDiv").classList.remove("hide");
  }

  componentDidMount() {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: this.handleCallbackResponse
    });
    
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }

  navigateTo = (route, event) => {
    this.setState({ page: route }, () => {
      if (this.state.page == "Sign out") {
        this.handleLogout();
      }
    });
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
    return null;
  }

  render() {
    return (
      <div>
        {this.getMenu()}
        <div id="signInDiv" className="Account-Menu"></div>
        <Header page={this.state.page} user={this.state.user} token={this.state.token}/>
      </div>
    );
  }
}

export default App;
