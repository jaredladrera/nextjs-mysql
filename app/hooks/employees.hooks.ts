import { useQuery } from '@tanstack/react-query';
import { EmployeeService } from '@/app/services/employee.services';

export function useEmployees() {
  return useQuery({
    queryKey: ['users'],
    queryFn: EmployeeService.getAll,
  });
}