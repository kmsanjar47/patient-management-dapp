import React from 'react';

const Table = () => {
    // Sample data for demonstration
    const data = [
        { district: 'District A', averageDeathRate: 5.2, highestCovidPatients: 120, medianAge: 35, childrenPercentage: 15, teenagePercentage: 20, youngPercentage: 50, elderPercentage: 15 },
        { district: 'District B', averageDeathRate: 4.8, highestCovidPatients: 150, medianAge: 40, childrenPercentage: 10, teenagePercentage: 15, youngPercentage: 60, elderPercentage: 15 },
        { district: 'District C', averageDeathRate: 6.0, highestCovidPatients: 100, medianAge: 38, childrenPercentage: 20, teenagePercentage: 25, youngPercentage: 45, elderPercentage: 10 },
        // Add more districts and data as needed
    ];

    return (
        <div className="relative overflow-x-auto shadow-md ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            District
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Avg. Death Rate (per day)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Covid Patients
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Median Age
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Children (%)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Teenage (%)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Young (%)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Elder (%)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"}>
                            <td className="p-4">{row.district}</td>
                            <td className="px-6 py-4">{row.averageDeathRate}</td>
                            <td className="px-6 py-4">{row.highestCovidPatients}</td>
                            <td className="px-6 py-4">{row.medianAge}</td>
                            <td className="px-6 py-4">{row.childrenPercentage}%</td>
                            <td className="px-6 py-4">{row.teenagePercentage}%</td>
                            <td className="px-6 py-4">{row.youngPercentage}%</td>
                            <td className="px-6 py-4">{row.elderPercentage}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
