import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Profile icon
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState(''); // State for profile image
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uname = localStorage.getItem('username');
    const uemail = localStorage.getItem('uemail');
    const img = localStorage.getItem('profileImage'); // Retrieve the stored image URL
    if (uname) setUsername(uname);
    if (uemail) setUserEmail(uemail);
    if (img) setProfileImage(img); // Set the profile image URL
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('uemail');
    localStorage.removeItem('profileImage'); // Remove the stored image URL
    navigate('/login');
  };

  const handleMyProfileClick = () => {
    handleProfileClose(); // Close the menu
    navigate('/profile'); // Redirect to profile page
  };

  // Function to handle image uploads in the profile page
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl); // Save the image URL to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#222',
      }}
    >
      <Drawer
        variant="permanent"
        style={{
          width: isDrawerOpen ? 240 : 60,
          transition: 'width 0.3s',
          whiteSpace: 'nowrap',
        }}
        classes={{
          paper: isDrawerOpen ? 'drawer open' : 'drawer closed',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isDrawerOpen ? 'flex-start' : 'center',
            padding: '16px',
            backgroundColor: '#333',
            color: '#fff',
          }}
        >
          <IconButton onClick={toggleDrawer} style={{ marginRight: '8px' }}>
            <MenuIcon style={{ color: '#fff' }} />
          </IconButton>
          {isDrawerOpen && (
            <Typography variant="h6" style={{ marginLeft: '0px' }}>
              MeetUp
            </Typography>
          )}
        </div>
        <List>
          <ListItem button onClick={() => handleNavigation('/home')}>
            <ListItemIcon>
              <HomeIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Home" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/upcoming')}>
            <ListItemIcon>
              <CalendarTodayIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Upcoming" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/previous')}>
            <ListItemIcon>
              <HistoryIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Previous" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/recordings')}>
            <ListItemIcon>
              <VideoLibraryIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Recordings" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/profile')}>
            <ListItemIcon>
              <AccountCircleIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Profile" />}
          </ListItem>
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '8px 16px',
            backgroundColor: '#000',
          }}
        >
          <IconButton
            style={{
              marginLeft: 'auto',
              backgroundColor: '#333',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#fff',
            }}
            onClick={handleProfileClick}
          >
            <Avatar
              src={profileImage || ''} // Display uploaded profile image or default to empty string
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#fff',
              }}
            >
              {!profileImage && <AccountCircleIcon style={{ fontSize: '1.5rem' }} />} {/* Show default icon if no image */}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <Avatar
                src={profileImage || 'https://via.placeholder.com/150'} // Display uploaded profile image or default placeholder
                alt="Profile Picture"
                style={{
                  width: '60px',
                  height: '60px',
                  marginBottom: '10px',
                  borderRadius: '50%',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Typography variant="h6">{username}</Typography>
              <Typography variant="body2">{userEmail}</Typography>
            </div>
            <Divider style={{ backgroundColor: '#555' }} />
            <MenuItem onClick={handleMyProfileClick}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </header>
        <main style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
