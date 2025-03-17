import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

const SubcategoryEditModal = ({ show, handleClose, data, onSave }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [subcatText, setSubcatText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllCategories');
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false)
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setSubcategoryName(data.subcategory_name || '');
      setStatus(data.status || '');
      setSubcatText(data.subcategory_text || '');
      setDescription(data.description || '');
      setCategoryId(data.category_id || '');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      subcategoryName,
      status,
      description,
      subcatText,
      categoryId
    };

    setLoading(true);

    try {
      const response = await axiosClients.put(
        `/editSubcategoryById/${data.subcategory_id}`,
        payload,
      );

      toast.success('Subcategory updated successfully.');
      handleClose();
      onSave();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update subcategory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Subcategory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* First Row: Subcategory Name and Subcategory Text */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCategoryName">
                <Form.Label>Subcategory Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subcategory name"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formSubcategoryText">
                <Form.Label>Subcategory Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter subcategory text'
                  value={subcatText}
                  onChange={(e) => setSubcatText(e.target.value)} 
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Second Row: Category Select Options and Status */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCategorySelect">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {/* Assuming you have categories fetched and stored in categories */}
              <option value="" disabled>Select Category</option>
              {/* Map over categories to render options */}
              {category.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Description Row */}
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

      {/* Modal Footer */}
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading} // Disable the button when loading
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Save Changes'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubcategoryEditModal;
