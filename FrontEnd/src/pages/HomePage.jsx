import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="flexCenter">
      <h2>WELCOME TO EVENTPLANNER360</h2>
      <div>
        <ul className="flexCenter">
          <Link to="/events">Events</Link>
          <p>
            Manage and organize all your events in one place. <br />
            Create, edit, and view event details easily.
          </p>
        </ul>

        <ul className="flexCenter">
          <Link to="/vendors">Vendors</Link>
          <p>
            Keep track of vendors associated with your events. <br /> Manage
            contacts and vendor services.
          </p>
        </ul>

        <ul className="flexCenter">
          <Link to="/guests">Guests</Link>
          <p>
            Invite and manage guests for your events. <br /> Track RSVPs and
            send invitations.
          </p>
        </ul>

        <ul className="flexCenter">
          <Link to="/budget">Budget</Link>
          <p>
            Plan and monitor your event budget. <br /> Track expenses and ensure
            you stay within your limits.
          </p>
        </ul>
        <ul className="flexCenter">
          <Link to="/guests/rsvp/:guestId">check your RSVP</Link>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
