import React, { Component, PropTypes } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import GeoAutoComplete from './Inputs/geoAutoComplete';
import '../css/Sider/Adresse.css';

class Adresse extends Component {
    constructor(props, context) {
        super(props, context);

        this.onDeleteAdress = this.onDeleteAdress.bind(this);
        
        this.state = this.initialState();
    }

    initialState() {
        return {
            adresseDisplayed: ""
        };
    }

    componentDidMount() {
        this.setState( { adresseDisplayed: this.props.geodata.display_name })
    }

    componentWillReceiveProps(nextProps) {
        this.setState( { adresseDisplayed: nextProps.geodata.display_name })
    }

    onChangeAdress(e) {
        this.setState( {adresseDisplayed : e.target.value});
    }

    onDeleteAdress() {
        this.setState( {adresseDisplayed : ""});
    }

    addressIsValid() {
       if(this.state.adresseDisplayed.length === 0) return false; 
       return true;
    }

    render() {

        const buttonWidth = 60;
        const geomaxWidth = 740 - (2*buttonWidth);
        const geominWidth = 260 - (2*buttonWidth);

        const formInstance = (
            <form >
                <div 
                className="input-group input-group-lg" style={{
                    'width': '100%', 'backgroundColor': 'transparent', 'marginLeft': 'auto', 'marginRight': 'auto'
                }}>

                    <FormGroup>
                        <GeoAutoComplete
                            id="Adresse-Input" 
                            marginTop={{'marginTop': '10px'}} 
                            onSelectAddress={this.props.onSelectAddress} 
                            selectSuggestion={this.props.selectSuggestion}
                            geodata={this.props.geodata}
                            Height={{'height': '50px'}}
                        />  
                    </FormGroup>

                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" id="Meld-Her-Button" onClick={() => this.props.onContinue(this.state.adresseDisplayed)} 
                            style={{'marginTop': '80px', 'width': '100%', 'height': '40px', 'maxWidth': Number(geomaxWidth) + 'px', 'minWidth': Number(geominWidth) + 'px' }} disabled={this.state.adresseDisplayed.length === 0} >
                            <span id="Meld-Her-Text">Meld her</span>
                        </Button>
                    </FormGroup>
                </div>
            </form>
        );


        return (
            <div>
                {formInstance}
            </div>
        );
    }
}

Adresse.propTypes = {
    geodata: PropTypes.object.isRequired,
    onContinue: PropTypes.func.isRequired,
    onSelectAddress : PropTypes.func.isRequired,
    selectSuggestion: PropTypes.func.isRequired
};

export default Adresse;