import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHome, FaUserAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Modal from 'react-modal';
import AuthContext from '../AdminPanel/AdminComponent/AuthContext';
import Logo from '../HeeaderComponent/Logo';
import GlobalStyle from '../AdminPanel/globalStyles';
import Http from '../Http';

const LayoutContainer = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }

  svg {
    margin-right: 15px;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #34495e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  @media (min-width: 769px) {
    left: 250px;
  }
`;

const NavbarToggle = styled.div`
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavbarTitle = styled.h1`
  font-size: 20px;
  margin: 0;
`;

const Content = styled.div`
  margin-top: 60px;
  margin-left: 250px;
  padding: 20px;
  flex-grow: 1;
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
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

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: #ecf0f1;
  border: none;
  padding: 10px 15px;
  margin-top: auto;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
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

const MasterLoginStatus = styled.span`
  background-color: #27ae60;
  color: #ecf0f1;
  padding: 5px 10px;
  border-radius: 8px;
  margin-left: 20px;
  font-size: 1rem;
  display: ${({ isVisible }) => (isVisible ? 'inline' : 'none')};
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

const ModalHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;


const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, reporterId, logout, isMasterAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reporter, setReporter] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (reporterId) {
      axios.get(`${Http}/reporters/${reporterId}`)
        .then(response => setReporter(response.data))
        .catch(error => console.error('Error fetching reporter:', error));
    }
  }, [reporterId]);

  const handleLogout = () => {
    logout();
    navigate('/adminlogin');
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const getImageUrl = (path) => `${Http}${path.replace(/\\/g, '/')}`;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <GlobalStyle />
      <LayoutContainer>
        <SidebarContainer isOpen={isSidebarOpen}>
          <SidebarList>
            <SidebarItem>
              <FaHome />
              <NavLink to="/adminDashboard">Add News</NavLink>
            </SidebarItem>
            <SidebarItem>
              <FaUserAlt />
              <NavLink to="/adminDashboardView">Dashboard</NavLink>
            </SidebarItem>
            <SidebarItem>
              <FaSignOutAlt />
              <NavLink to="/category">Category</NavLink>
            </SidebarItem>
            <SidebarItem>
              <FaSignOutAlt />
              <NavLink to="/reporter-dashboard">Reporter Dashboard</NavLink>
            </SidebarItem>
            {isMasterAuthenticated && (
              <>
                <SidebarItem>
                  <FaSignOutAlt />
                  <NavLink to="/viewpages">View Pages</NavLink>
                </SidebarItem>
                <SidebarItem>
                  <FaSignOutAlt />
                  <NavLink to="/reporteradd">Add Reporter</NavLink>
                </SidebarItem>
                <SidebarItem>
                  <FaSignOutAlt />
                  <NavLink to="/reporterList">All Reporter</NavLink>
                </SidebarItem>
                <SidebarItem>
                  <FaSignOutAlt />
                  <NavLink to="/menu">Menu</NavLink>
                </SidebarItem>
              </>
            )}
            <SidebarItem>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </SidebarItem>
          </SidebarList>
        </SidebarContainer>

        <NavbarContainer>
          <NavbarToggle onClick={toggleSidebar}>
            <FaBars />
          </NavbarToggle>
          <NavbarTitle>Admin Dashboard</NavbarTitle>
          {reporter && (
            <ProfileImage
              src={getImageUrl(reporter.photo)}
              alt="Profile"
              onClick={openModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          )}
          {isMasterAuthenticated && (
            <MasterLoginStatus isVisible={isMasterAuthenticated}>
              Master-login active
            </MasterLoginStatus>
          )}
        </NavbarContainer>

        <Content>
          {children}
        </Content>
      </LayoutContainer>

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
              alt={reporter.name}
            />
            <h2>{reporter.name}</h2>
            <p>Email: {reporter.email}</p>
            <p>Phone: {reporter.phone}</p>
            <CloseButton
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Close
            </CloseButton>
          </ReporterInfo>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </>
  );
};

export default AdminLayout;
