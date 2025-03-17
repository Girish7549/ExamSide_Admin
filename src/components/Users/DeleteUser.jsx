import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClients } from '../../Apis/api';

const DeleteUser = ({ modal, toggle, data, onSave, fetchData , type}) => {
  console.log("Admin data;", data)
  console.log("type data;", type)
  const url = type === 'user' ? `/deleteUserById/${data.id}` : `/admin-users/${data.id}`

  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete( url , {
        method: 'DELETE',
      });

      toast.success("User Delete Successfully.");
      // onSave();
      fetchData()
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an error deleting the user");
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete User Details</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this user?
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

export default DeleteUser;