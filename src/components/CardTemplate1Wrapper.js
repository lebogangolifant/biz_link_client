// src/components/CardTemplate1Wrapper.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import CardTemplate1 from './CardTemplate1';

const CardTemplate1Wrapper = () => {
  const location = useLocation();
  const card = location.state?.card;

  return <CardTemplate1 card={card} />;
};

export default CardTemplate1Wrapper;
