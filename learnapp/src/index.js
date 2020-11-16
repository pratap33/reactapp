import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Antdtable from './reusable/antdTest';
//import TestDummy from './reusable/dummy';
import App from './App';
//import DataTable from './reusable/dataTable';
//import Agtable from './reusable/agtable';
// import MaterialTable from './reusable/materialTable';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
