import React from 'react';
import Layout from './Layout';
import { FaCalendarAlt } from 'react-icons/fa';

const Previous = () => {
  // Static meetings data for demonstration
  const meetings = [
    {
      title: 'CodeCrafters Huddle: Sprint Planning',
      date: 'March 15, 2024',
      time: '08:00AM - 10:00AM',
      participants: ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis'],
    },
    {
      title: 'JS Maestros Assembly: Framework Exploration',
      date: 'March 16, 2024',
      time: '10:00AM - 12:00PM',
      participants: ['Alex Johnson', 'Chris Lee', 'Sarah Lee', 'David Miller'],
    },
    {
      title: 'DevOps Dynasty Sync: Weekly Standup',
      date: 'March 17, 2024',
      time: '01:00PM - 03:00PM',
      participants: ['Olivia Harris', 'James Wilson', 'Sophia Martinez', 'Liam Robinson'],
    },
  ];

  // Inline styles

  const headingStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const eventBoxContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
    gap: '20px', // Gap between cards
    justifyContent: 'center', // Center align cards
  };

  const eventBoxStyle = {
    backgroundColor: '#1e1e1e', // Darker gray background for the card
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    color: 'white',
    transition: 'transform 0.2s', // Transition effect for scaling
    width: '100%', // Full width of grid cell
    maxWidth: '500px', // Max width for each card
    position: 'relative', // Allow absolute positioning of children
  };

  const eventHeaderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '16px', // Space below the header
  };

  const calendarIconStyle = {
    color: '#9e9e9e',
    marginBottom: '8px', // Spacing between icon and title
    fontSize: '24px', // Slightly larger icon
  };

  const eventTitleStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#f9f9f9', // Light color for title
    textAlign: 'left', // Align text to the left
    marginBottom: '4px', // Space between title and date
  };

  const eventDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', // Space between details
  };

  const eventDateStyle = {
    color: '#cccccc', // Lighter gray for date
  };

  const eventTimeStyle = {
    color: '#aaaaaa', // Even lighter gray for time
  };

  const eventParticipantsStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const participantsListStyle = {
    display: 'flex',
    gap: '4px',
  };

  const participantStyle = {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#555555',
    color: 'white',
    textAlign: 'center',
    lineHeight: '24px',
    fontSize: '14px',
  };

  const participantMoreStyle = {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#777777',
    color: 'white',
    textAlign: 'center',
    lineHeight: '24px',
    fontSize: '14px',
  };

  return (
    <Layout>
      <div >
        <h2 style={headingStyle}>Previous Meetings</h2>
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
                <div style={eventTitleStyle}>{meeting.title}</div>
              </div>
              <div style={eventDetailsStyle}>
                <div style={eventDateStyle}>{meeting.date}</div>
                <div style={eventTimeStyle}>{meeting.time}</div>
                <div style={eventParticipantsStyle}>
                  {meeting.participants.length > 0 && (
                    <div style={participantsListStyle}>
                      {meeting.participants.slice(0, 3).map((participant, idx) => (
                        <span key={idx} style={participantStyle}>
                          {participant[0]} {/* Display the initial of each participant */}
                        </span>
                      ))}
                      {meeting.participants.length > 3 && (
                        <span style={participantMoreStyle}>
                          +{meeting.participants.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Previous;
