import React, { useState, useContext } from "react";
import { Grid, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { LoggedinContext, UsernameContext } from "../../index";
import { CreateBooking } from "../../Controller/BookingController";

// Styled Button
const CuteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007BFF",
  color: "#FFFFFF",
  padding: "10px 20px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  transition: "background-color 0.3s ease",
}));

// HotelBooking Component
const HotelBooking = () => {
  const [dateCheckIn, setDateCheckIn] = useState<Date | null>(null);
  const [dateCheckOut, setDateCheckOut] = useState<Date | null>(null);
  const { hotelId } = useParams();
  const { loggedin } = useContext(LoggedinContext);
  const { globalUsername } = useContext(UsernameContext);

  // Guest user details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const timeNow = Number(Date.now());

  const handleBookHotel = async () => {
    if (!dateCheckIn || !dateCheckOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    } else if (dateCheckIn > dateCheckOut) {
      alert("Please choose a valid date range.");
      return;
    } else if (Number(dateCheckIn) < timeNow || Number(dateCheckOut) < timeNow) {
      alert("Please choose a valid date.");
      return;
    }

    // If user is not logged in, validate guest details
    if (!loggedin && (!guestName || !guestEmail)) {
      alert("Please enter your name and email to continue as a guest.");
      return;
    }

    const fromDate = dateCheckIn.toString();
    const toDate = dateCheckOut.toString();
    const bookingName = loggedin ? globalUsername : guestName;
    const bookingEmail = loggedin ? "" : guestEmail; // Leave empty for logged-in users

    try {
      if (!hotelId) {
        throw new Error("Cannot book hotel without ID.");
      }

      // Send booking request
      await CreateBooking(hotelId, bookingName, fromDate, toDate, bookingEmail);
      alert("Booking successful!");
      window.location.reload();
    } catch {
      alert("Error booking hotel. Please try again.");
    }
  };

  return (
    <Grid>
      <Box
        sx={{
          border: "2px solid #1976d2",
          padding: "10px",
          borderRadius: "8px",
          maxWidth: "400px",
          margin: "auto",
          mt: 2,
        }}
      >
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker label="Check-in" value={dateCheckIn} onChange={(value) => setDateCheckIn(value)} />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker label="Check-out" value={dateCheckOut} onChange={(value) => setDateCheckOut(value)} />
            </LocalizationProvider>
          </Grid>

          {/* Show guest details input if not logged in */}
          {!loggedin && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name *"
                  variant="outlined"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address *"
                  variant="outlined"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CuteButton variant="contained" onClick={handleBookHotel}>
          Book now!
        </CuteButton>
      </Box>
    </Grid>
  );
};

export default HotelBooking;
