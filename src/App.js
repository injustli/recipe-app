import "./App.css";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Home");

  // Adds a new user if user doesn't exist in database, otherwise do nothing
  const handleCallbackResponse = (response) => {
    setToken(response.credential);
    let userObject = jwt_decode(response.credential);
    fetch("/users", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userObject.email,
        name: userObject.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setUser(data.data);
          document.getElementById("Google-Login").classList.add("hide");
        }
      })
      .catch((err) => console.log("callbackResponse Error: ", err));
  };

  const handleLogout = () => {
    setUser(null);
    setPage("Home");
    document.getElementById("Google-Login").classList.remove("hide");
  };

  const navigateTo = (route, event) => {
    setPage(route);
    if (route === "Sign out") {
      handleLogout();
    }
  };

  const getMenu = () => {
    if (user) {
      return (
        <div className="Account-Menu">
          <DropdownButton
            title="My Account"
            menuRole="menu"
            onSelect={(eventKey, event) => navigateTo(eventKey, event)}
          >
            <Dropdown.Item as="button" eventKey="Home">
              Home
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="My Recipes">
              My Recipes
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="My Meal Plan">
              My Meal Plan
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="Sign out">
              Sign out
            </Dropdown.Item>
          </DropdownButton>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {getMenu()}
      <div id="Google-Login" className="Account-Menu">
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleCallbackResponse(credentialResponse)
            }
            onError={() => console.log("Login Failed")}
          />
        </GoogleOAuthProvider>
      </div>
      <Header page={page} token={token}/>
    </div>
  );
};
