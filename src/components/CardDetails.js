import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Import the custom axios instance for making API requests
import CardTemplate1 from './admin/CardTemplate1';

const CardDetails = () => {
  // Get the card ID from the URL parameters	
  const { id } = useParams();
  // State to store card details and vCard base64 data
  const [card, setCard] = useState(null);
  const [vCardBase64, setVCardBase64] = useState('');

  // State to store card details and vCard base64 data
  useEffect(() => {
    const fetchCard = async () => {
      try {
        // Fetch card details from the API
        const response = await api.get(`/cards/${id}`);
        setCard(response.data);

        // Fetch vCard data as base64 encoded string for download
        const vCardResponse = await api.get(`/cards/${id}?format=vcf`);
        setVCardBase64(vCardResponse.data);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCard();
  }, [id]); // Dependency array: re-run effect if `id` changes

  // Show loading message while card data is being fetched
  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render the card details using the CardTemplate1 component */}
      <CardTemplate1 card={card} />
      {/* Link to download the vCard data as a .vcf file */}
      <a href={`data:text/vcard;base64,${vCardBase64}`} download={`${card.name}.vcf`}>Save data to your contacts</a>
    </div>
  );
};

export default CardDetails;
