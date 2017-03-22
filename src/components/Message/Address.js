import React, { Component, PropTypes } from 'react'
import { FormGroup, Button } from 'react-bootstrap'
import AddressInput from '../AddressInput'
import StaticStep from '../StaticStep'

import addressIcon from '../../images/address.svg'

class Address extends Component {

    static propTypes = {
        editing: PropTypes.bool,
        address: PropTypes.string,
        addressSpecified: PropTypes.func,
        geodata: PropTypes.object
    }

    static defaultProps = {
        editing: true
    }

    next = () => {
        if (this.props.addressSpecified) {
            // TODO get address from geodata object
            this.props.addressSpecified(this.props.address);
        }
    }

    render() {

        const { editing, address } = this.props;

        if (!editing && !address) {
            return null;
        }

        if (!editing) {
            return <StaticStep icon={addressIcon} text={address} />;
        }

        return (
            <div className="address-content">
                <FormGroup controlId="adresse">
                    <AddressInput geodata={this.props.geodata} onSelectAddress={this.selectCoord} selectSuggestion={this.selectSuggestion} />
                </FormGroup>
                <Button bsStyle="primary" block onClick={this.next}>Meld her</Button>
            </div>
        );
    }
}

export default Address;