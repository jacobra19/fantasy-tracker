import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { format, getDay } from 'date-fns'

import StatusIcon from '../StatusIcon'

import { green, red } from "@material-ui/core/colors";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SummaryContent = () => { };

const ExpandingPanel = ({ date, isRookieStatusValid, rosters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

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



    const renderSummaryContent = () => {
        return (
            <div style={styles("summary")}>
                <div style={styles("leftCont")}>
                    <StatusIcon isValid={isRookieStatusValid} />

                    <Typography>{date.toTimeString()}</Typography>
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
                            <StatusIcon isValid={team.rooks.length} />
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
    console.log('date', date)
    console.log('getDay(date)', format(date, 'EEEE'))
    return (
        <Accordion
            style={styles("cont")}
            square
            expanded={isExpanded}
            onChange={() => {
                setIsExpanded(!isExpanded);
            }}
        >

            {/* <Divider/> */}
            <AccordionSummary>
                {renderSummaryContent()}
                {/* date 
                 logo ---- exapndlogo */}
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
                {renderDetailsContent(rosters)}
            </AccordionDetails>
        </Accordion>
    );
};

export default ExpandingPanel;

ExpandingPanel.propTypes = {
    date: PropTypes.string.isRequired,
    isRookieStatusValid: PropTypes.bool.isRequired,
    rosters: PropTypes.array.isRequired,
};

ExpandingPanel.defaultProps = {};