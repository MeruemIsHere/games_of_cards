import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import DeskConstructor from '../global_component/DeckConstructor';

class Freecell extends Component {
    state = {
        deck: shuffle(DeskConstructor())
    }

    render() {
        console.log(this.state.deck);
        return (
            <div>
                <p>Hello</p>
            </div>
        );
    }
}

export default Freecell;