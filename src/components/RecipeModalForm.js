import React, { useState } from 'react';
import { Form, Modal, InputGroup, Button } from 'react-bootstrap';

export default function RecipeModalForm(props) {
  const { modal, setModal, user, token, mode, data } = props;
  const [formData, setFormData] = useState({
    name: mode === 'edit' ? data.name : '',
    ingredients: mode === 'edit' ? data.ingredients : [''],
    method: mode === 'edit' ? data.method : [''],
    imageFile: '',
    cookTime: mode === 'edit' ? data.time : 0,
  });
  const [validated, setValidated] = useState(false);

  const onSubmit = (event) => {
    const form = document.getElementById('add-recipe-form');
    if (form.checkValidity()) {
      fetch('/recipes', {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          ingredients: formData.ingredients,
          method: formData.method,
          time: formData.cookTime,
          createdBy: user.name,
        }),
      }).catch((err) => console.log('Error in adding recipe: ' + err));
      setModal(false);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Modal show={modal} onHide={() => setModal(false)} centered size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <Form id="add-recipe-form" noValidate validated={validated}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recipe Name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData((current) => {
                  return { ...current, name: e.target.value };
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              Name can't be empty!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" />
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between">
              <Form.Label>Ingredients</Form.Label>
              <Button
                type="button"
                variant="outline-dark"
                size="sm"
                onClick={() =>
                  setFormData((current) => {
                    return {
                      ...current,
                      ingredients: [...current.ingredients, ''],
                    };
                  })
                }
              >
                Add
              </Button>
            </div>
            {formData.ingredients.map((ingredient, index) => (
              <>
                <Form.Label>Ingredient {index + 1}</Form.Label>
                <InputGroup key={index} hasValidation>
                  <Form.Control
                    type="text"
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    required
                    onChange={(e) =>
                      setFormData((current) => {
                        const newIngredients = current.ingredients.map(
                          (val, idx) => {
                            return idx === index ? e.target.value : val;
                          }
                        );
                        return { ...current, ingredients: newIngredients };
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={() =>
                      setFormData((current) => {
                        const newIngredients = current.ingredients.filter(
                          (c, idx) => idx !== index
                        );
                        return { ...current, ingredients: newIngredients };
                      })
                    }
                  >
                    Remove
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Ingredient {index + 1} can't be empty!
                  </Form.Control.Feedback>
                </InputGroup>
              </>
            ))}
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between">
              <Form.Label>Procedure</Form.Label>
              <Button
                type="button"
                variant="outline-dark"
                size="sm"
                onClick={() =>
                  setFormData((current) => {
                    return {
                      ...current,
                      method: [...current.method, ''],
                    };
                  })
                }
              >
                Add
              </Button>
            </div>
            {formData.method.map((method, index) => (
              <>
                <Form.Label>Step {index + 1}</Form.Label>
                <InputGroup key={index} hasValidation>
                  <Form.Control
                    type="text"
                    placeholder={`Step ${index + 1}`}
                    value={method}
                    required
                    onChange={(e) =>
                      setFormData((current) => {
                        const newProcedure = current.method.map((val, idx) => {
                          return idx === index ? e.target.value : val;
                        });
                        return { ...current, method: newProcedure };
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={() =>
                      setFormData((current) => {
                        const newProcedure = current.method.filter(
                          (c, idx) => idx !== index
                        );
                        return { ...current, method: newProcedure };
                      })
                    }
                  >
                    Remove
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Step {index + 1} can't be empty!
                  </Form.Control.Feedback>
                </InputGroup>
              </>
            ))}
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Cooking Time</Form.Label>
            <Form.Control
              type="number"
              value={formData.cookTime}
              onChange={(e) =>
                setFormData((current) => {
                  return { ...current, cookTime: e.target.value };
                })
              }
              min="1"
              placeholder="0"
              required
            />
            <Form.Control.Feedback type="invalid">
              Cooking time must not be empty and must be greater than 0!
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="button" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
