// src/components/CardDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import CardTemplate1 from './admin/CardTemplate1';

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

    if (id) {
      fetchCard();
    }
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  const downloadVCard = () => {
    // Check if the card exists before attempting to download
    if (card._id) {
      window.location.href = `/api/cards/${card._id}?format=vcf`;
    } else {
      console.error('Card ID not available for download');
    }
  };

  return (
    <div>
      <CardTemplate1 card={card} />
      <button onClick={downloadVCard}>Download vCard</button>
    </div>
  );
};

export default CardDetails;
