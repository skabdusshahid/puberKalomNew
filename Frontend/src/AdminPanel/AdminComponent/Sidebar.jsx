


import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import Logo from '../../HeeaderComponent/Logo';

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  font-size: 16px;
  margin: 10px 15px;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: #ecf0f1;
  border: none;
  padding: 10px;
  margin-top: auto;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  &:hover {
    background-color: #c0392b;
  }
`;

const Sidebar = () => {

  const { isAuthenticated } = useContext(AuthContext);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/adminlogin');
  };

 

  return (
    <SidebarContainer>
      <div style={{backgroundColor:"white", display:"flex", justifyContent:"center", alignItems:"center" , height:"40px"}}>
      <Logo />
      </div>
      <div style={{paddingBottom:"40px"}}></div>
      {!isAuthenticated ? (
      <>
        <NavLink to="/adminlogin">Login</NavLink>

      </>
      ) : (
      <>
           
        <NavLink to="/adminDashboard">Add News</NavLink>
        <NavLink to="/reporteradd">Add Reporter</NavLink>
        <NavLink to="/adminDashboardView">Dashboard</NavLink>
        {/* <NavLink to="/addcategory">Add Category</NavLink>    */}
        <NavLink to="/category">Category</NavLink>
        <NavLink to="/viewpages">View Pages</NavLink>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </>
      )}
    </SidebarContainer>
    );
};

export default Sidebar;

