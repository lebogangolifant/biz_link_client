import React from 'react';
import BusinessCard from './BusinessCard';

const CardList = ({ cards }) => {
  return (
    <div>
      {cards.map(card => (
        <BusinessCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
