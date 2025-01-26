import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { DatePicker} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

// HotelDate component for selecting check-in and check-out dates
const HotelDate = () => {

    const [dateCheckIn, setDateCheckIn] = useState<Date |null> (null);
    const [dateCheckOut, setDateCheckOut] = useState<Date |null> (null);

    return (
        
        <Grid>
            <Box 
                sx={{border: '2px solid #1976d2',
                    padding: '10px',
                    borderRadius: '8px',
                    maxWidth: '400px',
                    margin: 'auto',
                    mt: 2
                }}
            >
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker 
                                label='Check-in' 
                                value={dateCheckIn}
                                onChange={(value) => setDateCheckIn(value)}/>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label='Check-out' 
                                value={dateCheckOut}
                                onChange={(value) => setDateCheckOut(value)}/>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Box>
        </Grid>

    );
};

export default HotelDate;