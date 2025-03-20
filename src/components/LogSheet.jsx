const LogSheet = ({ logSheets }) => {
    // Calculate the totals for driving hours, rest hours, and total days
    const totalDrivingHours = logSheets.reduce((total, log) => total + log.driving_hours, 0).toFixed(2);
    const totalRestHours = logSheets.reduce((total, log) => total + log.rest_hours, 0).toFixed(2);

    // Calculate total days by counting unique dates
    const uniqueDates = new Set(logSheets.map(log => log.date));
    const totalDays = uniqueDates.size;

    return (
        <div className="w-full mt-5 mb-6 md:mb-0">
            <h4 className="text-lg text-gray-700 font-semibold mt-4">Log Sheets</h4>

            {/* Display the totals */}
            <div className="mt-2 mb-2 transition text-xs border-b-2 border-white hover:bg-white hover:text-[#5ead8a] hover:rounded-md">
                <div className="flex justify-between"> <div>Total Driving Hours</div> {totalDrivingHours} hrs</div>
                <div className="flex justify-between"> <div>Total Rest Hours</div> {totalRestHours} hrs</div>
                <div className="flex justify-between"> <div>Total Days</div> {totalDays} days</div>
            </div>
            <div className="px-4 py-4 md:grid md:grid-cols-4 md:gap-6 justify-between mt-4 bg-[#5ead8a] text-gray-800 text-xs rounded-md">

                {/* Display the individual log entries */}
                {logSheets.map((log, index) => (
                    <div
                        key={index}
                        className="mb-2 transition p-2 border-b-2 border-white hover:bg-white hover:text-[#5ead8a] hover:rounded-md">
                        <div className="flex justify-between"> <div>Date</div> {log.date}</div>
                        <div className="flex justify-between"> <div>Driving Hours</div> { log.driving_hours.toFixed(2)} hrs</div>
                        <div className="flex justify-between"> <div>Rest Hours</div> {log.rest_hours.toFixed(2)} hrs</div>
                        <div className="flex justify-between"> <div>Status</div> {log.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogSheet;
