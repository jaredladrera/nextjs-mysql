import api from "@/app/_lib/axios";

export const EmployeeService = {
  getAll: async () => {
    const res = await api.get('/users');
    return res.data;
  },
};