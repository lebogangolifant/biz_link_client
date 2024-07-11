// src/components/CardDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import CardTemplate1 from './admin/CardTemplate1';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [vCardBase64, setVCardBase64] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get(`/cards/${id}`);
        setCard(response.data);

        // Fetch vCard as base64
        const vCardResponse = await api.get(`/cards/${id}?format=vcf`);
        setVCardBase64(vCardResponse.data);
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
    <div>
      <CardTemplate1 card={card} />
      <a href={`data:text/vcard;base64,${vCardBase64}`} download={`${card.name}.vcf`}>Save data to your contacts</a>
    </div>
  );
};

export default CardDetails;
