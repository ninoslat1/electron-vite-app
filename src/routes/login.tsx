import React, { useEffect, useState } from 'react'
import { initializeDatabase } from '../../utils/db';
import { toast } from 'react-toastify';
import { SQLocal } from 'sqlocal';
import { createRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

function Login() {
  const { sql } = new SQLocal('bromousr.sqlite3');
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const encodedPassword = btoa(password.split("").join("\u0000")).slice(0, -2);
  
    try {
      const result = await sql`
        SELECT * FROM myuser WHERE UserName = ${username} AND Password LIKE ${encodedPassword + '%'}
      `;
  
      if (result.length > 0) {
        toast.success('Login berhasil!');
        navigate({ to: '/dashboard' })
      } else {
        toast.error('Username atau password salah.');
      }
    } catch (err: any) {
      toast.error('Terjadi kesalahan saat login: ' + (err?.message || 'Unknown error'));
    }
  };
  

  useEffect(() => {
    const init = async () => {
      await initializeDatabase();
    };
    init();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}