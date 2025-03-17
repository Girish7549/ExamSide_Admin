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
import { formatDate } from '../../utils/formatDate'

function ShowUnit({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Unit Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <strong>Unit Name:</strong>
                  <div className="text-muted">{data.unit_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Subject Id:</strong>
                  <div className="text-muted">{data.subject_id || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Status:</strong>
                  <td>
                    <span
                      className={`badge ${data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                    >
                      {data.status}
                    </span>
                  </td>
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <strong>Created On:</strong>
                  <div className="text-muted">
                    {data.created_date ? formatDate(data.created_date) : 'N/A'}
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Updated On:</strong>
                  <div className="text-muted">
                  {data.updated_date ? formatDate(data.updated_date) : 'N/A'}
                  </div>
                </div>
              </Col>
              <Col>
              <div className="mb-3">
                  <strong>Description:</strong>
                  <div className="text-muted">{data.description || 'N/A'}</div>
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

export default ShowUnit
