import React from 'react';
import { useApp } from '../context/AppContext';
import RegisterForm from '../components/Auth/RegisterForm';

export default function Register() {
  const { theme } = useApp();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <RegisterForm />
    </div>
  );
}