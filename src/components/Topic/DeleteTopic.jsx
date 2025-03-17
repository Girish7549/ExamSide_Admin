import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClients } from '../../Apis/api';

const DeleteTopic = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteTopicById/${data.topic_id}`, {
        method: 'DELETE',
      });

      toast.success("Topic Delete Successfully.");
      onSave();
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an error deleting the topic");
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Topic Details</ModalHeader>
      <ModalBody className='fw-bold text-center'>
      Are you sure about deleting this topic?
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

export default DeleteTopic;