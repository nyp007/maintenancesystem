import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TechnicianDashboard.css';

const TechnicianDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const id = 99;

  useEffect(() => {
    axios
      .get(`https://localhost:7068/api/TicketInfo/bytechnician/${id}`)
      .then((response) => {
        setTickets(response.data);
        console.log(tickets);
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
    <div className='technician-dashboard'>
      <div className='left-section'>
        <div className='profile'>Your Profile Here</div>
        <div className='ticket-summary'>Total Tickets: {tickets.length}</div>
        <button className='button1' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='right-section'>
        <h1>Welcome To Technician Dashboard</h1>



        <div className='pending-tickets'>
          <h2>Pending Tickets</h2>
          
            {tickets.filter((ticket) => ticket.status === 'Pending').map((ticket) => (
        <div key={ticket.ticketNumber} onClick={() => handleTicketClick(
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
            
          {ticket.comment}
          <hr />

        </div>
      ))}
        </div>



        <div className='active-tickets'>
          <h2>Active Tickets</h2>
          {tickets.filter((ticket) => ticket.status === 'Active').map((ticket) => (
        <div key={ticket.ticketNumber} onClick={() => handleTicketClick(
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
            
          {ticket.comment}
          <hr />

        </div>
      ))}
        </div>
      </div>

      {selectedTicket && (
        <div className='ticket-details-mini-screen'>
          <button className='button2' onClick={closeMiniScreen}>
            X
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

export default TechnicianDashboard;
