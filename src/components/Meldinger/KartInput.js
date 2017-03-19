import React, {PropTypes} from 'react';
//import Spinner from 'react-spinkit';
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import {nominatim} from '../Kart/Nominatim';

//NOTE: denne er ikke i bruk. Beholdt som dokumentasjon på google maps key og nominatim
export class KartInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            name: 'noused',
            search: '',
            searchTouched: false
        }
    }

    componentWillMount() {
    }

    nameIsValid() {
        return true;
    }


Complted = (err, data) => {
        if (err) {
            throw err;
        }
        
        //console.log(data[0].display_name);
        console.clear();
        var l = data.length;
        for(var i = 0; i < l; i++)
            console.log(data[i].display_name);
    }
    

//Upper Left : 60.150391714056326 10.48851013183594

//Lower Right : 59.797871028010384 10.965042114257814

//boundingbox="52.548641204834,52.5488433837891,-1.81612110137939,-1.81592094898224" 

//boundingbox="59.797871028010384,60.150391714056326,10.48851013183594,10.965042114257814" 

//Nominatim documentation:
//http://wiki.openstreetmap.org/wiki/Nominatim
//Nominatum usage policy:
//https://operations.osmfoundation.org/policies/nominatim/

//Google maps:
//Visit the Google Developer Console to generate your API key. 
//The API's that you have to enable in your Google API Manager Dashboard are 
//Google Maps Geocoding API, 
//Google Places API Web Service and 
//Google Maps Javascript API.
//API key: AIzaSyDY1uwDe8-xR2h9xBxFgZG7Lr9eLMSKPR4

//Example of google maps in react use:
//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
// google developer console, for selecting apis and getting a key
//https://console.developers.google.com/apis/credentials?project=engaged-plasma-160513
// react-geosuggest component documentation:
//https://github.com/ubilabs/react-geosuggest

//My Oslo ViewBox:
//viewbox: '10.48851013183594, 60.150391714056326, 10.965042114257814, 59.797871028010384',


    changeHandler(event) {
        switch (event.target.id) {
            case "formControlsSearch":
                var query = {
                    //q: event.target.value,
                    street: event.target.value,
                    addressdetails: '1',
                    viewbox: '10.48851013183594, 60.150391714056326, 10.965042114257814, 59.797871028010384',
                    bounded: 1
                    //boundingbox: '59.797871028010384,60.150391714056326,10.48851013183594,10.965042114257814'
                    //countrycodes: 'no'
                    //viewbox: { left: KL, top: KT, right: KR, bottom: KB }
                };

                nominatim.search(query, this.Complted);


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
                        placeholder="Check this out"
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

