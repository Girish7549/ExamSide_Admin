import React, { useEffect, useState } from "react";
import { Input, SelectPicker } from "rsuite";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { axiosClients } from "../../Apis/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddShiftSubject = () => {
  const [shift, setShift] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [shiftId, setShiftId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedShift, setSelectedShift] = useState(null)

  const handleSubcategoryChange = (value) => {
    const subcategory = shift.find((item) => item.subcategory_id === value)
    setSelectedSubcategory(subcategory)
    setSelectedYear(null)
    setSelectedShift(null)
  }

  const handleYearChange = (value) => {
    const year = selectedSubcategory?.year.find((item) => item.year_id === value)
    setSelectedYear(year)
    setSelectedShift(null)
  }

  const handleShiftChange = (value) => {
    setShiftId(value)
    const shift = selectedYear?.shift.find((item) => item.shift_id === value)
  }

  const statusData = ["Active", "In Active"].map((item) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    async function fetchShift() {
      try {
        const response = await axiosClients.get("/getAllSubcategoryYearShift");
        console.log("shifts :", response.data);
        // const shifts = response.data.map((item) => ({
        //   label: item.shift_name,
        //   value: item.shift_id,
        // }));
        setShift(response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
        toast.error("Error fetching shifts!", { position: "top-right" });
      }
    }

    fetchShift();
  }, []);

  async function submitHandler(e) {
    e.preventDefault(); // Prevent page reload

    if (!shiftId || !subjectName || !status) {
      toast.error("Please fill in all fields!", { position: "top-right" });
      return;
    }

    try {
      setLoading(true);
      const data = {
        shiftId: shiftId,
        shift_subjects_name: subjectName,
        status: status,
      };

      const response = await axiosClients.post("/create/shift_subject", data);

      if (response.status === 201 || response.status === 200) {
        toast.success("Form submitted successfully!", { position: "top-right" });
        setSelectedSubcategory(null);
        setSelectedShift("");
        setSubjectName("");
        setStatus("");
      } else {
        toast.error("Submission failed. Try again!", { position: "top-right" });
      }

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h5>Add Shift Subject </h5>
              </div>
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div className="col-12">
                    {/* Sub Category Selection */}
                    <div className="input-items">
                      <div className="row gy-0 w-100">

                        <div className="col-xl-6">
                          <h6>
                            Sub Category<span className="text-danger">*</span>
                          </h6>
                          <SelectPicker
                            data={
                              shift
                                ? shift.map((item) => ({
                                  label: item.subcategory_name,
                                  value: item.subcategory_id,
                                }))
                                : []
                            }
                            style={{ width: '100%' }}
                            placeholder="Select Shift"
                            // value={selectedShift}
                            onChange={handleSubcategoryChange}
                          />
                        </div>

                        <div className="col-xl-6">
                          <h6>
                            Year<span className="text-danger">*</span>
                          </h6>
                          <SelectPicker
                            data={
                              selectedSubcategory
                                ? selectedSubcategory.year.map((item) => ({
                                  label: item.year_name,
                                  value: item.year_id,
                                }))
                                : []
                            }
                            style={{ width: '100% ' }}
                            placeholder="Select Shift"
                            onChange={handleYearChange}
                          />
                        </div>

                      </div>
                    </div>
                    {/* Year Selection */}
                    <div className="input-items">
                      <div className="row gy-0 ">
                        
                        

                        <div className="col-xl-6">
                          <h6>
                            Shift<span className="text-danger">*</span>
                          </h6>
                          <SelectPicker
                            data={
                              selectedYear
                                ? selectedYear.shift.map((item) => ({
                                  label: item.shift_name,
                                  value: item.shift_id,
                                }))
                                : []
                            }
                            style={{ width: '98%' }}
                            placeholder="Select Shift"
                            onChange={handleShiftChange}
                          />
                        </div>

                        <div className="col-xl-6">
                          <h6>
                            Status<span className="text-danger">*</span>
                          </h6>
                          <SelectPicker
                            data={statusData}
                            searchable={false}
                            style={{ width: '100%' }}
                            placeholder="Select Status"
                            value={status}
                            onChange={(value) => setStatus(value)}
                          />
                        </div>

                      </div>
                    </div>
                    {/* Shift Selection */}
                    <div className="input-items">
                      <div className="row gy-0">
                      <div className="col-xl-6">
                          <h6>
                            Subject Name<span className="text-danger">*</span>
                          </h6>
                          <Input
                            style={{ width: '100%' }}
                            placeholder="Enter Subject Name"
                            value={subjectName}
                            onChange={(value) => setSubjectName(value)}
                          />
                        </div>

                       
                        {/* <div className="col-xl-6">
                          <h6>
                            Shift<span className="text-danger">*</span>
                          </h6>
                          <SelectPicker
                            data={
                              selectedYear
                                ? selectedYear.shift.map((item) => ({
                                  label: item.shift_name,
                                  value: item.shift_id,
                                }))
                                : []
                            }
                            style={{ width: 310 }}
                            placeholder="Select Shift"
                            onChange={handleShiftChange}
                          />
                        </div> */}
                      </div>
                    </div>

                    {/* Subject ID Input */}
                    <div className="input-items">
                      <div className="row gy-3">
                        {/* <div className="col-xl-6">
                          <h6>
                            Subject Name<span className="text-danger">*</span>
                          </h6>
                          <Input
                            style={{ width: 310 }}
                            placeholder="Enter Subject Name"
                            value={subjectName}
                            onChange={(value) => setSubjectName(value)}
                          />
                        </div> */}
                      </div>
                    </div>

                    {/* Status Selection */}
                    <div className="input-items">
                      <div className="row gy-3">
                        {/* <div className="col-xl-6">
                          <h6>
                            Status<span className="text-danger">*</span>
                          </h6>
                          <SelectPicker
                            data={statusData}
                            searchable={false}
                            style={{ width: 224 }}
                            placeholder="Select Status"
                            value={status}
                            onChange={(value) => setStatus(value)}
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mb-3 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AddShiftSubject;
