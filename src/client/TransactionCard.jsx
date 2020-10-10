import React from 'react';

export default function TransactionCard({
	transaction: { transactionType, date, amount, uuid, description },
	unsorted = false,
	handleSort = () => {},
	handleUnsort = () => {},
}) {
	return (
		<div className="tile is-child box">
			<span className="is-size-7 is-pulled-right">{date}</span>
			<Amount amount={amount} transactionType={transactionType} />
			<div className="is-inline">{description}</div>

			{unsorted ? (
				<TransactionSorter uuid={uuid} handleSort={handleSort} />
			) : (
				<TransactionUnsorter uuid={uuid} handleUnsort={handleUnsort} />
			)}
		</div>
	);
}

function Amount({ transactionType, amount }) {
	const isCharge = transactionType === 'debit';
	const amountClasses = `is-size-4 has-text${
		isCharge ? '-danger' : '-success'
	}`;

	return (
		<div className={amountClasses}>{`${
			isCharge ? '-' : '+'
		}$${amount}`}</div>
	);
}

function TransactionUnsorter({ uuid, handleUnsort }) {
	return (
		<button
			className="button is-small is-pulled-right is-warning is-light"
			onClick={() => {
				handleUnsort(uuid);
			}}
		>
			<span>Un-sort</span>
			<span className="icon is-small">
				<i className="fas fa-random"></i>
			</span>
		</button>
	);
}

function TransactionSorter({ uuid, handleSort }) {
	return (
		<div className="control is-inline-block is-pulled-right">
			<label className="radio mr-5">
				<input
					type="radio"
					name={uuid}
					onChange={(e) => {
						handleSort(uuid, 'shared');
					}}
				/>
				<span className="ml-1 has-text-success-dark">Shared</span>
			</label>
			<label className="radio">
				<input
					type="radio"
					name={uuid}
					onChange={(e) => {
						handleSort(uuid, 'solo');
					}}
				/>
				<span className="ml-1 has-text-danger-dark">Solo</span>
			</label>
		</div>
	);
}
