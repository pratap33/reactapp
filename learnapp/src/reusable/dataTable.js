import React, { useState, useEffect } from 'react';
import { CBadge, CButton, CCardBody, CCollapse, CDataTable } from '@coreui/react';
import '../assets/styles/style.scss';
import '../assets/styles/custom-style.css';
import urlInfo from '../config_params';
import Axios from '../utils/api/axiosAPI';

function DataTable() {
	const [ details, setDetails ] = useState([]);
	const [ usersData, sedUsersInfo ] = useState([]);
	var [ keys, setKeys ] = useState([]);
	var fields = [];

	useEffect(() => {
		async function fetchData() {
			var data = await Axios.getRequest(urlInfo.baseURL);
			sedUsersInfo(data);
			keys = setKeys(Object.keys(data[0]));
		}
		fetchData();
	}, []);

	// for (var key = 0; key < keys.length; key++) {
	// 	fields.push({ key: keys[key], _style: { width: '10%' } });
	// }

	fields = [
		{ key: 'id', label: 'EmpID', _style: { width: '5%' } },
		{ key: 'name', _style: { width: '20%' } },
		{ key: 'username', _style: { width: '10%' } },
		{ key: 'email', _style: { width: '15%' } },
		{ key: 'address', _style: { width: '10%' }, sorter: false, filter: false },
		{ key: 'phone', label: 'mobile', _style: { width: '15%' } },
		{ key: 'website', _style: { width: '10%' } },
		{ key: 'company', _style: { width: '30%' }, filter: false }
	];

	const getBadge = (status) => {
		switch (status) {
			case 1:
				return 'success';
			case 2:
				return 'secondary';
			case 3:
				return 'warning';
			case 4:
				return 'danger';
			case 6:
				return 'success';
			case 7:
				return 'secondary';
			case 8:
				return 'warning';
			case 9:
				return 'danger';
			default:
				return 'primary';
		}
	};
	const toggleDetails = (index) => {
		const position = details.indexOf(index);
		let newDetails = details.slice();
		if (position !== -1) {
			newDetails.splice(position, 1);
		} else {
			newDetails = [ ...details, index ];
		}
		setDetails(newDetails);
	};
	return (
		<div>
			<CDataTable
				items={usersData}
				fields={fields}
				columnFilter
				tableFilter
				//footer
				itemsPerPageSelect
				itemsPerPage={5}
				hover
				sorter
				pagination
				scopedSlots={{
					address: (item, index) => {
						return (
							<td className="py-2">
								<CButton
									color="primary"
									variant="outline"
									shape="square"
									size="sm"
									onClick={() => {
										toggleDetails(index);
									}}
								>
									{details.includes(index) ? 'Hide' : 'Show'}
								</CButton>
							</td>
						);
					},
					website: (item) => (
						<td>
							<CBadge color={getBadge(item.id)}>{item.website}</CBadge>
						</td>
					),
					company: (item) => <td>{item.company.name}</td>,
					details: (item, index) => {
						return (
							<CCollapse show={details.includes(index)}>
								<CCardBody>
									<h4>{item.name}</h4>
									<p className="text-muted">street : {item.address.street}</p>
									<p className="text-muted">suite : {item.address.suite}</p>
									<p className="text-muted">city : {item.address.city}</p>
									<p className="text-muted">zipcode : {item.address.zipcode}</p>
								</CCardBody>
							</CCollapse>
						);
					}
				}}
			/>
		</div>
	);
}

export default DataTable;
