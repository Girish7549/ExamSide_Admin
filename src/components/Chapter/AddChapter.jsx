import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosClients } from '../../Apis/api';
import { SelectPicker } from 'rsuite';

function AddTestimonial() {
  const [chapterName, setChapterName] = useState('');
  const [unitId, setUnitId] = useState('');
  const [year, setYear] = useState('');
  const [total, setTotal] = useState('');
  const [avg, setAvg] = useState('');
  const [weightageFirst, setWeightageFirst] = useState('');
  const [weightageSecond, setWeightageSecond] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [allData, setAllData] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedUnit, setSelectedUnit] = useState(null)

  const handleSubcategoryChange = (value) => {
    const subcategory = allData.find((item) => item.subcategory_id === value)
    // console.log("Value")
    setSelectedSubcategory(subcategory)
    setSelectedSubject(null)
    setSelectedUnit(null)
  }

  const handleSubjectChange = (value) => {
    // setSubjectId(value)
    const subject = selectedSubcategory?.subjects.find((item) => item.subject_id === value)
    setSelectedSubject(subject)
    setSelectedUnit(null)
  }

  const handleUnitChange = (value) => {
    const unit = selectedSubject?.units.find((item) => item.unit_id === value)
    setSelectedUnit(unit)
  }


  const fetchGetAllSubcategorySubjectUnit = async () => {
    try {
      const response = await axiosClients.get('/getAllSubcategorySubjectUnit')
      setAllData(response.data)
      console.log('Response :', response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchGetAllSubcategorySubjectUnit()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClients.post('create/chapter', {
        chapterName,
        unitId: selectedUnit.unit_id,
        year,
        total,
        avg,
        weightageFirst,
        weightageSecond,
        status
      });
      toast.success('Chapter created successfully.');
      // navigate('/allchapter');
    } catch (error) {
      toast.error('Error creating chapter.');
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
                <h5>Add Chapter</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Chapter Name<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setChapterName(e.target.value)}
                          placeholder="Enter Chapter Name"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="col-xl-6">
                      <div className="input-box">
                        <h6>unit Id<span className="text-danger">*</span></h6>
                        <input
                          type="number"
                          name="unitId"
                          value={unitId}
                          placeholder="Enter Unit Id"
                          onChange={(e) => setUnitId(e.target.value)}
                          required
                        />
                      </div>
                    </div> */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Sub Category</h6>
                        <SelectPicker
                          data={
                            allData
                              ? allData.map((item) => ({
                                label: item.subcategory_name,
                                value: item.subcategory_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleSubcategoryChange}
                          placeholder="Select Subcategory"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Subject</h6>
                        <SelectPicker
                          data={
                            selectedSubcategory
                              ? selectedSubcategory.subjects.map((item) => ({
                                label: item.subject_name,
                                value: item.subject_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleSubjectChange}
                          placeholder="Select Subject"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Unit</h6>
                        <SelectPicker
                          data={
                            selectedSubject
                              ? selectedSubject.units.map((item) => ({
                                label: item.unit_name,
                                value: item.unit_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleUnitChange}
                          placeholder="Select Unit"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Year<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="year"
                          placeholder="Enter Year"
                          onChange={(e) => setYear(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Total<span className="text-danger">*</span></h6>
                        <input
                          type="number"
                          name="total"
                          placeholder="Enter Total"
                          onChange={(e) => setTotal(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Avg<span className="text-danger">*</span></h6>
                        <input
                          type="number"
                          name="total"
                          placeholder="Enter Avgerage"
                          onChange={(e) => setAvg(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Weightage First<span className="text-danger">*</span></h6>
                        <input
                          type="number"
                          name="total"
                          placeholder="Enter Total"
                          onChange={(e) => setWeightageFirst(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Weightage Second<span className="text-danger">*</span></h6>
                        <input
                          type="number"
                          name="total"
                          placeholder="Enter Total"
                          onChange={(e) => setWeightageSecond(e.target.value)}
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

export default AddTestimonial;
