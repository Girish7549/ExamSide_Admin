import React, { useEffect, useState } from "react";
import ViewProductReview from "./ViewProductReview";
import { axiosClients } from "../../Apis/api";
import DeleteProductReview from "./DeleteProductReview";
import { formatDate } from '../../utils/formatDate';
import ViewUser from "../Users/ViewUser";
import DeleteUser from "../Users/DeleteUser";
import Loader from "../Loader";

function AllProductReview() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Toggle modal for viewing user
  const toggle = () => {
    setModal(!modal)
  }

  // Toggle modal for deleting user
  const deleteToggle = (user) => {
    setSelectedUser(user)
    setDeleteModal(!deleteModal)
  }

  // Fetch user data from API
  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/admin-users`)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleViewUser = (user) => {
    setSelectedUser(user)
    toggle()
  }

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = datas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(datas.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))


  // Separate modal toggle functions
  const toggleViewModal = () => setViewModal(!viewModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  // const handleViewReview = (review) => {
  //   setSelectedProductReview(review);
  //   setDeleteModal(false); // Ensure delete modal is closed
  //   toggleViewModal();
  // };

  // const handleDeleteReview = (review) => {
  //   setSelectedProductReview(review);
  //   setViewModal(false); // Ensure view modal is closed
  //   toggleDeleteModal();
  // };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Admin List</h5>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  currentUsers.length <= 0 ?
                    (<Loader />)
                    :
                    (
                      <table className="table category-table dataTable no-footer" id="table_id">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Profile</th>
                            <th>Admin Name</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Options</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUsers?.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                              <td><img src={data.profile_pic} style={{ borderRadius: '100%', width: '45px', height: '45px' }} /></td>
                              <td>
                                <div className="d-flex gap-1">
                                  <div className="user-name">
                                    <span>{data.first_name || 'N/A'}</span>
                                  </div>
                                  <div className="user-name">
                                    <span>{data.last_name}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{data.mobile_number || 'N/A'}</td>
                              <td>
                                <span
                                  className={`badge ${data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                                >
                                  {data.status}
                                </span>
                              </td>

                              <td>
                                <ul>
                                  <li onClick={() => handleViewUser(data)} style={{ cursor: 'pointer' }}>
                                    <a>
                                      <i className="ri-eye-line" />
                                    </a>
                                  </li>
                                  <li onClick={() => deleteToggle(data)} style={{ cursor: 'pointer' }}>
                                    <a>
                                      <i className="ri-delete-bin-line text-danger" />
                                    </a>
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

      {selectedUser && (
        <>
          <ViewUser modal={modal} toggle={toggle} data={selectedUser} />
          <DeleteUser modal={deleteModal} toggle={deleteToggle} data={selectedUser} fetchData={fetchData} type='admin' />
        </>
      )}
    </div>
  );
}

export default AllProductReview;
