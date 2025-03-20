const RouteInstruction = ({ instruction }) => {
    return (
        <div className="bg-gray-100 rounded-md px-2 py-2 text-sm flex flex-col hover:bg-[#5ead8a] hover:text-white transition">
            <div className="flex justify-between text-sm mb-3 text-[#5ead8a] hover:text-white">
                <strong>{instruction.instruction}</strong>
                <div className="text-xs">{instruction.duration}'</div>
            </div>
            <div className="mt-auto">
                <div className="flex justify-between text-xs"><span>Street Name:</span> {instruction.name}</div>
                <div className="flex justify-between text-xs"><span>Distance:</span> {instruction.distance}m</div>
            </div>
        </div>
    );
};

export default RouteInstruction;
