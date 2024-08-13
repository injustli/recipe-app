import { useState, useEffect } from 'react';
import { InputGroup, Button, Form, Container } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
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
    <Container>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search"
          onChange={(event) => sendName(event.target.value)}
          style={{ borderRight: 'none' }}
        />
        <InputGroup.Text style={{ backgroundColor: 'transparent' }}>
          <BsSearch />
        </InputGroup.Text>
        <Button
          variant="outline-dark"
          onClick={() => setModal(true)}
          type="button"
        >
          Advanced Search
        </Button>
      </InputGroup>
      {modalOpen &&
        createPortal(
          <SearchModalForm
            {...props}
            setModal={(flag) => setModal(flag)}
            modalOpen={modalOpen}
          />,
          document.body
        )}
    </Container>
  );
}
