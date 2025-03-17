import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import 'rsuite/dist/rsuite.min.css';
import { axiosClients } from '../../Apis/api';
import JoditEditor from 'jodit-react';

import { useNavigate } from 'react-router-dom'
import { SelectPicker, TagPicker, Toggle } from 'rsuite'

function EditQuestion({ modal, toggle, data, onSave }) {
  console.log("Modal Data :", data)

  // const editor = useRef(null);
  // const [questionsName, setQuestionsName] = useState('');
  // const [shift, setShift] = useState('');
  // const [topicId, setTopicId] = useState('');
  // const [status, setStatus] = useState('');
  // const [difficulty, setDifficulty] = useState('');
  // const [explanation, setExplanation] = useState('');
  // const [chapterId, setChapterId] = useState('');


  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     setQuestionsName(data.questions_name || '');
  //     setShift(data.shift || '');
  //     setTopicId(data.topic_id || '');
  //     setStatus(data.status || '');
  //     setDifficulty(data.difficulty || '');
  //     setExplanation(data.explanation || '');
  //     setChapterId(data.chapter_id || '');
  //   }
  // }, [data]);


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   try {
  //     await axiosClients.put(
  //       `updateQuestion/${data.questions_id}`, {
  //       questionsName,
  //       shift,
  //       topicId,
  //       status,
  //       difficulty,
  //       explanation,
  //       chapterId
  //     }
  //     );
  //     toast.success('Question updated successfully.');
  //     onSave();
  //     toggle();
  //   } catch (error) {
  //     console.error('Error updating Question:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
  console.log('questionTypeData', questionTypeData)
  const optionData = [{ title: 'True', value: 1 }, { title: 'False', value: 0 }].map((item) => ({
    label: item.title,
    value: item.value,
  }))

  const [questionType, setQuestionType] = useState(data.type_id)

  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedUnit, setSelectedUnit] = useState(null)

  const handleSubcategoryChange = (value) => {
    console.log("ALL Data :", allData)
    const subcategory = allData.find((item) => item.subcategory_id === value)
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
      console.log('HANDEL RUNNING')
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
  useEffect(() => {
    if (data) {
      setQuestionsName(data.questions_name)
      setSubCategoryId(data.subcategory_id || '');
      setSubjectId(data.subject_id || '');
      setChapterId(data.chapter_id || '');
      setShift(data.shift || '');
      setExplanation(data.explanation || '');
      setQuestionType(data.type_id || '');
      setDifficulty(data.difficulty || '');

      const selectedSubcategoryData = allData?.find(item => item.subcategory_id === data.subcategory_id);
      setSelectedSubcategory(selectedSubcategoryData || null);

      const selectedSubjectData = selectedSubcategoryData?.subjects.find(item => item.subject_id === data.subject_id);
      setSelectedSubject(selectedSubjectData || null);

      const selectedUnitData = selectedSubjectData?.units.find(item => item.unit_id === data.unit_id);
      setSelectedUnit(selectedUnitData || null);

      setOptions(data.options.map(opt => ({
        title: opt.option_text || '',
        isCorrect: opt.is_correct || false
      })));
    }
  }, [data, allData]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = data.year ?
      {
        questionsName,
        status,
        shift,
        explanation,
        questionTypeId:questionType,
        shiftSubjectsId:'Enter shift subject id'
      } :
      {
        questionsName,
        status,
        chapterId,
        explanation,
        subjectId,
        questionTypeId:questionType,
      }

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
    if (questionType === 1 || 3) {
      if (selectedSubcategory === null && subjectId == '' && selectedUnit === null && options[0].title === '' && options[1].title === '' && options[2].title === '' && options[3].title === '') {
        setLoading(false)
        toast.error('Required Value Not Filled.')
        return
      }
    }
    if (questionType === 2) {
      if (numericalAnswer === '') {
        setLoading(false)
        toast.error('Required Value Not Filled.')
        return
      }
    }
    try {
      console.log("Question id :", data.questions_id)
      const response = await axiosClients.put(`/updateQuestion/${data.questions_id}`, {
        questionsName: questionsName,
        status: status,
        chapterId: chapterId,
        explanation: explanation,
        subjectId: subjectId,
        questionTypeId: questionType,
      })

      if (response.data && response.data.id) {
        const questionId = response.data.id;
        toast.success("Question Updated successfully.");

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
      const question_type = questionType === 1 || questionType === 3 ? options : [numericalAnswer]
      // const filteredOptions = options.filter((opt) => opt.title.trim() !== "");
      console.log('question_type', question_type)

      // const optionRequests = question_type.map(option =>
      //   axiosClients.put(`/updateOption/${}`, {
      //     question_id: questionId,
      //     option_text: questionType === 2 ? option : option.title,
      //     is_correct: questionType === 2 ? true : option.isCorrect,
      //     status: "active",
      //   })
      // );

      await Promise.all(optionRequests);
      toast.success("Options added successfully.");
    } catch (error) {
      toast.error("Error creating options.");
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="xl">

      <div className="container-fluid" style={{ marginTop: '12px' }}>
        <form>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5>Edit Chapter Question</h5>
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
                          <div id="picker-container1" style={{ position: 'relative' }}>
                            <SelectPicker
                              data={questionTypeData}
                              defaultValue={questionType}
                              style={{ width: '100%' }}
                              placeholder="Select Question Type"
                              onChange={(value) => setQuestionType(value)}
                              searchable={false}
                              container={() => document.getElementById("picker-container1")}
                            />
                          </div>
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
                          <div id="picker-container2" style={{ position: 'relative' }}>
                            <SelectPicker
                              data={
                                allData
                                  ? allData.map((item) => ({
                                    label: item.subcategory_name,
                                    value: item.subcategory_id,
                                  }))
                                  : []
                              }
                              defaultValue={data.subcategory_id}
                              searchable={true}
                              style={{ width: '100%' }}
                              onChange={handleSubcategoryChange}
                              placeholder="Select Subcategory"
                              container={() => document.getElementById("picker-container2")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="input-box">
                          <h6>Subject</h6>
                          <div id="picker-container3" style={{ position: 'relative' }}>
                            <SelectPicker
                              data={
                                selectedSubcategory
                                  ? selectedSubcategory.subjects.map((item) => ({
                                    label: item.subject_name,
                                    value: item.subject_id,
                                  }))
                                  : []
                              }
                              defaultValue={data.subject_id}
                              searchable={true}
                              style={{ width: '100%' }}
                              onChange={handleSubjectChange}
                              placeholder="Select Subject"
                              container={() => document.getElementById("picker-container3")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="input-box">
                          <h6>Unit</h6>
                          <div id="picker-container4" style={{ position: 'relative' }}>
                            <SelectPicker
                              data={
                                selectedSubject
                                  ? selectedSubject.units.map((item) => ({
                                    label: item.unit_name,
                                    value: item.unit_id,
                                  }))
                                  : []
                              }
                              defaultValue={data.unit_id}
                              searchable={true}
                              style={{ width: '100%' }}
                              onChange={handleUnitChange}
                              placeholder="Select Unit"
                              container={() => document.getElementById("picker-container4")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="input-box">
                          <h6>Chapter</h6>
                          <div id="picker-container5" style={{ position: 'relative' }}>
                            <SelectPicker
                              data={
                                selectedUnit
                                  ? selectedUnit.chapters.map((item) => ({
                                    label: item.chapter_name,
                                    value: item.chapter_id,
                                  }))
                                  : []
                              }
                              defaultValue={data.chapter_id}
                              searchable={true}
                              style={{ width: '100%' }}
                              placeholder="Select Chapter"
                              onChange={value => setChapterId(value)}
                              container={() => document.getElementById("picker-container5")}
                            />
                          </div>
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
    </Modal>
    // <div>
    //   <Modal isOpen={modal} toggle={toggle} size="xl">
    //     <ModalHeader toggle={toggle}>Edit Question</ModalHeader>
    //     <ModalBody>
    //       <div className="container-fluid">
    //         <form onSubmit={handleSubmit}>
    //           <div className="row">
    //             <div className="col-12">
    //               <div className="card">
    //                 <div className="card-header">
    //                   <h5>Question Information</h5>
    //                 </div>
    //                 <div className="card-body">
    //                   <div className="row gy-3">
    //                     <div className="col-12">
    //                       <div className="input-box">
    //                         <h6>Questions</h6>
    //                         <JoditEditor
    //                           ref={editor}
    //                           value={questionsName}
    //                           tabIndex={1} // tabIndex of textarea
    //                           onChange={newContent => setQuestionsName(newContent)} // preferred to use only this option to update the content for performance reasons
    //                         />
    //                       </div>
    //                     </div>
    //                     <div className="col-xl-6">
    //                       <div className="input-box">
    //                         <h6>Shift</h6>
    //                         <input
    //                           type="text"
    //                           name="title"
    //                           className="form-control"
    //                           value={shift}
    //                           onChange={(e) => setShift(e.target.value)}
    //                           required
    //                         />
    //                       </div>
    //                     </div>
    //                     <div className="col-xl-6">
    //                       <div className="input-box">
    //                         <h6>Topic Id</h6>
    //                         <input
    //                           type="text"
    //                           name="link"
    //                           className="form-control"
    //                           value={topicId}
    //                           placeholder="Enter Topic Id"
    //                           onChange={(e) => setTopicId(e.target.value)}
    //                           required
    //                         />
    //                       </div>
    //                     </div>
    //                     <div className="col-xl-6">
    //                       <div className="input-box">
    //                         <h6>Chapter Id<span className="text-danger">*</span></h6>
    //                         <input
    //                           type="number"
    //                           name="chapterId"
    //                           value={chapterId}
    //                           placeholder="Enter Chapter Id"
    //                           onChange={(e) => setChapterId(e.target.value)}
    //                           required
    //                         />
    //                       </div>
    //                     </div>
    //                     <div className="col-xl-6">
    //                       <div className="input-box">
    //                         <h6>
    //                           Difficulty<span className="text-danger">*</span>
    //                         </h6>
    //                         <div>
    //                           <select
    //                             className="w-100"
    //                             name="difficulty"
    //                             value={difficulty}
    //                             onChange={(e) => setDifficulty(e.target.value)}
    //                             required
    //                           >
    //                             <option value="" disabled>
    //                               Select Difficulty Level
    //                             </option>
    //                             <option value="easy">Easy</option>
    //                             <option value="medium">Medium</option>
    //                             <option value="hard">Hard</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="col-xl-6">
    //                       <div className="input-box">
    //                         <h6>
    //                           Status<span className="text-danger">*</span>
    //                         </h6>
    //                         <div>
    //                           <select
    //                             className="w-100"
    //                             name="status"

    //                           >
    //                             <option value="" disabled>
    //                               Select Status
    //                             </option>
    //                             <option value="active">Active</option>
    //                             <option value="inactive">Inactive</option>
    //                           </select>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="input-box">
    //                       <h6>Add Explanation<span className="text-danger">*</span></h6>
    //                       <JoditEditor
    //                         ref={editor}
    //                         value={explanation}
    //                         tabIndex={1} // tabIndex of textarea
    //                         onChange={newContent => setExplanation(newContent)} // preferred to use only this option to update the content for performance reasons
    //                       />

    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <ModalFooter>
    //             <Button color="danger" onClick={toggle}>
    //               Cancel
    //             </Button>
    //             <Button className="btn btn-primary" type="submit" disabled={loading}>
    //               {loading ? 'Updating...' : 'Save Changes'}
    //             </Button>
    //           </ModalFooter>
    //         </form>
    //       </div>
    //     </ModalBody>
    //   </Modal>
    // </div>
  );
}

export default EditQuestion;