import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import DeckConstructor from '../global_component/DeckConstructor';

class Freecell extends Component {
    state = {
        deck: shuffle(DeckConstructor())
    }

    render() {
        const {deck} = this.state
        return (
            <div style={{display:"flex", flexWrap:"wrap" }}>
                <p style={{width: "100%"}}>Test Freecell</p>
            </div>
        );
    }
}

export default Freecell;