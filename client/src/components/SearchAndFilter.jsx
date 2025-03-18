import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  ActionIcon,
  CloseButton,
  Group,
  MultiSelect,
  Pill,
  Popover,
  RangeSlider,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MIN_TIME, MAX_TIME } from '@utils/constants';

// Renders the search bar to filter recipes
export default function SearchAndFilter({
  name,
  ingredients,
  minTime,
  maxTime,
  setSearchParams
}) {
  const range =
    minTime == MIN_TIME && maxTime == MAX_TIME ? '' : `${minTime}-${maxTime}`;

  const [opened, setOpened] = useState(false);
  const [rangeValue, setRangeValue] = useState([minTime, maxTime]);
  const [searchValue, setSearchValue] = useState('');

  const setName = (value) => {
    setSearchParams(
      (prev) => {
        if (value) {
          prev.set('name', value);
        } else {
          prev.delete('name');
        }
        return prev;
      },
      { replace: true }
    );
  };

  const setIngredients = (value) => {
    setSearchParams(
      (prev) => {
        prev.delete('ingredients');
        value.forEach((val) => {
          prev.append('ingredients', val);
        });
        return prev;
      },
      { replace: true }
    );
  };

  const setTimeRange = (value) => {
    setRangeValue(value);
    setSearchParams(
      (prev) => {
        if (value[0] == MIN_TIME && value[1] == MAX_TIME) {
          prev.delete('minTime');
          prev.delete('maxTime');
        } else {
          prev.set('minTime', value[0]);
          prev.set('maxTime', value[1]);
        }
        return prev;
      },
      { replace: true }
    );
  };

  const clearParams = () => {
    setRangeValue([MIN_TIME, MAX_TIME]);
    setSearchParams({}, { replace: true });
  };

  const createPills = () => {
    const pills = [];
    if (name) {
      pills.push(
        <Pill key="name" withRemoveButton onRemove={() => setName('')}>
          {name}
        </Pill>
      );
    }
    if (ingredients.length > 0) {
      ingredients.forEach((ingredient, idx) => {
        pills.push(
          <Pill
            key={`Ingredient-${idx}`}
            withRemoveButton
            onRemove={() =>
              setIngredients(ingredients.filter((val) => val !== ingredient))
            }
          >
            {ingredient}
          </Pill>
        );
      });
    }
    if (range) {
      pills.push(
        <Pill
          key="timeRange"
          withRemoveButton
          onRemove={() => setTimeRange([MIN_TIME, MAX_TIME])}
        >
          {range}
        </Pill>
      );
    }
    if (pills.length > 0) {
      pills.push(
        <Pill key="clear" withRemoveButton onRemove={() => clearParams()}>
          Clear All
        </Pill>
      );
    }
    return pills;
  };

  return (
    <>
      <Group my="lg" justify="center">
        <TextInput
          value={name}
          placeholder="Search recipe"
          onChange={(event) => setName(event.currentTarget.value)}
          leftSection={<BsSearch />}
          inputSize="90"
          visibleFrom="xl"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setName('')}
              style={{ display: name ? undefined : 'none' }}
            />
          }
        />
        <TextInput
          value={name}
          placeholder="Search recipe"
          onChange={(event) => setName(event.currentTarget.value)}
          leftSection={<BsSearch />}
          inputSize="70"
          visibleFrom="lg"
          hiddenFrom="xl"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setName('')}
              style={{ display: name ? undefined : 'none' }}
            />
          }
        />
        <TextInput
          value={name}
          placeholder="Search recipe"
          onChange={(event) => setName(event.currentTarget.value)}
          leftSection={<BsSearch />}
          inputSize="50"
          visibleFrom="sm"
          hiddenFrom="lg"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setName('')}
              style={{ display: name ? undefined : 'none' }}
            />
          }
        />
        <TextInput
          value={name}
          placeholder="Search recipe"
          onChange={(event) => setName(event.currentTarget.value)}
          leftSection={<BsSearch />}
          inputSize="20"
          hiddenFrom="sm"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setName('')}
              style={{ display: name ? undefined : 'none' }}
            />
          }
        />
        <Popover opened={opened} onChange={setOpened} position="bottom">
          <Popover.Target>
            <ActionIcon onClick={() => setOpened((value) => !value)}>
              <GiHamburgerMenu />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              <MultiSelect
                value={ingredients}
                label="Ingredients"
                placeholder="Select ingredients"
                data={['test', 'test1', 'test2']}
                mb="md"
                searchable
                clearable
                nothingFoundMessage="No results..."
                onChange={(value) => setIngredients(value)}
                onSearchChange={setSearchValue}
                searchValue={searchValue}
                comboboxProps={{ withinPortal: false }}
              />

              <Text>Cooking Time Range</Text>
              <RangeSlider
                min={0}
                max={500}
                step={1}
                value={rangeValue}
                onChange={setRangeValue}
                onChangeEnd={(value) => setTimeRange(value)}
                minRange={0}
              />
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
      {createPills()}
    </>
  );
}
