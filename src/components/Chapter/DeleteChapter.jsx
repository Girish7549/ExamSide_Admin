import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClients } from '../../Apis/api';

const DeleteChapter = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteChapterById/${data.chapter_id}`, {
        method: 'DELETE',
      });

      toast.success("Chapter Delete Successfully.");
      onSave();
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an error deleting the testimonial");
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Chapter Details</ModalHeader>
      <ModalBody className='fw-bold text-center'>
      Are you sure about deleting this chapter?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          No
        </Button>
        <Button color="primary" onClick={handleDelete}>
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteChapter;