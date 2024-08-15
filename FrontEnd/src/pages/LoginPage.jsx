import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/user/userSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/users/login", formData);
      dispatch(loginSuccess(res.data));

      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className="container" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <div>{error}</div>
    </div>
  );
};

export default LoginPage;
