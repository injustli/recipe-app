import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import '../styles/Recipe.css';

export default function Recipe(props) {
  const [modal, setModal] = useState(false);
  const { method, ingredients, name, createdBy, time } = props.data;

  // TODO (issue 26): Card/Modal image
  return (
    <div className="container">
      <div className="rounded-border d-flex flex-row align-items-center bg-light">
        <Card border="dark">
          <Card.Img variant="top" src="" />
          <Card.Title>
            <button className="card-title" onClick={() => setModal(true)}>
              <strong>{name}</strong>
            </button>
          </Card.Title>
          <Card.Body>
            <div>Time: {time} min</div>
            <div>Created by: {createdBy}</div>
          </Card.Body>
        </Card>
      </div>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        centered="true"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
          <Modal.Title className="modal-time">{time}</Modal.Title>
        </Modal.Header>
        <img src="" alt={name} />
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
          <div>Created By: {createdBy}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
