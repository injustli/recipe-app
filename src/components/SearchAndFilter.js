import React from "react";
import {Container, InputGroup, Button, FormControl} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import ModalForm from "./ModalForm";

class SearchAndFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      name: this.props.name,
    };
  }

  // Determines whether modal window is open or not
  setModal = (flag) => {
    this.setState({ modalOpen: flag });
  }

  // Call back function to set name
  setName = async (name) => {
    this.setState({name: name}, () => this.props.setName(this.state.name));
  }

  // Used by the search bar to filter the recipes displayed
  onSearch = async (event) => {
    await this.setName(event.target.value);
    await this.props.fetchCurRecipes();
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
        setTime={(min, max) => this.props.setTime(min, max)}
        setIngredients={(ingredients) => this.props.setIngredients(ingredients)}
        setCreator={(user) => this.props.setCreator(user)}
        fetchCurRecipes={() => this.props.fetchCurRecipes()}
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
            onInput={this.onSearch}
            value={this.state.name}
          />
          {/*<input className="col-11" type="search" value={this.state.name} onChange={this.onSearch}/>*/}
          <Button variant="outline-dark" onClick={() => this.props.fetchCurRecipes()}><BsSearch /></Button>
        </InputGroup>
        <Button onClick={() => this.setModal(true)} type="button">Advanced Search</Button>
        {this.renderForm()}
      </Container>
    );
  }
}

export default SearchAndFilter;
