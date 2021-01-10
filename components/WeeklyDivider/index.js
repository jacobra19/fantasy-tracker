import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography } from "@material-ui/core";

const Text = ({ str }) => {
    return (
        <Typography style={{
            position: "absolute",
            top: -12,
            left: 25,
            background: "white",
            padding: "0 20px",
        }}>
            {str}
        </Typography>
    )
}


const WeeklyDivider = ({ text = '' }) => {
    return (
        <div style={{ position: 'relative' }}>
            <Divider style={{ margin: `30px 0px`, }} />
            { text && <Text str={text} />}
        </div>
    );
}

WeeklyDivider.propTypes = {
    text: PropTypes.string,
};

export default WeeklyDivider;
