import React, { Component, PropTypes } from 'react'
import { Navbar, Image, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router'
import LoginContainer from '../../containers/Layout/LoginContainer'
import RegisterUserContainer from '../../containers/Layout/RegisterUserContainer'
import ForgotPasswordContainer from '../../containers/Layout/ForgotPasswordContainer'

import './Header.css'

import logo from '../../images/byvaapen.png'
import oslo_logo from '../../images/logo_oslo.png'

class Header extends Component {

    static propTypes = {
        signedIn: PropTypes.bool.isRequired
    }

    state = {
        login: false,
        register: false,
        password: false
    }

    show = (ev, name) => {
        this.setState({ [name]: true });
        if (ev.target.blur) ev.target.blur();
    }

    hide = (name) => {
        this.setState({ [name]: false });
    }

    render() {
        const { signedIn } = this.props;
        const { login, register, password } = this.state;
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
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {!signedIn && <NavItem onClick={(ev) => this.show(ev, 'register')}>Registrer deg</NavItem>}
                        {!signedIn && <NavItem onClick={(ev) => this.show(ev, 'login')}>Logg inn</NavItem>}
                    </Nav>
                </Navbar.Collapse>
                <Image className="oslo-logo" width={90} height={50} src={oslo_logo} />
                {login && <LoginContainer onHide={() => this.hide('login')} onForgotPassword={(ev) => this.show(ev, 'password')} />}
                {register && <RegisterUserContainer onHide={() => this.hide('register')} />}
                {password && <ForgotPasswordContainer onHide={() => this.hide('password')} />}
            </Navbar>
        );
    }

}

export default Header