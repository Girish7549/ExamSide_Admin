import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';
import { useNavigate } from 'react-router-dom';

function CategoryAddComponent() {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('description', description);
    formData.append('status', status);

    setLoading(true);

    try {
      const response = await axiosClients.post(`/create/category`, {
        categoryName,
        description,
        status,
      });

      toast.success('Category created successfully.');
      navigate('/categorylist');
      setCategoryName('');
      setDescription('');
      setStatus('');
    } catch (error) {
      console.error('Error:', error);
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
                  <h5>Category Information</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="input-items">
                      <div className="row gy-3">
                        {/* Category Name */}
                        <div className="col-12 col-md-6">
                          <div className="input-box">
                            <h6>
                              Category Name<span className="text-danger">*</span>
                            </h6>
                            <input
                              type="text"
                              value={categoryName}
                              required
                              onChange={(e) => setCategoryName(e.target.value)}
                              placeholder="Enter Category Name"
                            />
                          </div>
                        </div>

                        {/* Status */}
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

                        {/* Description */}
                        <div className="col-12">
                          <div className="input-box">
                            <h6>
                              Description<span className="text-danger">*</span>
                            </h6>
                            <textarea
                              value={description}
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
                            {loading ? 'Add Category...' : 'Add Category'}
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

export default CategoryAddComponent;