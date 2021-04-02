import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import DeckConstructor from '../global_component/DeckConstructor';
import Card from './Card';
import './Freecell.css';

class Freecell extends Component {
    state = {
        deck: shuffle(DeckConstructor()),
        board: [[], [], [], [], [], [], [], []],
        freePlaces: [[], [], [], []],
        winPlaces: [[], [], [], []],
    }
    
    componentDidMount(){
        this.distribution()
    }

    distribution(){
        let newBoard = this.state.board
        this.state.deck.forEach(card => {
            for(let i=0; i<8; i++){
                if(i<4 && newBoard[i].length<7){
                    newBoard[i] = [...newBoard[i], card]
                    break
                }
                else if(i>=4 && newBoard[i].length<6){
                    newBoard[i] = [...newBoard[i], card]
                    break
                }
            }
        })
        this.setState({
            board: newBoard
        })
    }

    render() {
        const {board, freePlaces, winPlaces} = this.state
        return (
            <div className="carpet">
                <p>Test Freecell</p>
                <div className="top-board">
                    <div className="free-places">
                        {freePlaces.map((place, index) => (
                            <div className="place"></div>
                        ))}
                    </div>
                    <div className="win-places">
                        {winPlaces.map((place, index) => (
                            <div className="place"></div>
                        ))}
                    </div>
                </div>
                <div className="board">
                    {board.map((stack, index) => (
                        <div key={index} className="place">
                            {stack.map((card, index) => (
                                <Card 
                                    key={index} 
                                    index={index} 
                                    card={card}
                                    onClick={this.shifting}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Freecell;