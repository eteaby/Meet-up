import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Upcoming = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Retrieve meetings from local storage
    const storedMeetings = JSON.parse(localStorage.getItem('meetings')) || [];
    setMeetings(storedMeetings);
  }, []);

  const handleStartMeeting = (meeting) => {
    console.log('Starting meeting:', meeting.description);
    // Navigate to the VideoChatPage and pass the meeting details
    navigate('/video', { state: { meeting } }); // Redirect to VideoChatPage with meeting details
  };

  const handleDeleteMeeting = (index) => {
    const updatedMeetings = meetings.filter((_, i) => i !== index);
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
  };

  // Inline styles (same as before)
  const headingStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const eventBoxContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  };

  const eventBoxStyle = {
    backgroundColor: '#1e1e1e',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    color: 'white',
    transition: 'transform 0.3s',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
  };

  const eventHeaderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '16px',
  };

  const calendarIconStyle = {
    color: '#9e9e9e',
    marginBottom: '8px',
    fontSize: '24px',
  };

  const eventTitleStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#f9f9f9',
    textAlign: 'left',
    marginBottom: '4px',
  };

  const eventDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const eventDateStyle = {
    color: '#cccccc',
  };

  const eventTimeStyle = {
    color: '#aaaaaa',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    marginTop: '16px',
  };

  const buttonStyle = {
    width: '100px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
  };

  const startButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0a74da',
  };

  const startButtonHoverStyle = {
    backgroundColor: '#0056a0',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d9534f',
  };

  const deleteButtonHoverStyle = {
    backgroundColor: '#c9302c',
  };

  return (
    <Layout>
      <div>
        <h2 style={headingStyle}>Upcoming Meetings</h2>
        <div style={eventBoxContainerStyle}>
          {meetings.map((meeting, index) => (
            <div
              key={index}
              style={eventBoxStyle}
              className="event-box"
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={eventHeaderStyle}>
                <FaCalendarAlt style={calendarIconStyle} />
                <div style={eventTitleStyle}>{meeting.description}</div>
              </div>
              <div style={eventDetailsStyle}>
                <div style={eventDateStyle}>{new Date(meeting.dateTime).toLocaleDateString()}</div>
                <div style={eventTimeStyle}>{new Date(meeting.dateTime).toLocaleTimeString()}</div>
                <div style={buttonContainerStyle}>
                  <button
                    style={startButtonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = startButtonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = startButtonStyle.backgroundColor}
                    onClick={() => handleStartMeeting(meeting)} // Navigate on click
                  >
                    Start
                  </button>
                  <button
                    style={deleteButtonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = deleteButtonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = deleteButtonStyle.backgroundColor}
                    onClick={() => handleDeleteMeeting(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Upcoming;

