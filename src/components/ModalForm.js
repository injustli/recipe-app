import React, { useState } from "react";
import "../styles/ModalForm.css";
import { Modal, Button, Form } from "react-bootstrap";

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
  const [ingredient, setIngredient] = useState("");
  const [ingredients, updateIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [creator, updateCreator] = useState("");
  const [minTime, updateMinTime] = useState("");
  const [maxTime, updateMaxTime] = useState("");

  // Used by the submit button to filter the recipes displayed, reset value of
  // search bar, and closes the modal
  const onSubmit = () => {
    onPageChange(1);
    setName(recipeName);
    setCreator(creator);
    setMinTime(minTime);
    setMaxTime(maxTime);
    setModal(false);
    setIngredients(ingredients);
  };

  return (
    <div>
      <Modal
        show={modalOpen}
        onHide={() => setModal(false)}
        centered="true"
        size="lg"
      >
        <Modal.Header closeButton />
        <Modal.Body className="formBody">
          <Form>
            <label>
              Name:
              <input
                type="text"
                value={recipeName}
                onChange={(event) => setRecipeName(event.target.value)}
              />
            </label>
            <br />
            <label>Ingredients: </label>
            <input
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <button
              onClick={() => {
                updateIngredients([
                  ...ingredients,
                  { id: ingredients.length, name: ingredient },
                ]);
              }}
              type="button"
            >
              Add
            </button>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.name}
                  <button
                    onClick={() => {
                      updateIngredients(
                        ingredients.filter((a) => a.id !== ingredient.id)
                      );
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <label>
              Min Time:
              <input
                type="number"
                value={minTime}
                onChange={(event) => updateMinTime(event.target.value)}
              />
            </label>
            <br></br>
            <label>
              Max Time:
              <input
                type="number"
                value={maxTime}
                onChange={(event) => updateMaxTime(event.target.value)}
              />
            </label>
            <br></br>
            <label>
              Created By:
              <input
                type="text"
                value={creator}
                onChange={(event) => updateCreator(event.target.value)}
              />
            </label>
            <br></br>
            <div style={{ textAlign: "center" }}>
              <Button onClick={() => onSubmit()} type="button">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
