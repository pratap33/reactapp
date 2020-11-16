import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import axios from './utils/api/axiosAPI';
import urlInfo from './config_params';
import { Result } from 'antd';

fetch('/').then((res) => console.log(res));

function App() {
	const [ persons, setPersons ] = useState([]);
	const getPersons = async () => {
		setPersons(await axios.getRequest(urlInfo.baseURL));
	};
	const btnPersons = persons.length > 0 ? null : <button onClick={getPersons}>AllUsers</button>;

	return (
		<div className="App">
			<Header />
			{btnPersons}
			<ul>{persons.map((person) => <li key={person.id}>{person.name}</li>)}</ul>
		</div>
	);
}

export default App;

// const getPersons = async () => {
// 	const data = await Axios.getRequest(urlInfo.baseURL);
// 	var keys = Object.keys(data[0]);
// 	console.log(keys);
// };
