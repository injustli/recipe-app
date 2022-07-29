import React from "react";
import RecipeView from "./RecipeView";
import SearchAndFilter from "./SearchAndFilter";
import LZString from "lz-string";
import {TiPlusOutline, TiMinusOutline} from "react-icons/ti";
import {Button, Modal} from "react-bootstrap";
import "../styles/MyRecipes.css";
import {FaPencilAlt} from "react-icons/fa"
import ModalForm from "./ModalForm";

class MyRecipes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: [],
      minTime: 0,
      maxTime: 0,
      recipes: [],
      procedures: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 5,
      checkedRecipe: null,
      mode: "",
      modal: false,
      confirmModal: false,
      duration: 0,
    };
  }

  fetchCurRecipes = async () => {
    await fetch(`/recipes?page=${this.state.currentPage}&limit=${this.state.pageSize}&` +
      `${this.createIngredientQueryParam()}name=${this.state.name}&min=${this.state.minTime}` +
      `&max=${this.state.maxTime}&username=${this.props.user.name}&recipes=${LZString.decompress(localStorage.getItem("recipes"))}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.recipes) {
          this.setState({ recipes: data.recipes, totalCount: data.totalCount });
          if (!LZString.decompress(localStorage.getItem("recipes"))) {
            localStorage.setItem("recipes", LZString.compress(JSON.stringify(data.all)));
          }
        }
      });
    this.setState({
      ingredients: [],
      minTime: 0,
      maxTime: 0,
    });
  }

  // Returns a valid query parameter string depending on the ingredients state
  createIngredientQueryParam = () => {
    let res = "";
    let { ingredients } = this.state;
    for (let i in ingredients) {
      res += `ingredients=${ingredients[i]}&`
    }
    return res;
  }

  setModal = (modal) => {
    this.setState({modal: modal});
  }

  // Call back function to set name
  setName = (name) => {
    this.setState({ name: name })
  }

  // Call back function to set min and max time
  setTime = (min, max) => {
    this.setState({ minTime: min, maxTime: max });
  }

  // Call back function to set list of ingredients
  setIngredients = (ingredients) => {
    this.setState({ ingredients: ingredients });
  }

  // Call back function to set list of procedures
  setProcedures = (procedures) => {
    this.setState({procedures: procedures});
  }

  // Call back function to set recipe time
  setDuration = (time) => {
    this.setState({duration: time});
  }

  // Call back function to change current page
  onPageChange = (page) => {
    this.setState({ currentPage: page }, () => this.fetchCurRecipes());
  }

  renderButtons = () => {
    if (this.state.checkedRecipe) {
      return (
        <>
          <Button 
            variant="outline-dark" 
            className="circular-button" 
            style={{bottom: "25%"}}
            onClick={() => this.setState({modal: true, mode: "edit"})}
          >
            <FaPencilAlt />
          </Button>
          <Button 
            variant="outline-dark" 
            className="circular-button" 
            style={{bottom: "40%"}}
            onClick={() => this.setState({confirmModal: true})}
          >
            <TiMinusOutline />
          </Button>
        </>
      );
    }
    return null;
  }

  renderForms = () => {
    if (this.state.modal) {
      return (
        <ModalForm 
          user={this.props.user}
          setModal={flag => this.setModal(flag)}
          setName={name => this.setName(name)}
          modalOpen={this.state.modal}
          setTime={(min, max) => this.setTime(min, max)}
          setIngredients={(ingredients) => this.setIngredients(ingredients)}
          fetchCurRecipes={() => this.fetchCurRecipes()}
          mode={this.state.mode}
          setProcedures={procedures => this.setProcedures(procedures)}
          setDuration={duration => this.setDuration(duration)}
        />
      );
    }
    return null;
  }

  componentDidMount() {
    this.fetchCurRecipes();
  }

  render() {
    return (
      <div>
        <SearchAndFilter 
          name={this.state.name}
          setIngredients={ingredients => this.setIngredients(ingredients)}
          user={this.props.user}
          setTime={(min,max) => this.setTime(min, max)} 
          fetchCurRecipes={() => this.fetchCurRecipes()}
          setName={name => this.setName(name)}
        />
        <RecipeView 
          data={this.state.recipes}
          currentPage={this.state.currentPage}
          total={this.state.totalCount}
          pageSize={this.state.pageSize}
          onPageChange={page => this.onPageChange(page)}
        />
        <Button 
          variant="outline-dark" 
          className="circular-button"
          onClick={() => this.setState({modal: true, mode: "add"})}
        >
          <TiPlusOutline />
        </Button>
        {this.renderButtons()}
        {this.renderForms()}
        <Modal
          show={this.state.confirmModal} 
          onHide={() => this.setState({confirmModal: false})} 
          centered="true"
          size="lg"
        >
          <form method="dialog">
            <div style={{textAlign: "center"}}>
              <p>Are you sure you want to delete this recipe?</p>
              <Button type="button">Confirm</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default MyRecipes;
