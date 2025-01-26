import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hotel: {
    type:mongoose.Schema.Types.ObjectId, ref: 'Hotel'
  }, 
  user: {
    type: String, 
    required: true
  }, 
  from_date: {
    type: String, 
    required: true
  }, 
  to_date: {
    type: String, 
    required: true
  },
  cost: {
    type: Number, 
    required: true
  }
});

export const Booking = mongoose.model('Bookings', bookingSchema); 
