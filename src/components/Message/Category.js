import React, { Component, PropTypes } from 'react'
import StaticStep from '../StaticStep'
import CategoryInput from '../CategoryInput'
import CategoryRecommended from '../CategoryRecommended'
import { Button } from 'react-bootstrap'

import './Category.css'

import categoryIcon from '../../images/kategori.svg'

class Category extends Component {

    static propTypes = {
        category: PropTypes.object,
        categories: PropTypes.array,
        editing: PropTypes.bool.isRequired,
        categorySpecified: PropTypes.func.isRequired
    }

    static defaultProps = {
        editing: true,
        categories: []
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

        const { editing, categories } = this.props;
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