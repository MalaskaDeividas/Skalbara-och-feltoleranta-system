import * as React from "react";
import Grid from "@mui/material/Grid";
import HotelDescription from "./hotelDescription";
import HotelBooking from "./hotelBookbtn";
import { getHotelPage } from "../../Controller/HotelController";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IHotelDetails } from "../../Model/Hotel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
//För att använda Styling
import "./hotelPage.css";

const HotelPage = () => {
  const { hotelId } = useParams();
  console.log(hotelId);
  const [hotel, setHotel] = useState<IHotelDetails>();
  const [validHotel, setValidHotel] = useState<Boolean>(true); 
  //Funktionen används för att hämta data som tillhör en specifik hotel mha hotelId som tillhör detta hotell
  const getHotelInfo = async function () {
    try{
      //Ifall hotelId är null eller tom kommer den att skicka en tom sträng tillbaka
      const hotel = await getHotelPage(hotelId? hotelId : "");
      console.log(hotel); 
      setValidHotel(!(!hotel));
      setHotel(hotel); 
    } catch{
      setValidHotel(false); 
    }
  };
  useEffect(() => {
    getHotelInfo();  
  }, []);
  //Används för att hämta bilderna som tillhöra detta hotell som finns sparade i databasen
  const hotelImages = [
    { original: hotel ? hotel.hotel_img.url : "" },
    { original: hotel ? hotel.bath_img.url : "" },
    { original: hotel ? hotel.food_img.url : "" },
    { original: hotel ? hotel.room_img.url : "" },
    { original: hotel ? hotel.other_img.url : "" },
  ];
  return validHotel ? (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 2 }}
    >
      <div className="gallery-container">
        <ImageGallery
          showFullscreenButton={false}
          showPlayButton={false}
          items={hotelImages}
          
        />
      </div>

      <Grid item xs={12}>
        <HotelDescription
          desc={hotel ? hotel.page.description : ""}
          name={hotel ? hotel.page.title : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <div style={{ marginTop: 25 }}>
          <HotelBooking />
        </div>
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 2 }}
    >
    <h1>Could not find hotel</h1>
    </Grid>
  )
  {/*Ovanstående används ifall användaren försöker komma åt ett hotell som inte finns */}
};

export default HotelPage;
