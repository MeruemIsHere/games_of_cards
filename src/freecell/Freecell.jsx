import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import DeckConstructor from '../global_component/DeckConstructor';

class Freecell extends Component {
    state = {
        deck: shuffle(DeckConstructor()),
        board: [[], [], [], [], [], [], [], []],
    }

    render() {
        const {deck, board} = this.state
        return (
            <div style={{display:"flex", flexWrap:"wrap" }}>
                <p style={{width: "100%"}}>Test Freecell</p>
            </div>
        );
    }
}

export default Freecell;