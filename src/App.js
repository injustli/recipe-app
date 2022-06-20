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
