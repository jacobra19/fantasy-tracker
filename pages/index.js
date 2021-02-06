import React, { useState, useEffect } from "react";
import Head from "next/head";
import useSWR from "swr";
import axios from "axios";

import { isSunday } from 'date-fns'
import { Container } from "@material-ui/core";

import { ExpandingPanel, ErrorMessage, Loader, WeeklyDivider } from "../components";

const fetcher = async (url) => {
    const res = await axios.get(url)
    if (res && res.data) {
        let result = res.data.map(date => ({ ...date, time: new Date(date.time) }))
        return result
    } else {
        throw Error('fetcher error')
    }

}


export default function Home() {
    const { data: dates, error } = useSWR('/api/dates', fetcher, { initialData: [] })
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