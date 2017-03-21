import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

const RECOMMENDED_CATEGORIES = ["e414f798-454f-495c-ba61-ccbdd5a89296", "e081d98a-6328-484d-809e-6e055753143c"];

class CategoryRecommended extends Component {

    static propTypes = {
        categories: PropTypes.array,
        onCategorySelected: PropTypes.func
    }

    static defaultProps = {
        categories: [],
        onCategorySelected: null
    }

    handleClick = (category) => {
        if (this.props.onCategorySelected) {
            this.props.onCategorySelected(category)
        }
    }

    render() {

        var categories = this.props.categories.filter(category => _.includes(RECOMMENDED_CATEGORIES, category.meldingstype.meldingstypeId));

        return (
            <div>
                {
                    categories.map(category =>
                        <button key={category.meldingstype.meldingstypeId} onClick={() => this.handleClick(category)}>
                            {category.meldingstype.beskrivelse}
                        </button>
                    )
                }
            </div>
        );
    }
}

export default CategoryRecommended;