import React, { useState } from 'react';

import Transaction from './Transaction';

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
							<Transaction
								key={transaction.uuid}
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
						const key = `${transaction.date}:${transaction.category}:${transaction.description}:${transaction.amount}`;
						return (
							<div key={key} className="tile is-child box">
								<div>{transaction.date}</div>
								<div>{transaction.description}</div>
								<div>{`${
									transaction.transactionType == 'credit'
										? ''
										: '-'
								}${transaction.amount}`}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="title is-6">Solo</div>
			<div className="tile is-ancestor">
				<div className="tile is-parent is-vertical is-5">
					{soloTransactions.map((transaction) => {
						const key = `${transaction.date}:${transaction.category}:${transaction.description}:${transaction.amount}`;
						return (
							<div key={key} className="tile is-child box">
								<div>{transaction.date}</div>
								<div>{transaction.description}</div>
								<div>{`${
									transaction.transactionType == 'credit'
										? ''
										: '-'
								}${transaction.amount}`}</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
