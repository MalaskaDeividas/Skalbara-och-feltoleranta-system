import React, { useEffect, useState } from 'react';
import { GetBookings, DeleteBooking } from "../../Controller/BookingController"; 

import Grid from '@mui/material/Grid2'; 
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table'; 
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import { Button } from '@mui/material';
import { IBooking } from '../../Model/Booking';

const Bookings: React.FC = () => {
  //Stores all the bookings
  const [bookingList, SetBookingList] = useState<IBooking[]>([]);
    const bookingsCall = async function(){
      const bookings = await GetBookings(); 
      SetBookingList(bookings); 
    }
  useEffect(() => {
    bookingsCall(); 
  }, [])
  //Function that handles cancellation
  const handleCancelation = async (id:string) => {
    await DeleteBooking(id); 
    bookingsCall(); 
  }
  return (
    <Grid container
    spacing={0}>
      <Grid size={12}
      display="flex"
      alignItems="center"
      justifyContent="center">
      <h1>My Bookings</h1></Grid>
      <Grid size={12}
      marginLeft={"100px"}
      marginRight={"100px"}>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 700}} aria-label="hotel bookings">
            <TableHead>
              <TableRow>
                <TableCell align="left">Hotel</TableCell>
                <TableCell align="left">From</TableCell>
                <TableCell align="left">To</TableCell>
                <TableCell align="left">Price ($)</TableCell>
                <TableCell></TableCell>
             </TableRow>
            </TableHead>
            <TableBody>
            {bookingList.map((booking) => (
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{booking.hotel}</TableCell>
              <TableCell align="left">{booking.from_date}</TableCell>
              <TableCell align="left">{booking.to_date}</TableCell>
              <TableCell align="left">{booking.cost.toString()} </TableCell>
              <TableCell align="left">
                <Button
                  type='submit'
                  color='primary'
                  size='large'
                  variant='contained'
                  fullWidth
                  onClick={() => handleCancelation(booking.id)}
                >Cancel</Button>
              </TableCell>
            </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Bookings;

