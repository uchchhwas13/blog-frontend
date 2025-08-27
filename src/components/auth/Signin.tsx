import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SignInFormDataType } from '../../type/auth.types';
import { InputField } from './Inputfield';
import { SubmitButton } from './SubmitButton';

export const SignInPage = (): React.JSX.Element => {
  const initialFormData: SignInFormDataType = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
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
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />

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
