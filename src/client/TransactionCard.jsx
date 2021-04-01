import React from 'react';
import PropTypes from 'prop-types';

import CurrencyField from './CurrencyField';

TransactionCard.propTypes = {
	transaction: PropTypes.shape({
		transactionType: PropTypes.string,
		date: PropTypes.string,
		amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		uuid: PropTypes.string,
		description: PropTypes.string,
	}),
	unsorted: PropTypes.bool,
	handleSort: PropTypes.func,
	handleUnsort: PropTypes.func,
};
export default function TransactionCard({
	transaction: { transactionType, date, amount, uuid, description },
	unsorted = false,
	handleSort = () => {},
	handleUnsort = () => {},
}) {
	return (
		<div className="tile is-child box">
			<span className="is-size-7 is-italic is-pulled-right">{date}</span>
			<Amount amount={amount} transactionType={transactionType} />
			<div>{description}</div>

			{unsorted ? (
				<TransactionSorter uuid={uuid} handleSort={handleSort} />
			) : (
				<TransactionUnsorter uuid={uuid} handleUnsort={handleUnsort} />
			)}
		</div>
	);
}

Amount.propTypes = {
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
function Amount({ amount }) {
	const isCharge = amount < 0;
	const amountClasses = `is-size-4 has-text${
		isCharge ? '-danger' : '-success'
	}`;

	return (
		<div className={amountClasses}>
			<CurrencyField amount={amount} />
		</div>
	);
}

TransactionUnsorter.propTypes = {
	uuid: PropTypes.string,
	handleUnsort: PropTypes.func,
};
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

TransactionSorter.propTypes = {
	uuid: PropTypes.string,
	handleSort: PropTypes.func,
};
function TransactionSorter({ uuid, handleSort }) {
	return (
		<div className="control is-inline-block is-pulled-right">
			<label className="radio mr-5">
				<input
					type="radio"
					name={uuid}
					onChange={() => {
						handleSort(uuid, 'shared');
					}}
				/>
				<span className="ml-1 has-text-success-dark">Shared</span>
			</label>
			<label className="radio">
				<input
					type="radio"
					name={uuid}
					onChange={() => {
						handleSort(uuid, 'solo');
					}}
				/>
				<span className="ml-1 has-text-link-dark">Solo</span>
			</label>
		</div>
	);
}
