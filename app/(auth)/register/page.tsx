'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/app/features/auth/auth.hooks';

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    email_add: '',
    employee_id: '',
    first_name: '',
    last_name: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log('Form Data:', form);

    try {
      await registerMutation.mutateAsync(form);

      alert('Register successful');

      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 400,
          padding: 24,
          border: '1px solid #ddd',
          borderRadius: 8,
        }}
      >
        <h2>Register</h2>

        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <input
          name="email_add"
          placeholder="Email"
          value={form.email_add}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <input
          name="employee_id"
          placeholder="Password (Employee ID)"
          value={form.employee_id}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending
            ? 'Creating...'
            : 'Register'}
        </button>
      </form>
    </div>
  );
}