import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/AuthenticationAction";
import { DropdownButton, MenuItem, NavDropdown } from "react-bootstrap";
import { bindActionCreators } from "redux";
import * as cookieHandler from "../../Helpers/cookieHandler";



class NavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.logoutFunction = this.logoutFunction.bind(this);
    }

    logoutFunction(e)
    {
        //if (e === "LogoutKey") 
        cookieHandler.removeBymCookie();
        this.props.logout();
        this.context.router.push("/");
    }

    renderDropdownForLoggedUser()
    {
        const isAuthenticated = this.props.authUser;
        const userName = this.props.sub;
        const IsAdmin = this.props.UserISAdmin;
        const IsSA = this.props.UserIsSA;

        if (isAuthenticated)
        {
            if (IsAdmin)
            {
                return (
                    <NavDropdown title={userName} id="nav-dropdown">
                        <MenuItem header>Din Rolle: Admin </MenuItem>
                        <MenuItem onClick={() => this.context.router.push("/brukere/admin")}>Brukere</MenuItem>
                        <MenuItem onClick={this.logoutFunction}>Logg ut</MenuItem>
                    </NavDropdown>

                );
            }
            else if (IsSA)
            {
                return (
                    <NavDropdown title={userName} id="nav-dropdown" className="btn btn-link pull-right">
                        <MenuItem header>Din Rolle: SA </MenuItem>
                        <MenuItem onClick={() => this.context.router.push("/brukere/sa/applikasjoner")}>Servicer</MenuItem>
                        <MenuItem onClick={() => this.context.router.push("/brukere/sa")}>Brukere</MenuItem>
                        <MenuItem onClick={this.logoutFunction}>Logg ut</MenuItem>
                    </NavDropdown>
                );
            }
        }
    }
    render()
    {
        return (
            <div>
                {this.renderDropdownForLoggedUser()}
            </div>
        );
    }
}

NavigationBar.propTypes = {
    authUser: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}
NavigationBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}
//To get the spesific states and data from our store
const mappStateToProps = (state) =>
{
    return {
        authUser: state.auth.user,
        sub: state.auth.user.sub ? state.auth.user.sub : "title",
        UserIsSA: state.auth.user.Autentiseringservice ? state.auth.user.Autentiseringservice === "1" : false,
        UserISAdmin: state.auth.user.Skiltplanservice ? state.auth.user.Skiltplanservice === "1" : false
    };
}
const mapDispatchToProps = (dispatch) =>
{
    return {
        logout: bindActionCreators(logout, dispatch)
    }
}

export default connect(mappStateToProps, mapDispatchToProps)(NavigationBar);