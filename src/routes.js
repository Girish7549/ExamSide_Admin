import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Room = React.lazy(() => import('./Pages/Room'))
// const Profile = React.lazy(() => import('./Pages/Profile'))
const routes = [

  { path: '/', name: 'Dashboard', element: Dashboard },
  { path: '/add-room', name: 'Room', element: Room  },
  // { path: '/profile', name: 'Profile', element: Profile  },
  
]

export default routes