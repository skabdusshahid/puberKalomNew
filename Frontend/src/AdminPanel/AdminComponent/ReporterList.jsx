import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import './ReporterList.css';
import Http from '../../Http';

const ReporterList = () => {
  const [reporters, setReporters] = useState([]);
  const [editingReporter, setEditingReporter] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    bloodgroup: '',
    dob: '',
    highestqualification: '',
    username: '',
    password: '',
    photo: ''
  });

  useEffect(() => {
    fetchReporters();
  }, []);

  const fetchReporters = async () => {
    try {
      const response = await axios.get(`${Http}/reporters`);
      setReporters(response.data);
    } catch (error) {
      console.error('Error fetching reporters:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Http}/reporters/${id}`);
      fetchReporters();
    } catch (error) {
      console.error('Error deleting reporter:', error);
    }
  };

  const handleEdit = (reporter) => {
    setEditingReporter(reporter._id);
    setFormData({ ...reporter });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithFile.append(key, formData[key]);
    });

    try {
      await axios.put(`${Http}/reporters/${editingReporter}`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditingReporter(null);
      fetchReporters();
    } catch (error) {
      console.error('Error updating reporter:', error);
    }
  };

  const closeModal = () => {
    setEditingReporter(null);
  };

  return (
    <div className="reporter-list-container">
      <h1>Reporter List</h1>
      <motion.table 
        className="reporter-table"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reporters.map((reporter) => (
            <tr key={reporter._id}>
              <td>{reporter.name}</td>
              <td>{reporter.email}</td>
              <td>{reporter.address}</td>
              <td>{reporter.phone}</td>
              <td>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(reporter)}
                  className="edit-btn"
                >
                  Edit
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(reporter._id)}
                  className="delete-btn"
                >
                  Delete
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>

      {editingReporter && (
        <Modal
          isOpen={!!editingReporter}
          onRequestClose={closeModal}
          contentLabel="Edit Reporter"
          ariaHideApp={false}
          className="custom-modal"
        >
          <h2>Edit Reporter</h2>
          <form onSubmit={handleUpdate} className="edit-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="bloodgroup"
              placeholder="Blood Group"
              value={formData.bloodgroup}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
            />
            <input
              type="text"
              name="highestqualification"
              placeholder="Highest Qualification"
              value={formData.highestqualification}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
            />
            <button type="submit">Update</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ReporterList;
