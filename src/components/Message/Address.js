import React, { Component, PropTypes } from 'react'
import { FormGroup, Button } from 'react-bootstrap'
import AddressInput from '../AddressInput'
import Step from '../Step'

import './Address.css'

import addressIcon from '../../images/address.svg'

class Address extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        address: PropTypes.object,
        addressSpecified: PropTypes.func,
        geodata: PropTypes.object
    }

    static defaultProps = {
        editing: true
    }

    next = () => {
        if (this.props.addressSpecified) {
            this.props.addressSpecified(this.props.geodata);
        }
    }

    render() {

        const { editing, address } = this.props;

        if (!editing && !address) {
            return null;
        }

        if (!editing) {
            return <Step icon={addressIcon} text={address.display_name} />;
        }

        return (
            <div className="address-content">
                <FormGroup controlId="adresse">
                    <AddressInput geodata={this.props.geodata} showClear={true} />
                </FormGroup>
                <Button bsStyle="success" block onClick={this.next}>Meld her</Button>
            </div>
        );
    }
}

export default Address;