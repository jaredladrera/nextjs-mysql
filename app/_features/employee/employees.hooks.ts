import { useQuery } from '@tanstack/react-query';
import { EmployeeService } from '@/app/api/_lib/services/employee.service';

export function useEmployees() {
  return useQuery({
    queryKey: ['users'],
    queryFn: EmployeeService.getAll,
  });
}