import styled from 'styled-components';
import { motion } from 'framer-motion';

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.$isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.$isScrolled ? 'var(--border-color)' : 'transparent'};
  transition: all var(--transition-normal);
  box-shadow: ${props => props.$isScrolled ? 'var(--shadow-md)' : 'none'};
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  z-index: 1001;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(motion.a)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${props => props.$mobile ? '12px 0' : '8px 0'};
  border-bottom: ${props => props.$mobile ? '1px solid var(--gray-200)' : 'none'};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: var(--primary-color);
    transition: width var(--transition-fast);
  }

  &:hover {
    color: var(--primary-color);
    
    &::after {
      width: 100%;
    }
  }

  ${props => props.$isActive && `
    color: var(--primary-color);
  `}

  @media (max-width: 768px) {
    &::after {
      display: none;
    }
  }
`;

export const MobileMenuToggle = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  padding: 20px;
  overflow: hidden;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const UserMenu = styled.div`
  position: relative;
`;

export const UserMenuToggle = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--gray-100);
    color: var(--primary-color);
  }
`;

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  padding: 8px 0;
  min-width: 160px;
  z-index: 1002;
`;

export const UserMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  text-align: left;
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--gray-100);
    color: var(--primary-color);
  }
`;