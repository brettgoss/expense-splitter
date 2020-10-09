import React from 'react';

const baseUrl = 'https://mint.intuit.com/transaction.event';
const septemberTransactionsLink =
	`${baseUrl}?startDate=09/1/2020&endDate=09/30/2020&exclHidden=T`;
const octoberTransactionsLink =
	`${baseUrl}?startDate=10/1/2020&endDate=10/31/2020&exclHidden=T`;
const novemberTransactionsLink =
	`${baseUrl}?startDate=11/1/2020&endDate=10/30/2020&exclHidden=T`;

/**
 * @todo Make links dynamic
 * @todo Full month or half month link granularity (select reporting period)
 */
export default function App() {
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
					<h1 className="title is-5">Welcome to Expense Splitter!</h1>
					<h2 className="subtitle">
						Start by exporting your transactions from Mint. Here are
						some links to help get you started:
					</h2>
					<div className="buttons">
						<a className="button is-link" href={septemberTransactionsLink} target="_blank">
							<span>Mint - September 2020</span>
							<span className="icon">
								<i className="fas fa-external-link-alt"></i>
							</span>
						</a>
						<a className="button is-link" href={octoberTransactionsLink} target="_blank">
							<span>Mint - October 2020</span>
							<span className="icon">
								<i className="fas fa-external-link-alt"></i>
							</span>
						</a>
						<a className="button is-link" href={novemberTransactionsLink} target="_blank">
							<span>Mint - November 2020</span>
							<span className="icon">
								<i className="fas fa-external-link-alt"></i>
							</span>
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
