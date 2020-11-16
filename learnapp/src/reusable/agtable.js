import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import urlInfo from '../config_params';
import Axios from '../utils/api/axiosAPI';

function Agtable() {
	const [ rowData, sedUsersInfo ] = useState([]);
	var [ keys, setKeys ] = useState([]);
	var columnDefs = [];

	useEffect(() => {
		async function fetchData() {
			var data = await Axios.getRequest(urlInfo.baseURL);
			sedUsersInfo(data);
			keys = setKeys(Object.keys(data[0]));
		}
		fetchData();
	}, []);

	for (var key = 0; key < keys.length; key++) {
		columnDefs.push({ headerName: keys[key], field: keys[key], sortable: true, filter: true });
	}

	return (
		<div style={{ height: '500px', width: '100%' }} className="ag-theme-alpine">
			<AgGridReact columnDefs={columnDefs} rowData={rowData} rowSelection="multiple" />
		</div>
	);
}

export default Agtable;
