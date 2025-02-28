import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { Button, Group, TextInput } from '@mantine/core';
import SearchModalForm from './SearchModalForm';

// Renders the search bar to filter recipes
export default function SearchAndFilter(props) {
  const { setName, onPageChange, name, page } = props;
  const [modalOpen, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Updates search params as the user changes page and inputs query
  useEffect(() => {
    if (name) {
      setSearchParams({ name: name, page: page });
    } else {
      setSearchParams({ page: page });
    }
  }, [name, page, setSearchParams]);

  const sendName = (name) => {
    setName(name);
    onPageChange(1);
  };

  return (
    <>
      <Group>
        <TextInput
          value={name}
          placeholder="Search"
          onChange={(event) => sendName(event.target.value)}
          rightSection={<BsSearch />}
        />
        <Button variant="outline" onClick={() => setModal(true)} type="button">
          Advanced Search
        </Button>
      </Group>
      {modalOpen && (
        <SearchModalForm
          setName={(name) => setName(name)}
          onPageChange={(page) => onPageChange(page)}
          setModal={(flag) => setModal(flag)}
          modalOpen={modalOpen}
        />
      )}
    </>
  );
}
