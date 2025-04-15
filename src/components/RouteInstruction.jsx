const RouteInstruction = ({ instruction }) => {
    return (
        <div className="bg-gray-100 rounded-md px-2 py-2 text-sm flex flex-col border border-gray-300 hover:border hover:border-gray-400 transition">
            <div className="flex justify-between text-sm mb-3 text-[#5ead8a]">
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
