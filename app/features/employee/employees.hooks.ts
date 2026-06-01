import { useQuery } from '@tanstack/react-query';
import { EmployeeService } from '@/app/features/employee/employee.service';

export function useEmployees() {
  return useQuery({
    queryKey: ['users'],
    queryFn: EmployeeService.getAll,
  });
}