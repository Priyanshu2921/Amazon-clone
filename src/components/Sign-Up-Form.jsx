import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
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
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  let userSchema = yup.object({
    firstname: yup.string().required("Enter your name").min(3),
    lastname: yup.string().required("Enter your last name"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    phonenumber: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    password: yup
      .string()
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
    age: yup
      .number()
      .typeError("Age must be a number")
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
      setFirstName(formData.firstname);
      navigate("/"); 
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    userSchema
      .validateAt(name, formData)
      .then(() => setErrors({ ...errors, [name]: undefined }))
      .catch((err) => setErrors({ ...errors, [name]: err.message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      userSchema
        .validateAt(name, { [name]: value })
        .then(() => setErrors({ ...errors, [name]: undefined }))
        .catch((err) => setErrors({ ...errors, [name]: err.message }));
    }
  };

  const handleSignIn = () => {
    navigate("/"); 
  };

  const handleLogoClick = () => {
    navigate("/"); 
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Amazon Image */}
      <div className="flex flex-col items-center mb-4">
        <img
          onClick={handleLogoClick}
          className="w-[200px] h-[200px] object-contain cursor-pointer filter bg-black invert"
          src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </div>

      {/* Signup Form */}
      <div className="w-[400px] h-auto bg-white border border-gray-300 shadow-lg p-6 mt-0 rounded-md">
        <h2 className="text-xl font-bold mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.firstname && errors.firstname && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.firstname}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastname && errors.lastname && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.lastname}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.email}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phonenumber" className="block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phonenumber"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phonenumber && errors.phonenumber && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.phonenumber}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.age && errors.age && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.age}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="birthdate" className="block mb-1">
              Birthdate
            </label>
            <input
              type="date"
              name="birthdate"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.birthdate && errors.birthdate && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
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
              onBlur={handleBlur}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {touched.gender && errors.gender && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.gender}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.password}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="flex items-center text-red-500 text-xs">
                <FaExclamationCircle className="mr-1" />
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black p-2 rounded-md font-semibold hover:bg-yellow-500"
          >
            Create
          </button>
        </form>
        <div className="text-xs text-gray-600 mt-4">
          Already have an account?{" "}
          <button onClick={handleSignIn} className="text-blue-600">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
