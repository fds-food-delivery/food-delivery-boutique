import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
	return (
		<div className="footer" id="footer">
			<p className="footer-copyright">
				{" "}
				Copyright 2024 © turquoise.sn - All Right Reserved
				<a
					href="http://localhost:3200/"
					style={{
						color: "#f86c6b",
						textDecoration: "none",
						marginLeft: "auto",
					}}
				>
					Admin
				</a>
			</p>
		</div>
	);
};

export default Footer;
