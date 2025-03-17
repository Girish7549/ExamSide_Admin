import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

function EditTopic({ modal, toggle, data, onSave }) {
  const [topicName, setTopicName] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setTopicName(data.topic_name || '');
      setChapterId(data.chapter_id || '');
      setStatus(data.status || '');
      setDescription(data.description || '');
    }
  }, [data]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      await axiosClients.put(
        `/updateTopicById/${data.topic_id}`,
        {
          topicName,
          chapterId,
          status,
          description
        }
      );
      toast.success('Topic updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating topic:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Topic</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Topic Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Topic Name</h6>
                            <input
                              type="text"
                              name="topicName"
                              value={topicName}
                              onChange={(e) => setTopicName(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Chapter Id</h6>
                            <input
                              type="number"
                              name="chapterId"
                              value={chapterId}
                              onChange={(e) => setChapterId(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>
                              Status<span className="text-danger">*</span>
                            </h6>
                            <div>
                              <select
                                className="w-100"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                
                              >
                                <option value="" disabled>
                                  Select Status
                                </option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Discriptions</h6>
                            <textarea
                              type="text"
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
                <Button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Save Changes'}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditTopic;