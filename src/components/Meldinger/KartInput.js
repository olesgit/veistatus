import React, {PropTypes} from 'react';
//import Spinner from 'react-spinkit';
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';


export class KartInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            name: 'noused',
            search: 'noused',
            searchTouched: false
        }
    }

    componentWillMount() {
    }

    nameIsValid() {
        return true;
    }

    changeHandler(event) {
        switch (event.target.id) {
            case "formControlsSearch":
                this.setState({search: event.target.value,searchTouched: true});
                break;
            default:
                return;
        }
    }

    render() {
        const roller = [ {rolleId: 1, navn: 'test'} , {rolleId: 2, navn: 'toasst'} , {rolleId: 3, navn: 'tst'}];
        const formInstance = (
            <form className="addUserForm">
                <FormGroup controlId="formControlsName"
                    validationState={(this.nameIsValid()) ? null : "error"}>
                    <ControlLabel>Valgt Adresse</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.selectedAdress}
                        onChange={this.changeHandler}
                        onBlur={this.changeHandler}
                    />
                    {(!this.nameIsValid()) && <HelpBlock>Navn kan ikke være tom</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="formControlsSearch"
                    validationState={(this.nameIsValid()) ? null : "error"}>
                    <ControlLabel>Søk Adresse</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.search}
                        onChange={this.changeHandler}
                        onBlur={this.changeHandler}
                    />
                    {(!this.nameIsValid()) &&
                        <HelpBlock>Noe galt</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="formControlsSelect"
                    validationState={(this.nameIsValid()) ? null : "error"}>
                    <ControlLabel>Rolle</ControlLabel>
                    <FormControl componentClass="select" placeholder="select"
                        value={'NJET'}
                        onChange={this.changeHandler}>
                        {roller.map((role) => {
                            return (<option key={role.rolleId} value={role.rolleId}>{role.navn}</option>);
                        })}
                    </FormControl>
                    {(!this.nameIsValid()) && <HelpBlock>Rolle må være valgt</HelpBlock>}
                </FormGroup>
            </form>
        );


        return (
            <div>
                <div className="KartInput">
                    {formInstance}
                </div>
                <div className="modal-footer">
                    <Button className="pull-left" bsStyle="link" onClick={() => {
                        this.props.onSubmit(null)
                    }}>Avbryt
                    </Button>
                    <Button className="pull-left" bsStyle="primary" bsSize="large" type="submit" id="submitButton"
                            onClick={this.saveAndClose}>{'Do continue please..'}
                    </Button>
                </div>
            </div>


            /*<div>
                <div className="modal-footer">
                    <Button className="pull-left" bsStyle="link" onClick={() => {
                        alert('heio påo deio');
                    }}>Avbryt
                    </Button>
                    <Button className="pull-left" bsStyle="primary" bsSize="large" type="submit" id="submitButton"
                        onClick={() => {alert('will submit!!!!!!!!!!!!!!')}}>Do something else
                    </Button>
                </div>
            </div>*/




        );
    }
}

KartInput.DefaultProps = {
    selectedAdress: 'nothing'
};

KartInput.propTypes = {
    selectedAdress: PropTypes.string.isRequired
};

