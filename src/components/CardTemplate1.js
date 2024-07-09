// src/components/CardTemplate1.js
import React from 'react';
import { Card, CardContent, Typography, Divider, Box, IconButton } from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Business as CompanyIcon,
  SaveAlt as SaveAltIcon,
  MailOutline as MailOutlineIcon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';
import QRCode from 'qrcode.react';
import api from '../api'; // Import the configured axios instance

const CardTemplate1 = ({ card }) => {
  const handleQRCodeOpen = () => {
    const qrCodeUrl = `${process.env.REACT_APP_BASE_URL}/cards/${card._id}`;
    window.open(qrCodeUrl);
  };

  const handleEmailShare = () => {
    const subject = 'Business Card';
    const body = 'Check out my business card!';
    window.location.href = `mailto:${card.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePhoneSave = () => {
    window.location.href = `tel:${card.phone}`;
  };

  const handleWebsiteSave = () => {
    window.open(card.website, '_blank');
  };

  const handleVCardDownload = async () => {
    try {
      const response = await api.get(`/cards/${card._id}/vcard`);
      const vCardData = response.data;

      const blob = new Blob([vCardData], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${card.name}.vcf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading vCard:', error);
      // Handle error as needed
    }
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 400, margin: '20px auto', padding: 2 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <img
          src={card.profilePicture}
          alt="Profile"
          style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
        />
        <Typography variant="h5" gutterBottom>{card.name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">{card.title}</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Box sx={{ textAlign: 'left' }}>
          <Box display="flex" alignItems="center" mb={1}>
            <CompanyIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">{card.company}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">{card.email}</Typography>
            <IconButton onClick={handleEmailShare}>
              <MailOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <PhoneIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">{card.phone}</Typography>
            <IconButton onClick={handlePhoneSave}>
              <SaveAltIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <WebsiteIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">{card.website}</Typography>
            <IconButton onClick={handleWebsiteSave}>
              <SaveAltIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1" gutterBottom>Social Media:</Typography>
          <Box display="flex" justifyContent="center" mb={1}>
            {card.linkedin && (
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            )}
            {card.twitter && (
              <IconButton>
                <TwitterIcon />
              </IconButton>
            )}
            {card.instagram && (
              <IconButton>
                <InstagramIcon />
              </IconButton>
            )}
            {card.facebook && (
              <IconButton>
                <FacebookIcon />
              </IconButton>
            )}
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body1" gutterBottom>Core Services:</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body2">{card.services}</Typography>
          </Box>
        </Box>
        <Divider sx={{ marginY: 2 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <QRCode value={`${process.env.REACT_APP_BASE_URL}/cards/${card._id}`} size={128} />
          <IconButton onClick={handleQRCodeOpen}>
            <GetAppIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ marginY: 2 }} />
        <Box display="flex" justifyContent="center" mb={1}>
          <IconButton onClick={handleVCardDownload}>
            <SaveAltIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardTemplate1;
