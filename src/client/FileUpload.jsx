import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

FileUpload.propTypes = {
	handleFileUpload: PropTypes.func,
	errorText: PropTypes.string,
	mainText: PropTypes.string,
	acceptedTypes: PropTypes.arrayOf(PropTypes.string),
};
export default function FileUpload({
	handleFileUpload,
	errorText = 'Invalid file type',
	mainText = 'Choose a file',
	acceptedTypes = ['text/csv'],
}) {
	const fileUploadInput = useRef();
	// eslint-disable-next-line no-unused-vars
	const [dragging, setDragging] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [fileName, setFileName] = useState();

	function getFile(event) {
		if (event.target?.files?.length) {
			return event.target.files[0];
		} else if (event.dataTransfer?.files?.length) {
			return event.dataTransfer.files[0];
		}
	}

	async function handleUpload(event) {
		event.preventDefault();
		const file = getFile(event);
		setDragging(false);

		if (!file) {
			return;
		}
		if (isValidFile(file)) {
			await uploadFile(file);
		} else {
			setError(true);
		}
	}

	async function uploadFile(file) {
		try {
			setLoading(true);
			setError(false);
			await handleFileUpload(file);
			setFileName(file.name);
		} catch (error) {
			console.log('An error occurred while uploading file', error);
			setError(true);
		}
		setLoading(false);
	}

	function isValidFile(file) {
		return !!file && !!file.type && acceptedTypes.includes(file.type);
	}

	return (
		<div>
			<div
				className="file has-name"
				onDrop={async (event) => await handleUpload(event)}
				onDragEnter={() => {
					setDragging(true);
				}}
				onDragLeave={() => {
					setDragging(false);
				}}
				onDragOver={(event) => {
					event.preventDefault();
				}}
				onClick={() => {
					fileUploadInput.current.click();
				}}
				title="Hint: You can drag and drop a file here"
			>
				<label className="file-label">
					<span className="file-cta">
						<span className="file-icon">
							<i className="fas fa-upload"></i>
						</span>
						<span className="file-label">{mainText}</span>
					</span>
					{fileName && <span className="file-name">{fileName}</span>}
				</label>
			</div>
			<input
				id="FileUpload"
				type="file"
				className="is-hidden"
				ref={fileUploadInput}
				onChange={(event) => handleUpload(event)}
				accept={acceptedTypes.toString()}
				disabled={loading}
			/>
			{error && <div className="is-error">{errorText}</div>}
		</div>
	);
}
