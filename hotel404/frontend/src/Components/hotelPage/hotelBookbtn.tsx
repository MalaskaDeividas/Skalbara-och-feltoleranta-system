import React, { useState, useContext } from "react";
import { Grid, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { LoggedinContext, UsernameContext } from "../../index";
import { CreateBooking } from "../../Controller/BookingController";

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

const HotelBooking = () => {
  const [dateCheckIn, setDateCheckIn] = useState<Date | null>(null);
  const [dateCheckOut, setDateCheckOut] = useState<Date | null>(null);
  const { hotelId } = useParams();
  const { loggedin } = useContext(LoggedinContext);
  const { globalUsername } = useContext(UsernameContext);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const navigate = useNavigate();
  const timeNow = Number(Date.now());

  const validateDates = () => {
    if (!dateCheckIn || !dateCheckOut) {
      alert("Please select both check-in and check-out dates.");
      return false;
    }
    if (dateCheckIn > dateCheckOut) {
      alert("Please choose a valid date range.");
      return false;
    }
    if (Number(dateCheckIn) < timeNow || Number(dateCheckOut) < timeNow) {
      alert("Please choose a valid date.");
      return false;
    }
    return true;
  };

  const handleBookHotel = async () => {
    if (!validateDates()) return;

    const checkIn = dateCheckIn!;
    const checkOut = dateCheckOut!;
    if (loggedin) {
      try {
        if (!hotelId) throw new Error("Missing hotel ID");
        await CreateBooking(
          hotelId,
          globalUsername,
          checkIn.toString(),
          checkOut.toString(),
          ""
        );
        alert("Booking successful!");
        window.location.reload();
      } catch {
        alert("Error booking hotel");
      }
    } else {
      if (!guestName || !guestEmail) {
        alert("Please enter your name and email");
        return;
      }
      navigate("/book-now", {
        state: {
          hotelId,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          guestName,
          guestEmail
        }
      });
    }
  };

  return (
    <Grid>
      <Box sx={{ border: "2px solid #1976d2", padding: "10px", borderRadius: "8px", maxWidth: "400px", margin: "auto", mt: 2 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker 
                label="Check-in" 
                value={dateCheckIn} 
                onChange={setDateCheckIn} 
                minDate={new Date()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-out"
                value={dateCheckOut}
                onChange={setDateCheckOut}
                minDate={dateCheckIn || new Date()}
              />
            </LocalizationProvider>
          </Grid>

          {!loggedin && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name *"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email *"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CuteButton onClick={handleBookHotel}>
          Book now!
        </CuteButton>
      </Box>
    </Grid>
  );
};

export default HotelBooking;