import React from 'react';

const Card = ({index, stackIndex, place, card, onClick}) => {
    return(
        <div className="card" onClick={ () => onClick(index, stackIndex, place)} style={{top: `${index * 30}px`}}>
            <p className="value-card" style={{color: `${card.color}`}}>{card.value}{card.symbole}</p>
        </div>
    )
}

export default Card