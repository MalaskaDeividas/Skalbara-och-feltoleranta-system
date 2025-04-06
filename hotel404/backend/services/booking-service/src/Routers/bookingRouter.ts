import { deleteBooking, createBooking, getBookingForUser } from "../controllers/booking";
import { authenticateJWT } from "../controllers/auth";
import { Booking } from "../Model/Booking";
import express from 'express';
import logger from "../logger";

const bookingRouter = express.Router();
// Route to create a booking with JWT authentication
bookingRouter.post("/", authenticateJWT, async function(req, res){
    const hotelID = req.body.hotelID;
    const user = req.user;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;
    console.log(hotelID, user, from_date, to_date); 
    try {
        const bookingDone = await createBooking(hotelID, user, from_date, to_date);
        res.status(201).send("booking successful!");
        logger.info('Booking succesful!');
    } catch (error){
        res.status(400).send(error);
        logger.error('Booking unsuccesful');
    }
});


bookingRouter.delete("/:bookingId", authenticateJWT, async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    await deleteBooking(bookingId); // optionally check if it belongs to req.user
    logger.info(`Deleted booking ID: ${bookingId}`);
    res.sendStatus(200);
  } catch {
    logger.error(`Failed to delete booking ID: ${bookingId}`);
    res.status(400).send();
  }
});

bookingRouter.delete("/user/:username", async (req, res) => {
  const username = req.params.username;

  try {
    await Booking.deleteMany({ user: username });
    logger.info(`Deleted bookings for user ${username}`);
    res.sendStatus(200);
  } catch (error) {
    logger.error("Failed to delete bookings for user");
    res.status(500).json({ message: "Failed to delete bookings" });
  }
});

// Route to get bookings for the authenticated user
bookingRouter.get("/", authenticateJWT, async function(req, res){
  const username = req.user; 
  const bookings = await getBookingForUser(username);
  logger.info('Getting booking for user!');
  console.log(bookings); 
  res.send(bookings).status(200); 
});

// Route to get bookings for a specific hotel (used by hotel-service)
bookingRouter.get("/hotel/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;

  try {
    const bookings = await Booking.find({ hotel: hotelId });
    res.status(200).json(bookings);
    logger.info(`Sent bookings for hotel ID: ${hotelId}`);
  } catch (error) {
    logger.error(`Error fetching bookings for hotel ID: ${hotelId}`);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


export default bookingRouter;
