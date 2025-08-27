import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SignUpFormDataType } from '../../type/auth.types';
import { InputField } from './Inputfield';
import { SubmitButton } from './SubmitButton';

type FileUploadProps = {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageFileUpload = ({ label, name, onChange }: FileUploadProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="file"
      name={name}
      accept="image/*"
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
    />
  </div>
);

export const SignUpPage = (): React.JSX.Element => {
  const initialFormData: SignUpFormDataType = {
    fullname: '',
    email: '',
    password: '',
    profileImage: null,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage' && files) {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />

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

          <ImageFileUpload
            label="Profile Image (Optional)"
            name="profileImage"
            onChange={handleChange}
          />

          <SubmitButton text="Sign Up" />
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-blue-600 hover:underline font-medium"
          >
            Tap to signin
          </Link>
        </p>
      </div>
    </div>
  );
};
