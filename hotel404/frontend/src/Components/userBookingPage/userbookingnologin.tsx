import React, { useState, useEffect } from "react";
import { 
  TextField, Select, MenuItem, FormControl, InputLabel, 
  Checkbox, FormControlLabel, Radio, RadioGroup, 
  FormLabel, Button, Grid, Typography, Box 
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface BookingState {
  hotelId?: string;
  checkIn?: string;
  checkOut?: string;
  guestName?: string;
  guestEmail?: string;
}

const BookingForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingState = location.state as BookingState || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: bookingState.guestEmail || "",
    country: "Sverige",
    phone: "",
    hotelId: bookingState.hotelId || "",
    checkIn: bookingState.checkIn || "",
    checkOut: bookingState.checkOut || "",
    wantsConfirmation: true,
    isPrimaryGuest: "yes",
    isBusinessTrip: "no",
    privacyAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (bookingState.guestName) {
      const nameParts = bookingState.guestName.split(' ');
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(' ') || "";
      
      setFormData(prev => ({
        ...prev,
        firstName,
        lastName,
        email: bookingState.guestEmail || ""
      }));
    }
  }, [bookingState]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]+$/;

    if (!formData.firstName.trim()) errors.firstName = "Förnamn är obligatoriskt";
    if (!formData.lastName.trim()) errors.lastName = "Efternamn är obligatoriskt";
    if (!emailRegex.test(formData.email)) errors.email = "Ogiltig e-postadress";
    if (!formData.phone.trim()) errors.phone = "Telefonnummer är obligatoriskt";
    if (!phoneRegex.test(formData.phone)) errors.phone = "Ogiltigt telefonnummer";
    if (!formData.privacyAccepted) errors.privacy = "Du måste godkänna integritetspolicyn";
    if (!formData.checkIn || !formData.checkOut) errors.dates = "Ogiltiga datum";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/bookings/guest", {
        ...formData,
        checkIn: new Date(formData.checkIn),
        checkOut: new Date(formData.checkOut)
      });

      if (response.data.success) {
        navigate("/booking-confirmation", {
          state: {
            bookingId: response.data.bookingId,
            email: formData.email,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut
          },
          replace: true
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Bokningen misslyckades. Kontrollera uppgifterna och försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Add these helper components
  const FormError = ({ error }: { error?: string }) => 
    error ? <Typography color="error" variant="body2" sx={{ mt: 0.5 }}>{error}</Typography> : null;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, margin: "auto", p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      {/* Existing form fields */}

      {/* Example updated field with error handling */}
      <Grid item xs={6}>
        <TextField
          fullWidth
          name="firstName"
          label="Förnamn *"
          value={formData.firstName}
          onChange={handleInputChange}
          error={!!formErrors.firstName}
          disabled={isSubmitting}
        />
        <FormError error={formErrors.firstName} />
      </Grid>

      {/* Add similar error handling to all fields */}

      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox
            name="privacyAccepted"
            checked={formData.privacyAccepted}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />}
          label={<>
            Jag godkänner <a href="/privacy-policy" target="_blank">integritetspolicyn</a> *
          </>}
        />
        <FormError error={formErrors.privacy} />
      </Grid>

      <Grid item xs={12}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Finish Booking"}
        </Button>
      </Grid>
    </Box>
  );
};

export default BookingForm;