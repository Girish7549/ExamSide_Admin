import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatDate } from '../../utils/formatDate'

const ViewSubjectModal = ({ modal, toggle, data }) => {

  return (
    <>
      <Modal show={modal} onHide={toggle} size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Subject Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-3">
            <Card.Header>Subject Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Subject Name:</strong> {data.subject_name}</ListGroup.Item>
              <ListGroup.Item><strong>Subcategory Id:</strong> {data.subcategory_id}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Status:</strong> <span
                              className={`badge ${data.status === 'active'
                                ? 'bg-success' : data.status === 'inactive'
                                  ? 'bg-danger'
                                  : ''
                                }`}
                            >
                               {data.status}
                            </span>
              </ListGroup.Item>
              <ListGroup.Item><strong>Discriptions:</strong> {data.description}</ListGroup.Item>
              <ListGroup.Item><strong>Created Date:</strong> {formatDate(data.created_date)}</ListGroup.Item>
              <ListGroup.Item><strong>Updated Date:</strong> {formatDate(data.updated_date)}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewSubjectModal;
