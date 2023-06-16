import React from "react";
import {Container, InputGroup, Button, FormControl} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import ModalForm from "./ModalForm";

class SearchAndFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      name: "",
      ingredients: [],
      minTime: 0,
      maxTime: 0,
      createdBy: "",
    };
  }

  // Determines whether modal window is open or not
  setModal = (flag) => {
    this.setState({modalOpen: flag});
  }

  // Call back function to set name
  setName = (name) => {
    this.setState({name: name})
  }

  // Call back function to set min and max time
  setTime = (min, max) => {
    this.setState({minTime: min, maxTime: max});
  }

  // Call back function to set list of ingredients
  setIngredients = (ingredients) => {
    this.setState({ingredients: ingredients});
  }

  // Call back function to set creator
  setCreator = (user) => {
    this.setState({createdBy: user});
  }

  // Filters what gets displayed based on the user inputs
  filterRecipes = async () => {
    fetch(`/recipes?page=${this.props.page}&limit=${this.props.limit}&
      ${this.createIngredientQueryParam()}name=${this.state.name}&min=${this.state.minTime}&
      max=${this.state.maxTime}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => this.props.setRecipes(data));
  }

  // Returns a valid query parameter string depending on the ingredients state
  createIngredientQueryParam = ()  => {
    let res = "";
    let {ingredients} = this.state;
    for (let i in ingredients) {
      res += `ingredients=${ingredients[i]}&`
    }
    return res;
  }

  // Used by the search bar to filter the recipes displayed
  onSearch = async (event) => {
    this.setName(event.target.value);
    await this.filterRecipes();
  }

  // Render the modal form if modal is open; otherwise render nothing
  renderForm = () => {
    if (this.state.modalOpen) {
      return (
      <ModalForm
        setModal={flag => this.setModal(flag)}
        setName={name => this.setName(name)}
        name={this.state.name}
        modalOpen={this.state.modalOpen}
        setTime={(min, max) => this.setTime(min, max)}
        setIngredients={(ingredients) => this.setIngredients(ingredients)}
        setCreator={(user) => this.setCreator(user)}
        filterRecipes={() => this.filterRecipes()}
      />
      );
    }
    return null;
  }

  render() {
    return (
      <Container>
        <InputGroup>
          <FormControl 
            as="input"
            type="text"
            placeholder="Search"
            onChange={this.onSearch}
            value={this.state.name}
          />
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
        </InputGroup>
        <Button onClick={() => this.setModal(true)} type="button">Advanced Search</Button>
        {this.renderForm()}
      </Container>
    );
  }
}

export default SearchAndFilter;
