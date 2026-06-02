import api from "@/lib/axios";

export const EmployeeService = {
  getAll: async () => {
    const res = await api.get('/users');
    return res.data;
  },
};