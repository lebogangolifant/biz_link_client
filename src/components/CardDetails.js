// src/components/CardDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Import the configured axios instance

const CardDetails = () => {
  const { id } = useParams();
  const [cardHTML, setCardHTML] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get(`/cards/${id}`, {
          headers: {
            'Accept': 'text/html', // Request HTML response
          },
          responseType: 'text' // Ensure response is treated as text
        });
        setCardHTML(response.data);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCard();
  }, [id]);

  if (!cardHTML) {
    return <div>Loading...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: cardHTML }} />;
};

export default CardDetails;
