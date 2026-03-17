import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { portfolioAPI } from '../utils/api';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const PortfolioContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--text-light);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const FilterSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SearchBox = styled.div`
  position: relative;
  min-width: 300px;
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius);
    color: var(--text-light);
    font-size: 1rem;
    transition: var(--transition);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      background: rgba(255, 255, 255, 0.15);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 
    'linear-gradient(45deg, var(--primary-color), var(--secondary-color))' : 
    'rgba(255, 255, 255, 0.1)'};
  color: var(--text-light);
  border: 1px solid ${props => props.active ? 
    'transparent' : 
    'rgba(255, 255, 255, 0.2)'};
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, var(--secondary-color), var(--primary-color))' : 
      'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    color: var(--text-light);
    margin-bottom: 1rem;
  }
  
  p {
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const LoadMore = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const LoadMoreButton = styled(motion.button)`
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayCount, setDisplayCount] = useState(6);

  const categories = ['All', 'Web Development', 'Mobile App', 'UI/UX Design', 'E-commerce'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, activeFilter]);

  const fetchProjects = async () => {
    try {
      const response = await portfolioAPI.getAll();
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again later.');
      // Set mock data for demonstration
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    // Filter by category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(project => 
        project.category === activeFilter
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (category) => {
    setActiveFilter(category);
    setDisplayCount(6); // Reset display count when filtering
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  const handleEdit = (project) => {
    console.log('Edit project:', project);
    // Implement edit functionality
  };

  const handleDelete = async (projectId) => {
    try {
      await portfolioAPI.delete(projectId);
      setProjects(prev => prev.filter(p => p._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Mock data for demonstration
  const mockProjects = [
    {
      _id: '1',
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform built with React and Node.js, featuring secure payments, inventory management, and real-time order tracking.',
      imageUrl: '/api/placeholder/400/300',
      liveDemoUrl: 'https://demo.example.com',
      repositoryUrl: 'https://github.com/example/ecommerce',
      category: 'Web Development'
    },
    {
      _id: '2',
      title: 'Mobile Banking App',
      description: 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.',
      imageUrl: '/api/placeholder/400/300',
      liveDemoUrl: 'https://app.example.com',
      repositoryUrl: 'https://github.com/example/banking-app',
      category: 'Mobile App'
    },
    {
      _id: '3',
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing creative work with smooth animations, dark mode support, and optimized performance.',
      imageUrl: '/api/placeholder/400/300',
      liveDemoUrl: 'https://portfolio.example.com',
      repositoryUrl: 'https://github.com/example/portfolio',
      category: 'Web Development'
    },
    {
      _id: '4',
      title: 'Task Management UI',
      description: 'A comprehensive UI design system for a task management application with intuitive user flows and modern design patterns.',
      imageUrl: '/api/placeholder/400/300',
      liveDemoUrl: 'https://figma.com/example',
      repositoryUrl: null,
      category: 'UI/UX Design'
    },
    {
      _id: '5',
      title: 'Restaurant Website',
      description: 'A beautiful restaurant website with online ordering system, table reservations, and menu management capabilities.',
      imageUrl: '/api/placeholder/400/300',
      liveDemoUrl: 'https://restaurant.example.com',
      repositoryUrl: 'https://github.com/example/restaurant',
      category: 'E-commerce'
    },
    {
      _id: '6',
      title: 'Fitness Tracking App',
      description: 'A comprehensive fitness tracking mobile app with workout plans, progress monitoring, and social features for motivation.',
      imageUrl: '/api/placeholder/400/300',
      liveDemoUrl: 'https://fitness.example.com',
      repositoryUrl: 'https://github.com/example/fitness-app',
      category: 'Mobile App'
    }
  ];

  if (loading) {
    return (
      <PortfolioContainer>
        <PortfolioContent>
          <LoadingSpinner text="Loading projects..." />
        </PortfolioContent>
      </PortfolioContainer>
    );
  }

  return (
    <PortfolioContainer>
      <PortfolioContent>
        <Header>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            My Portfolio
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore my latest projects and creative works. Each project represents 
            a unique challenge and innovative solution.
          </Subtitle>
        </Header>

        <FilterSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SearchBox>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBox>

          <FilterButtons>
            {categories.map((category) => (
              <FilterButton
                key={category}
                active={activeFilter === category}
                onClick={() => handleFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </FilterButton>
            ))}
          </FilterButtons>
        </FilterSection>

        {error && (
          <EmptyState
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="icon">⚠️</div>
            <h3>Error Loading Projects</h3>
            <p>{error}</p>
          </EmptyState>
        )}

        {!error && filteredProjects.length === 0 && !loading && (
          <EmptyState
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="icon">🔍</div>
            <h3>No Projects Found</h3>
            <p>Try adjusting your search terms or filters to find what you're looking for.</p>
          </EmptyState>
        )}

        {filteredProjects.length > 0 && (
          <>
            <ProjectsGrid>
              {filteredProjects.slice(0, displayCount).map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ProjectsGrid>

            {filteredProjects.length > displayCount && (
              <LoadMore>
                <LoadMoreButton
                  onClick={handleLoadMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Projects
                </LoadMoreButton>
              </LoadMore>
            )}
          </>
        )}
      </PortfolioContent>
    </PortfolioContainer>
  );
};

export default Portfolio;