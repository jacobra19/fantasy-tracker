import React from 'react';

import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const StatusIcon = ({ isValid }) => {
    const styles = (s) => {
        let validColor = "#4caf50";
        let invalidColor = "#dc004e";

        let styles = {
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

    return (
        isValid 
        ?
        <CheckCircleIcon style={styles("validIcon")} size={"1rem"} />
        :
        <ErrorIcon style={styles("invalidIcon")} size={"1rem"} />
    )
}

export default StatusIcon;
