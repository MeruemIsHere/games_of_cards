import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import DeckConstructor from '../global_component/DeckConstructor';
import './Freecell.css';

class Freecell extends Component {
    state = {
        deck: shuffle(DeckConstructor()),
        board: [[], [], [], [], [], [], [], []],
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
        const {board} = this.state
        return (
            <div className="carpet">
                <p>Test Freecell</p>
                <div className="board">
                    {board.map((stack, index) => (
                        <div key={index} className="place-board">
                            {stack.map((card, index) => (
                                <div key={index} className="card" style={{top: `${index*30}px`}}>
                                    <p className="value-card" style={{color: `${card.color}`}}>{card.value}{card.symbole}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Freecell;