import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllQuestions from '../../components/Questions/AllQuestions';

function ShowQuestions() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllQuestions/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default ShowQuestions;