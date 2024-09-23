import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent, IconButton, Box, Grid } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from './Layout';

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const savedRecordings = JSON.parse(localStorage.getItem('recordings')) || [];
    setRecordings(savedRecordings);
  }, []);

  const handlePlayClick = (url) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.zIndex = 9999;
    container.style.width = '80%'; // Adjust size if necessary
    container.style.height = '80%'; // Adjust size if necessary
    container.style.overflow = 'hidden'; // Ensure the close button stays inside the container
    
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.style.width = '100%'; 
    video.style.height = '100%'; 
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = '#ff0000';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '30px';
    closeButton.style.height = '30px';
    closeButton.style.fontSize = '20px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = 10000;
  
    container.appendChild(video);
    container.appendChild(closeButton);
  
    document.body.appendChild(container);
  
    closeButton.addEventListener('click', () => {
      document.body.removeChild(container);
    });
  
    video.onended = () => {
      document.body.removeChild(container);
    };
  
    video.play().catch((error) => {
      console.error('Error playing video:', error);
    });
  };

  const handleDeleteClick = (url) => {
    const updatedRecordings = recordings.filter(recording => recording.url !== url);
    setRecordings(updatedRecordings);
    localStorage.setItem('recordings', JSON.stringify(updatedRecordings));
  };

  const handleShareClick = (url) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this recording',
        text: 'Watch this recording!',
        url: url,
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('Link copied to clipboard! You can now paste it anywhere to share.');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const headingStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '17px',
    marginTop:'-25px',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <Layout>
      <Box sx={{ flex: 1, padding: 4 }}>
        <Typography variant="h4" color="white" sx={{ marginBottom: 2 }} style={headingStyle}>
          Recordings
        </Typography>
        <Grid container spacing={2}>
          {recordings.map((recording, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{
                  backgroundColor: '#1e1e1e',
                  color: 'white',
                  padding: 2,
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'scale(1.05)', // Enlarges the box on hover
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontSize: '1rem', // Smaller font size
                      marginBottom: '8px', // Moves the text up
                    }}
                  >
                    {recording.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ fontSize: '0.9rem', marginBottom: '4px' }}
                  >
                    Date: {recording.date}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ fontSize: '0.9rem' }}
                  >
                    Duration: {recording.duration}
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <IconButton
                      color="primary"
                      sx={{
                        color: '#7289DA',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                      }}
                      onClick={() => handlePlayClick(recording.url)}
                    >
                      <PlayCircleFilledWhiteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      sx={{
                        color: '#FF0000',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                      }}
                      onClick={() => handleDeleteClick(recording.url)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      sx={{
                        color: '#7289DA',
                        marginLeft: 1,
                        '&:hover': {
                          transform: 'scale(1.2)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                      }}
                      onClick={() => handleShareClick(recording.url)}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Recordings;
