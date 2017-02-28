import React from 'react';
import { Image } from 'react-bootstrap';

import '../../css/layout/Footer.css';

const logo = require('../../images/byvaap-cmyk.png');

const Footer = () => (
	<footer>
		<div>
			<Image src={logo} />
		</div>
		<div>
			<span className="footer-text">OSLO KOMMUNE</span>
		</div>
	</footer>
);

export default Footer;