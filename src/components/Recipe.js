import { useState } from 'react';
import { Card, Modal, Form } from 'react-bootstrap';
import '../styles/Recipe.css';

export default function Recipe(props) {
  const { setCheckedRecipe, data } = props;
  const [modal, setModal] = useState(false);
  const { _id, method, ingredients, name, createdBy, time } = data;

  const onCheckbox = (target) => {
    setCheckedRecipe((current) => {
      if (current) {
        current.target.checked = false;
        if (current.target === target) {
          return null;
        }
      }
      return { target: target, id: _id };
    });
  };

  // TODO (issue 26): Card/Modal image
  return (
    <>
      <Card border="dark" bg="light" className="d-flex rounded-border">
        {setCheckedRecipe && (
          <div className="d-flex justify-content-end p-2">
            <Form.Check
              aria-label="selected_recipe"
              onChange={(event) => onCheckbox(event.target)}
            />
          </div>
        )}
        <button className="card-button" onClick={() => setModal(true)}>
          <Card.Img variant="top" src="" />
          <Card.Title>{name}</Card.Title>
        </button>
      </Card>
      <Modal show={modal} onHide={() => setModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
          <Modal.Title className="modal-time">{time}</Modal.Title>
        </Modal.Header>
        <img alt={name} height="500" />
        <Modal.Body>
          <div className="modal-box">
            Ingredients:
            <ul>
              {ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div className="modal-box">
            Procedure:
            <ol>
              {method.map((m, index) => {
                return <li key={index}>{m}</li>;
              })}
            </ol>
          </div>
          <span>Created By: {createdBy}</span>
        </Modal.Body>
      </Modal>
    </>
  );
}
