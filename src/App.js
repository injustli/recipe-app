import './App.css';
import {React} from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown, DropdownButton}  from "react-bootstrap";

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

  handleLogin = (googleData) => {
    console.log(googleData);
  }

  handleFailure = (result) => {
    console.log(result);
  }

  render() {
    return (
      <div>
        <SearchAndFilter />
        {
          Object.keys(this.state.user).length != 0 && (
            <div style={styles.main}>
              <DropdownButton title="My Account">
                <Dropdown.Item as="button">Home</Dropdown.Item>
                <Dropdown.Item as="button">My Recipes</Dropdown.Item>
                <Dropdown.Item as="button">My Meal Plan</Dropdown.Item>
                <Dropdown.Item as="button" onClick={this.handleLogout}>Sign out</Dropdown.Item>
              </DropdownButton>
            </div>
          )
        }
        <div style={styles.main} id="signInDiv"></div>
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
