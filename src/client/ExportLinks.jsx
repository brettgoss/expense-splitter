import PropTypes from 'prop-types';

import {
	format,
	startOfMonth,
	endOfMonth,
	subMonths,
} from 'date-fns';

const baseUrl = 'https://mint.intuit.com/transaction.event';
// const baseExportUrl = 'https://mint.intuit.com/transactionDownload.event';

export default function ExportLinks() {
	return (
		<div className="buttons">
			<ExportLink
				startDate={startOfMonth(subMonths(new Date(), 2))}
				endDate={endOfMonth(subMonths(new Date(), 2))}
			/>
			<ExportLink
				startDate={startOfMonth(subMonths(new Date(), 1))}
				endDate={endOfMonth(subMonths(new Date(), 1))}
			/>
			<ExportLink
				startDate={startOfMonth(new Date())}
				endDate={endOfMonth(new Date())}
			/>
		</div>
	);
}

ExportLink.propTypes = {
	startDate: PropTypes.instanceOf(Date).isRequired,
	endDate: PropTypes.instanceOf(Date).isRequired,
};
function ExportLink({ startDate, endDate }) {
	function dateForMint(date) {
		return format(new Date(date), 'yyyy-MM-dd');
	}

	return (
		<a
			className="button is-link"
			href={`${baseUrl}?startDate=${dateForMint(
				startDate,
			)}&endDate=${dateForMint(endDate)}&exclHidden=T`}
			target="_blank"
			rel="noreferrer"
		>
			<span>Mint - {format(new Date(startDate), 'LLLL yyyy')}</span>
			<span className="icon">
				<i className="fas fa-external-link-alt"></i>
			</span>
		</a>
	);
}
