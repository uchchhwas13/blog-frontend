import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { SignInFormDataType } from '../../type/auth.types';
import { InputField } from './Inputfield';
import { SubmitButton } from './SubmitButton';
import { signin } from '../../services/authService';
import { useAuth } from './useAuth';

export const SignInPage = (): React.JSX.Element => {
  const initialCredentials: SignInFormDataType = {
    email: '',
    password: '',
  };
  const [credentials, setCredentials] = useState(initialCredentials);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserInfo } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const response = await signin(credentials);
    if (!response.success || !response.data || response.error) {
      setErrorMessage('Incorrect email or password');
    } else {
      setCredentials(initialCredentials);
      const fullName = response.data.user.name;
      setUserInfo(fullName);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <SubmitButton text="Sign In" />
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Tap to Signup
          </Link>
        </p>
      </div>
    </div>
  );
};
