import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import csvToJson from 'csvtojson';

import FileUpload from './FileUpload';
import TransactionList from './TransactionList';

const baseUrl = 'https://mint.intuit.com/transaction.event';
const baseExportUrl = 'https://mint.intuit.com/transactionDownload.event';

const septemberTransactions = `?startDate=09/1/2020&endDate=09/30/2020&exclHidden=T`;
const octoberTransactions = `?startDate=10/1/2020&endDate=10/31/2020&exclHidden=T`;
const novemberTransactions = `?startDate=11/1/2020&endDate=10/30/2020&exclHidden=T`;

/**
 * @todo Make links dynamic
 * @todo Full month or half month link granularity (select reporting period)
 * @todo Add filters for filtering out debits vs credits
 */
export default function App() {
	const [transactions, setTransactions] = useState([
		{
			date: '10/08/2020',
			description: 'Example Transaction',
			originalDescription: 'Example Transaction',
			amount: '13.06',
			transactionType: 'debit',
			category: 'Interest Income',
			accountName: 'Your Bank Account',
			labels: '',
			notes: '',
			uuid: '81e69a92-4a86-49b5-a817-b52219e39056',
		},
	]);

	async function handleTransactionUpload(file) {
		const transactionsRaw = await file.text();
		const transactionArray = await csvToArray(transactionsRaw);
		setTransactions(transactionArray);
	}

	async function csvToArray(csvString) {
		const transactions = await csvToJson({
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
		}).fromString(csvString);

		return transactions.map((transaction) => {
			transaction.uuid = uuidv4();
			return transaction;
		});
	}

	return (
		<>
			<nav className="navbar is-transparent is-spaced">
				<div className="navbar-brand">
					<div className="navbar-item">
						<h1 className="title is-4">Expense Splitter</h1>
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
					<TransactionList transactions={transactions} setTransactions={setTransactions} />
				</div>
			</section>
		</>
	);
}
