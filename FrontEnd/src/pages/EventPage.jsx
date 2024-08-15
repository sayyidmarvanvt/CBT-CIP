import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  eventFailure,
  eventStart,
  eventSuccess,
} from "../redux/user/userSlice";

const EventPage = () => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const [eventsList, setEventsList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);

  const { currentEvent, loading, error } = useSelector((state) => state.user);
  const url = "https://eventplanner360-backend.onrender.com";
  const dispatch = useDispatch();

  useEffect(() => {
    getEventList();
  }, [currentEvent]);

  const getEventList = async () => {
    try {
      const eventsResponse = await axios.get(`${url}/api/events/get`, {
        withCredentials: true,
      });
      setEventsList(eventsResponse.data.events || []);
    } catch (error) {
      dispatch(eventFailure(error));
    }
  };

  const formatDate = (dateString) => {
    // Convert ISO date to yyyy-MM-dd format
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); 
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleCreate = async () => {
    dispatch(eventStart());
    try {
      // Create the event
      const createResponse = await axios.post(
        `${url}/api/events/create`,
        eventData,
        {
          withCredentials: true,
        }
      );
      dispatch(eventSuccess(createResponse.data));
      setEventData({
        title: "",
        date: "",
        location: "",
        description: "",
      });
      setIsEditing(false); 
      await getEventList();
    } catch (err) {
      dispatch(eventFailure(err));
    }
  };

  const handleSelect = async (eventId) => {
    try {
      const eventResponse = await axios.get(`${url}/api/events/get/${eventId}`);
      setSelectedEvent(eventResponse.data);
      dispatch(eventSuccess(eventResponse.data));
    } catch (error) {
      dispatch(eventFailure(error));
    }
  };

  const handleEdit = async (eventId) => {
    try {
      const eventResponse = await axios.get(`${url}/api/events/get/${eventId}`);
      // Format date to yyyy-MM-dd
      const formattedDate = formatDate(eventResponse.data.date);
      setEventData({ ...eventResponse.data, date: formattedDate });
      setSelectedEvent(eventId);
      setIsEditing(true); 
    } catch (error) {
      dispatch(eventFailure(error));
    }
  };

  const handleUpdate = async () => {
    dispatch(eventStart());
    try {
      // Update the event
      const updateResponse = await axios.put(
        `/api/events/update/${selectedEvent}`,
        eventData
      );
      dispatch(eventSuccess(updateResponse.data));
      setEventData({
        title: "",
        date: "",
        location: "",
        description: "",
      });
      setIsEditing(false); // Reset editing state
      setSelectedEvent(null); // Clear selected event
      // Refresh the events list
      await getEventList();
    } catch (err) {
      dispatch(eventFailure(err));
    }
  };

  const handleDelete = async (eventId) => {
    try {
      console.log("Deleting event with ID:", eventId);
      await axios.delete(`/api/events/delete/${eventId}`);
      await getEventList();
    } catch (error) {
      dispatch(eventFailure(error));
    }
  };

  return (
    <div className="container">
      <h2>{isEditing ? "Update Event" : "Create Event"}</h2>
      <div>
        <label>
          Event Title:
          <input
            type="text"
            name="title"
            value={eventData.title || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={eventData.date || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventData.location || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={eventData.description || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <button onClick={isEditing ? handleUpdate : handleCreate}>
        {isEditing ? "Update" : "Create"}
      </button>
      <div>
        <h3>Created Events</h3>

        <ul>
          {eventsList.length > 0 &&
            eventsList.map((event) => (
              <li key={event._id}>
                <h4>{event.title}</h4>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
                <p>Description: {event.description}</p>
                <button onClick={() => handleSelect(event._id)}>Select</button>
                <button onClick={() => handleEdit(event._id)}>Edit</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        {!isEditing && selectedEvent && (
          <div>
            <h2>Selected Event</h2>
            <ul>
              <h4>Name: {selectedEvent.title}</h4>
              <p>Date: {formatDate(selectedEvent.date)}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Description: {selectedEvent.description}</p>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
