import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosClients } from '../../Apis/api'
import JoditEditor from 'jodit-react'
import { SelectPicker, TagPicker, Toggle } from 'rsuite'

function AddQuestion() {
  const editor = useRef(null)
  const [allData, setAllData] = useState(null)
  const [questionsName, setQuestionsName] = useState('')
  const [shift, setShift] = useState('')
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
  const [selectedUnit, setSelectedUnit] = useState(null)

  const handleSubcategoryChange = (value) => {
    const subcategory = allData.find((item) => item.subcategory_id === value)
    // console.log("Value")
    setSelectedSubcategory(subcategory)
    setSelectedSubject(null)
    setSelectedUnit(null)
  }

  const handleSubjectChange = (value) => {
    setSubjectId(value)
    const subject = selectedSubcategory?.subjects.find((item) => item.subject_id === value)
    setSelectedSubject(subject)
    setSelectedUnit(null)
  }

  const handleUnitChange = (value) => {
    const unit = selectedSubject?.units.find((item) => item.unit_id === value)
    setSelectedUnit(unit)
  }

  const fetchAllSubcatgorySubjectUnitChapter = async () => {
    try {
      const response = await axiosClients.get('/getAllSubcatgorySubjectUnitChapter')
      setAllData(response.data)
      console.log('Response :', response.data)
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
    if(questionType === 1 || questionType === 3) {
      if(selectedSubcategory === null && subjectId == '' && selectedUnit === null && options[0].title === '' && options[1].title === '' && options[2].title === '' && options[3].title === '') {
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
        chapterId: chapterId,
        explanation: explanation,
        subjectId: subjectId,
        shiftId: null,
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
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const createOptions = async (questionId) => {
    try {
      console.log("Option start posting");
      const question_type = (questionType === 1 || questionType === 3) ? options : [numericalAnswer];
      console.log('question_type', question_type);
      for (const option of question_type) {
        await axiosClients.post("/createOption", {
          question_id: questionId,
          option_text: questionType === 2 ? option : option.title,
          is_correct: questionType === 2 ? true : option.isCorrect,
          status: "active",
        });
        console.log("Option created:", option);
        await delay(500); 
      }
      toast.success("All options added successfully.");
      console.log("All options created successfully...");
    } catch (error) {
      toast.error("Error creating options.");
      console.error("Error:", error);
    }
  };
// console.log("Numerical :", [numericalAnswer])
  console.log("question tyep id ", questionType)
  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Chapter Question</h5>
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
                        {/* <input
                          type="text"
                          name="shift"
                          placeholder="Enter Shift"
                          value={shift}
                          onChange={(e) => setShift(e.target.value)}
                          required
                        /> */}
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
                        <h6>Subject</h6>
                        <SelectPicker
                          data={
                            selectedSubcategory
                              ? selectedSubcategory.subjects.map((item) => ({
                                label: item.subject_name,
                                value: item.subject_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleSubjectChange}
                          placeholder="Select Subject"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Unit</h6>
                        <SelectPicker
                          data={
                            selectedSubject
                              ? selectedSubject.units.map((item) => ({
                                label: item.unit_name,
                                value: item.unit_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          onChange={handleUnitChange}
                          placeholder="Select Unit"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Chapter</h6>
                        <SelectPicker
                          data={
                            selectedUnit
                              ? selectedUnit.chapters.map((item) => ({
                                label: item.chapter_name,
                                value: item.chapter_id,
                              }))
                              : []
                          }
                          searchable={true}
                          style={{ width: '100%' }}
                          placeholder="Select Chapter"
                          onChange={value => setChapterId(value)}
                        />
                      </div>
                    </div>

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

                            {/* <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
                          Submit
                        </button> */}
                          </div>
                        )
                      }
                      {/* {
                        questionType == 'MCQ (Single Correct Answer)' && (
                          <div>
                            <h6>
                              Add Options MCQ (Single Correct Answer) <span className="text-danger">*</span>
                            </h6>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 1' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 2' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 3' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 4' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                            </div>
                          </div>
                        )
                      } */}
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
                      {/* {
                        questionType == 'MCQ (Multiple Correct Answer)' && (
                          <div>
                            <h6>
                              Add Options MCQ (Multiple Correct Answer)<span className="text-danger">*</span>
                            </h6>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 1' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 2' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 3' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                              <div className="input-box" style={{ display: 'flex', alignItems: 'center', width: '50%', padding: '6px', gap: '4px' }}>
                                <input type='text' required placeholder='Option 4' />
                                <Toggle size='lg' defaultChecked color="green">
                                </Toggle>

                              </div>
                            </div>
                          </div>
                        )
                      } */}
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
  )
}

export default AddQuestion
