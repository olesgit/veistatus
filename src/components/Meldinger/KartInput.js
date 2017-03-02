import React, {PropTypes} from 'react';
import Spinner from 'react-spinkit';
import {Table, Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';


export class KartInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: 'noused',
            email: 'noused'
        }
    }


    componentWillMount() {
    }

    nameIsValid() {
        return true;
    }


    render() {

        const roller = [ {rolleId: 1, navn: 'test'} , {rolleId: 2, navn: 'toasst'} , {rolleId: 3, navn: 'tst'}];
        const formInstance = (
            <form className="addUserForm">
                <FormGroup controlId="formControlsName"
                    validationState={(this.nameIsValid()) ? null : "error"}>
                    <ControlLabel>Adresse</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.selectedAdress}
                        onChange={this.changeHandler}
                        onBlur={this.changeHandler}
                    />
                    {(!this.nameIsValid()) && <HelpBlock>Navn kan ikke være tom</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="formControlsEmail"
                    validationState={(this.nameIsValid()) ? null : "error"}>
                    <ControlLabel>Something input</ControlLabel>
                    <FormControl
                        type="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        onBlur={this.changeHandler}
                    />
                    {(!this.nameIsValid()) &&
                        <HelpBlock>Må være en gyldig e-post</HelpBlock>}
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

