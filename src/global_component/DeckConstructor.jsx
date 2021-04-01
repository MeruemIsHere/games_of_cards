import React from 'react'

function DeckConstructor(){
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    const symboles = ["♥️", "♦️", "♠️", "♣️" ]
    let deck = []
    symboles.forEach(symbole => {
            for (let value of values) {
                deck = [...deck, {
                    value: value,
                    symbole: symbole,
                    color: symbole === "♥️" || symbole === "♦️" ? "red" : "black"
                }]
            }
        }
    )

    console.log(deck)
    

    return <p>Test Deck</p>
}

export default DeckConstructor