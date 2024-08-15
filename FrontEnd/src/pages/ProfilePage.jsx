import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
} from "../redux/user/userSlice";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
 const url="https://eventplanner360-backend.onrender.com"
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await axios.put(`${url}/api/users/update-profile/${currentUser._id}`, formData);
      dispatch(updateUserSuccess(res.data));
      setEditMode(false);
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
console.log("formdata",formData);
console.log("currentuser",currentUser);

  return (
    <div>
      <h1>Profile</h1>
      {editMode ? (
        <form className="container" onSubmit={handleSaveProfile}>
          <input
            type="text"
            id="name"
            defaultValue={currentUser.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Name: {currentUser.name} </p>
          <p>Email: {currentUser.email }</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
      <div>{error}</div>
    </div>
  );
};

export default ProfilePage;
