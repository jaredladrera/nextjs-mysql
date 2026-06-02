'use client';

import { useEmployees } from '@/app/features/employee/employees.hooks';
import { JSX } from 'react';

interface Employee {
  index_key: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  email_add: string;
  mobile_no: string;
  status: number;
}

interface UseEmployeesResult {
  data?: Employee[];
}

interface UseEmployeesQueryResult extends UseEmployeesResult {
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
}

export default function EmployeeTable(): JSX.Element {
  // const { data: employees } = useEmployees() as UseEmployeesResult;
   const { data: employees, isLoading, isError, error } = useEmployees() as UseEmployeesQueryResult;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">Employee Table</h3>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {employees?.map((employee: Employee) => (
                  <tr key={employee.index_key}>
                    <td>{employee.index_key}</td>
                    <td>{employee.employee_id}</td>
                    <td>
                      {employee.first_name} {employee.last_name}
                    </td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>{employee.email_add}</td>
                    <td>{employee.mobile_no}</td>
                    <td>
                      {employee.status === 1 ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

