// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TripDetail from "./views/TripDetail";
import TripList from "./views/TripList";
import TripForm from "./views/TripForm";
import Dashboard from "./views/Dashboard";
import { Toaster } from "react-hot-toast";

const App = () => {
	return (
		<Router>
			<div className="flex">
				{/* Sidebar */}
				<Sidebar />
				{/* Main Content */}
				<div className="flex-1 p-4 bg-[#F7F7F7]">
					<Routes>
						<Route path="/" element={<Dashboard/>} />
						<Route path="/list" element={<TripList />} />
						<Route path="/trip/:tripId" element={<TripDetail />} />
						<Route path="/trip/new" element={<TripForm />} />
						<Route path="/account" element={<h2>Account & Profile Page</h2>} />
						<Route path="/logout" element={<h2>Logging Out...</h2>} />
					</Routes>
				</div>
			</div>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 5000, // Set duration in milliseconds
					style: { background: 'black', color: 'white', border: '#5ead8a' },
				}}
			/>
		</Router>
	);
};

export default App;
