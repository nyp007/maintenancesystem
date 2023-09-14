import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EmployeeForm.css';
import '../styles/CommonFormStyles.css';


const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    EmployeeId: '',
    Password: '',
    Designation: '',
    PhoneNo: '',
    Email: '',
    FirstName: '',
    LastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.EmployeeId || !formData.Password || !formData.Designation || !formData.PhoneNo || !formData.Email || !formData.FirstName || !formData.LastName) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post('https://localhost:7068/api/EmployeeInfo', formData);
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form form-group">
      <label className="employee-label form-label">
        Employee ID:
        <input type="text" name="EmployeeId" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        Password:
        <input type="password" name="Password" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        Designation:
        <input type="text" name="Designation" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        Phone Number:
        <input type="text" name="PhoneNo" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        Email:
        <input type="email" name="Email" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        First Name:
        <input type="text" name="FirstName" onChange={handleChange} className="employee-input form-control" />
      </label>
      <label className="employee-label form-label">
        Last Name:
        <input type="text" name="LastName" onChange={handleChange} className="employee-input form-control" />
      </label>
      <button type="submit" className="employee-button btn btn-primary">Register</button>
    </form>
  );
};

export default EmployeeForm;
