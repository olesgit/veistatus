import React, { Component, PropTypes } from 'react'
import StaticStep from '../StaticStep'
import CategoryInput from '../CategoryInput'
import CategoryRecommended from '../CategoryRecommended'
import { Button } from 'react-bootstrap'

import './Category.css'

import categoryIcon from '../../images/kategori.svg'

const categories = [
    {
        "meldingstype": {
            "meldingstypeId": "e414f798-454f-495c-ba61-ccbdd5a89296",
            "navn": "Annen forsøpling",
            "beskrivelse": "Søppel - Annen forsøpling",
            "kartlagKobling": "Soppel"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "7661763e-bffc-48be-aa09-530116a64e27",
                "navn": "Søppel"
            }
        ]
    },
    {
        "meldingstype": {
            "meldingstypeId": "e081d98a-6328-484d-809e-6e055753143c",
            "navn": "Veibane",
            "beskrivelse": "Hull i veien - Veibane",
            "kartlagKobling": "Vei"
        },
        "meldingskategorier": [
            {
                "meldingskategoriId": "2781201e-6a7c-4121-bcfa-6e4cd5c2afb6",
                "navn": "Hull i vei"
            },
            {
                "meldingskategoriId": "a8b85b11-af32-4e47-93a1-2d12cd991e2e",
                "navn": "Vei"
            }
        ]
    }
];

class Category extends Component {

    static propTypes = {
        category: PropTypes.object.isRequired,
        editing: PropTypes.bool.isRequired,
        categorySpecified: PropTypes.func.isRequired
    }

    static defaultProps = {
        editing: true
    }

    state = {
        category: this.props.category
    }

    categoryChanged = category => {
        this.setState({ category });
    }

    next = () => {
        // TODO ActionCreator => { type: "CATEGORY_SELECTED", payload: category }
        // TODO Do not "next" if category is not selected
        this.props.categorySpecified(this.state.category);
    }

    cancel = () => {

    }

    renderStatic() {
        return (
            <div>
                <img src={categoryIcon} alt="kategori" />
                <span>
                    Hull i veien > Veibane
                </span>
            </div>
        );
    }

    render() {

        const { editing } = this.props;
        const { category } = this.state;

        if (!editing && !category) {
            return null;
        }

        if (!editing) {
            return <StaticStep icon={categoryIcon} text={"Hull i veien > Veibane"} />
        }

        return (
            <div className="category-content">
                <CategoryInput category={category} categories={categories} onCategorySelected={this.categoryChanged} />
                <h4>MEST BRUKTE</h4>
                <CategoryRecommended categories={categories} onCategorySelected={this.categoryChanged} />
                <Button bsStyle="success" block onClick={this.next}>Neste</Button>
                <Button bsStyle="link" block onClick={this.cancel}>Avbryt</Button>
            </div>
        );
    }
}

export default Category