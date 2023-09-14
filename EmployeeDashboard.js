import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketForm from './TicketForm';
import '../styles/EmployeeDashboard.css';


const EmployeeDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Profile');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    axios
      .get('https://localhost:7068/api/TicketInfo/byemployee/1')
      .then((response) => {
        setTickets(response.data);
        console.log("gg");
      })
      .catch((error) => {
        console.error('There was an error fetching data:', error);
      });
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeMiniScreen = () => {
    setSelectedTicket(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear user authentication state and redirect to the login page
  };

  return (
    <div className='employee-dashboard'>
      <div className='left-section'>
        <button
          className='button1'
          onClick={() => setSelectedOption('Profile')}>
          Profile
        </button>
        <button
          className='button1'
          onClick={() => setSelectedOption('Raise Ticket')}>
          Raise Ticket
        </button>
        <button
          className='button1'
          onClick={() => setSelectedOption('Show Tickets')}>
          Show Tickets
        </button>
        <button className='button1' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='right-section'>
        <h1>Welcome To The Employee Dashboard</h1>
        {selectedOption === 'Profile' && <div>Your Profile Here</div>}
        {selectedOption === 'Raise Ticket' && <TicketForm />}
        {selectedOption === 'Show Tickets' &&
          tickets.map((ticket) => (
            <div
              key={ticket.TicketNumber}
              onClick={() => handleTicketClick(
                {
                  "ticketNumber": ticket.ticketNumber,
                  "sector": ticket.sector,
                  "typeOfEquip": ticket.typeOfEquip,
                  "status": ticket.status,
                  "employeeId": ticket.employeeId,
                  "priority": ticket.priority,
                  "comment": ticket.comment,
                  "technicianId": ticket.technicianId
                }
              )}>
              {ticket.Comment}
            </div>
          ))}
      </div>

      {selectedTicket && (
        <div className='ticket-details-mini-screen'>
          <button className='button2' onClick={closeMiniScreen}>
            Close
          </button>
          <h3>Details for Ticket #{selectedTicket.ticketNumber}</h3>
          <p>Sector: {selectedTicket.sector}</p>
          <p>Type of Equipment: {selectedTicket.typeOfEquip}</p>
          <p>Status: {selectedTicket.status}</p>
          <p>Employee ID: {selectedTicket.employeeId}</p>
          <p>Priority: {selectedTicket.priority}</p>
          <p>Comment: {selectedTicket.comment}</p>
          <p>Assigned To: {selectedTicket.technicianId}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
