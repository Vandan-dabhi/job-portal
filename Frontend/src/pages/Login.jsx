import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaBriefcase } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {

  const [usernameoremail, setUsernameoremail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/auth/login",
        {
          usernameoremail,
          password
        },
        {
          withCredentials: true
        }
      );

      toast.success("Login successful");

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  return (

    <div className="min-h-screen flex bg-linear-to-br from-slate-100 to-blue-100">

      {/* Left Side */}

      <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-center items-center px-12">

        <FaBriefcase className="text-7xl mb-6" />

        <h1 className="text-5xl font-bold mb-4">
          TalentBridge
        </h1>

        <p className="text-2xl font-medium mb-4 text-center">
          Find Your Dream Job
        </p>

        <p className="text-lg text-center max-w-md leading-relaxed">
          Apply to jobs, track applications,
          and connect with recruiters to build
          your career.
        </p>

      </div>

      {/* Right Side */}

      <div className="w-full md:w-1/2 flex justify-center items-center">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4"
        >

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500">
            Login to access your account
          </p>

          <input
            type="text"
            placeholder="Username or Email"
            value={usernameoremail}
            onChange={(e) => setUsernameoremail(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>

        </form>

      </div>

    </div>

  );
};

export default LoginPage;