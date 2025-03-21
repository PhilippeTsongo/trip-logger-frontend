import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { fetchTrips } from "../api/api";
import { PlusCircle, Table } from "lucide-react";
import TripTable from "../components/TripTable";

const TripList = () => {
    const [trips, setTrips] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        fetchTrips()
            .then((data) => {
                setTrips(data);
                setLoad(true);
            })
            .catch((error) => {
                console.error("Error fetching trips:", error);
            });
    }, []);

    if (!load) {
        return <div className="text-center py-10">Loading trips...</div>;
    }

    return (
        <div className="w-full">
            <Header title="Trip List" />
            <div className="flex justify-between items-center">
                <h3 className="text-xl text-gray-700 font-semibold">Trips</h3>
                <div className="flex space-x-4 mt-2">
                    <Link
                        to='/trip/new'
                        className="flex items-center bg-[#5ead8a] text-white px-4 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-[#5ead8a]"
                    >
                        <PlusCircle className="mr-1" size={14} />
                        New trip
                    </Link>
                </div>
            </div>
            
            <div className="mt-5 h-screen">
                <TripTable trips={trips} />
            </div>
        </div>
    );
};

export default TripList;
