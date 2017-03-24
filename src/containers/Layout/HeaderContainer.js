import React, { Component } from 'react';
import { Navbar, Image } from 'react-bootstrap';
import { Link } from 'react-router';

import '../../css/layout/Header.css';

const logo = require('../../images/byvaap-cmyk.png');

class HeaderContainer extends Component {
    render() {
        return (
            <Navbar fluid fixedTop  >
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={{ pathname: '/' }}>
                            <Image src={logo} />
                            <span className="header-text">BYMelding</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Image src={"logo_oslo.png"} style={{ position: 'absolute', right: '0px', top: '32px' }} />
            </Navbar>
        )
    }

}

HeaderContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default HeaderContainer