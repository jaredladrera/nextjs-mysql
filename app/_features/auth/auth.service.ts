import api from '@/app/_lib/axios';
import { LoginRequest, LoginResponse } from '@/app/(auth)/types';

export const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    '/auth',
    payload
  );

  return data;
};

export const register = async (payload: {
  email_add: string;
  employee_id: string;
  first_name: string;
  last_name: string;
}) => {
  const { data } = await api.post('/users', payload);
  return data;
};