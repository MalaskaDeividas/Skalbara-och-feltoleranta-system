import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { IHotel } from "../../Model/Hotel";
import { useNavigate } from "react-router-dom"; 
type HotelProps = IHotel


//Den här komponenten är till Hotel korten som displayar alla hotell i startsidan efter att man har loggat in
//Komponenten har emot bild, title, beskrivning, pris, stad och id för hotellet som ska visas i varje kort
const HotelCard: React.FC<HotelProps> = ({image, title, description, price, city, id}) => {
  //För att testa att man får in rätt id
  console.log(id); 
  const navigate = useNavigate();
  return (
    //Card Component från MUI
    <Card
      sx={{
        //Styling på kortet i sin helhet
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" }, 
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      
      <CardActionArea onClick={()=> navigate(`/hotelDetail/${id}`)}>
        {/*Hämtar data tillhörande varje hotell från databasen */}
        <CardMedia
          component="img"
          sx={{
            //För att göra att alla Cards får samma storlek även ifall bilderna är olika stora 
            height: { xs: "30vh", sm: "35vh", md:"40vh" },
            width: "100%",
            objectFit: "cover"
          }}
          image={image}
          alt="Image of the Hotel"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" >
            {city}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
          <Typography
            sx={{
              textAlign: "right",
              marginTop: "2vh",
              fontWeight: "bolder",
            }}
          >
            {price}$/Night
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HotelCard;
