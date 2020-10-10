import React from 'react';

export default function Transaction({
	transaction,
	handleChange,
}) {
	return (
		<div className="tile is-child box">
			<div>{transaction.date}</div>
			<div>{transaction.description}</div>
			<div>{`${transaction.transactionType == 'credit' ? '' : '-'}${
				transaction.amount
			}`}</div>
			<div className="control">
				<label className="radio">
					<input
						type="radio"
						name={transaction.uuid}
						onChange={(e) => {
							handleChange(transaction.uuid, 'shared');
						}}
					/>
					<span className="ml-1">Shared</span>
				</label>
				<label className="radio">
					<input
						type="radio"
						name={transaction.uuid}
						onChange={(e) => {
							handleChange(transaction.uuid, 'solo');
						}}
					/>
					<span className="ml-1">Solo</span>
				</label>
			</div>
		</div>
	);
}
