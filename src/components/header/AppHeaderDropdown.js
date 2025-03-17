import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPhone,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import Profile from '../../Pages/Profile';

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const authenticated = useSelector((state) => state.authenticated);
  const [profileVisible, setProfileVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    window.location.href = '/login'; // Redirect to login page
  };


  // const handleLogout = () => {
  //   // Dispatch the LOGOUT action to Redux store
  //   dispatch({ type: 'LOGOUT' });
  // };

  const user = JSON.parse(localStorage.getItem('user'));
  // console.log("user :", user)
  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={user.profile_pic} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Profile</CDropdownHeader>
          {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Profile
        </CDropdownItem> */}
          <CDropdownItem >
            {/* <CIcon icon={cilCreditCard} className="me-2" /> */}
            {user.first_name} {user.last_name}
            {/* <CBadge color="secondary" className="ms-2">
            42
          </CBadge> */}
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilPhone} className="me-2" /> 
            {user.phone}

          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem className='d-flex gap-2 align-items-center' onClick={handleLogout}>
            <RiLogoutCircleRLine className='m-0 p-0' style={{ cursor: 'pointer' }} />
            <p style={{ cursor: 'pointer' }}>Logout</p>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <Profile visible={profileVisible} onClose={() => setProfileVisible(!profileVisible)} />
    </>
  )
}

export default AppHeaderDropdown
