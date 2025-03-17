import React, { useState, useEffect } from 'react';
import { CImage } from '@coreui/react';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import ModalUserView from '../components/ModalUserView';
import { AppSidebar, AppHeader } from '../components'; 
import ModalEdit from './ModalEdit';
import ModalCreate from './ModalCreate';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserEdit, setSelectedUserEdit] = useState(null);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [modalVisibleCreate, setModalVisibleCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:9000/roomify-adminpanel/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/roomify-adminpanel/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreate = async (newUser) => {
    try {
      const response = await fetch('http://localhost:9000/roomify-adminpanel/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
        setModalVisibleCreate(false); // Hide the create modal
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEdit = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:9000/roomify-adminpanel/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
        setModalVisibleEdit(false); // Hide the edit modal
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const filteredItems = currentItems.filter(
    (item) =>
      item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.includes(searchQuery)
  );

  const handleItemsPerPageChange = (e) => {
    setCurrentPage(1);
    setItemsPerPage(Number(e.target.value));
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleEditClick = (user) => {
    setSelectedUserEdit(user);
    setModalVisibleEdit(true);
  };

  const buttonStyle = {
    fontSize : '11px',
    marginLeft : '10px',
    height : "40px"
}

  const renderTableRows = () => {
    return filteredItems.map((item) => (
      <tr key={item.id} className="text-sm align-middle">
        <td>{item.id}</td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.email}</td>
        <td>{item.mobile}</td>
        <td>
          <CImage src={item.profile} alt="Profile" width="50" height="50" className="rounded-circle" />
        </td>
        <td>
          <div className="btn-group">
            <button className="btn btn-sm" onClick={() => handleViewClick(item)}>
              <FaEye className="text-success" />
            </button>
            <button className="btn btn-sm" onClick={() => handleEditClick(item)}>
              <FaEdit className="text-primary" />
            </button>
            <button className="btn btn-sm" onClick={() => handleDelete(item.id)}>
              <FaTrash className="text-danger" />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <section className="w-100 p-3">
            <div className="d-flex justify-content-between mb-3">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <button style={buttonStyle} className="btn btn-primary" onClick={() => setModalVisibleCreate(true)}>
                <FaPlus /> Add Room
              </button>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Profile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <select
                  className="form-select form-select-sm"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={30}>30 per page</option>
                </select>
              </div>
              <div>
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ModalUserView user={selectedUser} visible={modalVisible} setVisible={setModalVisible} />
      <ModalEdit user={selectedUserEdit} visible={modalVisibleEdit} setVisible={setModalVisibleEdit} onSave={handleEdit} />
      <ModalCreate visible={modalVisibleCreate} setVisible={setModalVisibleCreate} onCreate={handleCreate} />
    </div>
  );
};

export default UserTable;