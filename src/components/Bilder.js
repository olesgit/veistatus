import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import '../css/Sider/Adresse.css';  //TODO

class Bilder extends Component {
    constructor(props, context) {
        super(props, context);

        this.onDeleteAdress = this.onDeleteAdress.bind(this);
        
        this.state = this.initialState();
    }

    initialState() {
        return {
            adresseDisplayed: "",
            categorySelected: ""
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

        const formInstance = (
            <form className="adresseForm">
                <div className="input-group input-group-lg" style={{
                    'textAlign': 'center', 'maxWidth': '740px', 'minWidth': '260px', 'backgroundColor': 'green',
                    'marginLeft': 'auto', 'marginRight': 'auto'
                }}>


                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" id="Valgt-adresse-Button" onClick={() => alert("TODO")} style={{}} disabled={this.state.categorySelected.length === 0}>
                            <span id="Meld-Her-Text">Display current address , as flat text. Icon and pipe to left, line and icon under</span>
                        </Button>
                    </FormGroup>


                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" id="Adresse-Input" placeholder="Beskriv problemet (f.eks hull i veien)" value={this.state.adresseDisplayed} /*readOnly={true}*/ onChange={(e) => this.onChangeAdress(e)} />
                            <span className="input-group-btn editable-field-buttons">
                            </span>
                        </InputGroup>
                    </FormGroup>


LAST OPP BILDER. Adressefelt med søk knapp, Kategori, sub kategori med velg knapp, Bilde panel med last opp bilder (legg til med filvelger) og visning av bilder, Neste og Avbryt knapp.

                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" id="Meld-Her-Button" onClick={() => this.props.onContinue(this.state.adresseDisplayed)} style={{}} disabled={this.state.categorySelected.length === 0}>
                            <span id="Meld-Her-Text">Neste</span>
                        </Button>
                    </FormGroup>

                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" bsStyle="link"  id="Meld-Her-Button" onClick={() => alert("Avbryt")} style={{}} disabled={this.state.categorySelected.length === 0}>
                            <span id="Meld-Her-Text">Avbryt</span>
                        </Button>
                    </FormGroup>

                </div>
            </form>
        );


        return (
            <div className="kategori">
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>

                        {formInstance}

                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
            </div>
        );
    }
}

Bilder.propTypes = {
    geodata: PropTypes.object.isRequired,
    onContinue: PropTypes.func.isRequired
};

export default Bilder;