import React, { Component } from 'react';
import { Navbar, Image } from 'react-bootstrap';
import { Link } from 'react-router';

import './HeaderContainer.css'

const logo = require('../../images/byvaapen.png');

class HeaderContainer extends Component {
    render() {
        return (
            <Navbar fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={{ pathname: '/' }}>
                            <Image src={logo} className="byvaapen" />
                            <div className="header-text">
                                Oslo kommune
                                <br />
                                <span className="header-text-strong">Bymiljøetaten</span>
                            </div>
                        </Link>
                    </Navbar.Brand>
                    <Image className="oslo-logo" src={"logo_oslo.png"} />
                </Navbar.Header>
            </Navbar>
        )
    }

}

HeaderContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default HeaderContainer