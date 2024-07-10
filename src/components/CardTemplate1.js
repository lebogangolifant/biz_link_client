// src/components/CardTemplate1.js
import React from 'react';
import { IconButton } from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  SaveAlt as SaveAltIcon,
} from '@mui/icons-material';
import QRCode from 'qrcode.react';

const CardTemplate1 = ({ card }) => {
  const handleAddToContacts = () => {
    const vCardData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${card.name}
      ORG:${card.company}
      TITLE:${card.title}
      TEL;TYPE=work:${card.phone}
      EMAIL:${card.email}
      URL:${card.website}
      END:VCARD
    `.trim().replace(/\n\s*/g, '\n');

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.name}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>{card.name}</h2>
      <p>{card.title}</p>
      {/* Add other fields as necessary */}
      <IconButton onClick={handleAddToContacts}>
        <SaveAltIcon />
      </IconButton>
      <IconButton onClick={() => window.open(card.website, '_blank')}>
        <WebsiteIcon />
      </IconButton>
      <IconButton onClick={() => window.location.href = `tel:${card.phone}`}>
        <PhoneIcon />
      </IconButton>
      <IconButton onClick={() => window.location.href = `mailto:${card.email}`}>
        <EmailIcon />
      </IconButton>
      <QRCode value={`${process.env.REACT_APP_BASE_URL}/cards/${card._id}/template`} size={128} />
    </div>
  );
};

export default CardTemplate1;
