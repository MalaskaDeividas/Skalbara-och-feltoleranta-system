import { Booking } from "../Model/Booking"; 
import { Hotel } from "../Model/HotelModel";


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
// Function to create a new booking
export async function createBooking(hotelID: string, user: string, from_date: string, to_date: string){ 
  let date1 = new Date(from_date); 
  let date2 = new Date(to_date); 
  let days = Math.round((date2.getTime()-date1.getTime()) /(1000*3600*24));
  let hotel = await Hotel.findById(hotelID);
  const timeNow = Date.now(); 
  
  const checkInDate = date1.toISOString().split('T')[0]; 
  const checkOutDate = date2.toISOString().split('T')[0]; 
  //If checkout date is less than checkin date, throw an error
  //Also throw an error if either date is before the current time
  if(days < 0){
    throw new Error("invalid dates"); 
  } else if(Number(date1) < timeNow || Number(date2) < timeNow){
    throw new Error("invalid dates"); 
  }
  if(!hotel){
    throw new Error("couldn't find hotel");
  }
  const cost = hotel.display?.price;
  if(!cost){
    throw new Error("Couldn't get hotel price"); 
  }
  const calculatedCost = cost * days; 
  await Booking.create({
    hotel: hotelID, 
    user: user, 
    from_date: checkInDate, 
    to_date: checkOutDate,
    cost: calculatedCost
  });
}

// Function to create a new booking for guest users
export async function createGuestBooking(hotelID: string, guestName: string, guestEmail: string, from_date: string, to_date: string) {
  let date1 = new Date(from_date);
  let date2 = new Date(to_date);
  let days = Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  let hotel = await Hotel.findById(hotelID);
  const timeNow = Date.now();

  const checkInDate = date1.toISOString().split('T')[0];
  const checkOutDate = date2.toISOString().split('T')[0];

  if (days < 0 || Number(date1) < timeNow || Number(date2) < timeNow) {
      throw new Error("Invalid dates");
  }
  if (!hotel) {
      throw new Error("Couldn't find hotel");
  }
  const cost = hotel.display?.price;
  if (!cost) {
      throw new Error("Couldn't get hotel price");
  }
  const calculatedCost = cost * days;

  await Booking.create({
      hotel: hotelID,
      guestName: guestName,
      guestEmail: guestEmail,
      from_date: checkInDate,
      to_date: checkOutDate,
      cost: calculatedCost
  });
}

// Function to retrieve bookings for a specific user
export async function getBookingForUser(username: string) {
  console.log(username); 
  const bookings = await Booking.find({user: username});
  console.log(bookings);
  var formattedBookings = []
  for(let booking of bookings) {
    console.log(booking); 
    const hotel = await Hotel.findById(booking.hotel);
    const formattedBooking = {
      id: booking.id,
      hotel: hotel?.display?.title, 
      user: booking.user, 
      to_date: booking.to_date.split("T")[0], 
      from_date: booking.from_date.split("T")[0], 
      cost: booking.cost
    }; 
    formattedBookings.push(formattedBooking); 
  }
  return formattedBookings; 
}
