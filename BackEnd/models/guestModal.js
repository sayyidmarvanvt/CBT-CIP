import mongoose from "mongoose";

const guestSchema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
event:{type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
rsvpStatus: { type: String, enum: ['Accepted', 'Declined', 'Pending'], default: 'Pending' }
},{ timestamps: true })


const guestModel=mongoose.model('Guest',guestSchema)

export default guestModel;