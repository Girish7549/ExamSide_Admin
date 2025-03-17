import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosClients } from '../../Apis/api'

function AddUnit() {
  const [unitName, setUnitName] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [subjectData, setSubjectData] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
  const [loading, setLoading] = useState(false)


  const handleSubcategoryChange = (e) => {
    setSelectedSubcategoryId(e.target.value);
    setSubjectId('');
  };

  const selectedSubcategory = subjectData.find(
    (item) => item.subcategory_id === parseInt(selectedSubcategoryId)
  );


  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllSubjectsWithSubcategory');
      setSubjectData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosClients.post('/create/unit', {
        unitName,
        subjectId,
        description,
        status
      })
      toast.success('Unit created successfully.')
      // navigate('/unitlist')
    } catch (error) {
      toast.error('Error creating unit.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Unit</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">

                    {/* Unit Name & Select Subcategory in the same row */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Unit Name<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="text"
                          name="adName"
                          placeholder="Enter Unit Name"
                          onChange={(e) => setUnitName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="form-group">
                        <label htmlFor="subcategory">Select Subcategory</label>
                        <select
                          id="subcategory"
                          className="form-control"
                          required
                          value={selectedSubcategoryId}
                          onChange={handleSubcategoryChange}
                        >
                          <option value="" disabled>Select Subcategory</option>
                          {subjectData.map((subcategory) => (
                            <option
                              key={subcategory.subcategory_id}
                              value={subcategory.subcategory_id}
                            >
                              {subcategory.subcategory_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Select Subject & Select Status in the same row */}
                    <div className="col-xl-6">
                      {/* Select Subject (only show when a subcategory is selected) */}
                      {selectedSubcategory && (
                        <div className="form-group">
                          <label htmlFor="subject">Select Subject</label>
                          <select
                            id="subject"
                            className="form-control"
                            required
                            value={subjectId}
                            onChange={(e) => setSubjectId(e.target.value)}
                          >
                            <option value="" disabled>Select Subject</option>
                            {selectedSubcategory.subjects.map((subject) => (
                              <option key={subject.subject_id} value={subject.subject_id}>
                                {subject.subject_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Select Status<span className="text-danger">*</span>
                        </h6>
                        <select
                          name="status"
                          className="w-100"
                          onChange={(e) => setStatus(e.target.value)}
                          required
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Description<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="text"
                          name="discription"
                          placeholder="Enter Description"
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default AddUnit
