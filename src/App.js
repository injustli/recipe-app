import './App.css';
import React from 'react';
import SearchAndFilter from './components/SearchAndFilter';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/test?id=1&id=2", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        //console.log(res);
        res.json()
      })
      .then(data => {
        console.log(data);
        //this.setState({data: data.message})
      });
  }

  render() {
    return (
      <div>
        <SearchAndFilter />
      </div>
    );
  }
}

export default App;
