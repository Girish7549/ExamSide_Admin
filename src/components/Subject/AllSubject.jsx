import React, { useState, useEffect } from 'react'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'
import { Link } from 'react-router-dom'
import DeleteSubjectModal from './DeleteSubjectModal'
import EditSubjectModal from './EditSubjectModal'
import ViewSubjectModal from './ViewSubjectModal'
import Loader from '../Loader'

function AllSubject() {
  const [data, setData] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllSubjects')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const toggleEditModal = () => setEditToggleModal((prevState) => !prevState)

  const deleteToggle = (subject) => {
    setSelectedSubject(subject)
    setDeleteModal((prevState) => !prevState)
  }
  const toggle = () => setModal((prevState) => !prevState)

  const handleModal = (subject_id) => {
    setSelectedSubject(subject_id)
    toggle()
  }
  const handleEditModal = (subject_id) => {
    setSelectedSubject(subject_id)
    toggleEditModal()
  }



  // Pagination Logic
  const indexOfLastCategory = currentPage * itemsPerPage
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage
  const currentCategories = data.slice(indexOfFirstCategory, indexOfLastCategory)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title">
                <h5>Subject List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addsubject">
                        Add Subject
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive theme-scrollbar category-table" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  currentCategories.length <= 0 ?
                    (<Loader />)
                    :
                    (
                      <table className="table all-package theme-table dataTable no-footer">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Subject</th>
                            <th>Subcategory Name</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Status</th>
                            <th>Option</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentCategories.map((item, index) => {
                            return (
                              <tr key={item.subject_id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}.</td>
                                <td>{item.subject_name}</td>
                                <td>
                                  {item.subcategory_name}
                                </td>
                                <td>{formatDate(item.created_date)}</td>
                                <td>{formatDate(item.updated_date)}</td>
                                <td className="text-center">
                                  <span
                                    className={`badge ${item.status === 'active'
                                      ? 'bg-success' : item.status === 'inactive'
                                        ? 'bg-danger'
                                        : ''
                                      }`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <ul>
                                    <li onClick={() => handleModal(item)}>
                                      <Link>
                                        <i className="ri-eye-line" />
                                      </Link>
                                    </li>
                                    <li onClick={() => handleEditModal(item)}>
                                      <Link className='text-primary'>
                                        <i className="ri-edit-box-line" />
                                      </Link>
                                    </li>
                                    <li onClick={() => deleteToggle(item)}>
                                      <Link>
                                        <i className="ri-delete-bin-line" />
                                      </Link>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    )
                }

              </div>

              {/* Pagination Controls */}
              <nav aria-label="Page navigation">
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
                  {[...Array(totalPages)].map((_, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => handlePageSelect(idx + 1)}>
                        {idx + 1}
                      </button>
                    </li>
                  ))}
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
              </nav>
            </div>
          </div>
        </div>
      </div>

      {selectedSubject && (
        <>
          <ViewSubjectModal modal={modal} toggle={toggle} data={selectedSubject} onSave={fetchData} />
          <EditSubjectModal show={editToggleModal} handleClose={toggleEditModal} data={selectedSubject} onSave={fetchData} />
          <DeleteSubjectModal modal={deleteModal} toggle={deleteToggle} data={selectedSubject} onSave={fetchData} />
        </>
      )}
    </div>
  )
}

export default AllSubject
