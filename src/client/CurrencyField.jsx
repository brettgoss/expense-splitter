import React from 'react';

export default function CurrencyField({ amount }) {
	const isCharge = amount < 0;
	const formattedAmount = isCharge ? (
		`-$${0 - parseFloat(amount).toFixed(2)}`
	) : (
		`+$${parseFloat(amount).toFixed(2)}`
	)

	return (
		<div className="is-inline">{formattedAmount}</div>
	);
}