import React from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClients } from '../../Apis/api'

const DeleteSubjectModal = ({ modal, toggle, data, onSave }) => {

  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteSubjectById/${data.subject_id}`, {
        method: 'DELETE',
      })

      toast.success('Subject Delete Successfully.')
      onSave();
      toggle();
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Subject Details</ModalHeader>
      <ModalBody className='fw-bold text-center'>Are you sure to delete this Subject ?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          No
        </Button>
        <Button onClick={handleDelete} color="primary">
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteSubjectModal
