import React, { Component, PropTypes } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cookieHanler from "../../utils/cookieHandler"
import TextFieldGroup from "../../components/common/TextFieldGroup";
import { loginUser } from '../../actions/LoginActions';
import validateInput from "../../validations/LoginValidator";
import { addFlashMessage } from "../../actions/FlashMessagesAction";
import * as globals from "../../constants/Globals"
import * as routers from "../../constants/clientRoutes"

class Login extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            epost: "",
            passord: "",
            serviceId:globals.bymelding_serviceId,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getNextPathName(location)
    {
        return location.state && location.state.nextPathname ? location.state.nextPathname : "/";
    }
    isValid()
    {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid)
        {
            this.setState({ errors });
        }
        return isValid;
    }

    handleSubmit(e)
    {
        e.preventDefault()
        if (this.isValid())
        {
            this.props.loginUser(this.state)
                .then(res =>
                {
                    if (cookieHanler.UserIsEntrepreneur)
                    {
                        this.context.router.push(routers.meldinger)
                    }
					else
					{
						this.props.addFlashMessage({ type: 'error', text: "Bruker er ikke autorisert. Vennligst ta kontak med servicedesk!" });
						//this.context.router.push("/konto/logginn");
					}
				})
				.catch(err => this.props.addFlashMessage({ type: 'error', text: err.response.data.errorMessage }))
				.catch(err => this.props.addFlashMessage({ type: 'error', text: "Authentiseringstjenesten er ikke tilgjengelig!" }))
        }
    }
    handleChange(e)
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    render()
    {
        const { epost, passord, errors} = this.state;
        return (
            <Panel>
                <Row>
                    <Col md={4} mdOffset={4}>
                        <h2 className="text-center"><strong>Logg inn</strong></h2>
                        <form onSubmit={this.handleSubmit} className="col-md-12">
                            <TextFieldGroup error={errors.epost} label="E-post" onChange={this.handleChange} value={epost} name="epost" />
                            <TextFieldGroup error={errors.passord} label="Passord" onChange={this.handleChange} value={passord} name="passord" type="password" />

                            <div className="form-group">
                                {/*<Link to="konto/glemtpassord" className="btn btn-link pull-left"> Glemt passord </Link>*/}
                                <button className="btn btn-info pull-right"> Logg inn </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Panel>
        );
    }
}

Login.defaultProps = {
    serviceinfo: {}
}
Login.propTypes = {
    serviceinfo: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,    
    addFlashMessage: PropTypes.func.isRequired
};
Login.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>
{
    return {
        serviceinfo: state.common.serviceinfo
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({  loginUser, addFlashMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
