import { useState, useEffect } from 'react';
import { useWeb3 } from '@/web3/web3Provider';
import { getPatientDataList } from '@/web3/web3Actions';

const Table = () => {
	const { currentAccount, data, setData } = useWeb3();
	// useEffect(() => {
	// 	if (!currentAccount) {
	// 		return;
	// 	}
	// }, [currentAccount, data]);
	// Sample data for demonstration

	return (
		<div className="relative overflow-x-auto shadow-md ">
			{!currentAccount ? (
				<div className="mx-auto p-3 "> Please connect your wallet to view data</div>
			) : (
				<div className="grid grid-cols-3 gap-3 m-3">
					<div className="py-3 row-start-2 text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 flex flex-col gap-3">
						<div>{data.length === 0 ? 'No data available' : data.maxCovidDistrict}</div>
						<div className="font-bold">
							<p className="text-sm">The district with highest covid patient</p>
						</div>
					</div>
					<div className="py-3 text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 flex flex-col gap-3">
						<div>{data.length === 0 ? 'No data available' : data.averageDeathRate && data.averageDeathRate.toFixed(2)}</div>
						<div className="font-bold">
							<p className="text-sm">The average death rate per day</p>
						</div>
					</div>

					{data.length === 0 ? (
						'No data available'
					) : (
						<>
							<table className="row-span-2 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<td colSpan="4" align="center" className="font-bold text-xs py-3">
											Percentage of Children, Teenage, Young and Elder patients
										</td>
									</tr>
									<tr>
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
									{data.agePercentage && (
										<tr className={'bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'}>
											<td className="p-4">{data.agePercentage.children.toFixed(2)}</td>
											<td className="p-4">{data.agePercentage.teenagers.toFixed(2)}</td>
											<td className="p-4">{data.agePercentage.young.toFixed(2)}</td>
											<td className="p-4">{data.agePercentage.elder.toFixed(2)}</td>
										</tr>
									)}
								</tbody>
							</table>
						</>
					)}
					{data.length === 0 ? (
						'No data available'
					) : (
						<table className="row-span-2 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							{data.medianAges && (
								<>
									<thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<td colSpan={data.medianAges.length} align="center" className="font-bold text-xs py-3">
												The median age of covid patients in each district
											</td>
										</tr>
										<tr>
											{data.medianAges.map((item, index) => (
												<th scope="col" className="px-6 py-3" key={index}>
													{item.district}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										<tr className={'bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'}>
											{data.medianAges.map((item, index) => (
												<td scope="col" className="px-6 py-3" key={index}>
													{item.medianAge.toString()}
												</td>
											))}
										</tr>
									</tbody>
								</>
							)}
						</table>
					)}
				</div>
			)}
		</div>
	);
};

export default Table;
