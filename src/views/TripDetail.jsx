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

    function parseLocation(location) {
        try {
            return { lat: location.lat, lon: location.lon };
        } catch (error) {
            console.error("Error parsing location:", error);
            return null; // Or return a default value or error marker
        }
    }

    // In your useEffect or wherever you are handling the fetched data
    useEffect(() => {
        fetchTripById(tripId)
            .then((data) => {
                const currentLocation = JSON.parse(data.data.current_location.replace(/'/g, '"'));
                const pickupLocation = JSON.parse(data.data.pickup_location.replace(/'/g, '"'));
                const dropoffLocation = JSON.parse(data.data.dropoff_location.replace(/'/g, '"'));
    
                // Coordinates array for current, pickup, and dropoff locations
                const coordinates = [
                    [currentLocation.lat, currentLocation.lon],
                    [pickupLocation.lat, pickupLocation.lon],
                    [dropoffLocation.lat, dropoffLocation.lon]
                ];
    
                // Map waypoints to actual coordinates and ensure the dropoff location is included
                const wayPoints = data.route_instructions.flatMap(instruction =>
                    instruction.way_points.map(index => coordinates[index])
                );
    
                // Explicitly ensure dropoff location is part of the waypoints
                if (!wayPoints.includes([dropoffLocation.lat, dropoffLocation.lon])) {
                    wayPoints.push([dropoffLocation.lat, dropoffLocation.lon]);
                }
    
                // Ensure the route has valid coordinates
                const validWayPoints = wayPoints.filter(point =>
                    Array.isArray(point) &&
                    point.length === 2 &&
                    point.every(coord => !isNaN(coord))
                );
    
                // Set trip and route data
                setTrip(data);
                setRoute(validWayPoints);
    
                setStops([
                    { position: parseLocation(currentLocation), label: "Current Location" },
                    { position: parseLocation(pickupLocation), label: "Pickup Location" },
                    { position: parseLocation(dropoffLocation), label: "Dropoff Location" },
                ]);
    
                // Set log sheets data
                setLogSheets(data.log_sheet);
    
                // Set route instructions
                setRouteInstructions(data.route_instructions);
            })
            .catch((error) => {
                console.error("Error fetching trip details:", error);
            });
    }, [tripId]);
    
    // Use hardcoded values for center and zoom
    const centerLatLon = [10, -10]; // default map center
    const zoomLevel = 2; // zoom level

    if (!trip) {
        return <div className="text-center py-10">Loading trip details...</div>;
    }

    return (
        <div className="w-full">
            <Header title="Trip details" />

            <div className="flex justify-between items-center">
                <h3 className="text-xl text-gray-700 font-semibold">Trip details</h3>

                <div className="flex space-x-4 mt-2">
                    <Link
                        to='/list'
                        className="flex items-center bg-[#5ead8a] text-white px-4 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-[#5ead8a]"
                    >
                        <Table className="mr-1" size={14} />
                        Trip list
                    </Link>
                    <Link
                        to='/trip/new'
                        className="flex items-center bg-[#5ead8a] text-white px-4 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-[#5ead8a]"
                    >
                        <PlusCircle className="mr-1" size={14} />
                        Trip new
                    </Link>
                </div>
            </div>

            <div className="justify-between bg-white items-start border border-gray-100 rounded-md mt-6 px-4 py-4">

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
