import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type SignUpFormDataType = {
  fullname: string;
  email: string;
  password: string;
  profileImage: File | null;
};

const initialFormData: SignUpFormDataType = {
  fullname: '',
  email: '',
  password: '',
  profileImage: null,
};

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  required = false,
  placeholder,
  onChange,
}: InputFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);

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

type SubmitButtonProps = {
  text: string;
};

const SubmitButton = ({ text }: SubmitButtonProps) => (
  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
               text-white font-semibold rounded-lg shadow-md 
               transition duration-300"
  >
    {text}
  </button>
);

export const SignUpPage = (): React.JSX.Element => {
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
    console.log('Submitted Data:', formData);
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
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Tap to login
          </Link>
        </p>
      </div>
    </div>
  );
};
