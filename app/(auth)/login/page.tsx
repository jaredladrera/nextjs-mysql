'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/app/_features/auth/auth.hooks';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const result =
        await loginMutation.mutateAsync({
          email,
          password,
        });

      localStorage.setItem(
        'token',
        result.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(result.user)
      );

      router.push('/admin');
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
        <h2>Login</h2>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: '100%',
              marginBottom: 16,
            }}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: '100%',
              marginBottom: 16,
            }}
          />
        </div>

        {loginMutation.isError && (
          <p>
            Invalid email or password
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending
            ? 'Logging in...'
            : 'Login'}
        </button>
      </form>
    </div>
  );
}