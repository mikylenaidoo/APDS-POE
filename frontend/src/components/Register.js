// src/components/Register.js

import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    idNumber: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'idNumber' && !/^\d{0,13}$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0 && formData.surname.trim().length > 0;
      case 2:
        return formData.idNumber.length === 13;
      case 3:
        return formData.email.includes('@') && formData.password.length >= 8;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      if (validateStep(currentStep)) {
        setCurrentStep((prev) => prev + 1);
      }
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    if (!Object.values(formData).every((val) => val)) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/auth/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setError(error.response?.data.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder="Mikyle"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder="Naidoo"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your 13-digit ID number"
                  maxLength="13"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  placeholder="mikyle@gmail.com"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  placeholder="Choose a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Registration Card */}
      <div className="relative w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
          {/* Header with Step Indicators */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <User className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">Step {currentStep} of 3</p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep === step
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {currentStep === step ? (
                    <CheckCircle className="text-white w-5 h-5" />
                  ) : (
                    <span className="text-gray-500 font-semibold">{step}</span>
                  )}
                </div>
                {step < 3 && (
                  <div className="w-10 h-1 bg-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="h-6 w-6" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-6 w-6" />
              <p className="text-sm">{message}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex-1 py-4 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !validateStep(currentStep)}
                className={`flex-1 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-lime-600 transition-all duration-200 ${
                  loading || !validateStep(currentStep)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {loading
                  ? 'Please wait...'
                  : currentStep === 3
                  ? 'Create Account'
                  : 'Next'}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-green-600 font-medium hover:text-green-700 transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }
        .animate-pulse {
          animation: pulse 4s infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;
