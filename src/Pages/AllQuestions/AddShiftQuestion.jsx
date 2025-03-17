import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AddQuestion from '../../components/Questions/AddQuestion';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosClients } from '../../Apis/api'
import JoditEditor from 'jodit-react'
import { SelectPicker, TagPicker, Toggle } from 'rsuite'


function AddShowcasebox() {
    const editor = useRef(null)
    const [allData, setAllData] = useState(null)
    const [questionsName, setQuestionsName] = useState('')
    const [shift, setShift] = useState('')
    const [shiftId, setShiftId] = useState('')
    const [topicId, setTopicId] = useState('')
    const [status, setStatus] = useState('active')
    const [difficulty, setDifficulty] = useState('')
    const [explanation, setExplanation] = useState('')
    const [chapterId, setChapterId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  
    const questionTypeData = ['MCQ (Single Correct Answer)', 'Numerical', 'MCQ (Multiple Correct Answer)'].map((item, index) => ({
      label: item,
      value: index + 1,
    }))
    const optionData = [{ title: 'True', value: 1 }, { title: 'False', value: 0 }].map((item) => ({
      label: item.title,
      value: item.value,
    }))
  
    const [questionType, setQuestionType] = useState(1)
  
    const [selectedSubcategory, setSelectedSubcategory] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [selectedYear, setSelectedYear] = useState(null)
    const [selectedShift, setSelectedShift] = useState(null)
  
    const handleSubcategoryChange = (value) => {
      console.log("Value",value)
      const subcategory = allData.find((item) => item.subcategory_id === value)
      console.log("Value",subcategory)
      setSelectedSubcategory(subcategory)
      setSelectedYear(null)
      setSelectedShift(null)
      setSelectedSubject(null)
    }


    const handleYearChange = (value) => {
      const year = selectedSubcategory?.years.find((item) => item.year_id === value)
      setSelectedYear(year)
      setSelectedShift(null)
    }
    
    const handleShiftChange = (value) => {
      setShiftId(value)
      console.log("Year data :",selectedYear)
      const shift = selectedYear?.shifts.find((item) => item.shift_id === value)
      setSelectedShift(shift)
    }

    const handleSubjectChange = (value) => {
      setSubjectId(value)
    }
  
    const handleUnitChange = (value) => {
      const unit = selectedSubject?.units.find((item) => item.unit_id === value)
      setSelectedUnit(unit)
    }
  
    const fetchAllSubcatgorySubjectUnitChapter = async () => {
      try {
        const response = await axiosClients.get('/getAllSubcategoryYearShift/ShiftSubject')
        setAllData(response.data)
        console.log('Response :', response.data)
        const cricketData = await fetch('https://api.msn.com/sports/statistics?apikey=kO1dI4ptCTTylLkPL1ZTHYP8JhLKb8mRDoA5yotmNJ&version=1.0&cm=en-in&activityId=2D911817-2DE8-4DA2-A531-C366C63C0F92&ocid=sports-gamecenter&it=web&user=m-228253BC5C3D657A327946245DCF64AD&scn=ANON&ids=SportzInteractive_Cricket_ICC_2025_Game_255197&type=Game&scope=Playergame&sport=Cricket&leagueid=Cricket_ICC')
        const resCricket = await cricketData.json()
        console.log('Free Cricket Data API :',resCricket)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    useEffect(() => {
      fetchAllSubcatgorySubjectUnitChapter()
    }, [])
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
  
      try {
        const response = await axiosClients.post('/create/Question', {
          questionsName,
          shift,
          topicId,
          difficulty,
          status,
          explanation,
          chapterId,
        })
        toast.success('Question created successfully.')
        navigate('/allquestions')
      } catch (error) {
        toast.error('Error creating Question.')
      } finally {
        setLoading(false)
      }
    }
  
    const [numericalAnswer, setNumericalAnswer] = useState('')
  
    const numericalHandler = (e) => {
      setNumericalAnswer(e.target.value)
    }
  
    const [options, setOptions] = useState([
      { title: "", isCorrect: false },
      { title: "", isCorrect: false },
      { title: "", isCorrect: false },
      { title: "", isCorrect: false },
    ]);
  
    // Handle text input change
    const handleInputChange = (index, value) => {
      const updatedOptions = [...options];
      updatedOptions[index].title = value;
      setOptions(updatedOptions);
    };
  
    // Handle toggle change
    const handleToggleChange = (index) => {
      const updatedOptions = [...options];
  
      if (questionType === 1) {
        // Ensure only one option is selected at a time
        updatedOptions.forEach((opt, i) => {
          opt.isCorrect = i === index;
        });
      } else if (questionType === 3) {
        // Allow multiple selections
        updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect;
      }
  
      setOptions(updatedOptions);
    };
  
    useEffect(() => {
      setOptions((prevOptions) =>
        prevOptions.map((option) => ({
          ...option,
          title: "", // Clear input fields
          isCorrect: false, // Reset toggle values
        }))
      );
    }, [questionType]);
    console.log("Options :", options)
    console.log("Numerical :", numericalAnswer)
  
  
    const submitHandler = async (e) => {
      e.preventDefault()
      setLoading(true)
      if(questionType === 1 || 3) {
        if(selectedSubcategory === null && shiftSubjectsId == '' && selectedUnit === null && options[0].title === '' && options[1].title === '' && options[2].title === '' && options[3].title === '') {
          setLoading(false)
          toast.error('Required Value Not Filled.')
          return
        }
      }
      if(questionType === 2) {
        if(numericalAnswer === '') {
          setLoading(false)
          toast.error('Required Value Not Filled.')
          return
        }
      }
      try {
        const response = await axiosClients.post('/create/Question', {
          questionsName: questionsName,
          status: status,
          shiftId: shiftId,
          explanation: explanation,
          shiftSubjectsId: subjectId,
          questionTypeId: questionType
        })
        // toast.success('Question created successfully.')
        // console.log("Question created successfully.",response.data);
  
        if (response.data && response.data.id) {
          const questionId = response.data.id;
          toast.success("Question created successfully.");
          // console.log("Question created successfully.",response.data.questionId);
  
          await createOptions(questionId);
        }
      } catch (error) {
        toast.error('Error creating Question.')
      } finally {
        setLoading(false)
      }
    }
    const createOptions = async (questionId) => {
      try {
        console.log("Option start posting")
        const question_type =  questionType === 1 || questionType === 3 ? options : [numericalAnswer]
        // const filteredOptions = options.filter((opt) => opt.title.trim() !== "");
        console.log('question_type',question_type)
        
        const optionRequests = question_type.map( option =>
          axiosClients.post("/createOption", {
            question_id: questionId,
            option_text: questionType === 2 ? option : option.title,
            is_correct: questionType === 2 ? true : option.isCorrect,
          })
        );
  
        await Promise.all(optionRequests);
        toast.success("Options added successfully.");
      } catch (error) {
        toast.error("Error creating options.");
        console.error("Error:", error);
      }
    };
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Shift Question</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="">
                      <div className="input-box">
                        <h6>
                          Add Question<span className="text-danger">*</span>
                        </h6>
                        <JoditEditor
                          ref={editor}
                          value={questionsName}
                          tabIndex={1} // tabIndex of textarea
                          onChange={(newContent) => setQuestionsName(newContent)} // preferred to use only this option to update the content for performance reasons
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Question Type<span className="text-danger">*</span>
                        </h6>
                        <SelectPicker
                          data={questionTypeData}
                          defaultValue={questionType}
                          style={{ width: '100%' }}
                          placeholder="Select Question Type"
                          onChange={(value) => setQuestionType(value)}
                          searchable={false}
                        />
                       
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Sub Category</h6>
                        <SelectPicker
                          data={
                            allData
                              ? allData.map((item) => ({
                                label: item.subcategory_name,
                                value: item.subcategory_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleSubcategoryChange}
                          placeholder="Select Subcategory"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Year</h6>
                        <SelectPicker
                          data={
                            selectedSubcategory
                              ? selectedSubcategory.years.map((item) => ({
                                label: item.year,
                                value: item.year_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleYearChange}
                          placeholder="Select Subject"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Shift</h6>
                        <SelectPicker
                          data={
                            selectedYear
                              ? selectedYear.shifts.map((item) => ({
                                label: item.shift_name,
                                value: item.shift_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleShiftChange}
                          placeholder="Select Subject"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Subject</h6>
                        <SelectPicker
                          data={
                            selectedShift
                              ? selectedShift.shift_subjects.map((item) => ({
                                label: item.shift_subjects_name,
                                value: item.shift_subjects_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleSubjectChange}
                          placeholder="Select Unit"
                        />
                      </div>
                    </div>
                    {/* <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Chapter</h6>
                        <SelectPicker
                          // data={
                          //   selectedUnit
                          //     ? selectedUnit.chapters.map((item) => ({
                          //       label: item.chapter_name,
                          //       value: item.chapter_id,
                          //     }))
                          //     : []
                          // }
                          searchable={true}
                          style={{ width: '100%' }}
                          placeholder="Select Chapter"
                          onChange={value => setChapterId(value)}
                        />
                      </div>
                    </div> */}

                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Status<span className="text-danger">*</span>
                        </h6>
                        <div>
                          <select
                            className="w-100"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                          >
                            <option value="" disabled>
                              Select Status
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      {
                        questionType !== 2 && (
                          <div>
                            <h6>
                              {questionType === 1
                                ? "Add Options MCQ (Single Correct Answer)"
                                : "Add Options MCQ (Multiple Correct Answer)"}{" "}
                              <span className="text-danger">*</span>
                            </h6>

                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              {options.map((option, index) => (
                                <div
                                  key={index}
                                  className="input-box"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "50%",
                                    padding: "6px",
                                    gap: "4px",
                                  }}
                                >
                                  <input
                                    type="text"
                                    required
                                    placeholder={`Option ${index + 1}`}
                                    value={option.title}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                  />
                                  <Toggle
                                    size="lg"
                                    color="green"
                                    checked={option.isCorrect}
                                    onChange={() => handleToggleChange(index)}
                                  />
                                </div>
                              ))}
                            </div>

                           
                          </div>
                        )
                      }
                      
                      {
                        questionType == 2 && (
                          <div>
                            <h6>
                              Add Numerical Answer<span className="text-danger">*</span>
                            </h6>
                            <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                              <input type='text' required placeholder='Correct Answer' onChange={numericalHandler} />
                            </div>
                          </div>
                        )
                      }
                      
                    </div>
                    <div className="input-box">
                      <h6>
                        Add Explanation<span className="text-danger">*</span>
                      </h6>
                      <JoditEditor
                        ref={editor}
                        value={explanation}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(newContent) => setExplanation(newContent)} // preferred to use only this option to update the content for performance reasons
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary" disabled={loading} onClick={submitHandler}>
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
    </>
  )
}

export default AddShowcasebox