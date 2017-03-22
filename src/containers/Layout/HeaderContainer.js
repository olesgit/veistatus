import React, { PropTypes, Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cookieHandler from "../../utils/cookieHandler";
import { signOutAndRemoveCookie } from "../../actions/LoginActions"
import { Nav, /*NavItem,*/ NavDropdown, MenuItem, Navbar, Image, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
//import { LinkContainer } from 'react-router-bootstrap';
//import * as routes from '../../constants/clientRoutes';

import '../../css/layout/Header.css';

const logo = require('../../images/byvaap-cmyk.png');

class HeaderContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.logout = this.logout.bind(this)
    }

    logout(e) {
        const bymcookie = cookieHandler.loadBymCookie()
        this.props.signOutAndRemoveCookie(bymcookie)
        this.context.router.push("/")
    }
    renderUsername() {
        let usernameInBymCookie=cookieHandler.Username()
        let username = this.props.user.sub ? this.props.user.sub : usernameInBymCookie
        return username
    }
    renderNavigationBarForWormMeldinger() {
        return ( (cookieHandler.UserIsEntrepreneur() || cookieHandler.UserIsServicedesk()) &&
            <Nav pullRight>
                <NavDropdown className="divider-vertical" eventKey={1} title={<span><Glyphicon glyph="user" />{this.renderUsername()}</span>} id="user-profile">
                    <MenuItem eventKey="1.1" onClick={this.logout}>Logg ut</MenuItem>
                </NavDropdown>
            </Nav>
        )
    }
    renderNavigationBarForBymAdmin() {
        return (cookieHandler.UserIsBymAdmin() &&
            <Nav pullRight>
                {/*<LinkContainer to={routes.serviceAvdelingen}>
                    <NavItem className="divider-vertical" eventKey={1}>BYMILJØETATEN</NavItem>
                </LinkContainer>

                <NavDropdown className="divider-vertical" eventKey={2} title="ENTREPRENØRER"
                    id="basic-nav-dropdown">
                    <LinkContainer to={routes.selskaper}>
                        <MenuItem eventKey={3.1}>ENTREPRENØRER</MenuItem>
                    </LinkContainer>
                    <LinkContainer to={routes.prosessKodeSkjema}>
                        <MenuItem eventKey={3.2} href={"/" + routes.prosessKodeSkjema}>PROSESSKODER</MenuItem>
                    </LinkContainer>
                </NavDropdown>
                <LinkContainer to={routes.login}>
                    <NavItem className="divider-vertical" eventKey={3} href="/">SAMARBEIDSPARTNERE</NavItem>
                </LinkContainer>*/}
                <NavDropdown className="divider-vertical" eventKey={1} title={<span><Glyphicon glyph="user" />{this.renderUsername()}</span>} id="user-profile">
                    <MenuItem eventKey="1.1" onClick={this.logout}>Logg ut</MenuItem>
                </NavDropdown>
            </Nav>

        )
    }

    renderNavigationBar() {
        return (
            <Navbar fluid fixedTop >
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={{ pathname: '/' }}>
                            <Image src={logo} />
                            <span className="header-text">BYMelding</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                { this.renderNavigationBarForBymAdmin() }
                { this.renderNavigationBarForWormMeldinger()}
            </Navbar>
        );
    }

    render() {
        return (
            <div>
                {this.renderNavigationBar()}
            </div>
        )
    }

}
HeaderContainer.propTypes = {
    user: PropTypes.object.isRequired,
    signOutAndRemoveCookie: PropTypes.func.isRequired
};
HeaderContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.login.token ? state.login.token : {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ signOutAndRemoveCookie }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)