import React, { Component, PropTypes } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
var Dropzone = require('react-dropzone');
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

    onDrop (files) {
      console.log('Received files: ', files);
    }

    render() {

        const buttonWidth = 60;
        const maxWidth = 740 - (1*buttonWidth);
        const minWidth = 260 - (1*buttonWidth);
        const geomaxWidth = 740 - (1*buttonWidth);
        const geominWidth = 260 - (1*buttonWidth);

        const formInstance = (
            <form className="bildeForm">

                <div className="input-group input-group-lg"
                    style={{
                        'textAlign': 'center', 'minWidth': '260px', 'backgroundColor': 'transparent',
                        'marginLeft': 'auto', 'marginRight': 'auto'
                    }}
                >

                    <div style={{ 'color': 'black' }}>
                        <h1>LAST OPP BILDER. </h1>
                        <h3>Adressefelt med søk knapp, Kategori, sub kategori med velg knapp, Bilde panel med last opp bilder (legg til med filvelger) og visning av bilder, Neste og Avbryt.</h3>
                    </div>
                    <br/><br/>

                    <FormGroup controlId="formControlsAdresse" >
                        <div className="input-group input-group-lg" style={{'textAlign': 'center', 'width': '100%', 'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'backgroundColor': 'transparent', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                            <span className="input-group-btn editable-field-buttons">
                                <Button onClick={this.onSearch} style={{ 'Height': '60px', 'borderRadius': '6px', 'border': 'none', 'borderBottomRightRadius': '0px', 'borderTopRightRadius': '0px'}} >
                                        <img src={"map-pin_grey.png"} alt='posisjon' />
                                </Button>
                            </span>
                            <input type="text" className="form-control" value={this.state.adresseDisplayed} placeholder="Selected position is empty" onChange={() => {}} style={{ 'borderRadius': '6px', 'border': 'none', 'borderBottomLeftRadius': '0px', 'borderTopLeftRadius': '0px'}}></input>
                        </div>
                    </FormGroup>

                    <FormGroup controlId="formControlsKategori" >
                        <div className="input-group input-group-lg" style={{'textAlign': 'center', 'width': '100%', 'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'backgroundColor': 'transparent', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                            <span className="input-group-btn editable-field-buttons">
                                <Button onClick={this.onSearch} style={{ 'Height': '60px', 'borderRadius': '6px', 'border': 'none', 'borderBottomRightRadius': '0px', 'borderTopRightRadius': '0px'}} >
                                        <img src={"kategori_grey.png"} alt='kategori' />
                                </Button>
                            </span>
                            <input type="text" className="form-control" value={"Hull i veien > Veibane"} placeholder="Selected category is empty" onChange={() => {}} style={{ 'borderRadius': '6px', 'border': 'none', 'borderBottomLeftRadius': '0px', 'borderTopLeftRadius': '0px'}}></input>
                        </div>
                    </FormGroup>






<div style={{'color': 'black'}}>
    <Dropzone onDrop={this.onDrop}>
        <div>Try dropping some files here, or click to select files to upload.</div>
    </Dropzone>
</div>





                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" id="Meld-Her-Button" onClick={() => this.props.onContinue(this.state.adresseDisplayed)}
                            style={{ 'marginTop': '80px', 'width': '100%', 'height': '40px', 'maxWidth': Number(geomaxWidth) + 'px', 'minWidth': Number(geominWidth) + 'px' }} disabled={this.state.adresseDisplayed.length === 0} >
                            <span id="Neste-Text">Neste</span>
                        </Button>
                    </FormGroup>

                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" bsStyle="link" id="Cancel-Meld-Her-Button" onClick={() => alert("Avbryt")} style={{}}>
                            <span id="Cancel-Text">Avbryt</span>
                        </Button>
                    </FormGroup>

                </div>
            </form>
        );


        return (
            <div className="bilder">
                {formInstance}
            </div>
        );
    }
}

Bilder.propTypes = {
    geodata: PropTypes.object.isRequired,
    onContinue: PropTypes.func.isRequired
};

export default Bilder;