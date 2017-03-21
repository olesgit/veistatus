import React, { Component, PropTypes } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
var Dropzone = require('react-dropzone');
import './Bilder.css';


class Bilder extends Component {
    constructor(props, context) {
        super(props, context);

        this.onDeleteAdress = this.onDeleteAdress.bind(this);
        this.onDrop = this.onDrop.bind(this);
        
        this.state = this.initialState(); 
    }

    initialState() {
        return {
            adresseDisplayed: "",
            categorySelected: "",
            files: [],
            ready: true
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

    onDrop (acceptedFiles) {
        // this.setState({ ready: false });
        console.log('Received files: ', acceptedFiles);

        if(this.state.files.length === 0) this.setState({ files: acceptedFiles });
        else this.setState({ files: this.state.files.concat(acceptedFiles) });

        // setTimeout(() => { this.setState({ ready: true }) }, 200);
        // console.log(this.state.files);
    }

    render() {

        // console.log('rendering ....'); console.log(this.state.files.length);

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

                    <FormGroup controlId="formControlsAddPictures" style={{ backgroundColor: 'transparent' }} >
                        <div style={{
                            'color': 'black', 'opacity': 0.95, 'width': 740, 'height': 195, 'backgroundColor': '#e9e9e9', 'textAlign': 'left',
                            'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'marginLeft': 'auto', 'marginRight': 'auto'
                        }} >
                            <div id="image" style={{ backgroundColor: 'orange' }}>
                                <img src="Camera.png" alt='kategori' style={{ 'float': 'left', 'align': 'left', 'paddingLeft': '9px', 'paddingTop': '11px' }} />
                            </div>
                            <div id="texts" className="text-24px" style={{ 'color': 'black', 'float': 'initial', 'paddingLeft': '53px', 'paddingTop': '12px', backgroundColor: 'transparent' }}>
                                Last opp bilder…
                            </div>
                            <div style={{ height: 128, width: '100%', backgroundColor: 'transparent', 'marginTop': '10px' }}>
                                <Dropzone onDrop={this.onDrop}
                                          preventDropOnDocument={true}
                                          //onClick={this.onDrop}
                                          style={{ 'color': 'black', 'height': '128px', 'width': '128px', backgroundColor: 'white', 'marginLeft': '10px', 'borderStyle': 'dashed', 'borderWidth': '1px', 'borderColor': '#979797' }} 
                                          activeStyle={{ backgroundColor: 'green' }} >
                                    <div className="centerPictureFrame">
                                        <span className="centerPictureHelper"></span><img className="centerPictureImg" src="pluss.png" alt='legg til' height="36" />
                                    </div>
                                </Dropzone>
                            </div>                            
                        </div>
                    </FormGroup>



                    <FormGroup controlId="formControlsThumbnails" >
                        <div style={{
                            'color': 'black', 'opacity': 0.95, 'width': 740, 'height': 195, 'backgroundColor': '#e9e9e9', 'textAlign': 'left',
                            'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'marginLeft': 'auto', 'marginRight': 'auto'
                        }} >
                            <div style={{ 'width': '128px', 'height': '128px', 'backgroundColor': 'pink', 'float': 'left' }} >
                                <img className="thumbnails" src="plugins.png" alt="bilde" />
                            </div>
                            <div style={{ 'width': '128px', 'height': '128px', 'backgroundColor': 'pink', 'float': 'left', marginLeft: '10px' }} >
                                <img className="thumbnails" src="bilde.jpg" alt="bilde" />
                            </div>                            
                        </div>
                    </FormGroup>


                    {/*<FormGroup controlId="formControlsThumbnails" >
                        <div style={{
                            'color': 'black', 'opacity': 0.95, 'width': 740, 'height': 195, 'backgroundColor': '#e9e9e9', 'textAlign': 'left',
                            'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'marginLeft': 'auto', 'marginRight': 'auto'
                        }} >
                            {this.state.files.length > 0 ? <div>
                                <h2>Uploading {this.state.files.length} files...</h2>
                                <div style={{ 'width': '128px', 'height': '128px', 'backgroundColor': 'pink' }}>{this.state.files.map((file) => <img className="thumbnails" src={file.preview} alt='bilde' key={file.name} />)}</div>
                            </div> : null}
                        </div>
                    </FormGroup>*/}






                    <FormGroup controlId="formControlsMeld" >
                        <Button className="btn-lg" id="Meld-Her-Button" onClick={() => this.props.onContinue(this.state.adresseDisplayed)}
                            style={{ 'marginTop': '10px', 'width': '100%', 'height': '40px', 'maxWidth': Number(geomaxWidth) + 'px', 'minWidth': Number(geominWidth) + 'px' }} disabled={this.state.adresseDisplayed.length === 0} >
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