"use client";
import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff, ArrowRight, Camera, User } from "lucide-react";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import GoogleLoginBtn from "@/components/UI/GoogleLoginBtn";
import useAxiosInstance from "@/Hooks/useAxiosInstance";
import axios from "axios";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  profileImage?: FileList;
};

type CustomInputProps = {
  label: string;
  name: keyof RegisterFormData;
  type?: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<RegisterFormData>;
  errors?: FieldErrors<RegisterFormData>;
};

// Simple Single-purpose Custom Input
const CustomInput = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  register,
  errors,
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...(type === "email" && {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }),
            ...(type === "password" && {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
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
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {errors && errors[name] && (
        <p className="text-xs text-red-500 font-medium">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

const RegisterPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading
  const axiosInstance = useAxiosInstance(); // Custom hook for Axios instance
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // Image Upload Preview Handler
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (data: RegisterFormData) => {
    if (data.profileImage && data.profileImage[0]) {
      // Append other form data as needed
      try {
        setLoading(true); // Set loading state to true when starting the request
        // Example: Upload to Cloudinary or your backend
        const formData = new FormData();
        formData.append("file", data.profileImage[0]);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset",
        );

        // Make the POST request to Cloudinary
        const imageRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
        );

        const imageUrl = imageRes.data.secure_url;

        const userData = {
          name: data.name,
          email: data.email,
          password: data.password,
          profileImageUrl: imageUrl, // Assuming your backend expects this field
        };

        // Send user data to your backend
        const response = await axiosInstance.post("/api/users", userData);
        console.log("User registered successfully:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false); // Reset loading state after the request is complete
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">
            Join <span className="text-blue-600 font-semibold">ClickMart</span>{" "}
            and start shopping
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Profile Image Select Option */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden group hover:border-blue-500 transition-colors">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-400" />
              )}

              {/* Overlay Icon */}
              <label
                htmlFor="profileImage"
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity"
              >
                <Camera className="w-6 h-6" />
              </label>
            </div>

            <label
              htmlFor="profileImage"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              {imagePreview
                ? "Change Profile Picture"
                : "Upload Profile Picture"}
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profileImage", {
                onChange: handleImageChange,
              })}
            />
          </div>

          <CustomInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            register={register}
            errors={errors}
          />

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

          {/* Terms & Conditions */}
          <div className="flex items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                required
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200"
            disabled={loading}
          >
            Create Account
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in
          </a>
        </p>

        <div>
          <GoogleLoginBtn className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
