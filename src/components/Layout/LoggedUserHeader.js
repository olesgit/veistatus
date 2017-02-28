import React, { PropTypes } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

import '../../css/layout/LoggedUserHeader.css';

const LoggedUserHeader = props => (
	<Navbar.Collapse>
		<Nav pullRight>
			<NavDropdown eventKey={1} title={props.brukerId} id="user-profile">
				<MenuItem eventKey="1.1" onClick={props.logout}>Logg ut</MenuItem>
			</NavDropdown>
		</Nav>

		{/*
		<Nav pullRight>
			<NavItem className="divider-vertical" eventKey={1} href="#">Link</NavItem>
			<NavItem className="divider-vertical" eventKey={2} href="#">Link</NavItem>
			<NavDropdown className="divider-vertical" eventKey={3} title="Dropdown" id="basic-nav-dropdown">
				<MenuItem eventKey={3.1}>Action</MenuItem>
				<MenuItem eventKey={3.2}>Another action</MenuItem>
				<MenuItem eventKey={3.3}>Something else here</MenuItem>
				<MenuItem divider />
				<MenuItem eventKey={3.3}>Separated link</MenuItem>
			</NavDropdown>
		</Nav>
	*/}

	</Navbar.Collapse>
);

LoggedUserHeader.propTypes = {
	brukerId: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};
export default LoggedUserHeader;