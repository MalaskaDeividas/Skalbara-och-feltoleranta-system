import { 
    deleteBooking, 
    createBooking, 
    getBookingForUser,
    createGuestBooking 
  } from "../controllers/booking";
  import { authenticateJWT } from "../controllers/auth";
  import express from 'express';
  
  const bookingRouter = express.Router();
  
  // Authenticated user booking
  bookingRouter.post("/", authenticateJWT, async (req, res) => {
    try {
      const booking = await createBooking(
        req.body.hotelID,
        req.user, // From JWT
        req.body.from_date,
        req.body.to_date
      );
      
      res.status(201).json({
        success: true,
        bookingId: booking._id,
        cost: booking.cost
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Booking failed"
      });
    }
  });
  
  // Guest booking (no authentication required)
  bookingRouter.post("/guest", async (req, res) => {
    try {
      const booking = await createGuestBooking(
        req.body.hotelID,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          country: req.body.country
        },
        req.body.from_date,
        req.body.to_date
      );
  
      res.status(201).json({
        success: true,
        bookingId: booking._id,
        cost: booking.cost
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Guest booking failed"
      });
    }
  });
  
  // Delete booking (authenticated users only)
  bookingRouter.delete("/:id", authenticateJWT, async (req, res) => {
    try {
      await deleteBooking(req.params.id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Delete failed"
      });
    }
  });
  
  // Get user bookings
  bookingRouter.get("/", authenticateJWT, async (req, res) => {
    try {
      const bookings = await getBookingForUser(req.user);
      res.status(200).json({ success: true, bookings });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get bookings"
      });
    }
  });
  
  export default bookingRouter;