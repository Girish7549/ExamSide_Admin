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

function SubcategoryViewModal({ modal, toggle, data }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="md" className="modal-dialog-centered">
        <ModalHeader toggle={toggle}>View Subcategory Details</ModalHeader>

        <ModalBody>
          <Card className="shadow-sm">
            <CardBody>
              <Row>
                <Col md="6">
                  <div className="mb-3">
                    <strong>Subcategory:</strong>
                    <div className="text-muted">{data.subcategory_name || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Created Date:</strong>
                    <div className="text-muted">{formatDate(data.created_date) || 'N/A'}</div>
                  </div>
                  
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <strong>Status:</strong>
                    <span
                      className={`badge m-2 ${data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                    >
                      {data.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Updated Date:</strong>
                    <div className="text-muted">{formatDate(data.updated_date) || 'N/A'}</div>
                  </div>
                </Col>

                <Col>
                   <div className="mb-3">
                  <strong>
                    Subcategory Text:
                  </strong>
                  <div className="text-muted">{data.subcategory_text|| 'N/A'}</div>
                   </div>
                </Col>
                <strong>Discription :</strong>
                <div className='text-muted'>{data.description|| 'N/A'}</div>
                
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
  )
}

export default SubcategoryViewModal
