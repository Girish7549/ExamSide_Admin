import React, { useEffect, useState } from 'react'
import { Modal, ButtonToolbar, Button, Placeholder, SelectPicker, DatePicker, TagPicker } from 'rsuite';
import CategoryListComponent from '../../components/Category/CategoryListComponent'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import { Link } from 'react-router-dom';
import { axiosClients } from '../../Apis/api';
import { toast } from 'react-toastify';
import { FaCalendar } from 'react-icons/fa';
import Loader from '../../components/Loader';

const Shifts = () => {
  const [shifts, setShifts] = useState([])
  const [years, setYears] = useState([])
  const [selectedShift, setSelectedShift] = useState(null)
  const [loading, setLoading] = useState(false)

  const statusData = ['Active', 'Inactive'].map((item) => ({ label: item, value: item }))
  const languageData = ['English', 'Hindi'].map((item) => ({ label: item, value: item }))



  const [formData, setFormData] = useState({
    shift_name: '',
    year_id: '',
    shift_date_time: '',
    status: '',
    languageJson: []
  })
  console.log("Form Data :", formData)
  const [open, setOpen] = useState(false);

  const handleOpen = (shift_Data) => {
    console.log("Selected Shift :", shift_Data)
    setOpen(true);
    setSelectedShift(shift_Data)
  }
  const handleClose = () => {
    setOpen(false)
    setOpenEdit(false)
    setOpenDelete(false)
  };

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleEditModal = (shift_Data) => {
    console.log("Selected Shift :", shift_Data)
    setSelectedShift(shift_Data)
    setOpenEdit(true);
  }
  const handleDeleteModal = (shift_Data) => {
    console.log("Selected Shift :", shift_Data)
    setSelectedShift(shift_Data)
    setOpenDelete(true);
  }




  async function fetchShift() {
    try {
      const response = await axiosClients.get("/shifts");
      console.log("shifts :", response.data);
      if (years.length === 0) {
        console.warn("Years data is not loaded yet.");
        return;
      }

      const shiftMapped = response.data.map(item => ({
        ...item,
        year: years.find(year => year.value == item.year_id)?.label || "YYYY",
      }));
      console.log('Years', years)
      console.log("mapped ", shiftMapped)
      setShifts(shiftMapped);

    } catch (error) {
      console.error("Error fetching shifts:", error);
      toast.error("Error fetching shifts!", { position: "top-right" });
    }
  }
  async function fetchYears() {
    try {
      const response = await axiosClients.get("/years");
      console.log("years :", response.data);
      const years = response.data.map((item) => ({
        label: item.year,
        value: item.year_id,
      }));
      setYears(years);
    } catch (error) {
      console.error("Error fetching years:", error);
      toast.error("Error fetching years!", { position: "top-right" });
    }
  }
  useEffect(() => {
    fetchYears();
  }, [])
  useEffect(() => {
    if (years.length > 0) {
      fetchShift();
    }
  }, [years]);


  async function handleDelete(e) {
    e.preventDefault(); // Prevent form from reloading

    if (!selectedShift || !selectedShift.shift_id) {
      console.error("No shift selected!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosClients.delete(`/shifts/${selectedShift?.shift_id}`);

      if (response.status === 200) {
        toast.success("Shift Delete successfully!", { position: "top-right" });
        fetchYears()
      } else {
        toast.error("Something went wrong!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error delete shift:", error);
      toast.error("Failed to delete shift!", { position: "top-right" });
    } finally {
      setLoading(false);
      setOpenDelete(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent form from reloading

    if (!selectedShift || !selectedShift.shift_id) {
      console.error("No shift selected!");
      return;
    }

    setLoading(true);

    try {
      console.log("Updating shift ID:", selectedShift.shift_id);

      const response = await axiosClients.put(`/shifts/${selectedShift?.shift_id}`, formData);

      if (response.status === 200) {
        toast.success("Shift updated successfully!", { position: "top-right" });
      } else {
        toast.error("Something went wrong!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error updating shift:", error);
      toast.error("Failed to update shift!", { position: "top-right" });
    } finally {
      setLoading(false);
      setOpenDelete(false)
      fetchYears()
      setOpenEdit(false)
    }
  }


  return (
    <div>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card card-table">
                    <div className="card-body">
                      <div className="title-header option-title d-sm-flex d-block">
                        <h4>Shifts List</h4>
                        <div className="right-options">
                          <ul>
                            <li>
                              <Link className="btn btn-dashed" to="/add-shift">
                                Add Shift
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}> 
                        {
                          shifts.length <= 0 ?
                            (<Loader />)
                            :
                            (
                              <table className="table category-table dataTable no-footer" id="table_id">
                                <thead style={{ background: '#f5f5f5 !important' }}>
                                  <tr>
                                    <th>No.</th>
                                    <th>Year</th>
                                    <th>Shift Name</th>
                                    <th>Language</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {shifts?.map((data, index) => (
                                    <tr key={data.shift_id}>
                                      <td>{index + 1}.</td>
                                      <td>{data.year}</td>
                                      <td>{`${data.shift_name.slice(0, 40)}...`}</td>
                                      <td>{data.language.map(item => (`${item} `))}</td>
                                      <td>{data.shift_date_time}</td>
                                      <td>
                                        <span
                                          className={`badge ${data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                                        >
                                          {data.status}
                                        </span>
                                      </td>
                                      <td>
                                        <ul>
                                          <li onClick={() => handleOpen(data)}>
                                            <Link>
                                              <i className="ri-eye-line" />
                                            </Link>
                                          </li>
                                          <li onClick={() => handleEditModal(data)}>
                                            <Link>
                                              <i className="ri-edit-box-line" />
                                            </Link>
                                          </li>
                                          <li onClick={() => handleDeleteModal(data)}>
                                            <Link>
                                              <i className="ri-delete-bin-line" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )
                        }

                      </div>

                      {/* Pagination Controls */}
                      {/* <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end mt-4">
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={handlePrevPage}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          {[...Array(totalPages)].map((_, idx) => {
                            if (idx < 6) {
                              return (
                                <li
                                  key={idx}
                                  className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                                >
                                  <button className="page-link" onClick={() => handlePageSelect(idx + 1)}>
                                    {idx + 1}
                                  </button>
                                </li>
                              )
                            }
                            if (idx === 6) {
                              return (
                                <li key={idx} className="page-item">
                                  <span className="page-link">+</span>
                                </li>
                              )
                            }
                            return null // Don't render anything beyond the 6th page
                          })}
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav> */}

                    </div>
                  </div>
                </div>
              </div>


              {/* View Shift Rsuite Modal */}
              <Modal size="md" open={open} onClose={handleClose} className="custom-modal" >
                <Modal.Header>
                  <Modal.Title style={{ fontSize: '22px', color: '#5c5a5a', fontWeight: '600' }}>Shift Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflow: 'hidden' }}>
                  {selectedShift ? (
                    <div className="card p-2 shadow-sm">
                      <h6 className="text-center fw-bold mb-2">{selectedShift?.shift_name}</h6>
                      <hr className="my-2" />
                      <table className="table table-bordered table-sm custom-table">
                        <tbody>
                          <tr>
                            <th className="small-cell">Year</th>
                            <td className="small-cell">{selectedShift?.year}</td>
                          </tr>
                          <tr>
                            <th className="small-cell">Shift Date & Time</th>
                            <td className="small-cell">{selectedShift?.shift_date_time}</td>
                          </tr>
                          <tr>
                            <th className="small-cell">Status</th>
                            <td className="small-cell">
                              <span className={`fw-bold text-${selectedShift?.status === "active" ? "success" : "danger"}`}>
                                {selectedShift?.status}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th className="small-cell">Languages</th>
                            <td className="small-cell">{selectedShift?.language?.join(", ")}</td>
                          </tr>
                          <tr>
                            <th className="small-cell">Created At</th>
                            <td className="small-cell">{new Date(selectedShift?.created_at).toLocaleString()}</td>
                          </tr>
                          <tr>
                            <th className="small-cell">Updated At</th>
                            <td className="small-cell">{new Date(selectedShift?.updated_at).toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center text-muted fst-italic">Loading shift details...</p>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button onClick={handleClose} appearance="subtle">Close</Button> */}
                  <Button onClick={handleClose} appearance="primary" >Close</Button>
                </Modal.Footer>
              </Modal>

              {/*  Edit Shift Rsuite Modal */}
              <Modal size="md" open={openEdit} onClose={handleClose} className="custom-modal">
                <Modal.Header>
                  <Modal.Title style={{ fontSize: '22px', color: '#5c5a5a', fontWeight: '600' }}>
                    Edit Shift Details
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ overflow: 'hidden' }}>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Shift Name</label>
                      <input type="text" className="form-control" placeholder="Enter Shift Name" required onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          shift_name: e.target.value
                        }))
                      } />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Year</label><br></br>
                        <SelectPicker
                          data={years ? years : []}
                          style={{ width: 224 }}
                          placeholder="Select Year"
                          onChange={(value) =>
                            setFormData(prev => ({
                              ...prev,
                              year_id: value
                            }))
                          }
                        />

                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Time</label><br />
                        <DatePicker
                          format="EEEE, dd MMM hh:mm:ss aa"
                          showMeridiem
                          caretAs={FaCalendar}
                          style={{ width: 320 }}
                          placeholder="Mon, 28 Oct hh:mm:ss aa"
                          onChange={(value) =>
                            setFormData(prev => ({
                              ...prev,
                              shift_date_time: `${value.toString().slice(0, 16)}${value.toLocaleTimeString()}`
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label><br />
                        <SelectPicker
                          data={statusData}
                          searchable={false}
                          style={{ width: 224 }}
                          placeholder="Select without search"
                          onChange={(value) =>
                            setFormData(prev => ({
                              ...prev,
                              status: value
                            }))
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Language</label>
                        <TagPicker
                          data={languageData}
                          style={{ width: 310 }}
                          placeholder="Select Language"
                          onChange={(value) =>
                            setFormData(prev => ({
                              ...prev,
                              languageJson: value
                            }))
                          }
                        />
                      </div>
                    </div>
                  </form>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={handleClose} appearance="subtle">Cancel</Button>
                  <Button onClick={handleSubmit} appearance="primary">{loading ? 'Submitting...' : 'Save Changes'}</Button>
                </Modal.Footer>
              </Modal>

              {/*  Delete Shift Rsuite Modal */}
              <Modal open={openDelete} onClose={handleClose}>
                <Modal.Header>
                  <Modal.Title style={{ color: 'red' }}>Delete Shift</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this shift?
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleDelete} appearance="primary">
                    Delete
                  </Button>
                  <Button onClick={handleClose} appearance="subtle">
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>
          </div>
          <AppFooter />
        </div>

      </div>
    </div>
  )
}

export default Shifts
