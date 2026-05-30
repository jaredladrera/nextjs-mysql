export default function EmployeeForm() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h3 className="mb-0">Employee Form</h3>
            </div>

            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Employee ID</label>
                    <input type="text" className="form-control" name="employee_id" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Middle Name</label>
                    <input type="text" className="form-control" name="middle_name" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Position</label>
                    <input type="text" className="form-control" name="position" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Grade Level</label>
                    <input type="text" className="form-control" name="grade_level" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Section</label>
                    <input type="text" className="form-control" name="section" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Sub Section</label>
                    <input type="text" className="form-control" name="sub_section" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Department</label>
                    <input type="text" className="form-control" name="department" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Division</label>
                    <input type="text" className="form-control" name="division" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Employment Status</label>
                    <input type="text" className="form-control" name="emp_status" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Office Based</label>
                    <input type="text" className="form-control" name="office_based" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" name="email_add" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Birth Date</label>
                    <input type="date" className="form-control" name="birth_date" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" name="mobile_no" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date Hired</label>
                    <input type="date" className="form-control" name="date_hired" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date of Separation</label>
                    <input type="date" className="form-control" name="date_of_separation" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date Registered</label>
                    <input type="date" className="form-control" name="date_registered" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">SSS</label>
                    <input type="text" className="form-control" name="sss" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">TIN No.</label>
                    <input type="text" className="form-control" name="tin_no" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">AM1</label>
                    <input type="text" className="form-control" name="am1" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">AM2</label>
                    <input type="text" className="form-control" name="am2" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">AM3</label>
                    <input type="text" className="form-control" name="am3" />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-primary px-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
