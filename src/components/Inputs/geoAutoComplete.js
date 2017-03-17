import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, Glyphicon } from 'react-bootstrap';


import { GeoExample } from '../../components/Meldinger/GeoExample';


class geoAutoComplete extends Component {
    constructor(props) {
        super(props);

        this.handleClickSuggestion = this.handleClickSuggestion.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onDeleteAdress = this.onDeleteAdress.bind(this);

        this.state = {
            open: false,
            valgtAdresse: "",
            toggleImg: "pil-opp.png",
            // streetlist: [{ id: 1, adresse: 'Mingate 1', place_id: 'xyz'}, { id: 2, adresse: 'Mingate 2', place_id: 'u,v,w' }, { id: 3, adresse: 'Mingate 3', place_id: 'rst' }] //Viser formatet
            streetlist: [],
            clear: false
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    SelectCoord(data) {
        this.setState({ valgtAdresse: data.display_name });
    }

    onSuggestInputChange() {
        //console.log("onSuggestInputChange");
        this.setState({ streetlist: [] });
    }

    Suggest(data) {
        //console.log(data);
        if(this.state.streetlist.find(street => street.id === data.id)) return;
        let s = { id: data.id, adresse: data.description, place_id: data.place_id };
        this.setState({ streetlist: this.state.streetlist.concat(s) });
    }

    TogglePanel() {
        this.setState({ open: !this.state.open });
        this.setState({ toggleImg: this.state.toggleImg === "pil-ned.png" ? "pil-opp.png" : "pil-ned.png" });
    }

    nameIsValid() {
        return true;
    }

    onSearch() {
        if(this.state.streetlist.length > 0)
            this.props.selectSuggestion(this.state.streetlist[0]);
    }

    onDeleteAdress() {
        this.setState( { clear: true } );
        setTimeout(() => { this.setState({ clear: false }) }, 200);
    }

    handleClickSuggestion(e,street) {
        this.props.selectSuggestion(street);
    }

    render() {

        console.log("in render");

        return (
                <div className="text-center formgroupoverlaycontainer" style={{ 'marginTop': '100px', 'backgroundColor': 'red', 'textAlign': 'center' }}>
                    <FormGroup controlId="formControlsName" className="formgroupoverlaycontainer" style={{ 'backgroundColor': 'green' }}>

                        <div className="input-group input-group-lg" style={{
                            'textAlign': 'center', 'width': '100%', 'maxWidth': '740px', 'minWidth': '260px', 'backgroundColor': 'transparent',
                            'marginLeft': 'auto', 'marginRight': 'auto'
                        }}>
                            <GeoExample onSelectAddress={this.props.onSelectAddress} onSuggest={(data) => this.Suggest(data)} onChange={() => this.onSuggestInputChange()} clear={this.state.clear}/>
                            <span className="input-group-btn editable-field-buttons">
                                <Button onClick={this.onSearch} style={{ 'height': '60px', 'maxHeight': '60px', 'borderRadius': '0px'}} >
                                    <Glyphicon glyph="search" />
                                </Button>
                            </span>
                            <span className="input-group-btn editable-field-buttons">
                                <Button onClick={this.onDeleteAdress} style={{ 'height': '60px', 'maxHeight': '60px', 'borderRadius': '0px'}}>
                                    <img src={"slett.png"} alt='slett' />
                                </Button>
                            </span>
                        </div>

                        {this.state.streetlist.length > 0 &&
                            <div className="dropdown" style={{
                                'backgroundColor': 'white', 'textAlign': 'left', 'maxWidth': '740px', 'minWidth': '260px', 'marginLeft': 'auto', 'marginRight': 'auto',
                                'border': '1px solid grey', 'borderRadius': '0px', 'color': 'black'
                            }}>

                                <ul style={{
                                    'margin': '0', 'padding': '0', 'textAlign': 'left', 'lineHeight': '1.8', 'color': '#4a4a4a', 'fontSize': '24px', 'backgroundColor': 'white',
                                    'maxWidth': '740px', 'minWidth': '260px', 'marginLeft': 'auto', 'marginRight': 'auto', 'borderRadius': '0px',
                                    'listStyleType': 'none', 'listStylePosition': 'outside', 'listStyleImage': 'url(marker-white.png)', 'paddingLeft': '20px', 'paddingtop': '5px'
                                }}>
                                    {this.state.streetlist.map(street => {
                                        return <li onClick={(e) => this.handleClickSuggestion(e, street)} key={street.id}><span>{street.adresse}</span></li>;
                                    })
                                    }
                                </ul>
                            </div>
                        }

                    </FormGroup>
                </div>
        );
    }
}


geoAutoComplete.defaultProps = {
}


geoAutoComplete.propTypes = {
    onSelectAddress: PropTypes.func.isRequired,
    selectSuggestion: PropTypes.func.isRequired,
    test: PropTypes.bool.isRequired
};


export default geoAutoComplete;