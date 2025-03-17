import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { formatDate } from '../../utils/formatDate';

function ViewModalCategory({ modal, toggle, data }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="md" className="modal-dialog-centered">
        <ModalHeader toggle={toggle}>View Category Details</ModalHeader>
        <ModalBody>
          <Card className="shadow-sm">
            <CardBody>
              <Row>
                <Col md="6">
                  <div className="mb-3">
                    <strong>Category Name:</strong>
                    <div className="text-muted">{data.category_name || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Description:</strong>
                    <div className="text-muted">{data.description || 'N/A'}</div>
                  </div>
                  
                </Col>
                <Col md="6">
                  

                  <div className="mb-3">
                    <strong>Status:</strong>
                    <span
                      className={`badge ${
                        data.status === 'inactive' ? 'bg-danger' : 'bg-success'
                      } ms-2`}
                    >
                      {data.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Created Date:</strong>
                    <div className="text-muted">{formatDate(data.created_at) || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Updated Date:</strong>
                    <div className="text-muted">{formatDate(data.updated_at) || 'N/A'}</div>
                  </div>
                </Col>
                
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ViewModalCategory;
