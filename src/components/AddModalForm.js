import React from 'react';
import { Form, Modal } from 'react-bootstrap';

export default function AddModalForm(props) {
  return (
    <>
      <Modal>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form>
            <Form.Group></Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
