import axios from "axios";

// Set up Axios instance with the base URL
const api = axios.create({
    baseURL: "http://127.0.0.1:8000", // Base URL
});

// Function to fetch trips
export const fetchTrips = async () => { 
    try {
        const response = await api.get("/api/trip"); 
        return response.data; 
    } catch (error) { 
        console.error("Error fetching trips data:", error);
        throw error; 
    }
};

//Fetch the unique trip details
export const fetchTripById = async (tripId) => {
    try {
        const response = await api.get(`/api/trip/${tripId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// save the trip data
export const saveTrip = async (tripData) => {
    try{
        const response = await api.post("/api/trip", tripData);
        return response.data;
    }catch(error){
        console.error("Error saving trip data:", error);
        throw error;
    }
}