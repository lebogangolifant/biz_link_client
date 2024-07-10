// src/components/CardDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
//import CardTemplate1 from './CardTemplate1';
import { Link } from 'react-router-dom';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get(`/cards/${id}`);
        setCard(response.data);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCard();
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Display card details */}
      <div>
        <h2>{card.name}</h2>
        <p>{card.title}</p>
        {/* Add other fields as necessary */}
        <Link to={`/cards/${id}/template`}>View Template</Link>
      </div>
    </>
  );
};

export default CardDetails;
