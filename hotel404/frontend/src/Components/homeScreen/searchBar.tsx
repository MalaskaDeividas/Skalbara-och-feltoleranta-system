import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { DatePicker} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

//the searchbar that takes city, from-to date and then sends it through searchResult backend to check if it exists, send back info on a new page.
const SearchBar = () => {
  const [city, setCity] = useState<string>("");
  const [dateCheckIn, setDateCheckIn] = useState<Date |null> (null);
  const [dateCheckOut, setDateCheckOut] = useState<Date |null> (null);
  const navigate = useNavigate();
  const from = Number(dateCheckIn); // Converts the dates to numbers, so we can compare. 
  const to = Number(dateCheckOut); // check out date can not be before check in date for example.
  const today = new Date();
  const todayDate = today.toLocaleDateString('en');
  
  // The city and dates must be valid to be able to search for hotels.
  const handleSearch = () => {
    const queryToDate = dateCheckOut?.toString()
    const queryFromDate = dateCheckIn?.toString()
    if (from > to ){
      alert("Please select valid dates");
    } 
    else if(from < Number(today) || to < Number(today)){
      alert("Please select valid dates"); 
    }

    else if (city && dateCheckIn && dateCheckOut) {
      navigate(`/search-results?city=${city}&checkIn=${queryFromDate}&checkOut=${queryToDate}`);
    } else {
      alert("Please select a city and dates");
    }
  };

  return (

    <Grid>
      <Box
        sx={{
          border: '2px solid #1976d2',
          padding: '10px',
          borderRadius: '8px',
          maxWidth: '700px',
          margin: 'auto',
          mt: 5
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <SearchIcon color="primary" fontSize="large"/>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Search for cities"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker 
                label='Check-in' 
                value={dateCheckIn}
                onChange={(value) => setDateCheckIn(value)}/>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Check-out' 
                value={dateCheckOut}
                onChange={(value) => setDateCheckOut(value)}/>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SearchBar;

