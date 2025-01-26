import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type DescriptionProps = {
  name: string;
  desc: string;
};
// hotelcomponent that shows description to the hotels
const HotelDescription = ({ desc, name }: DescriptionProps) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 980, padding: 2, border: "none", margin: "0 auto" }}
        >
          <Typography variant="h4" align="center">
            {name}
          </Typography>
          <Typography>{desc}</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HotelDescription;
