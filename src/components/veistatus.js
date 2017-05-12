import React, { Component, PropTypes } from 'react';
import { FormControl, FormGroup, ControlLabel, Panel, Col, Row, Button, HelpBlock } from 'react-bootstrap';
import ConfirmModal from '../components/common/ConfirmModal';


class VeiStatusForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleStore = this.handleStore.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.openConfirmModal = this.openConfirmModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirmRemove = this.handleConfirmRemove.bind(this);
    this.state = this.initialState();
  }

  initialState() {
    return {
      ConfirmOpen: false,
      ChangedValues: false,
      NewValues: false,
      SelectedGate: "",
      Gatenavn: "",
      Bydel: "",
      Veistatus: "",
      GAB: "",
      Gammelt_bydelsnummer: "",
      Overtagelses_dato: "",
      Veinummer: "",
      Historikk1: "",
      Annet: "",
      Registrert_dato: "",
      Registrert_av: "",
      Revidert_dato: "",
      Revidert_av: "",
      Kilder: "",
      street: {}
    };
  }

  changeHandler(event) {
    // console.log(event.target.id);
    // if((event.target.id !== "formControlsSelectStreet") && (this.state.SelectedGate === ""))
    //   return;
    switch (event.target.id) {
      case "formControlsSelectStreet":
        //console.log(event.target.value);
        const street = this.props.streets.find(s => s.ID.toString() === event.target.value);
        //console.log(street);
        if (street.Gatenavn === null) {
          this.setState(this.initialState());
          this.setState({ NewValues: true });
          return;
        }
        this.setState({
          ChangedValues: false,
          NewValues: false,
          SelectedGate: street.Gatenavn,
          Gatenavn: street.Gatenavn,
          Bydel: street.Bydel != null ? street.Bydel : "",
          Veistatus: street.Veistatus != null ? street.Veistatus : "",
          GAB: street.GAB != null ? street.GAB : "",
          Gammelt_bydelsnummer: street.Gammelt_bydelsnummer != null ? street.Gammelt_bydelsnummer : "",
          Overtagelses_dato: street.Overtagelses_dato != null ? street.Overtagelses_dato : "",
          Veinummer: street.Veinummer != null ? street.Veinummer : "",
          Historikk1: street.Historikk1 != null ? street.Historikk1 : "",
          Annet: street.Annet != null ? street.Annet : "",
          Registrert_dato: street.Registrert_dato != null ? street.Registrert_dato : "",
          Registrert_av: street.Registrert_av != null ? street.Registrert_av : "",
          Revidert_dato: street.Revidert_dato != null ? street.Revidert_dato : "",
          Revidert_av: street.Revidert_av != null ? street.Revidert_av : "",
          Kilder: street.Kilder != null ? street.Kilder : "",
          street: street
        });
        break;
      case "Gatenavn":
        this.setState({
          ChangedValues: true,
          Gatenavn: event.target.value
        });
        break;
      case "Bydel":
        this.setState({
          ChangedValues: true,
          Bydel: event.target.value
        });
        break;
      case "Veistatus":
        this.setState({
          ChangedValues: true,
          Veistatus: event.target.value
        });
        break;
      case "GAB":
        this.setState({
          ChangedValues: true,
          GAB: event.target.value
        });
        break;
      case "Gammelt_bydelsnummer":
        this.setState({
          ChangedValues: true,
          Gammelt_bydelsnummer: event.target.value
        });
        break;
      case "Overtagelses_dato":
        this.setState({
          ChangedValues: true,
          Overtagelses_dato: event.target.value
        });
        break;
      case "Veinummer":
        this.setState({
          ChangedValues: true,
          Veinummer: event.target.value
        });
        break;
      case "Historikk1":
        this.setState({
          ChangedValues: true,
          Historikk1: event.target.value
        });
        break;
      case "Annet":
        this.setState({
          ChangedValues: true,
          Annet: event.target.value
        });
        break;
      case "Registrert_dato":
        this.setState({
          ChangedValues: true,
          Registrert_dato: event.target.value
        });
        break;
      case "Registrert_av":
        this.setState({
          ChangedValues: true,
          Registrert_av: event.target.value
        });
        break;
      case "Revidert_dato":
        this.setState({
          ChangedValues: true,
          Revidert_dato: event.target.value
        });
        break;
      case "Revidert_av":
        this.setState({
          ChangedValues: true,
          Revidert_av: event.target.value
        });
        break;
      case "Kilder":
        this.setState({
          ChangedValues: true,
          Kilder: event.target.value
        });
        break;
      default:
        return;
    }
  }

  handleStore() {
    // if(this.state.Gatenavn === "") return;
    var s = { ...this.state.street };
    s.Gatenavn = this.state.Gatenavn;
    s.Bydel = this.state.Bydel;
    s.Veistatus = this.state.Veistatus;
    s.GAB = this.state.GAB;
    s.Gammelt_bydelsnummer = this.state.Gammelt_bydelsnummer;
    s.Overtagelses_dato = this.state.Overtagelses_dato;
    s.Veinummer = this.state.Veinummer;
    s.Historikk1 = this.state.Historikk1;
    s.Annet = this.state.Annet;
    s.Registrert_dato = this.state.Registrert_dato;
    s.Registrert_av = this.state.Registrert_av;
    s.Revidert_dato = this.state.Revidert_dato;
    s.Revidert_av = this.state.Revidert_av;
    s.Kilder = this.state.Kilder;
    this.props.update(s);

    this.setState({
      ChangedValues: false,
      NewValues: false
    });
  }

  handleNew() {
    this.setState(this.initialState());

    var element = document.getElementById('formControlsSelectStreet');
    element.value = 2901;  //2901 - blank record, andre id er 55, 2020

    this.setState({
      NewValues: true,
      SelectedGate: 'rediger ny'
    });

    //this.props.getStreets();
  }

  handleDelete() {
    var s = { ...this.state.street };
    this.props.delete(s);

    this.setState(this.initialState());

    var element = document.getElementById('formControlsSelectStreet');
    element.value = 2901;  //2901 - blank record, andre id er 55, 2020

  }

  openConfirmModal() {
    this.setState({ ConfirmOpen: true });
  }

  handleConfirmRemove() {
    this.setState({ ConfirmOpen: false });
    this.handleDelete();
  }

  handleCancelRemove() {
    this.setState({ ConfirmOpen: false });
  }

  render() {

    const title = (
      <h3>Veistatus , <small>Oslo Kommune - Bymiljøetaten - Veihistorikk</small></h3>
    );

    const streets = [...this.props.streets];

    const bodyTextWithName="Bekreft sletting av gate: " + this.state.street.Gatenavn + " .";

    const formInstance = (

      <Panel style={{
        'width': '50%', 'height': '100%', /*'backgroundColor': 'green', */
        'maxWidth': '740px', 'minWidth': '260px', 'marginLeft': 'auto', 'marginRight': 'auto', 'border': '1px solid grey', 'borderRadius': '5px',
      }}
        header={title} bsStyle="primary">
        <form >

          {this.state.ConfirmOpen && <ConfirmModal
            onConfirm={(e) => this.handleConfirmRemove()}
            onCancel={(e) => this.handleCancelRemove()}
            confirmText="Bekreft"
            bodyText={bodyTextWithName}
            modalTitle="Bekreft sletting av gate" />}


          {/*<FormGroup controlId="formControlsSubTitle" style={{'backgroundColor': 'green', 'margin': '0px', padding: '0px'}}>
              <ControlLabel><small>Oslo Kommune - Bymiljøetaten - Veihistorikk</small></ControlLabel>
            </FormGroup>*/}


          <FormGroup controlId="formControlsSelectStreet">
            <ControlLabel>Velg en gate:</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.changeHandler}>
              {streets.map((street) => {
                return (<option value={street.ID} key={street.ID}>{street.Gatenavn}</option>);
              })}
            </FormControl>
          </FormGroup>

          <Panel id="EditableContent">

            <div id="ContentFirstPart">
              <Col id="col1" md={6}>
                <FormGroup controlId="Gatenavn" validationState={(this.state.Gatenavn !== "" || this.state.SelectedGate === "") ? null : "error"}>
                  <ControlLabel>Gatenavn: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Gatenavn}
                    onChange={this.changeHandler}
                  />
                  {(this.state.Gatenavn === "" && this.state.SelectedGate !== "") && <HelpBlock>Navn kan ikke være tom</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="Bydel">
                  <ControlLabel>Bydel: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Bydel}
                    onChange={this.changeHandler}
                  />
                </FormGroup>

                <FormGroup controlId="Veistatus">
                  <ControlLabel>Veistatus: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Veistatus}
                    onChange={this.changeHandler}
                  />
                </FormGroup>

              </Col>

              <Col id="col2" md={6}>

                <div>
                  <Row>
                    <Col id="subcol1" md={6}>
                      <FormGroup controlId="GAB">
                        <ControlLabel>GAB: </ControlLabel>
                        <FormControl
                          type="text"
                          value={this.state.GAB}
                          onChange={this.changeHandler}
                        />
                      </FormGroup>
                    </Col>

                    <Col id="subcol2" md={6}>
                      <FormGroup controlId="Veinummer">
                        <ControlLabel>Veinummer: </ControlLabel>
                        <FormControl
                          type="text"
                          value={this.state.Veinummer}
                          onChange={this.changeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <FormGroup controlId="Gammelt_bydelsnummer">
                  <ControlLabel>Gammelt bydelsnummer: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Gammelt_bydelsnummer}
                    onChange={this.changeHandler}
                  />
                </FormGroup>

                <FormGroup controlId="Overtagelses_dato">
                  <ControlLabel>Overtagelsesdato: </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Overtagelses_dato}
                    onChange={this.changeHandler}
                  />
                </FormGroup>

              </Col>
            </div>

            <div id="ContentSecondPart">
              <Col id="col1" md={12}>
                <FormGroup controlId="Historikk1">
                  <ControlLabel>Historikk</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="historikk" value={this.state.Historikk1}
                    style={{ 'height': '100%', 'minHeight': '120px', 'maxWidth': '100%' }}
                    onChange={this.changeHandler} />
                </FormGroup>

                <FormGroup controlId="Annet">
                  <ControlLabel>Annet</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="annet" value={this.state.Annet}
                    style={{ 'height': '100%', 'minHeight': '60px', 'maxWidth': '100%' }}
                    onChange={this.changeHandler} />
                </FormGroup>
              </Col>
            </div>

            <div id="ContentThirdPart">
              <Col id="col1" md={6}>
                <FormGroup controlId="Registrert_dato">
                  <ControlLabel>Registrert dato:</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Registrert_dato}
                    onChange={this.changeHandler}
                  />
                </FormGroup>

                <FormGroup controlId="Registrert_av">
                  <ControlLabel>Registrert av:</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Registrert_av}
                    onChange={this.changeHandler}
                  />
                </FormGroup>

                <FormGroup controlId="Revidert_dato">
                  <ControlLabel>Revidert dato:</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Revidert_dato}
                    onChange={this.changeHandler}
                  />
                </FormGroup>

                <FormGroup controlId="Revidert_av">
                  <ControlLabel>Revidert av:</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.Revidert_av}
                    onChange={this.changeHandler}
                  />
                </FormGroup>
              </Col>

              <Col id="col2" md={6}>
                <FormGroup controlId="Kilder">
                  <ControlLabel>Kilder:</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="kilder" value={this.state.Kilder}
                    style={{ 'height': '100%', 'minHeight': '110px', 'maxWidth': '100%' }}
                    onChange={this.changeHandler} />
                </FormGroup>

                <Button bsStyle="primary" /*bsSize="large"*/ disabled={this.state.NewValues}
                  style={{ 'float': 'right', 'marginTop': '20px', 'marginLeft': '50px' }}
                  onClick={this.handleNew}
                  block>Ny gate
                    </Button>

                <Button bsStyle="primary" /*bsSize="large"*/ disabled={!this.state.ChangedValues}
                  style={{ 'float': 'right', /*'marginTop': '100px',*/ 'marginLeft': '50px' }}
                  onClick={this.handleStore}
                  block>Lagre
                    </Button>

                <Button bsStyle="primary" /*bsSize="large"*/ disabled={this.state.NewValues || this.state.ChangedValues || this.state.street.ID === null || this.state.street.ID === 2901 || this.state.street.ID === undefined}
                  style={{ 'float': 'right', /*'marginTop': '100px',*/ 'marginLeft': '50px' }}
                  onClick={this.openConfirmModal}
                  block>Slett
                    </Button>

              </Col>
            </div>


          </Panel>



        </form>
      </Panel>
    );

    return (
      <div>
        {formInstance}
      </div>
    );
  }
}

VeiStatusForm.propTypes = {
  streets: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  getStreets: PropTypes.func.isRequired
};

export default VeiStatusForm;