import React from 'react';


const Card = ({index, stackIndex, place, card, onClick}) => {
    let positionCard = {}
    if (place === "win"){
        positionCard = {top: `0px`}
    }
    else {
        positionCard = {top: `${index * 30}px`}
    }
    
    return(
        <div className="card" onClick={ () => place === "win" ? null : onClick(index, stackIndex, place)} style={positionCard}>
            <p className="value-card" style={{color: `${card.color}`}}>{card.value}{card.symbole}</p>
        </div>
    )
}

export default Card