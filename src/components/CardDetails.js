// src/components/CardDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import CardTemplate1 from './CardTemplate1';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [cardHtml, setCardHtml] = useState('');

   useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get(`/cards/${card._id}`, {
          headers: {
            'Accept': 'text/html',
          },
          responseType: 'text'
        });

        if (response.headers['content-type'].includes('text/html')) {
          setCardHtml(response.data);
        } else {
          setCard(JSON.parse(response.data));
        }
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCard();
  }, [id]);

  if (!card && !cardHtml) {
    return <div>Loading...</div>;
  }

  if (cardHtml) {
    return <div dangerouslySetInnerHTML={{ __html: cardHtml }} />;
  }

  return <CardTemplate1 card={card} />;
};

export default CardDetails;
