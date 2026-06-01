'use client';

import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/app/features/auth/auth.service';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};


export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};