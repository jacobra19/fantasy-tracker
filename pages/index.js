import Head from "next/head";
// import styles from '../styles/Home.module.scss'
import { Container } from "@material-ui/core";
import ExpandingPanel from "../components/ExpandingPanel/ExpandingPanel";
import React, { useState, useEffect } from "react";
import axios from "axios";

// import dates from '../utils/mockData'

export default function Home() {
	const [dates, setDates] = useState([]);

	const styles = (s) => {
		let styles = {
			cont: {},
		};

		return styles[s];
	};

	useEffect(async () => {
		let res = await getDates();
		console.log("res", res);
		setDates(res);
		return () => {
			// cleanup
		};
	}, []);

	const getDates = async () => {
		let fetchRes = await fetch("http://localhost:3000/api/dates");
		let jsoned = await fetchRes.json();
		return jsoned;
	};

	const renderExpPan = (day, i) => {
		console.log("day", day);
		return (
			<ExpandingPanel
				isRookieStatusValid={day.isRookieStatusValid}
				key={i}
				date={day.time}
				rosters={day.rosters}
			/>
		);
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Fantasy Tracker</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Container fixed style={styles("cont")}>
				{dates.length ? dates.map(renderExpPan) : "loading"}
			</Container>
		</div>
	);
}

// export async function getStaticProps() {
//     // Call an external API endpoint to get dates.
//     // You can use any data fetching library
//     const dates = await axios.get("http://localhost:3000/api/dates")
//     console.log('dates', dates)
//     // const dates = res.json()

//     // By returning { props: dates }, the Blog component
//     // will receive `dates` as a prop at build time
//     return {
//         props: {
//             dates,
//         },
//     };
// }
