// Controller/BookingController.ts
import { Booking } from "../Model/Booking";
import { Hotel } from "../Model/HotelModel";
import { PopulatedDoc } from 'mongoose';

interface PopulatedHotel {
  display?: {
    title?: string;
    price?: number;
    // Add other display properties if needed
  };
  // Add other hotel properties if needed
}

// Define the populated booking type
interface PopulatedBooking {
  _id: string;
  hotel: PopulatedDoc<PopulatedHotel>;
  user: string;
  to_date: Date;
  from_date: Date;
  cost: number;
}

const validateBookingDates = (fromDate: Date, toDate: Date) => {
  const timeNow = Date.now();
  const days = Math.round((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24));
  
  if (days < 0) throw new Error("Invalid dates");
  if (fromDate.getTime() < timeNow || toDate.getTime() < timeNow) {
    throw new Error("Dates cannot be in the past");
  }
};

const calculateBookingCost = async (hotelID: string, days: number) => {
  const hotel = await Hotel.findById(hotelID);
  if (!hotel) throw new Error("Hotel not found");
  if (!hotel.display?.price) throw new Error("Hotel price not available");
  return hotel.display.price * days;
};

export const createBooking = async (
  hotelID: string,
  user: string,
  from_date: string,
  to_date: string
) => {
  const date1 = new Date(from_date);
  const date2 = new Date(to_date);
  validateBookingDates(date1, date2);
  
  const days = Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  const cost = await calculateBookingCost(hotelID, days);

  return Booking.create({
    hotel: hotelID,
    user,
    from_date: date1,
    to_date: date2,
    cost,
    isGuestBooking: false
  });
};

export const createGuestBooking = async (
  hotelID: string,
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  },
  from_date: string,
  to_date: string
) => {
  const date1 = new Date(from_date);
  const date2 = new Date(to_date);
  validateBookingDates(date1, date2);

  const days = Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  const cost = await calculateBookingCost(hotelID, days);

  return Booking.create({
    hotel: hotelID,
    guestDetails,
    from_date: date1,
    to_date: date2,
    cost,
    isGuestBooking: true
  });
};

// Function to retrieve bookings for a specific user
export async function getBookingForUser(username: string) {
  const bookings = await Booking.find({ user: username })
    .populate<{ hotel: typeof Hotel }>('hotel')
    .lean()
    .exec();

  return bookings.map(booking => ({
    id: booking._id.toString(),
    user: booking.user,
    to_date: booking.to_date.toISOString().split('T')[0],
    from_date: booking.from_date.toISOString().split('T')[0],
    cost: booking.cost
  }));
}

// Function to delete a booking by its ID
export async function deleteBooking(bookingId: string) {
    
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        
        if (!booking) {
            throw new Error('Error 001: Booking not found');
        }
        
    } catch (error) {
        
        if (error instanceof Error) {
            console.error('Error retrieving booking by ID:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw error;
    }
}