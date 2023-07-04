import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

export default function ModalForm(props) {
  const {
    setIngredients,
    setModal,
    modalOpen,
    setCreator,
    setName,
    setMinTime,
    setMaxTime,
    onPageChange,
  } = props;
  const [ingredient, setIngredient] = useState('');
  const [ingredients, updateIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [creator, updateCreator] = useState('');
  const [minTime, updateMinTime] = useState('');
  const [maxTime, updateMaxTime] = useState('');
  const [validated, setValidated] = useState(false);

  // Used by the submit button to filter the recipes displayed and close modal
  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onPageChange(1);
      setName(recipeName);
      setCreator(creator);
      setMinTime(minTime);
      setMaxTime(maxTime);
      setModal(false);
      setIngredients(ingredients);
    }
    setValidated(true);
  };

  return (
    <Modal show={modalOpen} onHide={() => setModal(false)} centered size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <Form noValidate onSubmit={onSubmit} validated={validated}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recipe Name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ingredients</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Ingredient Name"
                onChange={(e) => setIngredient(e.target.value)}
              />
              <Button
                onClick={() => {
                  updateIngredients([
                    ...ingredients,
                    { id: ingredients.length, name: ingredient },
                  ]);
                }}
                type="button"
                variant="outline-dark"
              >
                Add
              </Button>
            </InputGroup>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.name}{' '}
                  <Button
                    onClick={() => {
                      updateIngredients(
                        ingredients.filter((a) => a.id !== ingredient.id)
                      );
                    }}
                    type="button"
                    variant="outline-dark"
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>Mininum Cooking Time</Form.Label>
              <Form.Control
                type="number"
                value={minTime}
                onChange={(e) => updateMinTime(e.target.value)}
                min="0"
                max={maxTime}
                placeholder="0"
              />
              <Form.Control.Feedback type="invalid">
                Minimum cooking time must be a value between 0 and maximum
                cooking time!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Maximum Cooking Time</Form.Label>
              <Form.Control
                type="number"
                value={maxTime}
                onChange={(e) => updateMaxTime(e.target.value)}
                min={minTime}
                placeholder="0"
              />
              <Form.Control.Feedback type="invalid">
                Maximum cooking time must be at least minimum cooking time!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Created By</Form.Label>
            <Form.Control
              type="text"
              value={creator}
              onChange={(e) => updateCreator(e.target.value)}
              placeholder="Username"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
