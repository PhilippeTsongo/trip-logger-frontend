import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapContainerComponent = ({ center, zoom, route, stops, routeInstructions }) => {
    return (
        <div className="w-full h-96 overflow-hidden">
            <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', borderRadius: "5px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {route.length > 0 && <Polyline positions={route} color="blue" />}
                {stops.map((stop, index) => (
                    stop.position &&
                    !isNaN(stop.position.lat) &&
                    !isNaN(stop.position.lon) && (
                        <Marker key={index} position={[stop.position.lat, stop.position.lon]}>
                            <Popup>
                                <div>{stop.label}</div>
                                {routeInstructions[index] && (
                                    <div>
                                        <strong>Instruction:</strong> {routeInstructions[index].instruction}<br />
                                        <strong>Street Name:</strong> {routeInstructions[index].name}<br />
                                        <strong>Distance:</strong> {routeInstructions[index].distance} meters<br />
                                        <strong>Duration:</strong> {routeInstructions[index].duration} minutes
                                    </div>
                                )}
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default MapContainerComponent;
