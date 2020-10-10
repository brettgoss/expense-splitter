import React from 'react';

export default function TransactionContainer({
	transaction,
	unsorted = false,
	handleChange = () => {},
}) {
	return (
		<div className="tile is-child box">
			<div>{transaction.date}</div>
			<div>{transaction.description}</div>
			<div>{`${transaction.transactionType == 'credit' ? '' : '-'}${
				transaction.amount
			}`}</div>
			{unsorted && (
				<TransactionSorter
					uuid={transaction.uuid}
					handleChange={handleChange}
				/>
			)}
		</div>
	);
}

function TransactionSorter({ uuid, handleChange }) {
	return (
		<div className="control">
			<label className="radio">
				<input
					type="radio"
					name={uuid}
					onChange={(e) => {
						handleChange(uuid, 'shared');
					}}
				/>
				<span className="ml-1">Shared</span>
			</label>
			<label className="radio">
				<input
					type="radio"
					name={uuid}
					onChange={(e) => {
						handleChange(uuid, 'solo');
					}}
				/>
				<span className="ml-1">Solo</span>
			</label>
		</div>
	);
}
