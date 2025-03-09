// Model/Booking.ts
import mongoose from "mongoose";

const guestDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true }
});

const bookingSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  user: { type: String, required: false },
  guestDetails: guestDetailsSchema,
  from_date: { type: Date, required: true },
  to_date: { type: Date, required: true },
  cost: { type: Number, required: true },
  isGuestBooking: { type: Boolean, default: false }
});

interface BookingDocument extends Document {
  user?: string;
  guestDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
  from_date: Date;
  to_date: Date;
  cost: number;
  isGuestBooking: boolean;
}

export const Booking = mongoose.model('Booking', bookingSchema);

