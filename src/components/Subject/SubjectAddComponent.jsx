import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';
import { useNavigate } from 'react-router-dom';

function SubjectAddComponent() {
  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllSubcategory');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Log value
    try {
      const response = await axiosClients.post(`create/subject`, {
        subjectName,
        subcategoryId,
        description,
        status,
      });

      toast.success('Subject created successfully.');
      setSubjectName('');
      setDescription('');
      setStatus('');
      navigate('/subject');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error); // Log the full error response
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add Subject</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="input-items">
                      <div className="row gy-3">

                        {/* First Row: Select Subcategory and Subject Name */}
                        <div className="col-12 col-md-6">
                          <div className="input-box">
                            <h6>
                              Select Subcategory<span className="text-danger">*</span>
                            </h6>
                            <div>
                              <select
                                className="w-100"
                                name="subcategory"
                                required
                                value={subcategoryId}
                                onChange={(e) => setSubcategoryId(e.target.value)}
                              >
                                <option value="" disabled>
                                  Choose Subcategory
                                </option>
                                {data.map((item) => (
                                  <option key={item.subcategory_id} value={item.subcategory_id}>
                                    {item.subcategory_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="input-box">
                            <h6>
                              Subject Name<span className="text-danger">*</span>
                            </h6>
                            <input
                              type="text"
                              value={subjectName}
                              required
                              onChange={(e) => setSubjectName(e.target.value)}
                              placeholder="Enter Subject Name"
                            />
                          </div>
                        </div>

                        {/* Second Row: Status and Description */}
                        <div className="col-12 col-md-6">
                          <div className="input-box">
                            <h6>
                              Status<span className="text-danger">*</span>
                            </h6>
                            <div>
                              <select
                                className="w-100"
                                value={status}
                                required
                                onChange={(e) => setStatus(e.target.value)}
                                name="status"
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

                        <div className="col-12 col-md-6">
                          <div className="input-box">
                            <h6>
                              Description<span className="text-danger">*</span>
                            </h6>
                            <textarea
                              type="text"
                              value={description}
                              placeholder="Enter Description"
                              required
                              onChange={(e) => setDescription(e.target.value)}
                              rows={4}
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn restaurant-button"
                            disabled={loading}
                          >
                            {loading ? 'Add Subject...' : 'Add Subject'}
                          </button>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SubjectAddComponent;