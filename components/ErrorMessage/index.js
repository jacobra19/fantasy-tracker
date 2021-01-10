import React from 'react';
import { Typography } from '@material-ui/core'


const ErrorMessage = () => {

    return (
        <div style={{
            width: "100%",
            height: "calc(100vh - 70px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <Typography >Somethig went wrong</Typography>
        </div>
    )
}


export default ErrorMessage;
