import React from 'react';

const baseUrl = 'https://mint.intuit.com/transaction.event';
// const baseExportUrl = 'https://mint.intuit.com/transactionDownload.event';

const septemberTransactions = `?startDate=09/1/2020&endDate=09/30/2020&exclHidden=T`;
const octoberTransactions = `?startDate=10/1/2020&endDate=10/31/2020&exclHidden=T`;
const novemberTransactions = `?startDate=11/1/2020&endDate=10/30/2020&exclHidden=T`;

export default function ExportLinks() {
    return (
		<div className="buttons">
			<a
				className="button is-link"
				href={`${baseUrl}${septemberTransactions}`}
				target="_blank" rel="noreferrer"
			>
				<span>Mint - September 2020</span>
				<span className="icon">
					<i className="fas fa-external-link-alt"></i>
				</span>
			</a>
			<a
				className="button is-link"
				href={`${baseUrl}${octoberTransactions}`}
				target="_blank" rel="noreferrer"
			>
				<span>Mint - October 2020</span>
				<span className="icon">
					<i className="fas fa-external-link-alt"></i>
				</span>
			</a>
			<a
				className="button is-link"
				href={`${baseUrl}${novemberTransactions}`}
				target="_blank" rel="noreferrer"
			>
				<span>Mint - November 2020</span>
				<span className="icon">
					<i className="fas fa-external-link-alt"></i>
				</span>
			</a>
		</div>
	);
}