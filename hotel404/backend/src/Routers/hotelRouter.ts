import { createHotel, getHotels, getAllHotels, getHotelDocumentById} from "../controllers/hotelController";

import express from "express";
import { Request } from "express";

const hotelRouter = express.Router(); 
// Route to get all hotels
hotelRouter.get("/all", async function(req, res){
  const hotels = await getAllHotels(); 
  res.status(200).send(hotels)
})
// Route to get available hotels based on city and date range
hotelRouter.get("/getHotels", async function(req, res){
  const city = req.query.city;
  const fromDate = req.query.dateCheckIn; 
  const toDate = req.query.dateCheckOut;
  console.log("query:", req.query); 

  if(!fromDate || !toDate){
    console.log("bad request"); 
    res.status(400).send('invalid request');
    return; 
  }
  const result = await getHotels(city, fromDate, toDate);
  console.log("hotels:", result); 
  res.send(JSON.stringify(result)).status(200); 
})
// Route to get hotel details by hotel ID
hotelRouter.get("/hotelDetails", async (req: Request<{hotelId: string}>, res) => {
  try{
    const query = req.query.hotelId ? String(req.query.hotelId) : "";
    const hotel = await getHotelDocumentById(query); 
    const result = {
      page: hotel.page, 
      hotel_img: hotel.hotel_img, 
      bath_img: hotel.bath_img, 
      hall_img: hotel.hall_img, 
      other_img: hotel.other_img, 
      food_img: hotel.food_img, 
      room_img: hotel.room_img
      
    }; 
    res.status(200).send(result); 
  }
  catch{
    res.sendStatus(400);
  }
})

// Route to create a new hotel
hotelRouter.post("/", async(req, res) => {
  try {
    await createHotel(req.body); 
    res.status(201).send(); 
  }
  catch {
    res.sendStatus(401); 
  }
})
export default hotelRouter; 
