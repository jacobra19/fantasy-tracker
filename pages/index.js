import React, { useState, useEffect } from "react";
import Head from "next/head";

import { isSunday } from 'date-fns'
import { Container } from "@material-ui/core";

import { ExpandingPanel, ErrorMessage, Loader, WeeklyDivider } from "../components";

export default function Home() {
    const [dates, setDates] = useState([]);
    const [isFBError, setIsFBError] = useState(false)

    const styles = (s) => {
        let styles = {
            cont: {
                paddingTop: 24,
            },
        };

        return styles[s];
    };

    useEffect(async () => {
        let dates = await getDates();
        setDates(dates);
        return () => {
        };
    }, []);

    const getDates = async () => {

        try {
            let res = await fetch(location.origin + '/api/dates')
            let parsed = await res.json()
            return parsed.map(date => ({ ...date, time: new Date(date.time) }))
        } catch (error) {
            console.error('fb error', error)
            setIsFBError(true)
            return []
        }

    };

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

    const renderList = (dates) => {
        return dates.map(renderExpPan)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy Tracker</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Container maxWidth={"sm"} style={styles("cont")}>
                {isFBError ? <ErrorMessage /> : dates && dates.length ? renderList(dates) : <Loader />}
            </Container>
        </div>
    );
}