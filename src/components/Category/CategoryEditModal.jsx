import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';// Importing icons
import { axiosClients } from '../../Apis/api';

const CategoryEditModal = ({ show, handleClose, data, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (data) {
      setCategoryName(data.category_name || '');
      setStatus(data.status || '');
      setDescription(data.description || '');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosClients.put(`/editCategoryById/${data.category_id}`,{
        categoryName,
        status,
        description
      });

      toast.success('Category updated successfully.');
      onSave();
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Category not updated, there was a problem!', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Save Changes...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryEditModal;
