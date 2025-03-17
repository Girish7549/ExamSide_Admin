import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

function EditSubjectModal({ show, handleClose, data, onSave }) {

  const [subjectName, setSubjectName] = useState('');
  const [status, setStatus] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [subcategory, setSubcategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllSubcategory');
      setSubcategory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setSubjectName(data.subject_name || '');
      setStatus(data.status || '');
      setSubcategoryId(data.subcategory_id || '');
      setDescription(data.description || '');
    }
  }, [data])


  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true);

    try {
      const response = await axiosClients.put(
        `/updateSubjectById/${data.subject_id}`, {
        subjectName,
        status,
        subcategoryId,
        description
      }
      )
      toast.success('Subject updated successfully.')
      onSave();
      handleClose();
    } catch (error) {
      console.error('Error updating status:', error)
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Modal isOpen={show} toggle={handleClose} size="lg" className="modal-dialog-centered">
        <ModalHeader toggle={handleClose}>Edit Subject Details</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <div>
                              <h6>Subject Name</h6>
                              <input type='text' value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required name='subjectName' />
                            </div>

                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <div>
                              <h6>Status</h6>
                              <select
                                name="status"
                                value={status}
                                className="form-control"
                                onChange={(e) => setStatus(e.target.value)}
                                required
                              >
                                <option value="" disabled>Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>

                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 mt-2">
                        <div className="input-box">
                          <h6>
                            Select Subcategory
                          </h6>
                          <div>
                            <select
                              className="w-100"
                              name="subcategoryId"
                              required
                              value={subcategoryId}
                              onChange={(e) => setSubcategoryId(e.target.value)}
                            >
                              <option value="" disabled>
                                Choose Subcategory
                              </option>
                              {subcategory.map((item) => (
                                <option key={item.subcategory_id} value={item.subcategory_id}>
                                  {item.subcategory_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3'>
                        <div className="input-box">
                          <div>
                            <h6>Discriptions</h6>
                            <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} required name='subjectName' />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" type="submit" disabled= {loading} onClick={handleSubmit}>
          {loading ? 'Save Changes...' : 'Save Changes'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditSubjectModal;
