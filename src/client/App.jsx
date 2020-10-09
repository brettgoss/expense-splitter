import React from 'react';
import csvToJson from 'csvtojson';

import FileUpload from './FileUpload';

const baseUrl = 'https://mint.intuit.com/transaction.event';
const baseExportUrl = 'https://mint.intuit.com/transactionDownload.event';

const septemberTransactions = `?startDate=09/1/2020&endDate=09/30/2020&exclHidden=T`;
const octoberTransactions = `?startDate=10/1/2020&endDate=10/31/2020&exclHidden=T`;
const novemberTransactions = `?startDate=11/1/2020&endDate=10/30/2020&exclHidden=T`;

/**
 * @todo Make links dynamic
 * @todo Full month or half month link granularity (select reporting period)
 */
export default function App({ transactions, setTransactions }) {
	const sharedTransactions = [];
	const soloTransactions = [];

	async function handleTransactionUpload(file) {
		const transactionsRaw = await file.text();
		const transactionArray = await csvToArray(transactionsRaw);
		setTransactions(transactionArray);
	}

	async function csvToArray(csvString) {
		return await csvToJson({
			output: 'json',
			headers: [
				'date',
				'description',
				'originalDescription',
				'amount',
				'transactionType',
				'category',
				'accountName',
				'labels',
				'notes',
			],
		})
			.fromString(csvString)
			.then((csvRow) => {
				console.log(csvRow);
				return csvRow;
			});
	}

	return (
		<>
			<nav className="navbar is-spaced">
				<div className="container">
					<div className="navbar-brand">
						<div className="navbar-item">
							<h1 className="title is-4">Expense Splitter</h1>
						</div>
					</div>
				</div>
			</nav>
			<section className="section">
				<div className="container">
					<h2 className="title is-5">Welcome to Expense Splitter!</h2>
					<h3 className="subtitle">
						Start by exporting your transactions from Mint. Here are
						some links to help get you started:
					</h3>
					<div className="buttons">
						<a
							className="button is-link"
							href={`${baseUrl}${septemberTransactions}`}
							target="_blank"
						>
							<span>Mint - September 2020</span>
							<span className="icon">
								<i className="fas fa-external-link-alt"></i>
							</span>
						</a>
						<a
							className="button is-link"
							href={`${baseUrl}${octoberTransactions}`}
							target="_blank"
						>
							<span>Mint - October 2020</span>
							<span className="icon">
								<i className="fas fa-external-link-alt"></i>
							</span>
						</a>
						<a
							className="button is-link"
							href={`${baseUrl}${novemberTransactions}`}
							target="_blank"
						>
							<span>Mint - November 2020</span>
							<span className="icon">
								<i className="fas fa-external-link-alt"></i>
							</span>
						</a>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<h2 className="title is-5">
						Great! Once you have some transactions, you can import
						them below.
					</h2>
					<h3 className="subtitle">
						Don't worry, nothing you import is saved anywhere
						outside of your browser.
					</h3>
					<FileUpload
						handleFileUpload={async (file) =>
							await handleTransactionUpload(file)
						}
					/>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<h2 className="title is-5">Transactions:</h2>
					<div className="title is-6">Unsorted</div>
					<div className="tile is-ancestor">
						<div className="tile is-parent is-vertical is-5">
							{transactions.map((transaction) => {
								const key = `${transaction.date}:${transaction.category}:${transaction.description}:${transaction.amount}`;
								return (
									<div
										key={key}
										className="tile is-child box"
									>
										<div>{transaction.date}</div>
										<div>{transaction.description}</div>
										<div>{`${
											transaction.transactionType ==
											'credit'
												? ''
												: '-'
										}${transaction.amount}`}</div>
									</div>
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
									<div
										key={key}
										className="tile is-child box"
									>
										<div>{transaction.date}</div>
										<div>{transaction.description}</div>
										<div>{`${
											transaction.transactionType ==
											'credit'
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
									<div
										key={key}
										className="tile is-child box"
									>
										<div>{transaction.date}</div>
										<div>{transaction.description}</div>
										<div>{`${
											transaction.transactionType ==
											'credit'
												? ''
												: '-'
										}${transaction.amount}`}</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
