import './App.css';
import React from 'react';
import jwt_decode from "jwt-decode";
import { Dropdown, DropdownButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
    /*
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
          this.setState({ user: data.data });
        }
      })
      .catch(err => console.error("callbackResponse Error: ", err));
  }

  handleLogout = () => {
    this.setState({ user: null, page: "Home" });
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
<<<<<<< HEAD
        <div className="Account-Menu">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={credentialResponse => this.handleCallbackResponse(credentialResponse)}
              onError={() => console.log('Login Failed')}
            />
          </GoogleOAuthProvider>
        </div>
=======
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin 
            onSuccess={credentialResponse => this.handleCallbackResponse(credentialResponse)}
            onError={() => console.log('Login Failed')}
            className="Account-Menu"
          />
        </GoogleOAuthProvider>
>>>>>>> WIP adding user to database when logging in
        <Header page={this.state.page} />
      </div>
    );
  }
}

export default App;
