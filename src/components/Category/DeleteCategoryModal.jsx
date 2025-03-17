import React from 'react'
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClients } from '../../Apis/api'

const DeleteCategoryModal = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteCategoryById/${data.category_id}`, {
        method: 'DELETE',
      })

      toast.success('Category Delete Successfully.')
      toggle()
      onSave()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Category Details</ModalHeader>
      <ModalBody className='text-center bold fw-bold'>Are you sure to delete this Category ?</ModalBody>
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

export default DeleteCategoryModal
