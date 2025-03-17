import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Input, SelectPicker, TagPicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { axiosClients } from '../../Apis/api'
import { FaCalendar, FaClock } from 'react-icons/fa'
import { BsCalendar2MonthFill } from 'react-icons/bs'
import { AppFooter, AppHeader, AppSidebar } from '../../components'
import { faL } from '@fortawesome/free-solid-svg-icons'

const AddShift = () => {
  const subjectData = ['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((item) => ({
    label: item,
    value: item,
  }))
  const languageData = ['English', 'Hindi'].map((item) => ({ label: item, value: item }))
  const statusData = ['Active', 'In Active'].map((item) => ({ label: item, value: item }))
  const dayData = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ].map((item) => ({ label: item, value: item }))
  const monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].map((item) => ({ label: item, value: item }))

  const [yearData, setYearData] = useState('')
  const [year, setYear] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [shiftName, setShiftName] = useState('')
  const [language, setLanguage] = useState([])
  const [subject, setSubject] = useState([])
  const [status, setStatus] = useState('Active')
  const [loading, setLoading] = useState(false)

  const handleDateChange = (date) => {
    const timing = `${date.toString().slice(0, 16)}${date.toLocaleTimeString()}`
    console.log('Final Timing :', timing)
    setSelectedDate(timing)
  }

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axiosClients.get('/years')
        setYearData(response.data)
        console.log('Years :', response.data)
        const years = response.data.map((item) => ({ label: item.year, value: item.year_id }))
        setYearData(years)
      } catch (error) {
        console.error('Error fetching years:', error)
      }
    }

    fetchYears()
  }, [])

  async function submitHandler(e) {
    setLoading(true)
    const data = {
      shift_name: shiftName,
      year_id: year,
      shift_date_time: selectedDate,
      status: status,
      languageJson: language
    }
    const response = await axiosClients.post('/shifts', data)
    setLoading(false)
  }

  console.log('Shift', shiftName)
  console.log('Year', year)
  console.log('time', selectedDate)
  console.log('language', language)
  console.log('Subject', subject)
  console.log('status', status)

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="container-fluid">
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Add Shift</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        {/* Shift Name */}
                        <div className="col-lg-12 col-md-6">
                          <div className="input-box">
                            <h6>Shift Name<span className="text-danger">*</span></h6>
                            <input
                              type="text"
                              name="name"
                              onChange={(e) => setShiftName(e.target.value)}
                              placeholder="Enter Shift Name"
                              required
                              className="form-control"
                            />
                          </div>
                        </div>

                        {/* Year */}
                        <div className="col-lg-6 col-md-6">
                          <div className="input-box">
                            <h6>Year<span className="text-danger">*</span></h6>
                            <SelectPicker
                              data={yearData ? yearData : []}
                              style={{ width: "100%" }}
                              placeholder="Select Year"
                              onChange={(value) => setYear(value)}
                            />
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-lg-6 col-md-6">
                          <div className="input-box">
                            <h6>Status<span className="text-danger">*</span></h6>
                            <SelectPicker
                              data={statusData}
                              style={{ width: "100%" }}
                              placeholder="Select Status"
                              onChange={(value) => setStatus(value)}
                            />
                          </div>
                        </div>

                        {/* Timing */}
                        <div className="col-lg-6 col-md-6">
                          <div className="input-box">
                            <h6>Timing<span className="text-danger">*</span></h6>
                            <div className="d-flex flex-nowrap">
                              <DatePicker
                                format="EEEE, dd MMM hh:mm:ss aa"
                                showMeridiem
                                caretAs={FaCalendar}
                                style={{ width: "100%" }}
                                placeholder="Mon, 28 Oct hh:mm:ss aa"
                                onChange={handleDateChange}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Language */}
                        <div className="col-lg-6 col-md-6">
                          <div className="input-box">
                            <h6>Language<span className="text-danger">*</span></h6>
                            <TagPicker
                              data={languageData}
                              style={{ width: "100%" }}
                              placeholder={`  ..... Select Language`}
                              onChange={(value) => setLanguage(value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="mb-3 d-flex justify-content-end">
                    {/* <Button>Hello World</Button> */}
                    <button type="submit" className="btn btn-primary">
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AddShift
