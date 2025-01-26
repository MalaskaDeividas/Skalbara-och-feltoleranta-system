export interface IHotel {
    id: string;
    price: string;
    image: string;
    description: string;
    title:string;
    city:string;
    key:string;
}

export interface IHotelDetails {
  page: {
    title: string, 
    description: string
  }, 
  hotel_img: {url: string}, 
  hall_img:{url: string}, 
  room_img:{url: string}, 
  bath_img:{url: string}, 
  food_img:{url: string}, 
  other_img:{url: string}
}
