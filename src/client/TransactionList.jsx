import React, { useState } from 'react';

import TransactionContainer from './TransactionContainer';

export default function TransactionList({ transactions }) {
	const [sharedTransactions, setSharedTransactions] = useState([]);
	const [soloTransactions, setSoloTransactions] = useState([]);

	function handleChange(transactionId, value) {
		const transaction = transactions.find(
			(transaction) => transaction.uuid === transactionId,
		);
		const index = transactions.indexOf(transaction);

		if (value === 'shared') {
			setSharedTransactions([...sharedTransactions, transaction]);
		}

		if (value === 'solo') {
			setSoloTransactions([...soloTransactions, transaction]);
		}

		transactions.splice(index, 1);
	}

	return (
		<>
			<h2 className="title is-5">Transactions:</h2>
			<div className="title is-6">Unsorted</div>
			<div className="tile is-ancestor">
				<div className="tile is-parent is-vertical is-5">
					{transactions.map((transaction) => {
						return (
							<TransactionContainer
								key={transaction.uuid}
								unsorted
								transaction={transaction}
								handleChange={handleChange}
							/>
						);
					})}
				</div>
			</div>
			<div className="title is-6">Shared</div>
			<div className="tile is-ancestor">
				<div className="tile is-parent is-vertical is-5">
					{sharedTransactions.map((transaction) => {
						return (
							<TransactionContainer
								key={transaction.uuid}
								transaction={transaction}
							/>
						);
					})}
				</div>
			</div>
			<div className="title is-6">Solo</div>
			<div className="tile is-ancestor">
				<div className="tile is-parent is-vertical is-5">
					{soloTransactions.map((transaction) => {
						return (
							<TransactionContainer
								key={transaction.uuid}
								transaction={transaction}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}
