import React, {Component, PropTypes} from 'react';
import {Modal, Button, FormGroup, HelpBlock} from 'react-bootstrap';
import { daylabels, monthlabels } from "../../constants/settings";
const DatePicker = require("react-bootstrap-date-picker");

class DateModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveAndClose = this.saveAndClose.bind(this);
        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.dateIsValid = this.dateIsValid.bind(this);

        this.state = this.initialState();
    }

    initialState() {
        return {
            open: true,

            date: "",
            dateTouched: false
        };
    }

    openModal() {
        this.setState({open: true});
    }

    closeModal() {
        this.props.onCancel();
        this.setState({open: false});
    }

    saveAndClose() {
        if (this.dateIsValid()) {
            this.setState({open: false});
            this.props.onConfirm({
                date_iso: this.state.date_iso, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
                date: this.state.date  // Formatted String, ex: "02.01.2017" 
            });
        } else {
            this.setState({dateTouched: true});
        }
    }

    handleDateFromChange(value, formattedValue) {
        this.setState({
            date_iso: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
            date: formattedValue, // Formatted String, ex: "02.01.2017" 
            dateTouched: true
        });
    }

    dateIsValid() {
        let b = this.state.date.length > 0;
        return b;
    }

    render() {
        const formInstance = (
            <form className="addDateForm">
                <FormGroup controlId="gyldigfra"
                    validationState={(this.dateIsValid() || !this.state.dateTouched) ? null : "error"}>
                  <DatePicker id="gyldigfra-datepicker" style={{ width: "100%" }} showClearButton={false} value={this.state.date_iso} onChange={this.handleDateFromChange} dateFormat="DD.MM.YYYY"
                    dayLabels={daylabels} monthLabels={monthlabels} weekStartsOnMonday={true} showTodayButton={true} todayButtonLabel="idag" />
                  {(!this.dateIsValid() && this.state.dateTouched) && <HelpBlock>Dato kan ikke være tom</HelpBlock>}
                </FormGroup>
            </form>
        );

        return (
            <div>
                <Modal show={this.state.open} onHide={this.closeModal} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title><strong>{this.props.modalTitle}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formInstance}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-left" bsSize="large" bsStyle="link" onClick={this.closeModal}>Avbryt
                        </Button>
                        <Button className="pull-left" bsSize="large" type="submit"
                                onClick={this.saveAndClose}>{this.props.confirmText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

DateModal.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmText: PropTypes.string.isRequired,
    modalTitle: PropTypes.string.isRequired
};

export default DateModal;