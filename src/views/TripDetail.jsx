import { useState, useEffect } from "react";
import { PlusCircle, Table } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import 'leaflet/dist/leaflet.css';
import { useParams } from "react-router-dom";
import { fetchTripById } from "../api/api.js";
import RouteInstruction from "../components/RouteInstruction.jsx";
import LogSheet from "../components/LogSheet.jsx";
import MapContainerComponent from "../components/MapContainerComponent.jsx";

const TripDetail = () => {
    const [route, setRoute] = useState([]);
    const [stops, setStops] = useState([]);
    const [logSheets, setLogSheets] = useState([]);
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [routeInstructions, setRouteInstructions] = useState([]);

    useEffect(() => {
        async function fetchRoute() {
            try {
                const data = await fetchTripById(tripId);
                const currentLocation = JSON.parse(data.data.current_location.replace(/'/g, '"'));
                const pickupLocation = JSON.parse(data.data.pickup_location.replace(/'/g, '"'));
                const dropoffLocation = JSON.parse(data.data.dropoff_location.replace(/'/g, '"'));

                if (!currentLocation || !pickupLocation || !dropoffLocation) {
                    console.error("Error parsing locations");
                    return;
                }

                setTrip(data);
                setStops([
                    { position: { lat: currentLocation.lat, lon: currentLocation.lon }, label: "Current Location" },
                    { position: { lat: pickupLocation.lat, lon: pickupLocation.lon }, label: "Pickup Location" },
                    { position: { lat: dropoffLocation.lat, lon: dropoffLocation.lon }, label: "Dropoff Location" },
                ]);

                setLogSheets(data.log_sheet);
                setRouteInstructions(data.route_instructions);

                // Fetch the actual road route
                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${currentLocation.lon},${currentLocation.lat};${pickupLocation.lon},${pickupLocation.lat};${dropoffLocation.lon},${dropoffLocation.lat}?overview=full&geometries=geojson`
                );

                const routeData = await response.json();
                if (routeData.routes.length > 0) {
                    const coordinates = routeData.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    setRoute(coordinates);
                }

            } catch (error) {
                console.error("Error fetching trip details or route:", error);
            }
        }

        fetchRoute();
    }, [tripId]);

    const centerLatLon = [10, -10]; 
    const zoomLevel = 2;

    if (!trip) {
        return <div className="text-center py-10">Loading trip details...</div>;
    }

    return (
        <div className="w-full">
            <Header title="Trip details" />

            <div className="flex justify-between items-center">
                <h3 className="text-xl text-gray-700 font-semibold">Trip details</h3>

                <div className="flex space-x-4 mt-2">
                    <Link to='/list' className="flex items-center bg-[#5ead8a] text-white px-4 py-1 rounded-md shadow-md hover:bg-[#5ead8a]">
                        <Table className="mr-1" size={14} />
                        Trips
                    </Link>
                    <Link to='/trip/new' className="flex items-center bg-[#5ead8a] text-white px-4 py-1 rounded-md shadow-md hover:bg-[#5ead8a]">
                        <PlusCircle className="mr-1" size={14} />
                        New trip
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-md mt-6 px-4 py-4">
                <MapContainerComponent
                    center={centerLatLon}
                    zoom={zoomLevel}
                    route={route}
                    stops={stops}
                    routeInstructions={routeInstructions}
                />

                <LogSheet logSheets={logSheets} />

                <div className="w-full mt-6">
                    <h4 className="text-lg text-gray-700 font-semibold">Route Instructions</h4>
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                        {routeInstructions.map((instruction, index) => (
                            <RouteInstruction key={index} instruction={instruction} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetail;
