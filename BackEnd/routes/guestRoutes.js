import express from "express"
import { verifyToken } from "../Utility/verifyToken.js";
import { addGuest, getAllGuest, getGuest, getGuestRSVPStatus, inviteGuest, removeGuest, updateGuest, updateRSVPStatus } from "../controllers/guestController.js";

const guestRouter=express.Router()

guestRouter.post('/add',addGuest)
guestRouter.get('/get/:eventId',getAllGuest)
guestRouter.get('/get/:id',getGuest)
guestRouter.put('/update/:id',updateGuest)
guestRouter.delete('/remove/:id',removeGuest)

guestRouter.post("/invite/:id",inviteGuest)


//RSVP status
guestRouter.put('/rsvp/:guestId', updateRSVPStatus);
guestRouter.get('/rsvp/:guestId', getGuestRSVPStatus);

export default guestRouter;