import { RowDataPacket } from 'mysql2';

export interface Employee extends RowDataPacket {
  index_key: number;
  employee_id: string;

  password?: string | null;
  temp_id?: string | null;

  last_name?: string | null;
  first_name?: string | null;
  middle_name?: string | null;

  position?: string | null;
  grade_level?: string | null;
  section?: string | null;
  sub_section?: string | null;
  department?: string | null;
  division?: string | null;

  emp_status?: string | null;
  office_based?: string | null;
  email_add?: string | null;

  date_registered?: string | null;
  status?: number | null;

  birth_date?: string | null;
  gender?: string | null;
  date_hired?: string | null;
  date_of_separation?: string | null;

  mobile_no?: string | null;
  changepassdate?: string | null;

  sss: string;
  tin_no: string;

  am1?: string | null;
  am2?: string | null;
  am3?: string | null;
};