import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RSVPPage = () => {
  const { guestId } = useParams(); // Get guestId from the URL
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [error, setError] = useState('');
 const url="https://eventplanner360-backend.onrender.com"
  console.log(guestId);
  
  useEffect(() => {
    // Fetch the current RSVP status
    const fetchRSVPStatus = async () => {
      try {
        const response = await axios.get(`${url}/api/guests/rsvp/${guestId}`);
        setRsvpStatus(response.data.rsvpStatus);
        
      } catch (error) {
        setError('Failed to load RSVP status.');
        
      }
    };

    fetchRSVPStatus();
  }, [guestId]);

  const handleRSVPChange = async (status) => {
    try {
      const response = await axios.put(`${url}/api/guests/rsvp/${guestId}`, { rsvpStatus: status });
      setRsvpStatus(response.data.guest.rsvpStatus);
    } catch (error) {
      setError('Failed to update RSVP status.');
    }
  };

  return (
    <div>
      <h1>RSVP for the Event</h1>
      <p>Your current RSVP status: <strong>{rsvpStatus}</strong></p>

      <div>
        <button onClick={() => handleRSVPChange('Accepted')}>Accept</button>
        <button onClick={() => handleRSVPChange('Declined')}>Decline</button>
        <button onClick={() => handleRSVPChange('Pending')}>Set as Pending</button>
      </div>
      <div>
        {error}
      </div>
    </div>
  );
};

export default RSVPPage;
