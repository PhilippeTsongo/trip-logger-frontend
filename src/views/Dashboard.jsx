import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { saveTrip } from "../api/api";
import { toast } from "react-hot-toast";
import { Truck, Clock, Ruler } from "lucide-react";
import Header from "../components/Header";
import TripTable from "../components/TripTable";
import { fetchTrips } from "../api/api"

const LocationPicker = ({ setLocation }) => {
    useMapEvents({
        click(e) {
            setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
        },
    });
    return null;
};

const Dashboard = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropoffLocation, setDropoffLocation] = useState(null);
    const [currentCycleHours, setCurrentCycleHours] = useState("");
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        //  fetch and set the user's current location when the component mounts
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

        fetchTrips()
            .then((data) => {
                setTrips(data);
            })
            .catch((error) => {
                console.error("Error fetching trips:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentLocation || !pickupLocation || !dropoffLocation || !currentCycleHours) {
            toast.error("Please select all locations and enter the cycle hours.");
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
                console.log("Trip created successfully:", data);
            })
            .catch((error) => {
                toast.error("Error creating trip. Please try again.");
                console.error("Error creating trip:", error);
            });
    };

    return (
        <div className="w-full">
            <Header title="" />

            <div className="md:flex md:justify-between mt-5 md:gap-5 items-center  ">
                <div className="md:w-2/4 bg-white px-2 py-2 md:px-3 md:py-6 rounded-md relative ">
                    <div className="flex justify-between items-center text-[#5ead8a] border-b border-[#5ead8a] pb-2">
                        <h2 className="text-3xl font-bold ">Enjoy your trip.</h2>
                        <Truck size={35} className="bg-white border border-[#5ead8a] rounded-full p-2 mt-2 text-3xl" />
                    </div>
                </div>

                <div className="md:w-2/4 bg-white px-2 py-2 md:px-3 md:py-8 rounded-md relative">
                    <div className="flex justify-between items-center ">
                        <div className="flex justify-between gap-2">
                            <Truck size={15} className="bg-gray-100 text-[#5ead8a] rounded-full p-2 w-10 h-10" />
                            <div>
                                Total trips
                                <p className="text-xs mt-auto mr-0" >20</p>
                            </div>
                        </div>
                        <div className="flex justify-items-center gap-2">
                            <Clock size={15} className="bg-gray-100 text-[#5ead8a] rounded-full p-2 w-10 h-10" />
                            <div>
                                Total hours
                                <p className="text-xs mt-auto mr-0" >10000</p>
                            </div>
                        </div>
                        <div className="flex justify-items-center gap-2">
                            <Ruler size={15} className="bg-gray-100 text-[#5ead8a] rounded-full p-2 w-10 h-10" />
                            <div>
                                Total distance
                                <p className="text-xs mt-auto mr-0" >40000km</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="items-center  ">
                <div className="mt-5 h-98 bg-white px-2 py-2 rounded-md">
                    <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%", borderRadius: "5px" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationPicker setLocation={setPickupLocation} />
                        <LocationPicker setLocation={setDropoffLocation} />

                        {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lon]} />}
                        {pickupLocation && <Marker position={[pickupLocation.lat, pickupLocation.lon]} />}
                        {dropoffLocation && <Marker position={[dropoffLocation.lat, dropoffLocation.lon]} />}
                    </MapContainer>
                </div>
                <div className="mt-5 h-screen bg-white rounded-md">
                    <TripTable trips={trips} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
