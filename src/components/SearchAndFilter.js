import React, { useState, useEffect } from 'react';
import { InputGroup, Button, Form, Container } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import ModalForm from './ModalForm';

export default function SearchAndFilter(props) {
  const { setName, onPageChange } = props;
  const [modalOpen, setModal] = useState(false);

  // Render the modal form if modal is open; otherwise render nothing
  const renderForm = () => {
    if (modalOpen) {
      return (
        <ModalForm
          {...props}
          setModal={(flag) => setModal(flag)}
          modalOpen={modalOpen}
        />
      );
    }
    return null;
  };

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
      {renderForm()}
    </Container>
  );
}
