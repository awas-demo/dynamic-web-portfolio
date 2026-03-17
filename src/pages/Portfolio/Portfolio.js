import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaFilter, 
  FaTimes,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaMobile,
  FaPaintBrush
} from 'react-icons/fa';
import { api } from '../../utils/api';

const PortfolioContainer = styled.div`
  padding: 80px 0;
  min-height: 100vh;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.active ? '#667eea' : '#ddd'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    border-color: #667eea;
    ${props => !props.active && `
      background: #667eea;
      color: white;
    `}
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: ${props => props.bgColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ProjectCategory = styled.span`
  font-size: 0.8rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 1rem;
  display: inline-block;
  text-transform: uppercase;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  background: #f1f3f4;
  color: #666;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #5a6fd8;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  height: 300px;
  background: ${props => props.bgColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const ModalDescription = styled.div`
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  
  li {
    padding: 0.5rem 0;
    color: #666;
    position: relative;
    padding-left: 20px;
    
    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });

  // Mock data - in real app, this would come from API
  const mockProjects = [
    {
      _id: '1',
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A full-featured e-commerce platform built with React and Node.js',
      fullDescription: `
        <p>A comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, and payment processing.</p>
        <p>This project demonstrates proficiency in full-stack development, including RESTful API design, database modeling, and modern frontend frameworks.</p>
      `,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      image: '/api/placeholder/400/200',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: [
        'User authentication and authorization',
        'Product catalog with search and filtering',
        'Shopping cart and checkout process',
        'Payment processing with Stripe',
        'Admin panel for inventory management',
        'Responsive design for all devices'
      ]
    },
    {
      _id: '2',
      title: 'Task Management App',
      category: 'web',
      description: 'A collaborative task management application with real-time updates',
      fullDescription: `
        <p>A productivity application that helps teams manage projects and tasks efficiently with real-time collaboration features.</p>
        <p>Features include drag-and-drop task boards, team collaboration, file attachments, and progress tracking.</p>
      `,
      technologies: ['Vue.js', 'Firebase', 'CSS3'],
      githubUrl: 'https://github.com/example/taskapp',
      liveUrl: 'https://taskapp-demo.com',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: [
        'Kanban-style task boards',
        'Real-time collaboration',
        'File attachments and comments',
        'Progress tracking and reporting',
        'Team member management',
        'Mobile-responsive design'
      ]
    },
    {
      _id: '3',
      title: 'Weather Mobile App',
      category: 'mobile',
      description: 'Cross-platform mobile app for weather forecasting',
      fullDescription: `
        <p>A beautifully designed weather application providing accurate forecasts and weather data for locations worldwide.</p>
        <p>Built with React Native for cross-platform compatibility and featuring an intuitive user interface.</p>
      `,
      technologies: ['React Native', 'API Integration'],
      githubUrl: 'https://github.com/example/weatherapp',
      liveUrl: null,
      bgColor: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      features: [
        'Current weather conditions',
        '7-day weather forecast',
        'Location-based weather',
        'Weather alerts and notifications',
        'Interactive weather maps',
        'Offline data caching'
      ]
    },
    {
      _id: '4',
      title: 'AI Image Generator',
      category: 'ai',
      description: 'Web application using AI to generate images from text descriptions',
      fullDescription: `
        <p>An innovative web application that leverages artificial intelligence to generate unique images from text descriptions.</p>
        <p>Built using modern AI APIs and featuring a clean, intuitive interface for creating and managing generated images.</p>
      `,
      technologies: ['Python', 'TensorFlow', 'React'],
      githubUrl: 'https://github.com/example/ai-image-gen',
      liveUrl: 'https://ai-image-generator-demo.com',
      bgColor: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
      features: [
        'Text-to-image generation',
        'Multiple art styles and filters',
        'Image history and favorites',
        'High-resolution downloads',
        'Batch generation capabilities',
        'Social sharing features'
      ]
    },
    {
      _id: '5',
      title: 'Portfolio Website',
      category: 'design',
      description: 'Responsive portfolio website with modern design',
      fullDescription: `
        <p>A stunning portfolio website showcasing creative work with attention to detail in design and user experience.</p>
        <p>Features smooth animations, responsive design, and optimized performance across all devices.</p>
      `,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      githubUrl: 'https://github.com/example/portfolio',
      liveUrl: 'https://portfolio-demo.com',
      bgColor: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
      features: [
        'Responsive grid layout',
        'Smooth scroll animations',
        'Interactive project galleries',
        'Contact form integration',
        'SEO optimization',
        'Fast loading times'
      ]
    },
    {
      _id: '6',
      title: 'Data Visualization Dashboard',
      category: 'web',
      description: 'Interactive dashboard for data analysis and visualization',
      fullDescription: `
        <p>A comprehensive data visualization dashboard providing insights through interactive charts and graphs.</p>
        <p>Built with modern charting libraries and featuring real-time data updates and customizable visualizations.</p>
      `,
      technologies: ['D3.js', 'React', 'Node.js'],
      githubUrl: 'https://github.com/example/dashboard',
      liveUrl: 'https://dashboard-demo.com',
      bgColor: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
      features: [
        'Interactive charts and graphs',
        'Real-time data updates',
        'Customizable dashboards',
        'Data export capabilities',
        'User role management',
        'Mobile-responsive design'
      ]
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects', icon: null },
    { key: 'web', label: 'Web Apps', icon: FaReact },
    { key: 'mobile', label: 'Mobile', icon: FaMobile },
    { key: 'ai', label: 'AI/ML', icon: FaPython },
    { key: 'design', label: 'Design', icon: FaPaintBrush }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  const getTechIcon = (tech) => {
    const techIcons = {
      'React': FaReact,
      'Node.js': FaNodeJs,
      'Python': FaPython,
      'MongoDB': FaDatabase,
      'React Native': FaReact
    };
    return techIcons[tech] || null;
  };

  return (
    <PortfolioContainer>
      <Container>
        <Header ref={headerRef}>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            My Portfolio
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A collection of projects that showcase my skills and creativity
          </Subtitle>
        </Header>

        <FilterSection
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FaFilter />
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <FilterButton
                key={category.key}
                active={selectedCategory === category.key}
                onClick={() => handleCategoryFilter(category.key)}
              >
                {IconComponent && <IconComponent />}
                {category.label}
              </FilterButton>
            );
          })}
        </FilterSection>

        {loading ? (
          <LoadingSpinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="spinner"></div>
          </LoadingSpinner>
        ) : (
          <ProjectsGrid>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.02 }}
                >
                  <ProjectImage bgColor={project.bgColor}>
                    {project.title.charAt(0)}
                  </ProjectImage>
                  
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectCategory>{project.category}</ProjectCategory>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    
                    <TechStack>
                      {project.technologies.map((tech, techIndex) => {
                        const TechIcon = getTechIcon(tech);
                        return (
                          <TechTag key={techIndex}>
                            {TechIcon && <TechIcon />}
                            {tech}
                          </TechTag>
                        );
                      })}
                    </TechStack>
                    
                    <ProjectLinks onClick={e => e.stopPropagation()}>
                      <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                        Code
                      </ProjectLink>
                      {project.liveUrl && (
                        <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <FaExternalLinkAlt />
                          Live Demo
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </AnimatePresence>
          </ProjectsGrid>
        )}

        <AnimatePresence>
          {selectedProject && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <ModalHeader bgColor={selectedProject.bgColor}>
                  {selectedProject.title.charAt(0)}
                  <CloseButton onClick={() => setSelectedProject(null)}>
                    <FaTimes />
                  </CloseButton>
                </ModalHeader>
                
                <ModalBody>
                  <ModalTitle>{selectedProject.title}</ModalTitle>
                  <ProjectCategory>{selectedProject.category}</ProjectCategory>
                  
                  <ModalDescription
                    dangerouslySetInnerHTML={{ __html: selectedProject.fullDescription }}
                  />
                  
                  <h4>Key Features:</h4>
                  <FeatureList>
                    {selectedProject.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </FeatureList>
                  
                  <h4>Technologies Used:</h4>
                  <TechStack>
                    {selectedProject.technologies.map((tech, techIndex) => {
                      const TechIcon = getTechIcon(tech);
                      return (
                        <TechTag key={techIndex}>
                          {TechIcon && <TechIcon />}
                          {tech}
                        </TechTag>
                      );
                    })}
                  </TechStack>
                  
                  <ProjectLinks style={{ marginTop: '2rem' }}>
                    <ProjectLink 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                      View Source Code
                    </ProjectLink>
                    {selectedProject.liveUrl && (
                      <ProjectLink 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                        View Live Demo
                      </ProjectLink>
                    )}
                  </ProjectLinks>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </PortfolioContainer>
  );
};

export default Portfolio;