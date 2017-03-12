import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

class Adresse extends Component {
    constructor(props, context) {
        super(props, context);

        this.onDeleteAdress = this.onDeleteAdress.bind(this);
        
        this.state = this.initialState();
    }

    initialState() {
        return {
            Notused: "",
            NotusedTouched: false,
            adresseDisplayed: ""
        };
    }

    componentDidMount() {
        // console.log("Adresse did mount");
        this.setState( { adresseDisplayed: this.props.geodata.display_name })
    }

    componentWillReceiveProps(nextProps) {
        // console.log("Adresse will receive props");
        // console.log(nextProps);
        this.setState( { adresseDisplayed: nextProps.geodata.display_name })
    }

    onChangeAdress(e) {
        this.setState( {adresseDisplayed : e.target.value});
    }

    onDeleteAdress() {
        this.setState( {adresseDisplayed : ""});
    }

    render() {

        const formInstance = (
            <form className="adresseForm">
                <div className="input-group input-group-lg" style={{
                    'textAlign': 'center', 'maxWidth': '740px', 'minWidth': '260px', 'backgroundColor': 'transparent',
                    'marginLeft': 'auto', 'marginRight': 'auto'
                }}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" id="Adresse-Input" placeholder="Klikk i kart" value={this.state.adresseDisplayed} /*readOnly={true}*/ onChange={(e) => this.onChangeAdress(e)} />
                            <span className="input-group-btn editable-field-buttons">
                                <Button onClick={this.onDeleteAdress} style={{ 'height': '50px' }}>
                                    <img src={"slett.png"} alt='slett' />
                                </Button>
                            </span>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" id="Meld-Her-Button" onClick={() => alert('TODO')} style={{}}>
                            <span id="Meld-Her-Text">Meld her</span>
                        </Button>
                    </FormGroup>
                </div>
            </form>
        );


        return (
            <div className="velkommen">
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

Adresse.propTypes = {
    geodata: PropTypes.object.isRequired
};

export default Adresse;