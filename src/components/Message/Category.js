import classNames from 'classnames'
import React, { Component, PropTypes } from 'react'
import Step from '../Step'
import CategoryInput from '../CategoryInput'
import CategoryRecommended from '../CategoryRecommended'

import './Category.css'

import categoryIcon from '../../images/kategori.svg'

class Category extends Component {

    static propTypes = {
        editing: PropTypes.bool.isRequired,
        category: PropTypes.object,
        categories: PropTypes.array,
        value: PropTypes.object,
        onChange: PropTypes.func,
        goto: PropTypes.func
    }

    static defaultProps = {
        editing: true,
        categories: []
    }

    state = {
        isActive: false
    }

    onShowSuggestions = (shown) => {
        this.setState({ isActive: shown });
    }

    render() {

        const { editing, categories, category, value, onChange, goto } = this.props;
        const { isActive } = this.state;

        if (!editing && !category) {
            return null;
        }

        if (!editing) {
            return <Step icon={categoryIcon} text={category.meldingstype.beskrivelse} goto={goto} />
        }

        var classes = classNames("category-content", { 'category-content--active': isActive })

        return (
            <div className={classes}>
                <CategoryInput category={value} categories={categories} onCategorySelected={onChange} onShowSuggestions={this.onShowSuggestions} />
                <h4>MEST BRUKTE</h4>
                <CategoryRecommended categories={categories} onCategorySelected={onChange} />
            </div>
        );
    }
}

export default Category