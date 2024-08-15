import express from "express"
import { verifyToken } from "../Utility/verifyToken.js";
import { addGuest, getAllGuest, getGuest, getGuestRSVPStatus, inviteGuest, removeGuest, updateGuest, updateRSVPStatus } from "../controllers/guestController.js";

const guestRouter=express.Router()

guestRouter.post('/add',verifyToken,addGuest)
guestRouter.get('/get/:eventId',verifyToken,getAllGuest)
guestRouter.get('/get/:id',verifyToken,getGuest)
guestRouter.put('/update/:id',verifyToken,updateGuest)
guestRouter.delete('/remove/:id',verifyToken,removeGuest)

guestRouter.post("/invite/:id",verifyToken,inviteGuest)


//RSVP status
guestRouter.put('/rsvp/:guestId', verifyToken, updateRSVPStatus);
guestRouter.get('/rsvp/:guestId', verifyToken, getGuestRSVPStatus);

export default guestRouter;