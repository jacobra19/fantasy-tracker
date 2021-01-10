import React from 'react';
import { CircularProgress } from "@material-ui/core";

const Loader = () => {

    return (
        <div
            style={{
                width: "100%",
                height: "calc(100vh - 70px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress />
        </div>
    )
}
export default Loader;
