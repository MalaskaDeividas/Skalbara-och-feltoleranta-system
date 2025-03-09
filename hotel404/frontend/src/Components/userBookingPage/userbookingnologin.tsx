import React, { useState } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Radio, RadioGroup, FormLabel, Button, Grid, Typography, Box } from "@mui/material";

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "Sverige",
    phone: "",
    wantsConfirmation: true,
    isPrimaryGuest: "yes",
    isBusinessTrip: "no"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your booking logic here
    console.log("Booking data:", formData);
    // You'll need to connect this to your booking API
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <Box 
    component="form" 
    onSubmit={handleSubmit}
    sx={{ maxWidth: 500, margin: "auto", padding: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Fyll i dina uppgifter
      </Typography>
      <Typography variant="body2" sx={{ backgroundColor: "#f0f0f0", padding: 1, borderRadius: 1 }}>
        💡 Nästan klar! Du behöver bara fylla i de obligatoriska fälten märkta med *
      </Typography>
      
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={6}>
          <TextField 
            fullWidth 
            name="firstName"
            label="Förnamn *" 
            value={formData.firstName}
            onChange={handleInputChange}
            required 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            fullWidth 
            name="lastName"
            label="Efternamn *" 
            value={formData.lastName}
            onChange={handleInputChange}
            required 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            name="email"
            label="Mejladress *" 
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required 
            helperText="E-postbekräftelsen skickas till den här adressen"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Land/region</InputLabel>
            <Select 
              name="country"
              value={formData.country} 
              onChange={(e) => setFormData(prev => ({...prev, country: e.target.value}))}
            >
              <MenuItem value="Sverige">Sverige</MenuItem>
              <MenuItem value="Norge">Norge</MenuItem>
              <MenuItem value="Danmark">Danmark</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            name="phone"
            label="Telefonnummer *" 
            value={formData.phone}
            onChange={handleInputChange}
            required 
            InputProps={{ startAdornment: <Typography>SE +46</Typography> }} 
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel 
            control={<Checkbox 
              name="wantsConfirmation"
              checked={formData.wantsConfirmation}
              onChange={handleInputChange}
            />} 
            label="Ja, jag vill ha gratis digital bekräftelse (rekommenderas)" 
          />
        </Grid>
        {/* ... rest of the radio groups ... */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Skicka
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingForm;
