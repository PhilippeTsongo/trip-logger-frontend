import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Header = ({ title }) => {
    return (
        <div className="flex justify-end md:justify-between items-center border-b border-gray-200 pb-10 md:pb-3">
            <h3 className="text-sm text-gray-400 hidden md:block">
                <Link to="/">Dashboard</Link> { title &&(`/ ${title}`)}
            </h3>

            <div className="flex items-center mt-0 gap-2 hover:cursor-pointer text-gray-700 ">
                <span className="hidden md:block "> Philippe Tsongo</span> 
                <User size={30} className="border rounded-full px-1 py-1" />
            </div>
        </div>
    );
};

export default Header;
