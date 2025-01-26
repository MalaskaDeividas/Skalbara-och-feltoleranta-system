import React, { useState , useContext} from "react";
import { Grid, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IHotel } from '../../Model/Hotel';
import { useParams } from "react-router-dom";
import { useProps } from "@mui/x-data-grid/internals";
import { LoggedinContext , UsernameContext} from "../../index";
import { CenterFocusStrong } from "@mui/icons-material";
import { CreateBooking } from "../../Controller/BookingController";
//the hotel booking boton that is used to book after putting in dates after chooisng hotel.

interface IHotelDetails {
    id: string;
    title: string;
    description: string;
    city: string;
    price: number;
    hotel_img: string;
  }

  // The blue button
const CuteButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#007BFF', 
    color: '#FFFFFF', 
    padding: '10px 20px',
    borderRadius: '8px', 
    '&:hover': {
        backgroundColor: '#0056b3',
    },
    transition: 'background-color 0.3s ease',
}));

// HotelBooking component for selecting check-in and check-out dates and booking the hotel.
const HotelBooking = () => {
    const [dateCheckIn, setDateCheckIn] = useState<Date | null>(null);
    const [dateCheckOut, setDateCheckOut] = useState<Date | null>(null);
    const {hotelId }= useParams();
    console.log(hotelId); 
    const {globalUsername, setGlobalUsername} = useContext(UsernameContext); 

    const timeNow = Number(Date.now()); 
    const handleBookHotel = async () => {
        if(!dateCheckIn || !dateCheckOut) {
            alert("Please select both check-in and check-out dates.");
            return;
        } else if (dateCheckIn > dateCheckOut){
            alert("Please choose a valid date");
            return;
        } else if(Number(dateCheckIn) < timeNow || Number(dateCheckOut) < timeNow){
          alert("Please choose a valid date"); 
          return; 
        }

        const fromDate = dateCheckIn.toString();
        const toDate = dateCheckOut.toString();
        console.log(fromDate, toDate); 
        try 
        {   
            if(!hotelId){
              throw new Error("can't book hotel without ID"); 
            }
            await CreateBooking(hotelId, globalUsername, fromDate, toDate); 
            alert("Booking successful!");
            window.location.reload();
        }
        catch 
        {
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
                  <DatePicker
                    label="Check-in"
                    value={dateCheckIn}
                    onChange={(value) => setDateCheckIn(value)}
                  />
                </LocalizationProvider>
              </Grid>
    
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Check-out"
                    value={dateCheckOut}
                    onChange={(value) => setDateCheckOut(value)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
          <Box 
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center"
            }}>
                <CuteButton variant="contained" onClick={handleBookHotel}>
                Book now!
                </CuteButton>
          </Box>
        </Grid>
      );
    };


export default HotelBooking;
