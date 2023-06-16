import React from "react";
import "../styles/ModalForm.css";
import {Modal, Button, Form} from "react-bootstrap";

class ModalForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      minTime: 0,
      maxTime: 0,
      createdBy: "",
      inputFields: [],
      name: this.props.name
    }
  }

  // Handles getting the ingredients the user inputted to filter on
  setIngredient = (index, event) => {
    const ingredients = [...this.state.ingredients];
    if (!ingredients[index]) {
      ingredients.push(event.target.value);
    } else {
      ingredients[index] = event.target.value;
    }
    this.setState({ingredients: ingredients}, this.props.setIngredients(this.state.ingredients));
  }

  // Handles creating a new input field with an option to add more every time the user clicks the plus button
  addInput = () => {
    const {inputFields, ingredients} = this.state;
    const inputs = [...inputFields];
    const length = inputFields.length;
    inputs.push(
      <React.Fragment key={length}>
        <label>Ingredient:
          <input type="text" value={ingredients[length]} onChange={(event) => this.setIngredient(length, event)}/>
        </label>
        <button id={`form-add-${length}`} onClick={this.addInput} type="button">+</button>
        <br></br>
      </React.Fragment>
    )
    this.setState({inputFields: inputs}, () => {
      if (length != 0) {
        document.getElementById(`form-add-${length-1}`).classList.add("hidden");
      }
    });
    document.getElementById("form-add").classList.add("hidden");
  }

  // Keeps track of the user input for min time
  setMin = (event) => {
    this.setState({minTime: event.target.value}, this.props.setTime(this.state.minTime, this.state.maxTime));
  }

  // Keeps track of the user input for max time
  setMax = (event) => {
    this.setState({maxTime: event.target.value}, this.props.setTime(this.state.minTime, this.state.maxTime));
  }

  // Keeps track of the user input for created by
  setCreator = (event) => {
    this.setState({createdBy: event.target.value}, this.props.setCreator(this.state.createdBy));
  }

  // Used by the submit button to filter the recipes displayed, set value of search bar, and closes the modal
  onSubmit = async () => {
    await this.props.filterRecipes();
    this.props.setName(this.state.name);
    this.props.setModal(false);
  }

  // Keeps track of user input for name
  setName = (event) => {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <div>
        <Modal 
          show={this.props.modalOpen} 
          onHide={() => this.props.setModal(false)} 
          centered="true"
          size="lg"
        >
          <Modal.Header closeButton/>
          <Modal.Body className="formBody">
            <Form>
              <label>Name: 
                <input type="text" value={this.state.name} onChange={this.setName} />
              </label>
              <br></br>
              <label>Ingredients: </label>
              <button id="form-add" onClick={this.addInput} type="button">+</button>
              <br></br>
              {this.state.inputFields}
              <br></br>
              <label>Min Time:
                <input type="number" value={this.state.minTime} onChange={this.setMin} />
              </label>
              <br></br>
              <label>Max Time:
                <input type="number" value={this.state.maxTime} onChange={this.setMax} />
              </label>
              <br></br>
              <label>Created By:
                <input type="text" value={this.state.createdBy} onChange={this.setCreator} />
              </label>
              <br></br>
              <div style={{textAlign: "center"}}>
                <Button onClick={this.onSubmit} type="submit">Submit</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalForm;
