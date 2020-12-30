import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { green, red } from "@material-ui/core/colors";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SummaryContent = () => {};

const ExpandingPanel = ({ date, isRookieStatusValid, rosters }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const styles = (s) => {
		let validColor = "#4caf50";
		let invalidColor = "#dc004e";

		let styles = {
			cont: {},
			summary: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
			},
			leftCont: {
				display: "flex",
				alignItems: "center",
			},
			validIcon: {
				color: validColor,
				width: "1rem",
				height: "1rem",
			},
			invalidIcon: {
				color: invalidColor,
				width: "1rem",
				height: "1rem",
			},
		};

		return styles[s];
	};

	const renderStatusIcon = (isRookieStatusValid) => {
		if (isRookieStatusValid) {
			return (
				<CheckCircleIcon style={styles("validIcon")} size={"1rem"} />
			);
		}
		return <ErrorIcon style={styles("invalidIcon")} size={"1rem"} />;
	};

	const renderSummaryContent = () => {
		return (
			<div style={styles("summary")}>
				<div style={styles("leftCont")}>
					<Typography>{date}</Typography>
					{renderStatusIcon(isRookieStatusValid)}
				</div>
				{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			</div>
		);
	};

	const renderDetailsContent = (rosters) => {
		return (
			<div>
				{rosters.map((team, i) => {
					return (
						<div style={{ display: "flex" }} key={i}>
							{renderStatusIcon(team.rooks.length)}
							<div style={{ minWidth: 300 }}>{team.team}</div>
							<div>{team.rooks.length ? team.rooks[0] : ""}</div>
						</div>
					);
				})}
			</div>
		);
	};
	return (
		<Accordion
			style={styles("cont")}
			square
			expanded={isExpanded}
			onChange={() => {
				setIsExpanded(!isExpanded);
			}}
		>
			<AccordionSummary>
				{renderSummaryContent()}
				{/* date 
                 logo ---- exapndlogo */}
			</AccordionSummary>
			<AccordionDetails style={styles("detailes")}>
				{renderDetailsContent(rosters)}
			</AccordionDetails>
		</Accordion>
	);
};

export default ExpandingPanel;

ExpandingPanel.propTypes = {
	date: PropTypes.object.isRequired,
	isRookieStatusValid: PropTypes.bool.isRequired,
    rosters: PropTypes.array.isRequired,
};

ExpandingPanel.defaultProps = {
};
