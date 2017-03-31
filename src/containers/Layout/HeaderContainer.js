import React, { Component } from 'react'
import { Navbar, Image } from 'react-bootstrap'
import { Link } from 'react-router'

import './HeaderContainer.css'


import logo from '../../images/byvaapen.png'
import oslo_logo from '../../images/logo_oslo.png'

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
                    <Image className="oslo-logo" src={oslo_logo} />
                </Navbar.Header>
            </Navbar>
        )
    }

}

HeaderContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default HeaderContainer