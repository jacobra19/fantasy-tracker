import TopBar from "../components/TopBar/TopBar";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<TopBar />
			<Component {...pageProps} />
			<footer>footer</footer>
		</div>
	);
}

export default MyApp;
