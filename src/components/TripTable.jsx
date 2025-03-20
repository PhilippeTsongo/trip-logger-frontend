import { Link } from "react-router-dom";
import { View } from "lucide-react";

const TripTable = ({ trips }) => {
    return (
        <div className="flex text-gray-600 overflow-x-auto w-100 md:w-full ">
            <table className="bg-white rounded-lg text-xs">
                <thead>
                    <tr className="bg-gray-200 text-gray-600">
                        <th className="px-4 py-2 text-left  rounded-tl-lg">#</th>
                        <th className="px-4 py-2 text-left">Current Location</th>
                        <th className="px-4 py-2 text-left">Pickup Location</th>
                        <th className="px-4 py-2 text-left">Dropoff Location</th>
                        <th className="px-4 py-2 text-left">Cycle Hours</th>
                        <th className="px-4 py-2 text-left rounded-tr-lg">Action</th>
                    </tr>
                </thead>
                <tbody className="rounded-lg overflow-y-auto h-98">
                    {trips.map((trip, index) => (
                        <tr key={trip.id} className="border-b border-gray-100 md:rounded-lg hover:bg-gray-100">
                            <td className="px-4 py-2 rounded-bl-lg">{index + 1}</td>
                            <td className="px-4 py-2">
                                Lat {trip.current_location && JSON.parse(trip.current_location.replace(/'/g, '"')).lat} -
                                Lon {trip.current_location && JSON.parse(trip.current_location.replace(/'/g, '"')).lon}
                            </td>
                            <td className="px-4 py-2">
                                Lat {trip.pickup_location && JSON.parse(trip.pickup_location.replace(/'/g, '"')).lat} -
                                Lon {trip.pickup_location && JSON.parse(trip.pickup_location.replace(/'/g, '"')).lon}
                            </td>
                            <td className="px-4 py-2">
                                Lat {trip.dropoff_location && JSON.parse(trip.dropoff_location.replace(/'/g, '"')).lat} -
                                Lon {trip.dropoff_location && JSON.parse(trip.dropoff_location.replace(/'/g, '"')).lon}
                            </td>
                            <td className="px-4 py-2">{trip.current_cycle_hours}</td>
                            <td className="px-4 py-2 rounded-br-lg">
                                <Link
                                    to={`/trip/${trip.id}`}
                                    className="flex items-center bg-[#5ead8a] text-white px-4 py-1 rounded-md hover:cursor-pointer"
                                >
                                    <View size={14} className="mr-1" /> View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TripTable;
