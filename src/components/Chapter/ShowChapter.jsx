import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardBody } from 'reactstrap';
import { formatDate } from '../../utils/formatDate'

function ShowChapter({ modal, toggle, data }) {
  if (!data) return null;

  return (
    <Modal isOpen={modal} toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Chapter Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col >
                <div className="mb-3">
                  <strong>Chapter Name:</strong>
                  <div className="text-muted">{data.chapter_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Year:</strong>
                  <div className="text-muted">{data.year || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Weightage First:</strong>
                  <div className="text-muted">{data.weightage_first || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Avg:</strong>
                  <div className="text-muted">{data.avg || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Created At:</strong>
                  <div className="text-muted">{formatDate(data.created_at) || 'N/A'}</div>
                </div>

              </Col>
              <Col >
                <div className="mb-3">
                  <strong>Unit Id:</strong>
                  <div className="text-muted">{data.unit_id || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Total:</strong>
                  <div className="text-muted">{data.total || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Weightage Second:</strong>
                  <div className="text-muted">{data.weightage_second || 'N/A'}</div>
                </div>

                <div className="mb-3">
                  <strong>Status:</strong>
                  <td>
                    <span className={`badge ${data.status === "active" ? "bg-success" : "bg-danger"}`}>{data.status}</span>
                  </td>
                </div>

                <div className="mb-3">
                  <strong>Updated At:</strong>
                  <div className="text-muted">{formatDate(data.updated_at) || 'N/A'}</div>
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
  );
}

export default ShowChapter;