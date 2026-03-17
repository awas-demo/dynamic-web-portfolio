import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  FaUser, 
  FaProjectDiagram, 
  FaChartBar, 
  FaEnvelope, 
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const WelcomeText = styled.div`
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &.primary {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a6fd8;
    }
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #666;
    border: 2px solid #e9ecef;
    
    &:hover {
      background: #e9ecef;
    }
  }
  
  &.danger {
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    color: white;
    
    &.projects {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    &.skills {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    &.messages {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    
    &.views {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }
  }
  
  .number {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f3f4;
  display: flex;
  justify-content: between;
  align-items: center;
  
  h2 {
    color: #333;
    margin: 0;
  }
`;

const ContentBody = styled.div`
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid #f1f3f4;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
  }
  
  td {
    color: #666;
  }
  
  tbody tr:hover {
    background: #f8f9fa;
  }
`;

const ActionCell = styled.td`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  
  &.view {
    background: #e3f2fd;
    color: #1976d2;
    
    &:hover {
      background: #bbdefb;
    }
  }
  
  &.edit {
    background: #f3e5f5;
    color: #7b1fa2;
    
    &:hover {
      background: #e1bee7;
    }
  }
  
  &.delete {
    background: #ffebee;
    color: #d32f2f;
    
    &:hover {
      background: #ffcdd2;
    }
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #667eea;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }
  
  .content {
    flex: 1;
    
    .action {
      color: #333;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .time {
      color: #999;
      font-size: 0.8rem;
    }
  }
`;

const QuickAction = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: 2px dashed #ddd;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #666;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);

  // Mock data
  const stats = [
    { icon: FaProjectDiagram, iconClass: 'projects', number: '12', label: 'Projects' },
    { icon: FaChartBar, iconClass: 'skills', number: '15', label: 'Skills' },
    { icon: FaEnvelope, iconClass: 'messages', number: '24', label: 'Messages' },
    { icon: FaEye, iconClass: 'views', number: '1.2k', label: 'Profile Views' }
  ];

  const mockProjects = [
    { id: 1, name: 'E-commerce Platform', status: 'Completed', date: '2024-01-15' },
    { id: 2, name: 'Task Management App', status: 'In Progress', date: '2024-01-20' },
    { id: 3, name: 'Portfolio Website', status: 'Completed', date: '2024-01-10' },
    { id: 4, name: 'Blog Platform', status: 'Planning', date: '2024-01-25' }
  ];

  const recentActivity = [
    { user: 'JD', action: 'Updated portfolio project', time: '2 hours ago' },
    { user: 'AB', action: 'Added new skill: React Native', time: '4 hours ago' },
    { user: 'CD', action: 'Received new message', time: '6 hours ago' },
    { user: 'EF', action: 'Published blog post', time: '1 day ago' }
  ];

  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <DashboardContainer>
      <Header>
        <WelcomeText>
          <h1>Welcome back, {user?.firstName || 'User'}!</h1>
          <p>Here's what's happening with your portfolio today.</p>
        </WelcomeText>
        
        <HeaderActions>
          <ActionButton className="secondary">
            <FaCog />
            Settings
          </ActionButton>
          <ActionButton className="danger" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </ActionButton>
        </HeaderActions>
      </Header>

      <StatsGrid>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`icon ${stat.iconClass}`}>
                <IconComponent />
              </div>
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </StatCard>
          );
        })}
      </StatsGrid>

      <ContentGrid>
        <MainContent>
          <ContentHeader>
            <h2>Recent Projects</h2>
            <ActionButton className="primary">
              <FaPlus />
              Add Project
            </ActionButton>
          </ContentHeader>
          
          <ContentBody>
            <Table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        background: project.status === 'Completed' ? '#e8f5e8' : 
                                   project.status === 'In Progress' ? '#fff3cd' : '#e3f2fd',
                        color: project.status === 'Completed' ? '#2e7d32' : 
                               project.status === 'In Progress' ? '#f57c00' : '#1976d2'
                      }}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.date}</td>
                    <ActionCell>
                      <IconButton className="view">
                        <FaEye />
                      </IconButton>
                      <IconButton className="edit">
                        <FaEdit />
                      </IconButton>
                      <IconButton className="delete">
                        <FaTrash />
                      </IconButton>
                    </ActionCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ContentBody>
        </MainContent>

        <Sidebar>
          <SidebarCard
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>Quick Actions</h3>
            <QuickAction whileHover={{ scale: 1.02 }}>
              <FaPlus />
              Add New Project
            </QuickAction>
          </SidebarCard>

          <SidebarCard
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Recent Activity</h3>
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <div className="avatar">{activity.user}</div>
                <div className="content">
                  <div className="action">{activity.action}</div>
                  <div className="time">{activity.time}</div>
                </div>
              </ActivityItem>
            ))}
          </SidebarCard>
        </Sidebar>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;