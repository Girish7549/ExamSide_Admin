import React from 'react'
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
} from 'reactstrap'
import { formatDate } from '../../utils/formatDate';

function ViewAdsBanner({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Option Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col>
                <div className="mb-3">
                  <strong>Options Name:</strong>
                  <span className="text-muted"> {data.option_text || 'N/A'}</span>
                </div>
                <div className="mb-3">
                  <strong>Questions Id:</strong>
                  <span className="text-muted"> {data.questions_id || 'N/A'}</span>
                </div>
                <div className="mb-3">
                  <strong>Is_correct:</strong>
                  <span className="text-muted"> {data.is_correct || 'N/A'}</span>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <strong>Status:</strong>
                  <span>
                    <span
                      className={`badge ${ data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                    >
                      {data.status}
                    </span>
                  </span>
                </div>
                <div className="mb-3">
                  <strong>Created Date:</strong>
                  <span className="text-muted"> {formatDate(data.created_at) || 'N/A'}</span>
                </div>
                <div className="mb-3">
                  <strong>Updated Date:</strong>
                  <span className="text-muted"> {formatDate(data.updated_at) || 'N/A'}</span>
                </div>

              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewAdsBanner