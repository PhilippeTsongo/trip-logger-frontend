import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { saveTrip } from "../api/api";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Table, RefreshCw, MapPin } from "lucide-react";
import Header from "../components/Header";
import L from "leaflet";
import "leaflet-routing-machine";
import { useRef } from "react";

// Define custom icons for pickup and dropoff locations
const pickupIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const dropoffIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const LocationPicker = ({ setPickupLocation, setDropoffLocation, resetTrigger }) => {
    const [locations, setLocations] = useState([]);

    // Reset locations when resetTrigger changes
    useEffect(() => {
        setLocations([]);
    }, [resetTrigger]);
    useMapEvents({
        click(e) {
            if (locations.length < 2) {
                const newLocation = { lat: e.latlng.lat, lon: e.latlng.lng };
                setLocations([...locations, newLocation]);

                if (locations.length === 0) {
                    setPickupLocation(newLocation);
                    toast.success("Pickup location selected!");
                } else {
                    setDropoffLocation(newLocation);
                    toast.success("Dropoff location selected!");
                }
            } else {
                toast.error("You can only select two locations: Pickup and Dropoff.");
            }
        },
    });

    return null;
};

const TripForm = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropoffLocation, setDropoffLocation] = useState(null);
    const [currentCycleHours, setCurrentCycleHours] = useState("");
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const routeControlRef = useRef(null);
    const [resetTrigger, setResetTrigger] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    toast.error("Unable to get current location");
                }
            );
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    }, []);

    // Function to reset locations and remove the route

    const handleResetLocations = () => {
        setPickupLocation(null);
        setDropoffLocation(null);
        setResetTrigger(prev => !prev);
        removeRoute();
        toast.success("Locations reset! Select new pickup and dropoff points.");
    };

    // Function to remove the route from the map
    const removeRoute = () => {
        if (routeControlRef.current) {
            mapRef.current.removeControl(routeControlRef.current);
            routeControlRef.current = null;
        }
    };

    // Function to add a route between pickup and dropoff locations
    useEffect(() => {
        if (pickupLocation && dropoffLocation && mapRef.current) {
            removeRoute();
            routeControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(pickupLocation.lat, pickupLocation.lon),
                    L.latLng(dropoffLocation.lat, dropoffLocation.lon),
                ],
                routeWhileDragging: true,
                createMarker: () => null, // Hide default markers
            }).addTo(mapRef.current);
        }
    }, [pickupLocation, dropoffLocation]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentLocation || !pickupLocation || !dropoffLocation || !currentCycleHours) {
            toast.error("Please select pickup, dropoff locations, and enter the cycle hours.");
            return;
        }

        const requestData = {
            current_location: currentLocation,
            pickup_location: pickupLocation,
            dropoff_location: dropoffLocation,
            current_cycle_hours: parseInt(currentCycleHours),
        };

        saveTrip(requestData)
            .then((data) => {
                toast.success("Trip created successfully!");
                navigate('/list');
                console.log("Trip created successfully:", data);
            })
            .catch((error) => {
                toast.error(error.response?.data?.error?.message || "Error creating trip.");
                console.error("Error creating trip:", error);
            });
    };

    return (
        <div className="w-full">
            <Header title="Trip details" />

            <div className="px-2 py-2 md:px-6 md:py-4 mt-5 bg-white shadow-md rounded-md">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl text-gray-700 font-bold mb-4">New Trip</h3>

                    <div className="flex space-x-4 mt-2">
                        <Link
                            to='/list'
                            className="flex items-center bg-[#5ead8a] text-white px-4 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-[#5ead8a]"
                        >
                            <Table className="mr-1" size={14} />
                            Trip list
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-5">
                        <label className="block text-sm text-gray-500">Current Cycle Hours</label>
                        <input
                            type="number"
                            value={currentCycleHours}
                            onChange={(e) => setCurrentCycleHours(e.target.value)}
                            className="border border-gray-200 p-2 rounded w-full"
                            required
                        />
                    </div>

                    <div className="h-96 w-full rounded-md relative">
                        <label className="block text-sm text-gray-500">Your current location is already selected</label>
                        <label className="block text-sm mb-2 text-gray-500">Click on the map to select the pickup and dropoff locations</label>

                        <MapContainer
                            center={[0, 0]}
                            zoom={2} style={{ height: "100%", width: "100%", borderRadius: "5px" }}
                            whenCreated={(map) => (mapRef.current = map)}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            <LocationPicker
                                setPickupLocation={setPickupLocation}
                                setDropoffLocation={setDropoffLocation}
                                resetTrigger={resetTrigger}
                            />

                            {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lon]} />}
                            {pickupLocation && <Marker position={[pickupLocation.lat, pickupLocation.lon]} icon={pickupIcon} />}
                            {dropoffLocation && <Marker position={[dropoffLocation.lat, dropoffLocation.lon]} icon={dropoffIcon} />}
                        </MapContainer>

                    </div>

                    {/* Preview selected locations */}
                    {pickupLocation && dropoffLocation && (
                        <div className="mt-16 p-3 border border-gray-200 rounded-md text-sm text-gray-600">
                            <h4 className="font-semibold text-lg">Selected locations</h4>
                            <div className="md:flex md:justify-between items-center mt-2 gap-5">

                                <div className="md:flex md:justify-between items-center mt-2 gap-5">
                                    <div className="flex items-center">
                                        <MapPin size={15}/><strong className="mr-5"> Current: </strong> {currentLocation.lat.toFixed(6)}, {currentLocation.lon.toFixed(6)}
                                    </div>
                                </div>
                                <div className="md:flex md:justify-between items-center mt-2 gap-5">
                                    <div className="flex items-center">
                                        <MapPin size={15}/><strong className="mr-5"> Pickup: </strong> {pickupLocation.lat.toFixed(6)}, {pickupLocation.lon.toFixed(6)}
                                    </div>
                                </div>
                                <div className="md:flex md:justify-between items-center mt-2 gap-5">
                                    <div className="flex items-center">
                                        <MapPin size={15}/><strong className="mr-5"> Dropoff: </strong> {dropoffLocation.lat.toFixed(6)}, {dropoffLocation.lon.toFixed(6)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-4 mt-20 md:mt-16">
                        <button type="button" onClick={handleResetLocations} className="flex items-center border border-[#5ead8a] text-[#5ead8a] px-4 py-2 rounded hover:bg-[#5ead8a] hover:text-white hover:cursor-pointer">
                            <RefreshCw className="mr-1" size={16} />
                            Reset Locations
                        </button>

                        <button type="submit" className="bg-[#5ead8a] text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-[#5ead8a]">
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default TripForm;
