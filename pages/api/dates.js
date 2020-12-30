require("dotenv").config();
import firebase from "firebase";

var firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); // if already initialized, use that one
}

const getDates = async () => {
	let querySnapshot = await firebase
		.firestore()
		.collection("manual-scrape-dates")
		.orderBy("time", "desc")
		.get();
	return querySnapshot.docs.map((item) => {
		let dataItem = item.data();

		return {
			...dataItem,
			time: dataItem.time.toDate(),
		};
	});
};

export default async (req, res) => {
	let data = await getDates();
	console.log("data", data);
	res.statusCode = 200;
	res.json(data);
};
