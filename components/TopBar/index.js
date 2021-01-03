import { Typography, AppBar, Container } from "@material-ui/core";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GitHubIcon from "@material-ui/icons/GitHub";

const TopBar = () => {
	const [isHover, setIsHover] = useState(false);
	const styles = (s) => {
		let styles = {
			cont: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: 16,
			},
			titleCont: {
				display: "flex",
			},
			imageWrapper: {
				marginRight: 15,
			},
			titleLogo: {},
			titleText: {
				fontWeight: 600,
				fontSize: "1.3rem",
			},
			menuTextItem: {
				fontWeight: 600,
			},
		};

		return styles[s];
	};

	const handleMouseEnter = () => {
		setIsHover(true);
	};
	const handleMouseLeave = () => {
		setIsHover(false);
	};

	return (
		<AppBar position={"sticky"}>
			<Container maxWidth={"sm"} style={styles("cont")}>
				<Link href={"/"}>
					<a
						style={styles("titleCont")}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div style={styles("imageWrapper")}>
							<Image
								src='/basketball-64.png'
								alt='logo'
								width='32'
								height='32'
							/>
						</div>

						<Typography style={styles("titleText")}>
							Fantasy Tracker
						</Typography>
					</a>
				</Link>

				<a href={"https://github.com/jacobra19/fantasy-tracker-next"}>
					<GitHubIcon />
				</a>
			</Container>
		</AppBar>
	);
};

export default TopBar;
