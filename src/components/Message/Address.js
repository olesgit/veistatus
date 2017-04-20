import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import AddressInput from '../AddressInput'
import Step from '../Step'

import './Address.css'

import addressIcon from '../../images/address.svg'

class Address extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        address: PropTypes.object,
        value: PropTypes.object,
        onChange: PropTypes.func,
        goto: PropTypes.func,
        showMap: PropTypes.func.isRequired
    }

    static defaultProps = {
        editing: true
    }

    render() {

        const { editing, address, goto, value, onChange, showMap } = this.props;

        if (!editing && !address) {
            return null;
        }

        if (!editing) {
            return <Step icon={addressIcon} text={address.display_name} goto={goto} />;
        }

        return (
            <div className="address-content">
                <FormGroup id="address" controlId="adresse">
                    <AddressInput geodata={value} showClear={true} locationSeleted={onChange} />
                </FormGroup>
                <FormGroup id="address-static" controlId="adresse-static">
                    <ControlLabel>Valgt adresse:</ControlLabel>
                    <FormControl.Static>
                        {value ? value.display_name : ''}
                    </FormControl.Static>
                </FormGroup>
                {address &&
                    <span className="address-addon">
                        <Button bsStyle="link" onClick={showMap}>
                            Velg addresse i kart
                        </Button>
                    </span>
                }
            </div>);
    }
}

export default Address;