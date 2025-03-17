import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import ViewAdsBanner from './ViewAdsBanner'
import EditAdsBanner from './EditAdsBanner'
import DeleteAdsBanner from './DeleteAdsBanner'
import { axiosClients } from '../../Apis/api'
import Loader from '../Loader'

function AllAdsBanner() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedAdsBanner, setSelectedAdsBanner] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)
  const [zoomModal, setZoomModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllOptions`)
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
  const currentAdsBanner = datas.slice(indexOfFirstAd, indexOfLastAd)
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
  const deleteToggle = (adsbanner) => {
    setSelectedAdsBanner(adsbanner)
    setDeleteModal(!deleteModal)
  }

  const handleViewBanner = (adsbanner) => {
    setSelectedAdsBanner(adsbanner)
    toggleModal()
  }

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (adsbanner) => {
    setSelectedAdsBanner(adsbanner)
    editToggle()
  }

  const toggleZoomModal = () => {
    setZoomModal(!zoomModal)
  }

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const handleNextImage = () => {
    if (selectedImageIndex < selectedAdsBanner.image.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Options List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addadsbanner">
                        Add Option
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  currentAdsBanner.length <= 0 ?
                    (<Loader />)
                    :
                    (
                      <table className="table category-table dataTable no-footer" id="table_id">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Options Name</th>
                            <th>Questions Id</th>
                            <th>is_correct</th>
                            <th>status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentAdsBanner?.map((item, i) => (
                            <tr key={i}>
                              <td>{indexOfFirstAd + i + 1}</td>
                              <td>
                                {item.option_text}
                              </td>
                              <td>{item.questions_id}</td>
                              <td>{item.is_correct}</td>

                              <td>
                                <span
                                  className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <ul className="d-flex gap-3">
                                  <li onClick={() => handleViewBanner(item)}>
                                    <Link className="text-warning">
                                      <i className="ri-eye-line"></i>
                                    </Link>
                                  </li>
                                  <li onClick={() => handleEditModal(item)}>
                                    <Link>
                                      <i className="ri-edit-box-line text-success"></i>
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

      {selectedAdsBanner && (
        <>
          <ViewAdsBanner modal={modal} toggle={toggleModal} data={selectedAdsBanner} />
          <EditAdsBanner
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedAdsBanner}
            onSave={fetchData}
          />
          <DeleteAdsBanner
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedAdsBanner}
            onSave={fetchData}
          />
        </>
      )}

      {selectedAdsBanner && selectedImageIndex !== null && (
        <Modal isOpen={zoomModal} toggle={toggleZoomModal} centered>
          <ModalBody>
            <img
              src={selectedAdsBanner.image} // Display only the selected testimonial image
              alt="Zoomed"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleZoomModal}>
              Close
            </Button>
            <Button color="primary" onClick={handlePrevImage} disabled={selectedImageIndex === 0}>
              <i className="ri-arrow-left-line"></i> Prev
            </Button>
            <Button
              color="primary"
              onClick={handleNextImage}
              disabled={selectedImageIndex === selectedAdsBanner.image.length - 1}
            >
              Next <i className="ri-arrow-right-line"></i>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default AllAdsBanner