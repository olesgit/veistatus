import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, Glyphicon } from 'react-bootstrap';
import { GeoExample } from '../../components/Meldinger/GeoExample';
import '../../css/Geocoding/Geocoding.css';


class GeoAutoComplete extends Component {
    constructor(props) {
        super(props);

        this.handleClickSuggestion = this.handleClickSuggestion.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onDeleteAdress = this.onDeleteAdress.bind(this);

        this.state = {
            // streetlist: [{ id: 1, adresse: 'Mingate 1', place_id: 'xyz'}, { id: 2, adresse: 'Mingate 2', place_id: 'u,v,w' }, { id: 3, adresse: 'Mingate 3', place_id: 'rst' }] //Viser formatet
            streetlist: [],
            clear: false
        };
    }

    onSuggestInputChange() {
        this.setState({ streetlist: [] });
    }

    Suggest(data) {
        if (this.state.streetlist.find(street => street.id === data.id)) return;
        let s = { id: data.id, adresse: data.description, place_id: data.place_id };
        this.setState({ streetlist: this.state.streetlist.concat(s) });
    }

    onSearch() {
        if (this.state.streetlist.length > 0) {
            this.props.selectSuggestion(this.state.streetlist[0]);
            this.setState({ streetlist: [] });
        }
    }

    onDeleteAdress() {
        this.setState({ clear: true });
        this.setState({ streetlist: [] });
        setTimeout(() => { this.setState({ clear: false }) }, 200);
    }

    handleClickSuggestion(e, street) {
        this.props.selectSuggestion(street);
        this.setState({ streetlist: [] });
    }

    render() {

        const buttonWidth = 60;
        const maxWidth = 740 - (2 * buttonWidth);
        const minWidth = 260 - (2 * buttonWidth);

        return (
            <div>
                <div id="panelcontainer">
                    <div className="text-center formgroupoverlaycontainer" style={{ ...this.props.marginTop, 'backgroundColor': 'red', 'textAlign': 'center' }} >
                        <FormGroup controlId="formControlsName" className="formgroupoverlaycontainer" style={{ 'backgroundColor': 'green' }}>

                            <div className="input-group input-group-lg" style={{
                                'textAlign': 'center', 'width': '100%', 'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'backgroundColor': 'transparent',
                                'marginLeft': 'auto', 'marginRight': 'auto'
                            }}>
                                <GeoExample
                                    onSelectAddress={this.props.onSelectAddress}
                                    onSuggest={(data) => this.Suggest(data)}
                                    onChange={() => this.onSuggestInputChange()}
                                    clear={this.state.clear}
                                    geodata={this.props.geodata}
                                    Height={this.props.Height}
                                />

                                <span className="input-group-btn editable-field-buttons">
                                    <Button onClick={this.onSearch} style={{ ...this.props.Height, 'maxHeight': '60px', 'borderRadius': '0px', 'border': 'solid 1px #979797', 'borderRightStyle': 'none', 'borderLeftStyle': 'none' }} >
                                        <Glyphicon glyph="search" />
                                    </Button>
                                </span>
                                <span className="input-group-btn editable-field-buttons">
                                    <Button onClick={this.onDeleteAdress} style={{ ...this.props.Height, 'maxHeight': '60px', 'borderRadius': '0px', 'border': 'solid 1px #979797', 'borderLeftStyle': 'none' }}>
                                        <img src={"slett.png"} alt='slett' />
                                    </Button>
                                </span>
                            </div>

                            {this.state.streetlist.length > 0 &&
                                <div className="dropdown" style={{
                                    'backgroundColor': 'white', 'textAlign': 'left', 'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'marginLeft': 'auto', 'marginRight': 'auto',
                                    'border': '1px solid grey', 'borderRadius': '0px', 'color': 'black'
                                }}>

                                    <ul className="geoSuggestList" style={{
                                        'margin': '0', 'padding': '0', 'textAlign': 'left', 'lineHeight': '1.8', 'color': '#4a4a4a', 'fontSize': '24px', 'backgroundColor': 'white',
                                        'maxWidth': Number(maxWidth) + 'px', 'minWidth': Number(minWidth) + 'px', 'marginLeft': 'auto', 'marginRight': 'auto', 'borderRadius': '0px',
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
                </div>
            </div>
        );
    }
}


GeoAutoComplete.defaultProps = {
}


GeoAutoComplete.propTypes = {
    marginTop: PropTypes.object.isRequired,
    geodata: PropTypes.object.isRequired,
    onSelectAddress: PropTypes.func.isRequired,
    selectSuggestion: PropTypes.func.isRequired,
    Height: PropTypes.object.isRequired
};


export default GeoAutoComplete;