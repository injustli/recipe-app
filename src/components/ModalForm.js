import React from "react";
import "../styles/ModalForm.css";
import { Modal, Button, Form } from "react-bootstrap";

class ModalForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      minTime: 0,
      maxTime: 0,
      createdBy: "",
      inputFields: [],
      procedures: [],
      methodFields: [],
      name: this.props.mode ? (this.props.mode == "edit" ? this.props.checkedRecipe.name : "") : this.props.name,
      duration: 0,
    }
  }

  // Handles getting the ingredients the user inputted
  setIngredient = (index, event) => {
    const ingredients = [...this.state.ingredients];
    if (ingredients[index] === undefined) {
      ingredients.push(event.target.value);
    } else {
      ingredients[index] = event.target.value;
    }
    this.setState({ ingredients: ingredients }, () => this.props.setIngredients(ingredients));
  }

  // Handles getting the procedures the user inputted
  setProcedure = (index, event) => {
    const procedures = [...this.state.procedures];
    if (procedures[index] === undefined) {
      procedures.push(event.target.value);
    } else {
      procedures[index] = event.target.value;
    }
    this.setState({ procedures: procedures }, () => this.props.setProcedures(procedures));
  }

  // Handles creating a new input field for ingredients with an option to add more every time the user clicks the plus button
  addInput = () => {
    const { inputFields, ingredients } = this.state;
    const inputs = [...inputFields];
    const length = inputs.length;
    inputs.push(
      <React.Fragment key={length}>
        <label>Ingredient:
          <input type="text" value={ingredients[length]} onChange={(event) => this.setIngredient(length, event)} />
        </label>
        <button id={`ingredient-add-${length}`} onClick={this.addInput} type="button">+</button>
        <br></br>
      </React.Fragment>
    )
    this.setState({ inputFields: inputs }, () => {
      if (length != 0) {
        document.getElementById(`ingredient-add-${length - 1}`).classList.add("hidden");
      }
    });
    document.getElementById("ingredient-add").classList.add("hidden");
  }

  // Handles creating a new input field for procedures with an option to add more every time the user clicks the plus button
  addProcedure = () => {
    const {methodFields, procedures} = this.state;
    const inputs = [...methodFields];
    const length = inputs.length;
    inputs.push(
      <React.Fragment key={length}>
        <label>Procedure:
          <input type="text" value={procedures[length]} onChange={(event) => this.setProcedure(length, event)} />
        </label>
        <button id={`procedure-add-${length}`} onClick={this.addProcedure} type="button">+</button>
        <br></br>
      </React.Fragment>
    )
    this.setState({methodFields: inputs }, () => {
      if (length != 0) {
        document.getElementById(`procedure-add-${length - 1}`).classList.add("hidden");
      }
    });
    document.getElementById("procedure-add").classList.add("hidden");
  }

  // Keeps track of the user input for min time
  setMin = (event) => {
    this.setState({ minTime: event.target.value }, () => this.props.setTime(this.state.minTime, this.state.maxTime));
  }

  // Keeps track of the user input for max time
  setMax = (event) => {
    this.setState({ maxTime: event.target.value }, () => this.props.setTime(this.state.minTime, this.state.maxTime));
  }

  // Keeps track of the user input for created by
  setCreator = (event) => {
    this.setState({ createdBy: event.target.value }, () => this.props.setCreator(this.state.createdBy));
  }

  // Keeps track of user input for duration 
  setDuration = (event) => {
    this.setState({duration: event.target.value}, () => this.props.setDuration(this.state.duration));
  }

  // Used by the submit button to filter the recipes displayed, set value of search bar, and closes the modal
  onSubmit = async () => {
    await this.props.fetchCurRecipes();
    this.props.setModal(false);
  }

  // Keeps track of user input for name
  setName = (event) => {
    this.setState({ name: event.target.value }, () => this.props.setName(this.state.name));
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
          <Modal.Header closeButton />
          <Modal.Body className="formBody">
            <Form>
              <label>Name:
                <input type="text" value={this.state.name} onChange={this.setName} />
              </label>
              <br></br>
              <label>Ingredients: </label>
              <button id="ingredient-add" onClick={this.addInput} type="button">+</button>
              <br></br>
              {this.state.inputFields}
              {this.props.mode == "add" &&
                <>
                  <label>Procedures: </label>
                  <button id="procedure-add" onClick={this.addProcedure} type="button">+</button>
                  <br></br>
                </>
              }
              {this.state.methodFields}
              <br></br>
              {!this.props.mode && 
                <>
                  <label>Min Time:
                    <input type="number" value={this.state.minTime} onChange={this.setMin} />
                  </label>
                  <br></br>
                  <label>Max Time:
                    <input type="number" value={this.state.maxTime} onChange={this.setMax} />
                  </label> 
                  <br></br>
                </>
              }
              {!this.props.user &&
                <>
                  <label>Created By:
                    <input type="text" value={this.state.createdBy} onChange={this.setCreator} />
                  </label>
                  <br></br>
                </>
              }
              {this.props.mode == "add" &&
                <>
                  <label>Prep Time:
                    <input type="number" value={this.state.duration} onChange={this.setDuration} />
                  </label>
                </>
              }
              <div style={{ textAlign: "center" }}>
                <Button onClick={this.onSubmit} type="button">Submit</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalForm;
