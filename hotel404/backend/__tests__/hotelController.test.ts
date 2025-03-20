import { getHotels, hotelFreeBetweenDates } from '../src/controllers/hotelController';
import { Hotel } from '../src/Model/HotelModel';
import { Booking } from '../src/Model/Booking';

// Mock the logger
jest.mock('../src/logger');

// Mock the Hotel and Booking models
jest.mock('../src/Model/HotelModel');
jest.mock('../src/Model/Booking');

describe('getHotels', () => {
  it('should return hotels filtered by city', async () => {
    // Mock Hotel.find to return a specific list of hotels
    (Hotel.find as jest.Mock).mockImplementation((query) => {
      if (query?.['display.city'] === 'City A') {
        return Promise.resolve([
          { _id: '1', display: { title: 'Hotel A', city: 'City A' } },
        ]);
      }
      return Promise.resolve([]);
    });

    // Mock Booking.find to return an empty array (no bookings)
    (Booking.find as jest.Mock).mockResolvedValue([]);

    const hotels = await getHotels('City A', '2023-12-01', '2023-12-05');
    expect(hotels.length).toBe(1);
    expect(hotels[0]?.display?.title).toBe('Hotel A');
  });

  it('should return all hotels if no city is provided', async () => {
    // Mock Hotel.find to return all hotels
    (Hotel.find as jest.Mock).mockResolvedValue([
      { _id: '1', display: { title: 'Hotel A', city: 'City A' } },
      { _id: '2', display: { title: 'Hotel B', city: 'City B' } },
    ]);

    // Mock Booking.find to return an empty array (no bookings)
    (Booking.find as jest.Mock).mockResolvedValue([]);

    const hotels = await getHotels(null, '2023-12-01', '2023-12-05');
    expect(hotels.length).toBe(2);
    expect(hotels[0]?.display?.title).toBe('Hotel A');
    expect(hotels[1]?.display?.title).toBe('Hotel B');
  });
});