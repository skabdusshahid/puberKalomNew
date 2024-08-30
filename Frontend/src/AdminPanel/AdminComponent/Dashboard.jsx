// src/components/Dashboard.js
import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  margin-left: 250px;
  margin-top: 60px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Card>
        <h2>Welcome to the Dashboard</h2>
        <p>Here you can find various statistics and information.</p>
      </Card>
      {/* Add more cards or components as needed */}
    </DashboardContainer>
  );
};

export default Dashboard;
