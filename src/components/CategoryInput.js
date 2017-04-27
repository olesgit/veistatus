import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { InputGroup, Button, Image } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest'
import filterCategories from '../utils/categoryHelper'

import './CategoryInput.css'

import clearIcon from '../images/clear.svg'

function getSuggestionValue(suggestion) {
    return suggestion != null ? suggestion.meldingstype.beskrivelse : '';
}

class CategoryInput extends Component {

    static propTypes = {
        category: PropTypes.object,
        categories: PropTypes.array.isRequired,
        onCategorySelected: PropTypes.func,
        onShowSuggestions: PropTypes.func,
    }

    static defaultProps = {
        category: null,
        categories: [],
        showSuggestions: false
    }

    state = {
        value: getSuggestionValue(this.props.category),
        suggestions: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== this.props.category) {
            this.setState({
                value: getSuggestionValue(nextProps.category),
                suggestions: []
            })
        }
    }

    onClick = (event) => {
        event.target.blur();
        this.setState({
            value: ''
        })
        this.props.onCategorySelected(null);
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        })
    }

    renderSuggestion(suggestion) {
        return (suggestion.meldingstype.beskrivelse);
    }

    renderSuggestionsContainer = ({ containerProps, children }) => {
        if (this.state.showSuggestions) {
            var suggestions = children ? children : <p>Ingen treff på kategori</p>;
            return (
                <div {...containerProps}>
                    {suggestions}
                </div>
            );
        }
    }

    getSuggestions = value => {
        return filterCategories(this.props.categories, value)
        //return this.props.categories.filter(category => category.meldingskategorier.some(c => _.includes(c.navn.toLowerCase(), value.toLowerCase())));
    }

    onSuggestionSelected = (event, { suggestion }) => {
        if (this.props.onCategorySelected) {
            this.props.onCategorySelected(suggestion);
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
        this.notifyShowSuggestions(value.length > 0);
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
        this.notifyShowSuggestions(false);
    };

    renderInputComponent = inputProps => {
        return (
            <InputGroup className="category-input-group">
                <input {...inputProps} />
                <InputGroup.Button>
                    <Button bsStyle="input-group" onClick={this.onClick}>
                        <Image src={clearIcon} alt="clear-text" />
                    </Button>
                </InputGroup.Button>
            </InputGroup>
        );
    }

    onBlur = () => {
        this.notifyShowSuggestions(false);
    }

    onFocus = () => {
        this.notifyShowSuggestions(this.state.value.length > 0);
    }

    notifyShowSuggestions(shown) {
        this.setState({ showSuggestions: shown });
        if (this.props.onShowSuggestions) {
            this.props.onShowSuggestions(shown)
        }
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Beskriv problemet (f.eks hull i veien)',
            value,
            onChange: this.onChange,
            onBlur: this.onBlur,
            onFocus: this.onFocus
        };

        return (
            <Autosuggest
                id="kategori"
                className="form-group"
                suggestions={suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
                inputProps={inputProps}
                renderInputComponent={this.renderInputComponent}
                highlightFirstSuggestion={true}
                theme={{
                    container: 'category-input-container',
                    input: 'form-control category-input',
                    suggestionsContainer: 'category-input-suggestions-container',
                    suggestionsList: 'category-input-suggestions-list',
                    suggestion: 'category-input-suggestion',
                    suggestionHighlighted: 'category-input-suggestion--highlighted'
                }}
            />
        );
    }
}

export default CategoryInput;