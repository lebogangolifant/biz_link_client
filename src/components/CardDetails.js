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

    fetchCard();
  }, [id]);

  const downloadVCard = async () => {
    try {
      const response = await api.get(`/cards/${id}?format=vcf`, {
        responseType: 'blob',
      });

      // Create a blob from the response data
      const vCardBlob = new Blob([response.data], { type: 'text/vcard' });

      // Create a URL for the blob
      const vCardURL = URL.createObjectURL(vCardBlob);

      // Create an <a> element to trigger download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = vCardURL;
      a.download = `${card.name}.vcf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up by revoking the object URL
      URL.revokeObjectURL(vCardURL);
    } catch (error) {
      console.error('Error downloading vCard:', error);
    }
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CardTemplate1 card={card} />
      <button onClick={downloadVCard}>Download vCard</button>
    </div>
  );
};

export default CardDetails;
