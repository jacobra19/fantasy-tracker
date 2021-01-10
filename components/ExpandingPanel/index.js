import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from 'date-fns'

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@material-ui/core";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { StatusIcon } from '../index'

const ExpandingPanel = ({ date, isRookieStatusValid, rosters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatTime = (date) => {
        return date.toTimeString().split(' ').filter((item, idx) => idx !== 1).join(' ')
    }

    const styles = (s) => {
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
        };

        return styles[s];
    };

    const DateBox = ({ date }) => {
        return (

            <div style={{ marginLeft: 25 }}>
                <Typography style={{ fontWeight: 500 }}>{format(date, 'PPPP')}</Typography>
                <Typography variant={'subtitle2'}>{formatTime(date)}</Typography>
            </div>
        )
    }

    const renderSummaryContent = () => {
        return (
            <div style={styles("summary")}>
                <div style={styles("leftCont")}>
                    <StatusIcon isValid={isRookieStatusValid} size={'1.5rem'} />
                    <DateBox date={date} />
                </div>
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
        );
    };

    const renderDetailsContent = (rosters) => {
        return (
            <div style={{ width: "100%" }}>
                {rosters.map((team, i) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                padding: 10,
                                alignItems: "center",
                                backgroundColor:
                                    i % 2 === 0 ? "whitesmoke" : "unset",
                            }}
                            key={i}
                        >
                            <StatusIcon isValid={Boolean(team.rooks.length)} />
                            <div style={{ minWidth: 200, width: "50%" }}>
                                {team.team}
                            </div>
                            <div>
                                {team.rooks.length === 0
                                    ? ""
                                    : team.rooks.length > 0
                                        ? team.rooks.join(", ")
                                        : team.rooks[0]}
                            </div>
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
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
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

ExpandingPanel.defaultProps = {};
