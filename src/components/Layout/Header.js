import React, { Component, PropTypes } from 'react'
import { Navbar, Image, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import LoginContainer from '../../containers/Layout/LoginContainer'
import RegisterUserContainer from '../../containers/Layout/RegisterUserContainer'
import ForgotPasswordContainer from '../../containers/Layout/ForgotPasswordContainer'
import ProfileContainer from '../../containers/Layout/ProfileContainer'

import './Header.css'

import logo from '../../images/byvaapen.png'
import oslo_logo from '../../images/logo_oslo.png'
import settingsIcon from '../../images/innstillinger.svg'
import userIcon from '../../images/profil.svg'

class Header extends Component {

    static propTypes = {
        signedIn: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired
    }

    state = {
        login: false,
        register: false,
        password: false,
        profile: false
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
        const { login, register, password, profile } = this.state;

        const settings = [
            <Image id="settings-img" src={settingsIcon} />,
            <span id="settings-txt">Instillinger</span>
        ];

        const user = <Image src={userIcon} />

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
                    <Navbar.Toggle>
                        <Image src={settingsIcon} width={17} height={17} />
                    </Navbar.Toggle>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {!signedIn && <NavItem onClick={(ev) => this.show(ev, 'register')}>Registrer deg</NavItem>}
                        {!signedIn && <NavItem onClick={(ev) => this.show(ev, 'login')}>Logg inn</NavItem>}
                        {
                            signedIn &&
                            <NavDropdown id="bruker-meny" title={user} noCaret>
                                <MenuItem onClick={(ev) => this.show(ev, 'profile')}>Din profil</MenuItem>
                                <MenuItem onClick={() => this.props.logout()}>Logg ut</MenuItem>
                            </NavDropdown>
                        }
                        <NavDropdown id="innstillinger" title={settings} noCaret>
                            <MenuItem>Vilkår</MenuItem>
                            <MenuItem>Om Bymelding</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Image className="oslo-logo" width={90} height={50} src={oslo_logo} />
                {login && <LoginContainer onHide={() => this.hide('login')} onForgotPassword={(ev) => this.show(ev, 'password')} />}
                {register && <RegisterUserContainer onHide={() => this.hide('register')} />}
                {password && <ForgotPasswordContainer onHide={() => this.hide('password')} />}
                {profile && <ProfileContainer onHide={() => this.hide('profile')} />}
            </Navbar>
        );
    }

}

export default Header