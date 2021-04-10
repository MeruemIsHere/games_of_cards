import React from 'react';


const Card = ({index, stackIndex, place, card, onClick}) => {
    let symbole = ""
    if(card.symbole === "♥️") { symbole = "heart" }
    else if(card.symbole === "♦️") { symbole = "diamond" }
    else if(card.symbole === "♠️") { symbole = "spade" }
    else if(card.symbole === "♣️") { symbole = "club" }
    const value = `${card.value}`
    const pathImg = `/img/${symbole}/${value}.png`
    let positionCard = {
        backgroundImage: `url(${process.env.PUBLIC_URL + pathImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }
    if (place === "win"){
        positionCard = {...positionCard, top: `0px`}
    }
    else {
        positionCard = {...positionCard, top: `${index * 30}px`}
    }

    
    return(
        <div 
            className="card" 
            onClick={ () => place === "win" ? null : onClick(index, stackIndex, place)} 
            style={positionCard}
        ></div>
    )
}

export default Card