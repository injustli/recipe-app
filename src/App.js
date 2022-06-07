import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("https://recipe-app-351220.uc.r.appspot.com/test", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <p>{!this.state.data ? "Loading..." : this.state.data}</p>
      </div>
    );
  }
}

export default App;
