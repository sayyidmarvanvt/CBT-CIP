import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const RegisterPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "https://eventplanner360-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post(`${url}/api/users/register`, formData, {
        withCredentials: true,
      });
      dispatch(signInSuccess(res.data));
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch(signInFailure(errorMessage));
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form className="container" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
