import React from 'react';
import { ListGroupItem } from 'reactstrap';

class SuggestionListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestion: this.props.item,
            isActive: false
        }
    }

    handleClick = () => {
        this.props.onClick(this.props.item);
    }

    render() {
        const { suggestion } = this.state; 

        return (
            <ListGroupItem
            onClick={this.handleClick}
           >
                <span key={suggestion.id} >{suggestion.description}</span>
            </ListGroupItem >
        );
    }
}

export default SuggestionListComponent;