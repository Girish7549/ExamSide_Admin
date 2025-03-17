import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosClients } from '../../Apis/api'
import ViewQuestion from './ViewQuestion'
import DeleteQuestion from './DeleteQuestion'
import EditQuestion from './EditQuestion'
import Loader from '../Loader'
import { Nav } from 'rsuite'


function AllQuestions() {
  const [datas, setData] = useState([])
  const [dataShift, setDataShift] = useState([])
  const [modal, setModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedShowcasebox, setSelectedShowcasebox] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)
  const [active, setActive] = React.useState('chapter');

  const fetchChapterData = async () => {
    try {
      const response = await axiosClients.get('/getAllQuestionsChapter')
      console.log("Response :", response)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const fetchShiftData = async () => {
    try {
      const response = await axiosClients.get('/getAllQuestionShift')
      console.log("Response :", response.data)
      setDataShift(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchChapterData()
    fetchShiftData()
  }, [])


  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage
  const indexOfFirstAd = indexOfLastAd - adsPerPage
  const currentBanner = (active === 'chapter' ? datas : dataShift).slice(indexOfFirstAd, indexOfLastAd)
  const totalPages = Math.ceil((active === 'chapter' ? datas : dataShift).length / adsPerPage)

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
  const deleteToggle = (banner) => {
    setSelectedShowcasebox(banner)
    setDeleteModal(!deleteModal)
  }

  const handleViewBanner = (banner) => {
    setSelectedShowcasebox(banner)
    toggleModal()
  }

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (ad) => {
    setSelectedShowcasebox(ad)
    editToggle()
  }

  const Navbar = ({ active, onSelect, ...props }) => {
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect}>
        <Nav.Item eventKey="chapter">Chapter Wise</Nav.Item>
        <Nav.Item eventKey="shift">Shift Wise</Nav.Item>
      </Nav>
    );
  };

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Questions List</h5>
                <Navbar appearance="pills" active={active} onSelect={setActive} />
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addquestion">
                        Add Question
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  currentBanner.length <= 0 ?
                    (<Loader />)
                    :
                    (
                      <table className="table category-table dataTable no-footer" id="table_id">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Questions Name</th>
                            <th>Shift</th>
                            <th>Topic Id</th>
                            <th>Difficulty</th>
                            <th>status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentBanner?.map((item, i) => (
                            <tr key={i}>
                              <td>{indexOfFirstAd + i + 1}.</td>
                              {/* <td dangerouslySetInnerHTML={{ __html: item.questions_name || 'N/A' }}></td> */}
                              <td dangerouslySetInnerHTML={{ __html: (item.questions_name?.slice(0, 60) || 'N/A') + (item.questions_name?.length > 50 ? "..." : "") }}></td>

                              <td>{item.shift || 'N/A'}</td>
                              <td>{item.topic_id || 'N/A'}</td>
                              <td>
                                <span
                                  className={`badge ${item.difficulty === 'easy'
                                    ? 'bg-success'
                                    : item.difficulty === 'medium'
                                      ? 'bg-warning'
                                      : item.difficulty === 'hard'
                                        ? 'bg-danger'
                                        : ''
                                    }`}
                                >
                                  {item.difficulty}
                                </span>
                              </td>
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

      {selectedShowcasebox && (
        <>
          <ViewQuestion modal={modal} toggle={toggleModal} data={selectedShowcasebox} />
          <EditQuestion
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedShowcasebox}
            onSave={fetchChapterData}
          />
          <DeleteQuestion
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedShowcasebox}
            onSave={fetchChapterData}
          />
        </>
      )}
    </div>
  )
}

export default AllQuestions
