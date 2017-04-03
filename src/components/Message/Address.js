import React, { Component, PropTypes } from 'react'
import { FormGroup } from 'react-bootstrap'
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
        goto: PropTypes.func
    }

    static defaultProps = {
        editing: true
    }

    render() {

        const { editing, address, goto, value, onChange } = this.props;

        if (!editing && !address) {
            return null;
        }

        if (!editing) {
            return <Step icon={addressIcon} text={address.display_name} goto={goto} />;
        }

        return (
            <div className="address-content">
                <FormGroup controlId="adresse">
                    <AddressInput geodata={value} showClear={true} locationSeleted={onChange} />
                </FormGroup>
            </div>
        );
    }
}

export default Address;