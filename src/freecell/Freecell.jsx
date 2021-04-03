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
        winPlaces: {
            heart: [], 
            diamond: [], 
            club: [], 
            spade: [],
        },
        cardsSelection: {
            active: false,
            stackSelected: [],
            cards: [],
            indexFirstCard: [],
        },
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

    selectCard = (cardIndex, stackIndex) => {
        const {board, cardsSelection} = this.state
        const newBoard = board

        if(!cardsSelection.active){
            let cardsSelected = board[stackIndex].slice(cardIndex)

            // Plusieurs cartes sélectionnés
            if(cardsSelected.length > 1){

                //Controler si les valeurs cartes sont décroissant de 1
                let values = cardsSelected.map(card => card.value)
                let valuesDescending = [...values]
                valuesDescending = valuesDescending.sort((a,b) => b - a)
                let diffBetweenValues = []
                for (let i = 1; i < valuesDescending.length; i++) {
                    diffBetweenValues.push(valuesDescending[i - 1] - valuesDescending[i])
                }

                const isFollowingValues = !diffBetweenValues.some(diff => diff !== 1)
                let isValuesDescending = values.every((value, index) => value === valuesDescending[index])

                if(isValuesDescending && isFollowingValues) {
                    //Controler si les couleurs sont alternés
                    let colors = cardsSelected.map(card => card.color)
                    let diffBetweenColors = []
                    for (let i = 1; i < colors.length; i++) {
                        if(colors[i] !== colors[i - 1]){
                            diffBetweenColors.push(true)
                        }
                        else{
                            diffBetweenColors.push(false)
                        }
                    }
                    const isAlternateColors = !diffBetweenColors.includes(false)
                    if (isAlternateColors) {
                        this.setState({
                            cardsSelection: {
                                ...cardsSelection, 
                                active: true, 
                                stackSelected: stackIndex,
                                cards: board[stackIndex].slice(cardIndex),
                                indexFirstCard: [cardIndex],
                            },
                        })
                    }
                    else{
                        console.log("Impossible")
                    }
                }
                else{
                    console.log("Impossible");
                }

            }
        }

        console.log(cardsSelection.cards)
    }

    // shiftingCards(cardIndex, stackIndex){
    //     const stackSelected = board[stackIndex]
    //     stackSelected.length= cardIndex
    //     newBoard[stackIndex] = stackSelected

    //     this.setState({
    //         board: newBoard
    //     })
    // }

    render() {
        const {board, freePlaces, winPlaces, cardsSelection} = this.state
        return (
            <div className="carpet">
                <p>Test Freecell</p>
                <div className="top-board">
                    <div className="free-places">
                        {freePlaces.map((place, index) => (
                            <div className="place" key={index}>

                            </div>
                        ))}
                    </div>
                    <div className="win-places">
                        <div className="place">{winPlaces.heart}</div>
                        <div className="place">{winPlaces.diamond}</div>
                        <div className="place">{winPlaces.club}</div>
                        <div className="place">{winPlaces.spade}</div>
                    </div>
                </div>
                <div className="board">
                    {board.map((stack, stackIndex) => (
                        <div key={stackIndex} className="place">
                            {stack.map((card, cardIndex) => (
                                <Card 
                                    key={cardIndex} 
                                    index={cardIndex} 
                                    stackIndex={stackIndex}
                                    card={card}
                                    onClick={this.selectCard}
                                />
                            ))}
                            {cardsSelection.active && (cardsSelection.stackSelected === stackIndex) ? 
                                <div className="selection" style={{top: `${cardsSelection.indexFirstCard * 30}px`, height: `${(cardsSelection.cards.length * 30) + 40}px`}}>
                                </div> 
                                
                                : null
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Freecell;