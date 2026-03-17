import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { 
  NavbarContainer, 
  NavContainer, 
  Logo, 
  NavLinks, 
  NavLink, 
  MobileMenuToggle,
  MobileMenu,
  UserMenu,
  UserMenuToggle,
  UserMenuDropdown,
  UserMenuItem
} from './Navbar.styles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <NavbarContainer 
      as={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      $isScrolled={isScrolled}
    >
      <NavContainer>
        <Logo as={Link} to="/">
          Portfolio
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              as={Link}
              to={item.path}
              $isActive={location.pathname === item.path}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.label}
            </NavLink>
          ))}
          
          {currentUser ? (
            <UserMenu>
              <UserMenuToggle
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiUser />
                {currentUser.name}
              </UserMenuToggle>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <UserMenuDropdown
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserMenuItem as={Link} to="/dashboard">
                      <FiUser />
                      Dashboard
                    </UserMenuItem>
                    <UserMenuItem onClick={handleLogout}>
                      <FiLogOut />
                      Logout
                    </UserMenuItem>
                  </UserMenuDropdown>
                )}
              </AnimatePresence>
            </UserMenu>
          ) : (
            <NavLink
              as={Link}
              to="/login"
              $isActive={location.pathname === '/login'}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Login
            </NavLink>
          )}
        </NavLinks>

        <MobileMenuToggle
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </MobileMenuToggle>

        <AnimatePresence>
          {isOpen && (
            <MobileMenu
              as={motion.div}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  as={Link}
                  to={item.path}
                  $isActive={location.pathname === item.path}
                  $mobile
                >
                  {item.label}
                </NavLink>
              ))}
              
              {currentUser ? (
                <>
                  <NavLink as={Link} to="/dashboard" $mobile>
                    <FiUser />
                    Dashboard
                  </NavLink>
                  <NavLink onClick={handleLogout} $mobile>
                    <FiLogOut />
                    Logout
                  </NavLink>
                </>
              ) : (
                <NavLink
                  as={Link}
                  to="/login"
                  $isActive={location.pathname === '/login'}
                  $mobile
                >
                  Login
                </NavLink>
              )}
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContainer>
    </NavbarContainer>
  );
};

export default Navbar;