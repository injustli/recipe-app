import React from "react";
import {Container, InputGroup, Button, Modal, Form, FormControl} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
//import {GrAddCircle} from "react-icons/gr";

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
      inputFields: []
    };
  }

  // Determines whether modal window is open or not
  setModal = (flag) => {
    this.setState({modalOpen: flag});
  }

  // Keeps track of the user input for recipe name
  setName = (event) => {
    this.setState({name: event.target.value})
  }

  // Handles getting the ingredients the user inputted to filter on
  setIngredient = (index, event) => {
    const ingredients = [...this.state.ingredients];
    if (!ingredients[index]) {
      ingredients.push(event.target.value);
    } else {
      ingredients[index] = event.target.value;
    }
    this.setState({ingredients: ingredients});
  }

  // Handles creating a new input field with an option to add more every time the user clicks the plus button
  addInput = () => {
    const {inputFields, ingredients} = this.state;
    const inputs = [...inputFields];
    const length = inputFields.length;
    inputs.push(
      <React.Fragment key={length}>
        <label>Ingredient: </label>
        <input type="text" value={(ingredients[length]) ? ingredients[length] : ""} onChange={(event) => this.setIngredient(length, event)}/>
        <Button onClick={this.addInput} type="button">+</Button>
        <br></br>
      </React.Fragment>
    )
    this.setState({inputFields: inputs});
  }

  // Keeps track of the user input for min time
  setMin = (event) => {
    this.setState({minTime: event.target.value});
  }

  // Keeps track of the user input for max time
  setMax = (event) => {
    this.setState({maxTime: event.target.value});
  }

  // Keeps track of the user input for created by
  setCreator = (event) => {
    this.setState({createdBy: event.target.value});
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

  // Filters what gets displayed based on the user inputs
  filterRecipes = () => {
    fetch(`http:localhost:8080/recipes?page=${this.props.page}&limit=${this.props.limit}&
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
    this.setState({modalOpen: false});
  }

  render() {
    return (
      <Container>
        <InputGroup>
          <FormControl 
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.setName}
          />
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
        </InputGroup>
        <Button onClick={() => this.setModal(true)} type="button" value="Advanced Search" />
        <Modal 
          show={this.state.modalOpen} 
          onHide={() => this.setModal(false)} 
          centered="true"
          size="lg"
        >
          <Modal.Body style={styles.formBody}>
            <Form>
              <label>Name: </label>
              <input type="text" value={this.state.name} onChange={this.setName} />
              <br></br>
              <label>Ingredients: </label>
              <Button onClick={this.addInput} type="button">+</Button>
              <br></br>
              {this.state.inputFields}
              <br></br>
              <label>Min Time: </label>
              <input type="number" value={this.state.minTime} onChange={this.setMin} />
              <br></br>
              <label>Max Time: </label>
              <input type="number" value={this.state.maxTime} onChange={this.setMax} />
              <br></br>
              <label>Created By: </label>
              <input type="text" value={this.state.createdBy} onChange={this.setCreator} />
            </Form>
          </Modal.Body>
          <Modal.Footer style={styles.formBody}>
            <Button onClick={this.filterRecipes} type="submit" value="Submit" />
            <Button onClick={() => this.setModal(false)} type="button" value="Cancel" />
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const styles = {
  formBody: {
    justifyContent: "center",
    display:"flex"
  }
}

export default SearchAndFilter;