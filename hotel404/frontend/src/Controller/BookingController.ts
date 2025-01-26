import { IBooking } from "../Model/Booking";
import axios from "axios"; 
export async function GetBookings() {
    //Kommer göra en API request sen men returnerar statisk data just nu
    const bookings = await axios.get("http://localhost:7700/api/booking/");
    console.log(bookings.data); 
    return bookings.data; 
}
//För att hantera "cancel booking"
export async function DeleteBooking(id: string){
  const deleted = await axios.delete("http://localhost:7700/api/booking", {data: {bookingId: id}}); 
}
//Skapar en bokning med hotell detaljerna samt binder det till användaren som utför bokningen
export async function CreateBooking(
  hotelId: string,
  user: string,
  from_date:string,
  to_date: string){

  await axios.post("http://localhost:7700/api/booking/", {
    hotelID: hotelId,  
    user: user,
    from_date: from_date,
    to_date: to_date}); 
};  
