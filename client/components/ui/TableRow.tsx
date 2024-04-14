function TableRow({ index, row }) {
	return (
		<tr
			key={index}
			className={
				index % 2 === 0
					? 'bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'
					: 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'
			}>
			<td className="p-4">{row.district}</td>
			<td className="px-6 py-4">{row.averageDeathRate}</td>
			<td className="px-6 py-4">{row.highestCovidPatients}</td>
			<td className="px-6 py-4">{row.medianAge}</td>
			<td className="px-6 py-4">{row.childrenPercentage}%</td>
			<td className="px-6 py-4">{row.teenagePercentage}%</td>
			<td className="px-6 py-4">{row.youngPercentage}%</td>
			<td className="px-6 py-4">{row.elderPercentage}%</td>
		</tr>
	);
}
export default TableRow;
