import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { SignInPayload, SignInResponse } from '../../type/auth.types';
import { InputField } from './Inputfield';
import { SubmitButton } from './SubmitButton';
import { signinUser } from '../../services/authService';
import { useAuth } from './useAuth';
import type { SignInSuccessResponse } from '../../type/auth.types';
import type { UserInfo } from './authContext';
import { useLocation } from 'react-router-dom';
import { setAxiosAuthState } from '../../services/api';

export const SignInPage = (): React.JSX.Element => {
  const initialCredentials: SignInPayload = {
    email: '',
    password: '',
  };
  const [credentials, setCredentials] = useState(initialCredentials);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const signupSuccess = location.state?.signupSuccess;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await processSignin();
  };

  const clearError = () => {
    setErrorMessage('');
  };

  const processSignin = async () => {
    const response = await signinUser(credentials);

    if (!response.success || !response.data || response.error) {
      showSigninError();
      return;
    }
    handleSuccessfulSignin(response.data);
  };

  const showSigninError = () => {
    setErrorMessage('Incorrect email or password');
  };

  const handleSuccessfulSignin = async (data: SignInSuccessResponse) => {
    resetCredentials();
    const userInfo = {
      fullName: data.user.name,
      isLoggedIn: true,
    };
    saveUserInfo(userInfo, data);
    navigateToHome();
  };

  const resetCredentials = () => {
    setCredentials(initialCredentials);
  };

  const saveUserInfo = (userInfo: UserInfo, data: SignInSuccessResponse) => {
    setUserInfo(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('refreshToken', data.refreshToken);
    setAxiosAuthState({
      accessToken: data.accessToken,
      userId: data.user.id,
    });
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {signupSuccess && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
            🎉 Account created successfully! Please sign in.
          </div>
        )}
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
