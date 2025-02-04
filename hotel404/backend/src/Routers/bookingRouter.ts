import { deleteBooking, createBooking, getBookingForUser } from "../controllers/booking";
import { authenticateJWT } from "../controllers/auth";
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
// Route to delete a booking by ID
bookingRouter.delete("/", async function(req, res) {

    const bookingId = req.body.bookingId;

    try {
        const bookingDeleted = await deleteBooking(bookingId);
        logger.info('Deleting booking!');
        res.status(200).send();
    } catch {
        logger.error('Booking deletion failed');
        res.status(400).send();
    }
});
// Route to get bookings for the authenticated user
bookingRouter.get("/", authenticateJWT, async function(req, res){
  const username = req.user; 
  const bookings = await getBookingForUser(username);
  logger.info('Getting booking for user!');
  console.log(bookings); 
  res.send(bookings).status(200); 
})

export default bookingRouter;
