import React from "react";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./HotelTemplate.css";
import { IPics } from "../../Model/HotelPics";

interface IHotelPics {
  hotels: IPics[]
}


function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}
//the hotelpage template, how pictures and such are set up.
const HotelTemplate: React.FC<IHotelPics> = ({ hotels }) => {
  return ( 
      <Grid item xs={12} sm={8}>
        <ImageList
          className="custom-image-list"
          sx={{ width: 700, height: 450 }}
          variant="quilted"
          cols={2}
          rowHeight={150}
        >
          {hotels.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols}
              rows={item.rows}
            >
              <img
                {...srcset(item.img, 150, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
  );
};
export default HotelTemplate;
