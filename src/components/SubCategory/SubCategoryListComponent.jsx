import React, { useState, useEffect } from 'react'
import SubcategoryViewModal from './SubcategoryViewModal'
import { Link } from 'react-router-dom'
import DeleteSubcategoryModal from './DeleteSubcategoryModal'
import SubcategoryEditModal from './SubcategoryEditModal'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'
import Loader from '../Loader'

function SubCategoryListComponent() {
  const [datas, setData] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllSubcategory`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSubcategories = datas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(datas.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const handleModal = (category) => {
    setSelectedSubcategory(category)
    setModal(true)
  }

  const deleteToggle = (category) => {
    setSelectedSubcategory(category)
    setDeleteModal(true)
    fetchData()
  }

  const handleEditModal = (category) => {
    setSelectedSubcategory(category)
    setEditToggleModal(true)
    fetchData()
  }

  const handleCloseEditModal = () => {
    setEditToggleModal(false)
    fetchData()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Subcategory List</h5>

                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addsubcategory">
                        Add Subcategory
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  currentSubcategories.length <= 0 ?
                    (
                      <Loader></Loader>
                    ) :
                    (
                      <table className="table category-table dataTable no-footer" id="table_id">
                        <thead style={{ background: '#f5f5f5 !important' }}>
                          <tr>
                            <th style={{ width: '50px' }}>No.</th>
                            <th style={{ width: '150px' }}>Subcategory</th>
                            <th style={{ width: '150px' }}>Category Name</th>
                            <th style={{ width: '120px' }}>Created Date</th>
                            <th style={{ width: '120px' }}>Updated Date</th>
                            <th style={{ width: '80px' }}>Status</th>
                            <th style={{ width: '150px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentSubcategories.map((data, index) => (
                            <tr key={data.subcategory_id}>
                              <td>{index + 1 + (currentPage - 1) * itemsPerPage}.</td>
                              <td>{data.subcategory_name}</td>
                              <td>{data.category_name}</td>
                              <td>{formatDate(data.created_date)}</td>
                              <td>{formatDate(data.updated_date)}</td>
                              <td>
                                <span
                                  className={`badge ${data.status === 'active' ? 'bg-success' : 'bg-danger'
                                    }`}
                                >
                                  {data.status}
                                </span>
                              </td>
                              <td>
                                <ul>
                                  <li onClick={() => handleModal(data)}>
                                    <Link >
                                      <i className="ri-eye-line" />
                                    </Link>
                                  </li>
                                  <li onClick={() => handleEditModal(data)}>
                                    <Link>
                                      <i className="ri-edit-box-line" />
                                    </Link>
                                  </li>
                                  <li onClick={() => deleteToggle(data)}>
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

              {/* Pagination */}
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

      {selectedSubcategory && (
        <>
          <SubcategoryViewModal
            modal={modal}
            toggle={() => setModal(!modal)}
            data={selectedSubcategory}
          />
          <SubcategoryEditModal
            show={editToggleModal}
            handleClose={handleCloseEditModal}
            data={selectedSubcategory}
            onSave={fetchData}
          />
          <DeleteSubcategoryModal
            modal={deleteModal}
            toggle={() => setDeleteModal(!deleteModal)}
            data={selectedSubcategory}
            onSave={fetchData}
          />
        </>
      )}
    </div>
  )
}

export default SubCategoryListComponent
