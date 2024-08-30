import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from './AuthContext';
import axios from 'axios';
import Modal from 'react-modal';
import Http from '../../Http';

const NavbarContainer = styled(motion.div)`
  height: 60px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 200px;
  width: calc(100% - 250px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    border-radius: 0;
  }
`;

const Title = styled.h3`
  flex-grow: 1;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ProfileImage = styled(motion.img)`
  cursor: pointer;
  margin-left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ecf0f1;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: #3498db;
  }
`;

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxHeight: '80%',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ecf0f1',
  },
};

const ModalHeader = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const ReporterInfo = styled.div`
  text-align: center;
`;

const ReporterImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled(motion.button)`
  background-color: #e74c3c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [reporter, setReporter] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { reporterId } = useContext(AuthContext);

  useEffect(() => {
    if (reporterId) {
      axios.get(`${Http}/reporters/${reporterId}`)
        .then(response => setReporter(response.data))
        .catch(error => console.error('Error fetching reporter:', error));
    }
  }, [reporterId]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const getTitle = () => {
    switch (path) {
      case '/adminDashboard':
        return 'Add News';
      case '/adminDashboardView':
        return 'Dashboard View';
      case '/adminlogin':
        return 'Login';
      default:
        return 'Admin Panel';
    }
  };

  const getImageUrl = (path) => {
    return `${Http}${path.replace(/\\/g, '/')}`;
  };

  return (
    <>
      <NavbarContainer
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <Title>{getTitle()}</Title>
        {reporter && (
          <ProfileImage
            src={getImageUrl(reporter.photo)}
            alt="Profile"
            onClick={openModal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}
      </NavbarContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Reporter Details"
      >
        <ModalHeader>Reporter Details</ModalHeader>
        {reporter ? (
          <ReporterInfo>
            <ReporterImage
              src={getImageUrl(reporter.photo)}
              alt="Reporter"
            />
            <p><strong>Name:</strong> {reporter.name}</p>
            <p><strong>Email:</strong> {reporter.email}</p>
            <p><strong>Phone:</strong> {reporter.phone}</p>
            <p><strong>Blood Group:</strong> {reporter.bloodgroup}</p>
            <p><strong>Address:</strong> {reporter.address}</p>
          </ReporterInfo>
        ) : (
          <p>Loading...</p>
        )}
        <CloseButton
          onClick={closeModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Close
        </CloseButton>
      </Modal>
    </>
  );
};

export default Navbar;
