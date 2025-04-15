const LogSheet = ({ logSheets }) => {
    // Calculate the totals for driving hours, rest hours, and total days
    const totalDrivingHours = logSheets.reduce((total, log) => total + log.driving_hours, 0);
    const totalRestHours = logSheets.reduce((total, log) => total + log.rest_hours, 0);

    // Calculate total days by counting unique dates
    const uniqueDates = new Set(logSheets.map(log => log.date));
    const totalDays = uniqueDates.size;

    return (
        <div className="w-full mt-5 mb-6 md:mb-0">
            <h4 className="text-lg text-gray-700 font-semibold mt-4">Log Sheets</h4>

            {/* Display the totals */}
            <div className="flex justify-between mt-2 mb-2 transition text-xs shadow-xl border border-gray-300 rounded-md bg-white p-4">
                <div className="flex justify-between"> 
                    <div>Total Driving Hours: </div> 
                    {(() => {
                        const hours = Math.floor(totalDrivingHours);
                        const minutes = Math.round((totalDrivingHours - hours) * 60);
                        if (isNaN(hours) || isNaN(minutes)) {
                            return " 0h 0m";
                        }
                        if (totalDrivingHours <= 1) {
                            return " 0h 0m";
                        }
                        return `${hours}h ${minutes}m`;
                    })()}     
                </div>
                <div className="flex justify-between"> 
                    <div>Total Rest Hours: </div> 
                    {(() => {
                        const hours = Math.floor(totalRestHours);
                        const minutes = Math.round((totalRestHours - hours) * 60);
                        if (isNaN(hours) || isNaN(minutes)) {
                            return " 0h 0m";
                        }
                        if (totalRestHours <= 1) {
                            return " 0h 0m";
                        }
                        return `${hours}h ${minutes}m`;
                    })()}
                </div>
                <div className="flex justify-between"> <div>Total Days</div> {totalDays} days</div>
            </div>
            <div className="px-4 py-4 md:grid md:grid-cols-4 md:gap-6 justify-between border border-gray-300 shadow-xl mt-4 text-xs rounded-md">

                {/* Display the individual log entries */}
                {logSheets.map((log, index) => (
                    <div
                        key={index}
                        className="mb-2 transition p-2">
                        <div className="flex justify-between"> <div>Date</div> {log.date}</div>
                        <div className="flex justify-between"> 
                            <div>Driving Hours </div> 
                            {(() => {
                                const hours = Math.floor(log.driving_hours);
                                const minutes = Math.round((log.driving_hours - hours) * 60);
                                if (isNaN(hours) || isNaN(minutes)) {
                                    return " 0h 0m";
                                }
                                if (totalRestHours <= 1) {
                                    return " 0h 0m";
                                }
                                return `${hours}h ${minutes}m`;
                            })()} 
                        </div>
                        <div className="flex justify-between"> 
                            <div>Rest Hours </div> 
                            {(() => {
                                const hours = Math.floor(log.rest_hours);
                                const minutes = Math.round((log.rest_hours - hours) * 60);
                                if (isNaN(hours) || isNaN(minutes)) {
                                    return " 0h 0m";
                                }
                                if (totalRestHours <= 1) {
                                    return " 0h 0m";
                                }
                                return `${hours}h ${minutes}m`;
                            })()} 
                        </div>
                        <div className="flex justify-between"> <div>Status</div> {log.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogSheet;
