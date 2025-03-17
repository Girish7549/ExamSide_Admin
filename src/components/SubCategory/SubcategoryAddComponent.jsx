import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';
import {useNavigate} from 'react-router-dom';

function SubcategoryAddComponent() {
  const [data, setData] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [subcatText, setSubcatText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllCategories');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Check if a valid category ID is selected
    if (!selectedCategoryId) {
      toast.error('Please select a category');
      return;
    }

  
    try {
      // Include the categoryId in the URL path
      const response = await axiosClients.post(`/create/subcategory/${selectedCategoryId}`, {
        subcategoryName,
        description,
        status,
        subcatText
      });
  
      toast.success('Subcategory created successfully');
      setSubcategoryName('');
      setDescription('');
      setStatus('');
      setSelectedCategoryId('');
      setSubcatText('');
      navigate('/subcategorylist');

    } catch (error) {
      console.error('Error creating subcategory:', error);
      toast.error('Failed to create subcategory');
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
              <h5>Subcategory Information</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-items">
                  {/* First Row (Select Category and Subcategory Name) */}
                  <div className="row gy-3">
                    <div className="col-12 col-md-6">
                      <div className="input-box">
                        <h6>
                          Select Category<span className="text-danger">*</span>
                        </h6>
                        <div>
                          <select
                            className="w-100"
                            name="category"
                            required
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                          >
                            <option value="" disabled>
                              Choose Category
                            </option>
                            {data.map((item) => (
                              <option key={item.category_id} value={item.category_id}>
                                {item.category_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="input-box">
                        <h6>Subcategory Name<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="subcategoryName"
                          required
                          value={subcategoryName}
                          onChange={(e) => setSubcategoryName(e.target.value)}
                          placeholder="Enter Subcategory Name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Second Row (Subcategory Text and Status) */}
                  <div className="row gy-3 mt-1">
                    <div className="col-12 col-md-6">
                      <div className="input-box">
                        <h6>Subcategory Text<span className="text-danger">*</span></h6>
                        <input
                          name="subcatText"
                          type="text"
                          required
                          rows={1}
                          value={subcatText}
                          onChange={(e) => setSubcatText(e.target.value)}
                        />
                      </div>
                    </div>

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
                            name="status"
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
                  </div>

                  {/* Description */}
                  <div className="col-12 mt-2">
                    <div className="input-box">
                      <h6>Description<span className="text-danger">*</span></h6>
                      <textarea
                        name="description"
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      {isLoading ? " Submit..." : " Submit"}
                    </button>
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

export default SubcategoryAddComponent;
