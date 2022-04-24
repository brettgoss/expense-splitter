import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import csvToJson from 'csvtojson';

import ExportLinks from './ExportLinks';
import FileUpload from './FileUpload';
import TransactionList from './TransactionList';

/**
 * @todo Full month or half month link granularity (select reporting period)
 * @todo Add filters for filtering out debits vs credits
 */
export default function App() {
	const [transactions, setTransactions] = useState([
		{
			date: '10/08/2020',
			description: 'Example Income',
			originalDescription: 'Example Income',
			amount: '6.06',
			transactionType: 'credit',
			category: 'Interest Income',
			accountName: 'Your Bank Account',
			labels: '',
			notes: '',
			uuid: '81e69a92-4a86-49b5-a817-b52219e39056',
		},
		{
			date: '10/08/2020',
			description: 'Example Charge',
			originalDescription: 'Example Charge',
			amount: '-11.66',
			transactionType: 'debit',
			category: 'Food and Dining',
			accountName: 'Your Credit Card',
			labels: '',
			notes: '',
			uuid: '91e69a92-4a86-49b5-a817-b52219e39056',
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
			if (transaction.transactionType === 'debit') {
				transaction.amount = 0 - parseFloat(transaction.amount);
			}
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
			<main className="">
				<section className="section my-5">
					<div className="container">
						<h2 className="title is-5">
							Welcome to Expense Splitter!
						</h2>
						<h3 className="subtitle">
							Start by exporting your transactions from Mint. Here
							are some links to help get you started:
						</h3>
						<ExportLinks />
					</div>
				</section>
				<section className="section my-5">
					<div className="container">
						<h2 className="title is-5">
							Great! Once you have some transactions, you can
							import them below.
						</h2>
						<h3 className="subtitle">
							Don&apos;t worry, nothing you import is saved
							anywhere outside of your browser.
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
						<TransactionList
							transactions={transactions}
							setTransactions={setTransactions}
						/>
					</div>
				</section>
			</main>
			<footer className="footer py-5 mt-6">
				<div className="content has-text-centered">
					<p>
						<strong>
							<a
								href="https://github.com/brettgoss/expense-splitter"
								target="_blank"
							>
								Expense Splitter
							</a>
						</strong>{' '}
						made with{' '}
						<span className="icon has-text-danger">
							<i className="fas fa-heart"></i>
						</span>{' '}
						by{' '}
						<a href="https://github.com/brettgoss" target="_blank">
							Brett Goss
						</a>
						.
					</p>
				</div>
			</footer>
		</>
	);
}
