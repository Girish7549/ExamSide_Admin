import React, { useEffect, useState } from 'react';
import { axiosClients } from '../../Apis/api';
import { Link } from 'react-router-dom';
import ShowTopic from './ShowTopic';
import EditTopic from './EditTopic';
import DeleteTopic from './DeleteTopic';

function AllTopic() {
  const [datas, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editToggleModal, setEditToggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllTopics`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentBanner = datas.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(datas.length / adsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSelect = (page) => setCurrentPage(page);
  const toggleModal = () => setModal(!modal);

  const deleteToggle = (topic) => {
    setSelectedTopic(topic);
    setDeleteModal(!deleteModal);
  };

  const handleViewTopic = (topic) => {
    setSelectedTopic(topic);
    toggleModal();
  };

  const editToggle = () => setEditToggleModal(!editToggleModal);
  const handleEditModal = (topic) => {
    setSelectedTopic(topic);
    editToggle();
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Topic List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addtopic">
                        Add Topic
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Topic</th>
                      <th>Chapter Id</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBanner?.map((item, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}.</td>
                        <td>
                          {item.topic_name || 'N/A'}
                        </td>
                        <td>{item.chapter_id || 'N/A'}</td>
                        <td>
                          <span className={`badge ${item.status === "active" ? "bg-success" : "bg-danger"}`}>{item.status || 'N/A'}</span>
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewTopic(item)}>
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

      {selectedTopic && (
        <>
          <ShowTopic modal={modal} toggle={toggleModal} data={selectedTopic} />
          <EditTopic modal={editToggleModal} toggle={editToggle} data={selectedTopic} onSave={fetchData} />
          <DeleteTopic modal={deleteModal} toggle={deleteToggle} data={selectedTopic} onSave={fetchData} />
        </>
      )}
    </div>
  );
}

export default AllTopic;