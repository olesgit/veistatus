import React, { Component, PropTypes } from 'react'
import Step from '../Step'
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
        categorySpecified: PropTypes.func.isRequired,
        abort: PropTypes.func.isRequired,
        goto: PropTypes.func
    }

    static defaultProps = {
        editing: true,
        categories: []
    }

    state = {
        category: this.props.category
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.category !== nextProps.category) {
            this.setState({ category: nextProps.category });
        }
    }

    categoryChanged = category => {
        this.setState({ category });
    }

    next = () => {
        this.props.categorySpecified(this.state.category);
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

        const { editing, categories, abort, goto } = this.props;
        const { category } = this.state;

        if (!editing && !category) {
            return null;
        }

        if (!editing) {
            return <Step icon={categoryIcon} text={category.meldingstype.beskrivelse} goto={goto} />
        }

        return (
            <div className="category-content">
                <CategoryInput category={category} categories={categories} onCategorySelected={this.categoryChanged} />
                <h4>MEST BRUKTE</h4>
                <CategoryRecommended categories={categories} onCategorySelected={this.categoryChanged} />
                <Button bsStyle="success" block onClick={this.next} disabled={category == null}>Neste</Button>
                <Button bsStyle="link" block onClick={abort}>Avbryt</Button>
            </div>
        );
    }
}

export default Category