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
            placeSelection: "",
            cards: [],
            firstCard: [],
            indexFirstCard: [],
            indexStackSelected: [],
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

    shiftingCard = (cardIndex, stackIndex, place) => {
        const {board, freePlaces, cardsSelection} = this.state
        const placeSelection = place

        if (place === "board") {
            place = board
        }
        else if (place === "free") {
            place = freePlaces
        }

        //Sélection des cartes
        if(!cardsSelection.active){
            let cardsSelected = place[stackIndex].slice(cardIndex)

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
                                placeSelection: placeSelection,
                                cards: place[stackIndex].slice(cardIndex),
                                firstCard: place[stackIndex][cardIndex],
                                indexFirstCard: [cardIndex],
                                indexStackSelected: stackIndex,
                            },
                        })
                    }
                    else{
                        console.log("Sélection impossible")
                    }
                }
                else{
                    console.log("Sélection impossible");
                }
            }

            //une seule carte sélectionné
            else if (cardsSelected.length === 1) {
                this.setState({
                    cardsSelection: {
                        ...cardsSelection, 
                        active: true, 
                        placeSelection: placeSelection,
                        cards: place[stackIndex].slice(cardIndex),
                        firstCard: place[stackIndex][cardIndex],
                        indexFirstCard: [cardIndex],
                        indexStackSelected: stackIndex,
                    },
                })
            }
        }

        //Déplacement manuel des cartes
        else {
            this.shiftCards(stackIndex, place)
        }
        

       // console.log(cardsSelection)
    }

    shiftCards(indexStackTarget, placeTarget){
        const {board, freePlaces, cardsSelection} = this.state
        let placeSelection = null
        if (cardsSelection.placeSelection === "board") {
            placeSelection = board
        }
        else if (cardsSelection.placeSelection === "free") {
            placeSelection = freePlaces
        }

        const newPlaceTarget = [...placeTarget]
        const stackSelected = placeSelection[cardsSelection.indexStackSelected]
        const stackTarget = placeTarget[indexStackTarget]


        if(placeTarget === board){
            if (placeTarget.length === 0) {
                console.log("coder pour place vide");
            }
            else {
                const cardTarget = stackTarget[stackTarget.length - 1]

                //Vérification du symbole alterné et des valeurs qui se suivent avant déplacement
                if ((cardTarget.value === cardsSelection.firstCard.value + 1) && (cardTarget.symbole !== cardsSelection.firstCard.symbole)){
                    stackSelected.length = cardsSelection.indexFirstCard

                    // de freePlaces à board
                    if(placeSelection === freePlaces){
                        console.log("de freeplace à board"); 
                        const newPlaceSelection = [...placeSelection]
                        newPlaceSelection[cardsSelection.indexStackSelected] = stackSelected
                        newPlaceTarget[indexStackTarget] = [...newPlaceTarget[indexStackTarget], ...cardsSelection.cards]
                        this.setState({
                            board: newPlaceTarget,
                            freePlaces: newPlaceSelection,
                            cardsSelection: {
                                active: false,
                                placeSelection: "",
                                cards: [],
                                indexFirstCard: [],
                                indexStackSelected: [],
                            },
                        })
                    }

                    // de Board à Board
                    else {
                        newPlaceTarget[cardsSelection.indexStackSelected] = stackSelected
                        newPlaceTarget[indexStackTarget] = [...newPlaceTarget[indexStackTarget], ...cardsSelection.cards]
                        this.setState({
                            board: newPlaceTarget,
                            cardsSelection: {
                                active: false,
                                placeSelection: "",
                                cards: [],
                                indexFirstCard: [],
                                indexStackSelected: [],
                            },
                        })
                    }
                    
                }
                else {
                    this.impossibleAction()
                }
            }
            
        }
        else if(placeTarget === freePlaces){
            if((cardsSelection.cards.length === 1) && (placeTarget[indexStackTarget].length === 0 )) {
                console.log("free 1card");
                stackSelected.length = cardsSelection.indexFirstCard

                //de Board à Freeplaces
                if(placeSelection === board) {
                    console.log("alors ?");
                    const newPlaceSelection = [...placeSelection]
                    newPlaceSelection[cardsSelection.indexStackSelected] = stackSelected
                    newPlaceTarget[indexStackTarget] = [...newPlaceTarget[indexStackTarget], ...cardsSelection.cards]
                    this.setState({
                        board: newPlaceSelection,
                        freePlaces: newPlaceTarget,
                        cardsSelection: {
                            active: false,
                            placeSelection: "",
                            cards: [],
                            indexFirstCard: [],
                            indexStackSelected: [],
                        },
                    })
                }

                // de Freeplace à un autre Freeplace
                else {
                    newPlaceTarget[cardsSelection.indexStackSelected] = stackSelected
                    newPlaceTarget[indexStackTarget] = [...newPlaceTarget[indexStackTarget], ...cardsSelection.cards]
                    this.setState({
                        freePlaces: newPlaceTarget,
                        cardsSelection: {
                            active: false,
                            placeSelection: "",
                            cards: [],
                            indexFirstCard: [],
                            indexStackSelected: [],
                        },
                    })
                }
                
            }
            else {
                //mettre plus d'une carte dans un freePlace
                this.impossibleAction()
            }
        } 
    }

    impossibleAction() {
        console.log("Action Impossible");
        this.setState({
            cardsSelection: {
                active: false,
                placeSelection: "",
                cards: [],
                indexFirstCard: [],
                indexStackSelected: [],
            },
        })
    }

    render() {
        const {board, freePlaces, winPlaces, cardsSelection} = this.state
        return (
            <div className="carpet">
                <p>Test Freecell</p>
                <div className="top-board">
                    <div className="free-places">
                        {freePlaces.map((place, placeIndex, freePlaces) => (
                            <div className="place" key={placeIndex} onClick= {(place.length === 0) && (cardsSelection.cards.length !== 0) ? () => {this.shiftCards(placeIndex, freePlaces)} : null}>
                                {place.length === 1 ? place.map((card, cardIndex) => (
                                    <Card 
                                        key={cardIndex} 
                                        index={cardIndex} 
                                        stackIndex={placeIndex}
                                        card={card}
                                        place="free"
                                        onClick={this.shiftingCard}
                                    />
                                )) : null }
                                {cardsSelection.active && (cardsSelection.indexStackSelected === placeIndex) && (cardsSelection.placeSelection === "free") ? 
                                <div className="selection" style={{top: `${cardsSelection.indexFirstCard * 30}px`, height: `${(cardsSelection.cards.length * 30) + 40}px`}}>
                                </div> 
                                
                                : null
                            }
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
                                    place="board"
                                    card={card}
                                    onClick={this.shiftingCard}
                                />
                            ))}
                            {cardsSelection.active && (cardsSelection.indexStackSelected === stackIndex) && (cardsSelection.placeSelection === "board") ? 
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