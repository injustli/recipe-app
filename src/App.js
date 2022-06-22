import './App.css';
import React from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button}  from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: {}
    };
  }

  handleCallbackResponse = (response) => {
    this.setState({token: response.credential});
    let userObject = jwt_decode(response.credential);
    this.setState({user: userObject});
    document.getElementById("signInDiv").hidden = true;
  }

  handleLogout = () => {
    this.setState({user: {}});
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

  render() {
    return (
      <div>
        <SearchAndFilter />
        {Object.keys(this.state.user).length != 0 &&
          <Button onClick={this.handleLogout}>Sign Out</Button>
        }
        <div style={styles.main} id="signInDiv"></div>
      </div>
    );
  }
}

const styles = {
  main: {
    justifyContent: "right"
  }
}

export default App;
