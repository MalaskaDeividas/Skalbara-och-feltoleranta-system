import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, email } = location.state || {};

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tack för din bokning!
      </Typography>
      <Typography variant="body1" gutterBottom>
        En bekräftelse har skickats till {email}
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        Bokningsnummer: {bookingId}
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate("/")}
      >
        Tillbaka till startsidan
      </Button>
    </Box>
  );
};

export default BookingConfirmation;