import {IHotelDetails} from "../Model/Hotel";
import axios from "axios"; 

const API_URL = process.env.BACKEND_API_URL;



export async function getHotelInfo(){
  const hotels = await axios.get(`${ API_URL }/api/hotels/all`);
  const formattedHotels = hotels.data.map((hotel: any) => {
    return {
      ...hotel.display,
      id: hotel._id,
      image: hotel.hotel_img?.url || "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-outline-icon-vectors-png-image_1737857.jpg"
    }; 
  }); 
  return formattedHotels; 
}


export async function getHotelQuery(params: any){
  const hotels = await axios.get(`${ API_URL }/api/hotels/getHotels`, {params});
  const formattedHotels = hotels.data.map((hotel: any) => {
    return {
      ...hotel.display,
      id: hotel._id,
      image: hotel.hotel_img?.url || "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-outline-icon-vectors-png-image_1737857.jpg"
    }; 
  }); 
  return formattedHotels; 
}

export async function getHotelPage(id: string): Promise<IHotelDetails>{
  console.log(id); 
  const params = new URLSearchParams([['hotelId', id]]);
  const hotel = await axios.get(`${ API_URL }/api/hotels/hotelDetails`, {params});
  console.log(hotel.data); 
  return hotel.data; 
}
