import { useState } from 'react';
import {
  Modal,
  Button,
  Box,
  TextInput,
  Group,
  RangeSlider,
  Text,
  ActionIcon
} from '@mantine/core';
import { useImmer } from 'use-immer';
import { BiPlus } from 'react-icons/bi';
import { BiMinus } from 'react-icons/bi';

// Renders the advanced search form
// TODO: Remove Modal and instead use flex dropdown menu
export default function SearchModalForm(props) {
  const {
    setIngredients,
    setModal,
    modalOpen,
    setName,
    setMinTime,
    setMaxTime,
    onPageChange
  } = props;

  // Time in minutes
  const time = {
    min: 0,
    max: 360
  };

  const [ingredients, updateIngredients] = useImmer([]);
  const [recipeName, setRecipeName] = useState('');
  const [minTime, updateMinTime] = useState(time.min);
  const [maxTime, updateMaxTime] = useState(time.max);

  // Used by the submit button to filter the recipes displayed and close modal
  const onSubmit = (event) => {
    event.preventDefault();

    onPageChange(1);
    setMaxTime(maxTime);
    setMinTime(minTime);
    setName(recipeName);
    setModal(false);
    setIngredients(ingredients);
  };

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModal(false)}
      centered
      size="lg"
    >
      <form noValidate onSubmit={onSubmit}>
        <TextInput
          label="Name"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          mb="sm"
        />
        <Box mb="sm">
          <Group mb="md">
            <Text>Ingredients</Text>
            <ActionIcon
              variant="filled"
              onClick={() =>
                updateIngredients((draft) => {
                  draft.push('');
                  return;
                })
              }
            >
              <BiPlus />
            </ActionIcon>
          </Group>
          {ingredients.map((ingredient, index) => (
            <Group key={index} mb="sm" align="center">
              <TextInput
                label={`Ingredient ${index + 1}`}
                placeholder="Ingredient"
                value={ingredient}
                onChange={(e) =>
                  updateIngredients((draft) => {
                    draft[index] = e.target.value;
                    return;
                  })
                }
              />
              <ActionIcon
                onClick={() => {
                  updateIngredients((draft) => {
                    draft.splice(index, 1);
                    return;
                  });
                }}
                variant="filled"
                color="red"
              >
                <BiMinus />
              </ActionIcon>
            </Group>
          ))}
        </Box>
        <Text>Cooking Duration in Minutes</Text>
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
          mb="sm"
        />
        <Group justify="center">
          <Button variant="filled" type="submit">
            Search
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
