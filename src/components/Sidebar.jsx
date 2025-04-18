// src/components/Sidebar.js
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Menu,
	X,
	LayoutDashboard,
	MapPin,
	Users,
	LogOut,
	Truck
} from "lucide-react";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex ">
			{/* Sidebar */}
			<div
				className={`relative bg-white text-gray-500 w-60 border-r border-gray-100 min-h-screen p-4 ${isOpen ? "block" : "hidden"
					} md:block`}
			>
				<div className="relative ">
					<div className="text-xl text-gray-900 fixed w-48">
						<h2 className="px-4 py-2 flex justify-between items-center w-full font-semibold mb-6 rounded-md bg-gray-100 text-[#5ead8a]">
							{!isOpen ? (<> <div className=" ">Trip planner</div> <Truck size={25} className="bg-white rounded-full p-1 ml-3 mt-1" /> </>) : "Trip planner"}
						</h2>
					</div>
				</div>
				<ul className="space-y-2 fixed mt-14">
					<li>
						<Link
							to="/"
							className="flex items-center py-2 px-4 hover:bg-gray-100 rounded"
						>
							<LayoutDashboard size={18} />
							<div className="ml-2">Dashboard</div>
						</Link>
					</li>
					<li>
						<Link
							to="/list"
							className="flex items-center py-2 px-4 hover:bg-gray-100 rounded"
						>
							<MapPin size={18} />
							<div className="ml-2">Trip Planner</div>
						</Link>
					</li>
				</ul>
			</div>

			<div className="flex-1  bg-[#fcfbfc]">
				<div className="absolute flex items-center gap-2 p-2">
					<button
						onClick={toggleSidebar}
						className="md:hidden p-1 text-[#5ead8a] rounded-md top-4 left-4 z-50"
					>
						{isOpen ? <X /> : (<><Menu /> </>)}
					</button>
					{!isOpen && (
						<Link to="/" className="md:hidden text-xl text-[#5ead8a] rounded-md py-1">
							TRIP PLANNER
						</Link>
					)}
				</div>

			</div>
		</div>
	);
};

export default Sidebar;
