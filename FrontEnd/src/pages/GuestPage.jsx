import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const GuestPage = () => {
  const { currentEvent } = useSelector((state) => state.user);
  const [guests, setGuests] = useState([]);
  const [guestData, setGuestData] = useState({
    email: "",
    name: "",
    eventId: currentEvent?._id || "",
  });
  const [editingGuest, setEditingGuest] = useState(null);
  const [error, setError] = useState(""); // State for managing errors

  const url = "https://eventplanner360-backend.onrender.com";

  useEffect(() => {
    if (currentEvent?._id) {
      fetchGuests();
    } else {
      setError("Please create an event first, then come back to manage guests.");
    }
  }, [currentEvent?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestData({ ...guestData, [name]: value });
  };

  const fetchGuests = async () => {
    try {
      const response = await axios.get(`${url}/api/guests/get/${currentEvent._id}`);
      setGuests(response.data.guests);
      setError(""); // Clear any existing error message
    } catch (error) {
      console.error("Error fetching guests", error);
    }
  };

  const handleAddGuest = async () => {
    if (!currentEvent?._id) {
      setError("Please create an event first, then come back to add guests.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/guests/add`, {
        name: guestData.name,
        email: guestData.email,
        eventId: currentEvent._id,
      });
      setGuests([...guests, response.data.guest]);
      setGuestData({
        name: "",
        email: "",
      });
      setError(""); // Clear any existing error message
    } catch (error) {
      console.error("Error adding guest", error);
    }
  };

  const handleEditGuest = (guest) => {
    setGuestData({
      name: guest.name,
      email: guest.email,
    });
    setEditingGuest(guest._id);
  };

  const handleUpdateGuest = async () => {
    if (!currentEvent?._id) {
      setError("Please create an event first, then come back to update guests.");
      return;
    }

    try {
      const response = await axios.put(`${url}/api/guests/update/${editingGuest}`, {
        name: guestData.name,
        email: guestData.email,
        eventId: currentEvent._id,
      });

      setGuests(response.data.updatedGuest);
      setEditingGuest(null);
      setGuestData({
        name: "",
        email: "",
      });
      setError(""); // Clear any existing error message
    } catch (error) {
      console.error("Error updating guest", error);
    }
  };

  const handleDeleteGuest = async (guestId) => {
    try {
      await axios.delete(`${url}/api/guests/remove/${guestId}`);
      setGuests(guests.filter((guest) => guest._id !== guestId));
    } catch (error) {
      console.error("Error deleting guest", error);
    }
  };

  const handleInviteGuest = async (guest) => {
    if (!currentEvent?._id) {
      setError("Please create an event first, then come back to invite guests.");
      return;
    }

    try {
      await axios.post(`${url}/api/guests/invite/${guest._id}`, {
        email: guest.email,
        eventId: currentEvent._id,
      });
      alert(`Invitation sent to ${guest.name}`);
    } catch (error) {
      console.error("Error sending invitation", error);
    }
  };

  return (
    <div>
      <h2>Guest List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}

      {guests.length > 0 ? (
        <ul>
          {guests.map((guest) =>
            guest ? (
              <li className="container" key={guest._id}>
                {guest.name} ({guest.email}) - ({guest.rsvpStatus})
                <div>
                  <button onClick={() => handleEditGuest(guest)}>Edit</button>
                  <button onClick={() => handleDeleteGuest(guest._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleInviteGuest(guest)}>
                    Invite
                  </button>
                </div>
              </li>
            ) : null
          )}
        </ul>
      ) : (
        <p>Please create guests</p>
      )}

      <h3>{editingGuest ? "Update Guest" : "Add Guest"}</h3>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={guestData.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={guestData.email}
        onChange={handleInputChange}
      />
      <button onClick={editingGuest ? handleUpdateGuest : handleAddGuest}>
        {editingGuest ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default GuestPage;
