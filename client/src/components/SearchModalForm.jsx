import { useRef, useState } from 'react';
import { Modal, Button, Box, TextInput, Group, RangeSlider, Flex } from '@mantine/core';

// Renders the advanced search form
export default function SearchModalForm(props) {
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

  // Time in minutes
  const time = {
    min: 0,
    max: 360
  };

  const [ingredients, updateIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [creator, updateCreator] = useState('');
  const [minTime, updateMinTime] = useState(time.min);
  const [maxTime, updateMaxTime] = useState(time.max);
  const inputRef = useRef();

  // Used by the submit button to filter the recipes displayed and close modal
  const onSubmit = (event) => {
    event.preventDefault();

    onPageChange(1);
    setMaxTime(maxTime);
    setMinTime(minTime);
    setName(recipeName);
    setCreator(creator);
    setModal(false);
    setIngredients(ingredients);
  };

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModal(false)}
      centered
      size="lg"
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <form noValidate onSubmit={onSubmit}>
        <TextInput
          label="Name"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          mb="sm"
        />
        <Box>
          <Group mb="sm">
            <TextInput label="Ingredients" placeholder="Ingredient Name" ref={inputRef} />
            <Button
              onClick={() => {
                updateIngredients((currentArray) => {
                  return [...currentArray, inputRef.current.value];
                });
              }}
              variant="outline"
            >
              Add
            </Button>
          </Group>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={ingredient.id}>
                {ingredient}
                <Button
                  onClick={() => {
                    updateIngredients((currentArray) => {
                      return currentArray.filter((_, idx) => idx !== index);
                    });
                  }}
                  variant="outline"
                  ml={5}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Box>
        <RangeSlider
          defaultValue={[time.min, time.max]}
          step={1}
          min={0}
          max={360}
          minRange={1}
          onChange={(val) => {
            updateMinTime(val[0]);
            updateMaxTime(val[1]);
          }}
          value={[minTime, maxTime]}
        />
        
        <Form.Group className="mb-3">
          <Form.Label>Created By</Form.Label>
          <Form.Control
            type="text"
            value={creator}
            onChange={(e) => updateCreator(e.target.value)}
            placeholder="Username"
          />
        </Form.Group>
        <Flex justify="center">
          <Button variant="filled" type="submit">
            Search
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
