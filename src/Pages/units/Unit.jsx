import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllUnitTable from '../../components/units/AllUnitTable';
function HeaderAds() {
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <AllUnitTable />
          </div>
          <AppFooter />
        </div>

      </div>
    </>
  )
}

export default HeaderAds; 