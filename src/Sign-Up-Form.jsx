import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import * as yup from "yup";
import { FaExclamationCircle } from "react-icons/fa";

const SignupForm = ({ setFirstName }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  let userSchema = yup.object({
    firstname: yup.string().required("Enter your name"),
    lastname: yup.string().required("Enter your last name"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    phonenumber: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits"),
    password: yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[!@#$%^&,.?"|<>]/, "Must contain a symbol")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[a-z]/, "Must contain a lowercase letter")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
    age: yup.number().typeError("Age must be a number")
      .min(12, "You must be at least 12")
      .max(100, "Your age cannot exceed 100")
      .required("Age is required"),
    gender: yup.string().required("Gender is required"),
    birthdate: yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSchema.validate(formData, { abortEarly: false });
      setErrors({});

      // Store the first name and navigate to the homepage
      setFirstName(formData.firstname);
      navigate("/"); // Redirect to the home page
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-[400px] h-auto bg-white border border-gray-300 shadow-lg p-6 mt-5 rounded-md">
      <div className="flex flex-col items-center mb-4">
          <img
            className="w-[200px] h-[200px] object-contain cursor-pointer filter bg-black invert"
            src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </div>
        <h2 className="text-xl font-bold mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstname"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.firstname && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.firstname}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.lastname && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.lastname}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.email}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phonenumber" className="block mb-1">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.phonenumber && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.phonenumber}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block mb-1">Age</label>
            <input
              type="number"
              name="age"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.age && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.age}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="birthdate" className="block mb-1">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.birthdate && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.birthdate}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.gender}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.password}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                <FaExclamationCircle className="inline-block" />
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-blue-600">
            Create Account
          </button>
        </form>
        <h2 className="flex justify-center items-center pt-2">Already have an account? Sign In now</h2>

        {/* Sign In button without form submission */}
        <button onClick={handleSignIn} className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-blue-600">
          Sign in
        </button>
      </div>
    </div>
  );
};

 
export default SignupForm;
