import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  vendorFailure,
  vendorSuccess,
  vendorStart,
} from "../redux/user/userSlice";

const VendorPage = () => {
  const { currentEvent, vendors = [] } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [vendorDetails, setVendorDetails] = useState({
    name: "",
    contact: "",
    serviceType: "",
    status: "Pending",
    eventId: currentEvent?._id,
  });
  const [editingVendor, setEditingVendor] = useState(null);
   const url="https://eventplanner360-backend.onrender.com"

  useEffect(()=>{fetchVendors()},[currentEvent,vendors])

  const fetchVendors = async () => {
    if (!currentEvent?._id) return;
    dispatch(vendorStart());
    try {
      const res = await axios.get(`${url}/api/vendors/event/${currentEvent._id}`);
      dispatch(vendorSuccess(res.data.vendors));
    } catch (error) {
      dispatch(vendorFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setVendorDetails({ ...vendorDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(vendorStart());
    try {
      const res = await axios.post(`${url}/api/vendors/create`, vendorDetails);
      dispatch(vendorSuccess([...vendors, res.data.vendor]));
      setVendorDetails({
        name: "",
        contact: "",
        serviceType: "",
        status: "Pending",
        eventId: currentEvent?._id,
      });
    } catch (error) {
      dispatch(vendorFailure(error.message));
    }
  };
  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setVendorDetails({
      name: vendor.name,
      contact: vendor.contact,
      serviceType: vendor.serviceType,
      status: vendor.status,
      eventId: vendor.eventId,
    });
  };

  const handleUpdate = async (e) => {
    console.log("1");

    e.preventDefault();
    dispatch(vendorStart());
    try {
      const res = await axios.put(
        `${url}/api/vendors/update/${editingVendor._id}`,
        vendorDetails
      );
      // console.log();

      // const updatedVendors = vendors.map((vendor) =>
      //   vendor._id === res.data.updatedVendor._id
      //     ? res.data.updatedVendor
      //     : vendor
      // );
    

      dispatch(vendorSuccess(res.data.updatedVendor));
      setEditingVendor(null);
      setVendorDetails({
        name: "",
        contact: "",
        serviceType: "",
        status: "Pending",
        eventId: currentEvent?._id,
      });
    } catch (error) {
      dispatch(vendorFailure(error.message));
    }
  };

  const handleDelete = async (vendorId) => {
    dispatch(vendorStart());
    try {
      await axios.delete(`${url}/api/vendors/delete/${vendorId}`);
      const updatedVendors = vendors.filter(
        (vendor) => vendor._id !== vendorId
      );
      dispatch(vendorSuccess(updatedVendors));
    } catch (error) {
      dispatch(vendorFailure(error.message));
    }
  };

  const addVendorToEvent = async (vendorId) => {
    if (!currentEvent?._id) return;
    dispatch(vendorStart());
    try {
      const res = await axios.post(`${url}/api/vendors/addToEvent`, {
        vendorId,
        eventId: currentEvent._id,
      });
      dispatch(vendorSuccess(res.data.vendors));
    } catch (error) {
      dispatch(vendorFailure(error.message));
    }
  };

  return (
    <div>
      {/* Vendor List */}
      <div>
        <h2>Vendors</h2>
        {vendors.length > 0 ? (
          <ul>
            {vendors.map((vendor) =>
              vendor ? ( // Add this check
                <li key={vendor._id}>
                  {vendor.name} - {vendor.serviceType} - {vendor.status}
                  <button onClick={() => handleEdit(vendor)}>Edit</button>
                  <button onClick={() => handleDelete(vendor._id)}>
                    Delete
                  </button>
                  <button onClick={() => addVendorToEvent(vendor._id)}>
                    Add to Event
                  </button>
                </li>
              ) : null // If vendor is null, render nothing
            )}
          </ul>
        ) : (
          <p>No vendors available for this event.</p>
        )}
        {/* <button onClick={fetchVendors}>Refresh Vendors</button> */}
      </div>

      {/* Vendor Creation Form */}
      <div>
        <h2>{editingVendor ? "Update Vendor" : "Create Vendor"}</h2>
        <form
          className="container"
          onSubmit={editingVendor ? handleUpdate : handleSubmit}
        >
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={vendorDetails.name}
            onChange={handleChange}
            required
          />
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={vendorDetails.contact}
            onChange={handleChange}
            required
          />
          <label>Service Type:</label>
          <input
            type="text"
            name="serviceType"
            value={vendorDetails.serviceType}
            onChange={handleChange}
            required
          />
          <label>Status:</label>
          <select
            name="status"
            value={vendorDetails.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">
            {editingVendor ? "Update Vendor" : "Create Vendor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorPage;
