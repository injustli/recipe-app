import { useState } from 'react';
import { AspectRatio, Card, Checkbox, Group, Modal, Text } from '@mantine/core';

// Renders each recipe as a card
export default function Recipe(props) {
  const { setCheckedRecipe, data } = props;
  const [modal, setModal] = useState(false);
  const { _id, method, ingredients, name, createdBy, time, imageUrl } = data;

  const onCheckbox = (target) => {
    setCheckedRecipe((current) => {
      // If current is not null, uncheck previously selected recipe
      if (current) {
        current.target.checked = false;
        // If current checkbox and selected checkbox is same, we no longer have
        // a selected recipe
        if (current.target === target) {
          return null;
        }
      }
      // Otherwise, return an object with the checkbox and id of recipe
      return { target: target, id: _id };
    });
  };

  // TODO (issue 26): Card/Modal image
  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        component="button"
        onClick={() => setModal(true)}
      >
        {setCheckedRecipe && (
          <Group p="sm" justify="end">
            <Checkbox
              aria-label="selected_recipe"
              onChange={(event) => onCheckbox(event.target)}
            />
          </Group>
        )}
        <Card.Section mb="md">
          <AspectRatio ratio={16 / 9}>
            <img src={imageUrl} alt={name} />
          </AspectRatio>
        </Card.Section>
        <Text>{name}</Text>
      </Card>
      {modal && (
        <Modal
          opened={modal}
          onClose={() => setModal(false)}
          centered
          size="lg"
          title={
            <Group justify="space-between">
              <Text>{name}</Text>
              <Text>{time}</Text>
            </Group>
          }
        >
          <AspectRatio ratio={16 / 9} mb="md">
            <img src={imageUrl} alt={name} />
          </AspectRatio>

          <Text>Ingredients</Text>
          <ul>
            {ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ul>

          <Text>Directions</Text>
          <ol>
            {method.map((m, index) => {
              return <li key={index}>{m}</li>;
            })}
          </ol>

          <Text mt="md">Created By: {createdBy}</Text>
        </Modal>
      )}
    </>
  );
}
