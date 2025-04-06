import axios from "axios";

const GATEWAY_URL = "http://gateway-service:8080"; // Or localhost:8080 if running outside Docker

export async function deleteBookingsByUsername(username: string) {
  try {
    await axios.delete(`${GATEWAY_URL}/api/booking/user/${username}`);
  } catch (error) {
    console.error("❌ Failed to delete bookings for user:", error);
    throw new Error("Failed to delete bookings");
  }
}
