import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../utils/AuthContext';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: var(--transition);
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  opacity: 0;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: var(--text-light);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const AdminActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: var(--transition);
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const AdminButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: var(--transition);
  
  &:hover {
    background: ${props => props.danger ? '#e74c3c' : 'var(--primary-color)'};
    transform: scale(1.1);
  }
`;

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit && onEdit(project);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete && onDelete(project._id);
    }
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {isAuthenticated && (
        <AdminActions>
          <AdminButton
            onClick={handleEdit}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEdit />
          </AdminButton>
          <AdminButton
            onClick={handleDelete}
            danger={true}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTrash />
          </AdminButton>
        </AdminActions>
      )}

      <ImageContainer>
        <img 
          src={project.imageUrl || '/api/placeholder/400/200'} 
          alt={project.title}
          onError={(e) => {
            e.target.src = '/api/placeholder/400/200';
          }}
        />
        <ImageOverlay>
          {project.liveDemoUrl && (
            <ActionButton
              as="a"
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExternalLinkAlt />
            </ActionButton>
          )}
          {project.repositoryUrl && (
            <ActionButton
              as="a"
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </ActionButton>
          )}
        </ImageOverlay>
      </ImageContainer>

      <CardContent>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        
        <CardActions>
          {project.liveDemoUrl && (
            <LinkButton 
              href={project.liveDemoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </LinkButton>
          )}
          {project.repositoryUrl && (
            <LinkButton 
              href={project.repositoryUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>Code</span>
            </LinkButton>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;