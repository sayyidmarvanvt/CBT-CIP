import {  Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./components/NavigationBar";
import EventPage from "./pages/EventPage";
import VendorPage from "./pages/VendorPage";
import GuestPage from "./pages/GuestPage";
import RSVPPage from "./pages/RSVPPage";
import BudgetExpense from "./pages/BudgetExpense";

function App() {
  return (
    <>
       <ToastContainer />
       <NavigationBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/events" element={<EventPage/>}/>
        <Route path="/vendors" element={<VendorPage/>}/>
        <Route path="/guests" element={<GuestPage/>}/>
        <Route path="/guests/rsvp/:guestId" element={<RSVPPage/>}/>
        <Route path="/budget" element={<BudgetExpense/>}/>
      </Routes>
    </>
  );
}

export default App;

