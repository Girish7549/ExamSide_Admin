import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosClients } from '../../Apis/api';

function AddTopic() {
  const [topicName, setTopicName] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClients.post('create/topic', {
        topicName,
        chapterId,
        status,
        description
      });
      toast.success('Topic created successfully.');
      navigate('/alltopics');
    } catch (error) {
      toast.error('Error creating topic.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Topic</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Topic Name<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="topicName"
                          onChange={(e) => setTopicName(e.target.value)}
                          placeholder="Enter Chapter Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Chapter Id<span className="text-danger">*</span></h6>
                        <input
                          type="number"
                          name="chapterId"
                          value={chapterId}
                          placeholder="Enter Chapter Id"
                          onChange={(e) => setChapterId(e.target.value)}
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
                            required
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
                        <h6>Discriptions<span className="text-danger">*</span></h6>
                        <textarea
                          type="text"
                          name="description"
                          value={description}
                          placeholder="Enter description"
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTopic;
