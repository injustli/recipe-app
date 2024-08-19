import {
  ActionIcon,
  AspectRatio,
  Button,
  FileInput,
  Group,
  Modal,
  Text,
  TextInput
} from '@mantine/core';
import { useImmer } from 'use-immer';
import { BiPlus } from 'react-icons/bi';
import { BiMinus } from 'react-icons/bi';
import { useState } from 'react';
import useAuthStore from '@/store/authStore';

const initialRender = (mode, data) => {
  return {
    name: mode === 'edit' ? data.name : '',
    ingredients: mode === 'edit' ? data.ingredients : [''],
    method: mode === 'edit' ? data.method : [''],
    imageUrl: mode === 'edit' ? data.imageUrl : null,
    cookTime: mode === 'edit' ? data.time : ''
  };
};

// Renders form to add, modify, or delete recipe
export default function RecipeModalForm(props) {
  const { modal, setModal, mode, data } = props;
  const [formData, setFormData] = useImmer(() => initialRender(mode, data));
  const token = useAuthStore((state) => state.idToken);
  const user = useAuthStore((state) => state.user);
  const [image, setImage] = useState(() => formData.imageUrl);

  // TODO: Use form library (e.g. react-hook-forms) and add validation
  const onSubmit = () => {
    let form = new FormData();
    let endpoint = '/api/recipes';
    let headers = {
      Authorization: `Bearer ${token}`
    };
    if (mode !== 'add') {
      endpoint += `/${data._id}`;
    }
    if (mode !== 'delete') {
      form.append('name', formData.name);
      form.append('ingredients', formData.ingredients);
      form.append('method', formData.method);
      form.append('time', formData.cookTime);
      form.append('createdBy', user.name);
      form.append('file', formData.imageUrl);
    }

    fetch(endpoint, {
      method: mode === 'edit' ? 'PUT' : mode === 'add' ? 'POST' : 'DELETE',
      headers: headers,
      body: form
    }).catch((err) => console.log(`Error in ${mode}ing recipe: ` + err));
    setModal(false);
  };

  return (
    <Modal opened={modal} onClose={() => setModal(false)} centered size="lg">
      <form noValidate onSubmit={onSubmit}>
        {mode !== 'delete' ? (
          <>
            <TextInput
              mb="sm"
              label="Name"
              value={formData.name}
              placeholder="Recipe Name"
              onChange={(e) =>
                setFormData((draft) => {
                  draft.name = e.target.value;
                })
              }
              withAsterisk
            />

            <FileInput
              label="Recipe Image"
              clearable
              placeholder="Upload image"
              accept="image/jpg,image/jpeg,image/png"
              onChange={(file) => {
                setFormData((draft) => {
                  draft.imageUrl = file;
                });
                setImage(URL.createObjectURL(file));
              }}
              withAsterisk
            />

            {image && (
              <AspectRatio ratio={4 / 3}>
                <img src={image} alt="Recipe image shown here" />
              </AspectRatio>
            )}

            <Group>
              <Text>Ingredients</Text>
              <ActionIcon
                variant="filled"
                onClick={() =>
                  setFormData((draft) => {
                    draft.ingredients.push('');
                    return;
                  })
                }
              >
                <BiPlus />
              </ActionIcon>
            </Group>

            {formData.ingredients.map((ingredient, index) => (
              <Group key={index} justify="space-between">
                <TextInput
                  label={`Ingredient ${index + 1}`}
                  value={ingredient}
                  placeholder={`Ingredient ${index + 1}`}
                  onChange={(e) =>
                    setFormData((draft) => {
                      draft.ingredients[index] = e.target.value;
                      return;
                    })
                  }
                  withAsterisk
                />
                <ActionIcon
                  variant="filled"
                  onClick={() =>
                    setFormData((draft) => {
                      draft.ingredients.splice(index, 1);
                      return;
                    })
                  }
                >
                  <BiMinus />
                </ActionIcon>
              </Group>
            ))}

            <Group>
              <Text>Procedure</Text>
              <ActionIcon
                variant="filled"
                onClick={() =>
                  setFormData((draft) => {
                    draft.method.push('');
                    return;
                  })
                }
              >
                <BiPlus />
              </ActionIcon>
            </Group>

            {formData.method.map((method, index) => (
              <Group key={index} justify="space-between">
                <TextInput
                  label={`Step ${index + 1}`}
                  value={method}
                  onChange={(e) =>
                    setFormData((draft) => {
                      draft.method[index] = e.target.value;
                      return;
                    })
                  }
                  withAsterisk
                />
                <ActionIcon
                  variant="filled"
                  onClick={() =>
                    setFormData((draft) => {
                      draft.splice(index, 1);
                      return;
                    })
                  }
                ></ActionIcon>
              </Group>
            ))}

            <Group justify="center">
              <Button type="submit">Create</Button>
            </Group>
          </>
        ) : (
          <>
            <Group justify="center">
              <Text>Are you sure you want to remove this recipe?</Text>
            </Group>

            <Group justify="space-around">
              <Button type="submit">Yes</Button>
              <Button type="button" onClick={() => setModal(false)}>
                No
              </Button>
            </Group>
          </>
        )}
      </form>
    </Modal>
  );
}
