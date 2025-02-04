import React, { useState } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Radio, RadioGroup, FormLabel, Button, Grid, Typography, Box } from "@mui/material";

const BookingForm: React.FC = () => {
  const [country, setCountry] = useState("Sverige");
  const [isPrimaryGuest, setIsPrimaryGuest] = useState("yes");
  const [isBusinessTrip, setIsBusinessTrip] = useState("no");

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Fyll i dina uppgifter
      </Typography>
      <Typography variant="body2" sx={{ backgroundColor: "#f0f0f0", padding: 1, borderRadius: 1 }}>
        💡 Nästan klar! Du behöver bara fylla i de obligatoriska fälten märkta med *
      </Typography>
      
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={6}>
          <TextField fullWidth label="Förnamn *" variant="outlined" required />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Efternamn *" variant="outlined" required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Mejladress *" variant="outlined" required helperText="E-postbekräftelsen skickas till den här adressen"/>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Land/region</InputLabel>
            <Select value={country} onChange={(e) => setCountry(e.target.value)}>
              <MenuItem value="Sverige">Sverige</MenuItem>
              <MenuItem value="Norge">Norge</MenuItem>
              <MenuItem value="Danmark">Danmark</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Telefonnummer *" variant="outlined" required InputProps={{ startAdornment: <Typography>SE +46</Typography> }} />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox />} label="Ja, jag vill ha gratis digital bekräftelse (rekommenderas)" />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Vem bokar du åt? (valfritt)</FormLabel>
            <RadioGroup value={isPrimaryGuest} onChange={(e) => setIsPrimaryGuest(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Jag är den primära gästen" />
              <FormControlLabel value="no" control={<Radio />} label="Bokningen är för någon annan" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Jobbresa? (valfritt)</FormLabel>
            <RadioGroup value={isBusinessTrip} onChange={(e) => setIsBusinessTrip(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Ja" />
              <FormControlLabel value="no" control={<Radio />} label="Nej" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Skicka
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingForm;
