import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../utils/AuthContext';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'};
`;

const Nav = styled.nav`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-light);
  text-decoration: none;
  transition: var(--transition);
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    transition: right 0.3s ease;
    z-index: 999;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-light);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    color: var(--text-light);
  }
  
  @media (max-width: 768px) {
    color: var(--text-primary);
    font-size: 1.2rem;
    
    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: var(--primary-color);
    }
  }
`;

const AuthSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-weight: 500;
  
  @media (max-width: 768px) {
    color: var(--text-primary);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    color: var(--text-primary);
    border-color: var(--primary-color);
    
    &:hover {
      background: var(--primary-color);
      color: white;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: var(--text-light);
  font-size: 1.5rem;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <HeaderContainer
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Nav>
          <Logo to="/">Portfolio</Logo>
          
          <NavLinks isOpen={isOpen}>
            {navItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            
            <AuthSection>
              {isAuthenticated ? (
                <>
                  <UserInfo>
                    <FaUser />
                    <span>{user?.username || 'Admin'}</span>
                  </UserInfo>
                  <NavLink to="/admin">Admin</NavLink>
                  <LogoutButton onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </LogoutButton>
                </>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </AuthSection>
          </NavLinks>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>
      
      <Overlay isOpen={isOpen} onClick={toggleMenu} />
    </>
  );
};

export default Header;