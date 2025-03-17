import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ViewModalCategory from './ViewModalCategory'
import CategoryEditModal from './CategoryEditModal'
import DeleteCategoryModal from './DeleteCategoryModal'
import { Modal } from 'react-bootstrap'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'
// import { Loader } from 'rsuite'
import Loader from '../../components/Loader'

function CategoryListComponent() {
  const [datas, setData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [zoomModal, setZoomModal] = useState(false)
  const [zoomedImageUrl, setZoomedImageUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllCategories`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleEditModal = () => setEditToggleModal((prevState) => !prevState)
  const deleteToggle = (category) => {
    setSelectedCategory(category)
    setDeleteModal((prevState) => !prevState)
  }
  const toggle = () => setModal((prevState) => !prevState)
  const handleModal = (category) => {
    setSelectedCategory(category)
    toggle()
  }
  const handleEditModal = (category) => {
    setSelectedCategory(category)
    toggleEditModal()
  }
  const openZoomModal = (imageUrl) => {
    setZoomedImageUrl(imageUrl)
    setZoomModal(true)
  }

  // Pagination Logic
  const indexOfLastCategory = currentPage * itemsPerPage
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage
  const currentCategories = datas.slice(indexOfFirstCategory, indexOfLastCategory)
  const totalPages = Math.ceil(datas.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Category List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addcategory">
                        Add Category
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                {
                  currentCategories.length <= 0 ?
                    (
                      <Loader/>
                    ) :
                    (
                      <table className="table category-table dataTable no-footer" id="table_id">
                        <thead style={{ background: '#f5f5f5 !important' }}>
                          <tr>
                            <th>No.</th>
                            <th>Category Name</th>
                            <th>Created Date</th>
                            <th>Updated Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentCategories?.map((data, index) => (
                            <tr key={data.category_id}>
                              <td>{index + 1 + (currentPage - 1) * itemsPerPage}.</td>
                              <td>{data.category_name}</td>
                              <td>{formatDate(data.created_at)}</td>
                              <td>{formatDate(data.updated_at)}</td>
                              <td>
                                <span
                                  className={`badge ${data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                                >
                                  {data.status}
                                </span>
                              </td>
                              <td>
                                <ul>
                                  <li onClick={() => handleModal(data)}>
                                    <Link>
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

      {selectedCategory && (
        <>
          <ViewModalCategory modal={modal} toggle={toggle} data={selectedCategory} />
          <CategoryEditModal
            show={editToggleModal}
            handleClose={toggleEditModal}
            data={selectedCategory}
            onSave={fetchData}
          />
          <DeleteCategoryModal
            modal={deleteModal}
            toggle={deleteToggle}
            onSave={fetchData}
            data={selectedCategory}
          />
        </>
      )}

      {/* Bootstrap Modal for Image Zoom */}
      <Modal show={zoomModal} onHide={() => setZoomModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Category Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={zoomedImageUrl} alt="Zoomed" className="img-fluid" />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CategoryListComponent
