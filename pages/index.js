import React, { useState, useEffect } from "react";
import Head from "next/head";

import { isSunday } from 'date-fns'
import { Container } from "@material-ui/core";

import { ExpandingPanel, ErrorMessage, Loader, WeeklyDivider } from "../components";

export default function Home() {
    const [dates, setDates] = useState([])
    const [error, setError] = useState(null)

    useEffect(async () => {
        try {
            let res = await fetch('/api/dates')
            let parsed = await res.json()
            let result = parsed.map(date => ({ ...date, time: new Date(date.time) }))
            setDates(result)
        } catch (error) {
            setError(error)

        }
        return () => {
        }
    }, [])

    if (error) return <ErrorMessage />

    const renderExpPan = (day, i) => {

        return (
            <div key={i}>
                { isSunday(day.time) || i === 0 ? <WeeklyDivider text={day.matchup} /> : null}
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
                {dates && dates.length ? dates.map(renderExpPan) : <Loader />}
            </Container>
        </div>
    );
}