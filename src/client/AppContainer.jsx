import React, { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

import App from './App';

export default function AppContainer() {
	const [transactions, setTransactions] = useState([]);
	return <App transactions={transactions} setTransactions={setTransactions} />;
}
