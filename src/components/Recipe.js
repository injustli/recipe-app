import React from "react";
import { Card, Modal } from "react-bootstrap";
import "../styles/Recipe.css";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  setModal = (flag) => {
    this.setState({modal: flag});
  }

  displayIngredients = () => {
    let ingredList = [];
    const {ingredients} = this.props.data;
    for (let i in ingredients) {
      ingredList.push(<li key={i}>{ingredients[i]}</li>);
    }
    return ingredList;
  }

  displayProcedure = () => {
    let procList = [];
    const {method} = this.props.data;
    for (let i in method) {
      procList.push(<li key={i}>{method[i]}</li>);
    }
    return procList;
  }

  render() {
    return (
      <div className="container">
        <div className="rounded-border d-inline p-1 bg-light">
          <Card border="dark">
            <Card.Img variant="top" src="https://www.usdairy.com/optimize/getmedia/6ab03180-cc90-4a03-a339-13b540ecc8a5/american.jpg.jpg.aspx?format=webp"/>
            <Card.Title>
              <button className="card-title" onClick={() => this.setModal(true)}><strong>{this.props.data.name}</strong></button>
            </Card.Title>
            <Card.Body>
              <p>Time: {this.props.data.time} min</p>
              <p>Created by: {this.props.data.createdBy}</p>
            </Card.Body>
          </Card>
        </div>
        <Modal
          show={this.state.modal}
          onHide={() => this.setModal(false)}
          centered="true"
          size="lg"
        >
          <Modal.Header closeButton>
              <Modal.Title>{this.props.data.name}</Modal.Title>
              <Modal.Title className="modalTitle">{this.props.data.time} min</Modal.Title>
          </Modal.Header>
          <img 
              src="https://www.usdairy.com/optimize/getmedia/6ab03180-cc90-4a03-a339-13b540ecc8a5/american.jpg.jpg.aspx?format=webp" 
              alt={`${this.props.data.name}`}
          />
          <Modal.Body>
            <div className="modal-box">
              Ingredients:
              <ul>{this.displayIngredients()}</ul>
            </div>
            <div className="modal-box">
              Procedure:
              <ol>{this.displayProcedure()}</ol>
            </div>
            <p>Created By: {this.props.data.createdBy}</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Recipe;