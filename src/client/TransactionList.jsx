import React, { useState } from 'react';

import TransactionCard from './TransactionCard';

export default function TransactionList({ transactions, setTransactions }) {
	const [sortedTransactions, setSortedTransactions] = useState([]);

	function handleSort(transactionId, type) {
		const transaction = transactions.find(
			(transaction) => transaction.uuid === transactionId,
		);
		const index = transactions.indexOf(transaction);

		transaction.type = type;
		setSortedTransactions([...sortedTransactions, transaction]);

		transactions.splice(index, 1);
	}

	function handleUnsort(transactionId) {
		const transaction = sortedTransactions.find(
			(transaction) => transaction.uuid === transactionId,
		);

		const index = sortedTransactions.indexOf(transaction);

		transaction.type = null;
		setTransactions([...transactions, transaction]);

		sortedTransactions.splice(index, 1);
	}

	return (
		<>
			<h2 className="title is-5">Transactions:</h2>
			<div className="columns">
				<div className="column">
					<div className="title is-6">Unsorted</div>
					<div className="tile is-ancestor">
						<div className="tile is-parent is-vertical is-10">
							{transactions.map((transaction) => {
								return (
									<TransactionCard
										key={transaction.uuid}
										unsorted
										transaction={transaction}
										handleSort={handleSort}
									/>
								);
							})}
						</div>
					</div>
				</div>
				<div className="column">
					<div className="title is-6">Shared</div>
					<div className="tile is-ancestor">
						<div className="tile is-parent is-vertical is-10">
							{sortedTransactions
								.filter(
									(transaction) =>
										transaction.type === 'shared',
								)
								.map((transaction) => {
									return (
										<TransactionCard
											key={transaction.uuid}
											transaction={transaction}
											handleUnsort={handleUnsort}
										/>
									);
								})}
						</div>
					</div>
				</div>
				<div className="column">
					<div className="title is-6">Solo</div>
					<div className="tile is-ancestor">
						<div className="tile is-parent is-vertical is-10">
							{sortedTransactions
								.filter(
									(transaction) =>
										transaction.type === 'solo',
								)
								.map((transaction) => {
									return (
										<TransactionCard
											key={transaction.uuid}
											transaction={transaction}
											handleUnsort={handleUnsort}
										/>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
