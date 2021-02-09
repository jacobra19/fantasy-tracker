import React, { useState, useEffect } from "react";
import Head from "next/head";

import { isSunday } from 'date-fns'
import { Container, Button } from "@material-ui/core";

import { ExpandingPanel, ErrorMessage, Loader, WeeklyDivider } from "../components";
import { useDates } from '../hooks/hooks'

export default function Home() {
    const [matchups, loading, error, loadMore] = useDates()

    if (error) return <ErrorMessage />
    const renderMatchups = matchups => matchups.map(renderExpPan)

    const renderExpPan = (day, i) => {
        return (
            <div key={i}>
                { i === 0 ? <WeeklyDivider text={day.matchup} /> : null}
                <ExpandingPanel
                    isRookieStatusValid={day.isRookieStatusValid}
                    date={day.time}
                    rosters={day.rosters}
                />
            </div>
        );
    };

    return (
        <div >
            <Head>
                <title>Fantasy Tracker</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Container maxWidth={"sm"} style={{ paddingTop: 24 }}>
                {matchups && matchups.length ? matchups.map(renderMatchups) : <Loader />}
                {/* <Button onClick={loadMore}>Load More</Button> */}
            </Container>
        </div>
    );
}