import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

function EditChapter({ modal, toggle, data, onSave }) {
  const [chapterName, setChapterName] = useState('');
  const [unitId, setUnitId] = useState('');
  const [year, setYear] = useState('');
  const [total, setTotal] = useState('');
  const [avg, setAvg] = useState('');
  const [weightageFirst, setWeightageFirst] = useState('');
  const [weightageSecond, setWeightageSecond] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setChapterName(data.chapter_name || '');
      setUnitId(data.unit_id || '');
      setYear(data.year || '');
      setTotal(data.total || '');
      setAvg(data.avg || '');
      setWeightageFirst(data.weightage_first || '');
      setWeightageSecond(data.weightage_second || '');
      setStatus(data.status || '');
    }
  }, [data]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClients.put(
        `/updateChapterById/${data.chapter_id}`,
        {
          chapterName,
          unitId,
          year,
          total,
          avg,
          weightageFirst,
          weightageSecond,
          status
        }
      );
      toast.success('Chapter updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating Chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Chapter</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Chapter Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Chapter Name</h6>
                            <input
                              type="text"
                              name="chapterName"
                              value={chapterName}
                              onChange={(e) => setChapterName(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Unit Id</h6>
                            <input
                              type="number"
                              name="unitId"
                              value={unitId}
                              onChange={(e) => setUnitId(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Year</h6>
                            <input
                              type="text"
                              name="year"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Total</h6>
                            <input
                              type="number"
                              name="total"
                              value={total}
                              onChange={(e) => setTotal(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Avg</h6>
                            <input
                              type="number"
                              name="avg"
                              value={avg}
                              onChange={(e) => setAvg(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Weightage First</h6>
                            <input
                              type="number"
                              name="weightageFirst"
                              value={weightageFirst}
                              onChange={(e) => setWeightageFirst(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Weightage First</h6>
                            <input
                              type="number"
                              name="weightageSecond"
                              value={weightageSecond}
                              onChange={(e) => setWeightageSecond(e.target.value)}
                              className="form-control"
                              required
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
                <Button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Save Changes'}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditChapter;