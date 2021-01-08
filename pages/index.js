import React, { useState, useEffect } from "react";
import Head from "next/head";
import fire from '../config/firestore-config';
import { format, getDay, isSunday, isSameHour } from 'date-fns'

import { Container, Divider } from "@material-ui/core";

import ExpandingPanel from "../components/ExpandingPanel";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

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

            let querySnapshot = await fire
                .firestore()
                .collection("manual-scrape-dates")
                .orderBy("time", "desc")
                .limit(14)
                .get();
            return querySnapshot.docs.map((item) => {
                let dataItem = item.data();
                return {
                    ...dataItem,
                    time: dataItem.time.toDate(),
                };
            });

        } catch (error) {
            console.error('fb error', error)
            setIsFBError(true)
            return []
        }

    };

    const renderExpPan = (day, i) => {
        // console.log('isSameHour(day.date,Date.now())', isSameHour(day.date,Date.now()))
        return (
            <div key={i}
            >
                { isSameHour(day.date, Date.now()) ? <Divider style={{ margin: `10px 0px` }} /> : null}
                <ExpandingPanel
                    isRookieStatusValid={day.isRookieStatusValid}
                    date={day.time}
                    rosters={day.rosters}
                />

            </div>
        );
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy Tracker</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Container maxWidth={"sm"} style={styles("cont")}>
                {isFBError ? <ErrorMessage /> : dates.length ? dates.map(renderExpPan) : <Loader />}
            </Container>
        </div>
    );
}