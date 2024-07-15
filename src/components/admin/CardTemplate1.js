// src/components/admin/CardTemplate1.js
import React from 'react';
import { Card, CardContent, Typography, Divider, Box, IconButton } from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  X as XIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Business as CompanyIcon,
  SaveAlt as SaveAltIcon,
  MailOutline as MailOutlineIcon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';
import QRCode from 'qrcode.react';
import qrcode from 'qrcode';

const CardTemplate1 = ({ card }) => {
  const handleQRCodeOpen = () => {
    const qrCodeUrl = `${process.env.REACT_APP_BASE_URL}/cards/${card._id}`;
    qrcode.toDataURL(qrCodeUrl, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      const qrWindow = window.open();
      qrWindow.document.write(`<img src="${url}" />`);
    });
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
  let base64Image = '';
  if (card.profilePicture) {
    try {
      const response = await fetch(card.profilePicture);
      const blob = await response.blob();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const jpegDataUrl = canvas.toDataURL('image/jpeg');
        base64Image = jpegDataUrl.split(',')[1];
        downloadVCard(base64Image);
      };
      img.src = URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      downloadVCard('');
    }
  } else {
    downloadVCard('');
  }
};
  
  const downloadVCard = (base64Image) => {
    const vCardData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${card.name}
      N:${card.name};;;
      ORG:${card.company}
      TITLE:${card.title}
      TEL;TYPE=work:${card.phone}
      EMAIL:${card.email}
      URL:${card.website}
      ${card.linkedin ? `X-SOCIALPROFILE;type=linkedin:${card.linkedin}\n` : ''}
      ${card.x ? `X-SOCIALPROFILE;type=twitter:${card.x}\n` : ''}
      ${card.instagram ? `X-SOCIALPROFILE;type=instagram:${card.instagram}\n` : ''}
      ${card.facebook ? `X-SOCIALPROFILE;type=facebook:${card.facebook}\n` : ''}
      ${base64Image ? `PHOTO;TYPE=JPEG;ENCODING=b:${base64Image}\n` : ''}
      NOTE:Core Services:${card.services || ''}
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
            {card.x && (
              <IconButton>
                <XIcon />
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
