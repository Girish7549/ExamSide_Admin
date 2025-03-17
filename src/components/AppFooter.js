import React from 'react'
import { CFooter } from '@coreui/react'
import { Link } from 'react-router-dom'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <Link to="/"  rel="noopener noreferrer">
        Adzdrio
        </Link>
        <span className="ms-1">&copy; 2025</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <Link to="/"  rel="noopener noreferrer">
        Adzdrio India Services
        </Link>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
