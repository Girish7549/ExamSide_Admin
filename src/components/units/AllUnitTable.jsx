import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditHeaderAds from './EditUnit'
import DeleteHeaderAds from './DeleteHeaderAds'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'
import ShowUnit from './ShowUnit'
import Loader from '../Loader'

function AllUnitTable() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllUnits`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage
  const indexOfFirstAd = indexOfLastAd - adsPerPage
  const currentAds = datas.slice(indexOfFirstAd, indexOfLastAd)
  const totalPages = Math.ceil(datas.length / adsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageSelect = (page) => setCurrentPage(page)
  const toggleModal = () => setModal(!modal)
  const deleteToggle = (unit) => {
    setSelectedUnit(unit)
    setDeleteModal(!deleteModal)
    fetchData()
  }

  const handleViewUnit = (unit) => {
    setSelectedUnit(unit)
    toggleModal()
  }

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (unit) => {
    setSelectedUnit(unit)
    fetchData()
    editToggle()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Unit List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addunit">
                        Add Unit
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  currentAds.length <= 0 ?
                    (<Loader />)
                    :
                    (
                      <table className="table category-table dataTable no-footer" id="table_id">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Units</th>
                            <th>Subject Name</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Status</th>
                            <th>Options</th>

                          </tr>
                        </thead>
                        <tbody>
                          {currentAds.map((item, i) => (
                            <tr key={i}>
                              <td>{indexOfFirstAd + i + 1}.</td>
                              <td>
                                {item.unit_name}
                              </td>
                              <td>
                                {item.subject_name}
                              </td>
                              <td>{formatDate(item.created_date)}</td>
                              <td>{formatDate(item.updated_date)}</td>
                              <td>
                                <span
                                  className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <ul className="d-flex gap-3">
                                  <li onClick={() => handleViewUnit(item)}>
                                    <Link className="text-warning">
                                      <i className="ri-eye-line"></i>
                                    </Link>
                                  </li>
                                  <li onClick={() => handleEditModal(item)}>
                                    <Link>
                                      <i className="ri-edit-box-line"></i>
                                    </Link>
                                  </li>
                                  <li onClick={() => deleteToggle(item)}>
                                    <Link>
                                      <i className="ri-delete-bin-line text-danger"></i>
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
              </nav>
            </div>
          </div>
        </div>
      </div>
      {selectedUnit && (
        <>
          <ShowUnit modal={modal} toggle={toggleModal} data={selectedUnit} />
          <EditHeaderAds
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedUnit}
            onSave={fetchData}
          />
          <DeleteHeaderAds
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedUnit}
            onSave={fetchData}
          />
        </>
      )}
    </div>
  )
}

export default AllUnitTable
