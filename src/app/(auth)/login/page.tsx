'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import useAxiosInstance from '@/Hooks/useAxiosInstance';
import GoogleLoginBtn from '@/components/UI/GoogleLoginBtn';

type FormData = {
  email: string;
  password: string;
};

type CustomInputProps = {
  label: string;
  name: keyof FormData; // specific name type defined for strict typescript safety
  type?: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<FormData>;
  errors?: FieldErrors<FormData>;
};

// Custom Input Component
const CustomInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  register,
  errors,
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...(name === 'email' && {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }),
          })}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Show Error Message */}
      {errors && errors[name] && (
        <p className="text-xs text-red-500 font-medium">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

const LoginPage = () => {
  const axiosInstance = useAxiosInstance()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFormSubmit = async(data: FormData) => {
    const loginRes = await axiosInstance.post(`/api/auth/login`, data)
      console.log(loginRes)
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500">
            Sign in to your <span className="text-blue-600 font-semibold">ClickMart</span> account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <CustomInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            register={register}
            errors={errors}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            register={register}
            errors={errors}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              Remember me
            </label>
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Create one now
          </a>
        </p>

        <GoogleLoginBtn />
      </div>
    </div>
  );
};

export default LoginPage;