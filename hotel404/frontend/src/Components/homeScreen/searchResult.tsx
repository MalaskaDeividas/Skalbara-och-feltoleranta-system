import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IHotel } from "../../Model/Hotel";
import axios from 'axios';
import DisplayHotel from "../hotelDisplay/displayHotelCard";
import {getHotelQuery} from "../../Controller/HotelController";  

//after searchBar been used, searchResult fetches from the backend the result onto a new page.

const SearchResults: React.FC = () => {
    const [hotels, setHotels] = useState<IHotel[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get("city");
    const checkIn = queryParams.get("checkIn");
    const checkOut = queryParams.get("checkOut");
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const params = { //checks if hotels with city name and checkin dates are availabel 
                  city: city ? city : "", 
                  dateCheckIn: checkIn ? checkIn: "", 
                  dateCheckOut: checkOut ? checkOut: ""
                }; 
                 
                const result = await getHotelQuery(params);  
                setHotels(result);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        fetchHotels();

    }, [city, checkIn, checkOut]);

    return (
      <div>
        <h2>Search Results</h2>
        <DisplayHotel hotels={hotels} />  
      </div>
    );
};

export default SearchResults;
