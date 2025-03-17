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

function ShowTopic({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Topic Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col>
                <div className="mb-3">
                  <strong>Topic Name:</strong>
                  <div className="text-muted">{data.topic_name || 'N/A'}</div>
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

                <div className="mb-3">
                  <strong>Updated At:</strong>
                  <div className="text-muted">{formatDate(data.updated_date) || 'N/A'}</div>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <strong>Chapter Id:</strong>
                  <div className="text-muted">{data.chapter_id || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Create At:</strong>
                  <div className="text-muted">{formatDate(data.created_date) || 'N/A'}</div>
                </div>
              </Col>
              <div className="mb-3">
                <strong>Discriptions:</strong>
                <div className="text-muted">{data.description || 'N/A'}</div>
              </div>
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

export default ShowTopic
