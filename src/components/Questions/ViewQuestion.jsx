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

function ViewQuestion({ modal, toggle, data }) {
  // console.log("Data Modal", data)
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="xl">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Question Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col>
                <div className="mb-3">
                  <strong>Question:</strong>
                  <div dangerouslySetInnerHTML={{ __html: data.questions_name || 'N/A' }} />
                </div>
                <div className="mb-3">
                  <strong>Explanation:</strong>
                  <div dangerouslySetInnerHTML={{ __html: data.explanation || 'N/A' }} />
                </div>
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>Options:</strong>
                    {
                      data.options.map((opt, index) => {
                        return (
                          <div>
                            <span className="">  {index + 1}.{opt.option_text || 'N/A'}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div>
                    <strong>Correct Option:</strong>
                    <p style={{ backgroundColor: '#1b9e3e', padding: '4px', textAlign: 'center', color: 'white', borderRadius: '0.5rem', fontWeight: 600 }} className=""> {(data.options.find(opt => opt.is_correct === 1)?.option_text) || 'N/A'}</p>
                  </div>
                </div>

              </Col>
              <Col>
                <div className="mb-3">
                  <strong>Question Type:</strong>
                  <span className="text-muted">  {data.type_name || 'N/A'}</span>
                </div>
                <div className="mb-3">
                  <strong>Sub Category:</strong>
                  <span className="text-muted">  {data.subcategory_name || 'N/A'}</span>
                </div>
                {
                  data.year_id && (
                    <div className="mb-3">
                      <strong>Year:</strong>
                      <span className="text-muted">  {data.year || 'N/A'}</span>
                    </div>
                  )
                }
                {
                  data.shift_name && (
                    <div className="mb-3">
                      <strong>Shift:</strong>
                      <span className="text-muted">  {data.shift_name || 'N/A'}</span>
                    </div>
                  )
                }
                <div className="mb-3">
                  <strong>Subject:</strong>
                  <span className="text-muted">  {(data.year_id ? data.shift_subjects_name : data.subject_name) || 'N/A'}</span>
                </div>
                {
                  data.chapter_name && (
                    <div className="mb-3">
                      <strong>Chapter Name:</strong>
                      <span className="text-muted">  {data.chapter_name || 'N/A'}</span>
                    </div>
                  )
                }
                {
                  data.unit_name && (
                    <div className="mb-3">
                      <strong>Unit:</strong>
                      <span className="text-muted">  {data.unit_name || 'N/A'}</span>
                    </div>
                  )
                }

                <div className="mb-3">
                  <strong>Status:</strong>

                  <span
                    className={`badge ${data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                  >
                    {data.status}
                  </span>

                </div>
                <div className="mb-3">
                  <strong>Created At:</strong>
                  <span className="text-muted"> {formatDate(data.created_at) || 'N/A'}</span>
                </div>
                <div className="mb-3">
                  <strong>Updated At:</strong>
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

export default ViewQuestion
