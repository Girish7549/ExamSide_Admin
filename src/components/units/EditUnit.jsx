import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { axiosClients } from '../../Apis/api'
import toast from 'react-hot-toast'

function EditUnit({ modal, toggle, data, onSave }) {
  const [unitName, setUnitName] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [status, setStatus] = useState('');
  const [subjectData, setSubjectData] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  console.log("data parent :", data)
  const handleSubcategoryChange = (e) => {
    console.log("Value :", e)
    console.log("Value :", e.target.value)
    setSelectedSubcategoryId(e.target.value);
    setSubjectId('');
  };

  useEffect(() => {
    setSelectedSubcategoryId(data.subcategory_id)
    setSubjectId(data.subject_id)
  }, [data])

  const selectedSubcategory = subjectData.find(
    (item) => item.subcategory_id === parseInt(selectedSubcategoryId)
  );

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


  useEffect(() => {
    if (data) {
      setUnitName(data.unit_name || '');
      setDescription(data.description || '');
      setStatus(data.status || '');
      setSubjectId(data.subject_id || '');
    }
  }, [data]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosClients.put(`/updateUnitById/${data.unit_id}`, {
        unitName,
        description,
        status,
        subjectId,
        // selectedSubcategoryId
      })
      setLoading(false)
      toast.success('Unit Update successfully.')
      onSave()
      toggle()
    } catch (error) {
      console.error('Error updating unit:', error)
      setLoading(false)
    }
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Unit</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Unit Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Unit Name</h6>
                            <input
                              type="text"
                              name="unitName"
                              value={unitName}
                              onChange={(e) => setUnitName(e.target.value)}
                              className="form-control"
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
                                defaultValue={data.subject_name}
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
                            <h6>Status</h6>
                            <select
                              name="status"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-control"
                              required
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-box">
                            <h6>Description</h6>
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
                <Button className="btn btn-primary" type="submit">
                  {loading ?
                    (<div class="spinner-border" role="status">
                      <span class="sr-only"></span>
                    </div>)
                    : 'Save Changes'}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditUnit
