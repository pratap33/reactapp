import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import urlInfo from '../config_params';
import Axios from '../utils/api/axiosAPI';

function Test() {
	var [ state, setState ] = useState({ searchText: '', searchedColumn: '' });
	var searchInput = null;
	var [ usersData, sedUsersInfo ] = useState([]);
	var [ keys, setKeys ] = useState([]);

	useEffect(() => {
		async function fetchData() {
			var data = await Axios.getRequest(urlInfo.baseURL);
			sedUsersInfo(data);
			keys = setKeys(Object.keys(data[0]));
		}
		fetchData();
	}, []);

	var getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.select(), 100);
			}
		},
		render: (text) =>
			state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[ state.searchText ]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			)
	});

	var handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex
		});
	};

	var handleReset = (clearFilters) => {
		clearFilters();
		setState({ searchText: '' });
	};

	const columns = [
		{
			title: 'EmpID',
			dataIndex: 'id',
			key: 'id',
			width: '30%',
			...getColumnSearchProps('id')
		},
		{
			title: 'name',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
			...getColumnSearchProps('name')
		},
		{
			title: 'username',
			dataIndex: 'username',
			key: 'username',
			...getColumnSearchProps('username')
		}
	];
	return (
		<div className="dataBind">
			<Table columns={columns} dataSource={usersData} />
		</div>
	);
}

export default Test;
