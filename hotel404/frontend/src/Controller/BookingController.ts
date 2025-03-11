import { IBooking } from "../Model/Booking";
import axios from "axios"; 
export async function GetBookings() {
    //Kommer göra en API request sen men returnerar statisk data just nu
    const bookings = await axios.get("http://9.223.187.114/api/booking/");
    console.log(bookings.data); 
    return bookings.data; 
}
//För att hantera "cancel booking"
export async function DeleteBooking(id: string){
  const deleted = await axios.delete("http://9.223.187.114/api/booking", {data: {bookingId: id}}); 
}
//Skapar en bokning med hotell detaljerna samt binder det till användaren som utför bokningen
export async function CreateBooking(
  hotelId: string,
  user: string,
  from_date:string,
  to_date: string){

  await axios.post("http://9.223.187.114/api/booking/", {
    hotelID: hotelId,  
    user: user,
    from_date: from_date,
    to_date: to_date}); 
};  


//skapa ny CreateBookingEasy som gör samma som create booking men inte binder det till user utan endast email och tar all user info och sparar det till user.
// behövs ändring i bookings.ts backend för att det ska funka, även model perhaps.
export async function CreateBookingEasy (){};