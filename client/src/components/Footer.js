import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaHeart,
  FaArrowUp 
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.9);
  color: var(--text-light);
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-light);
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--text-light);
  font-size: 1.2rem;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-color);
    transform: translateY(-3px);
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 0.5rem;
    
    a {
      color: rgba(255, 255, 255, 0.8);
      transition: var(--transition);
      
      &:hover {
        color: var(--primary-color);
        padding-left: 5px;
      }
    }
  }
`;

const ContactInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BackToTop = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  transition: var(--transition);
  
  &:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:contact@example.com', label: 'Email' }
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/skills', label: 'Skills' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <h3>About Me</h3>
            <p>
              A passionate developer creating innovative solutions and beautiful 
              digital experiences. Always learning and growing in the ever-evolving 
              world of technology.
            </p>
            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <social.icon />
                </SocialLink>
              ))}
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <QuickLinks>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </QuickLinks>
          </FooterSection>

          <FooterSection>
            <h3>Get In Touch</h3>
            <ContactInfo>
              <div>
                <FaEnvelope />
                <span>contact@example.com</span>
              </div>
              <p>
                Let's connect and discuss opportunities for collaboration. 
                I'm always excited to work on new and challenging projects.
              </p>
            </ContactInfo>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            <span>© 2024 Dynamic Portfolio. Made with</span>
            <FaHeart style={{ color: '#e74c3c' }} />
            <span>by a passionate developer</span>
          </Copyright>
          
          <BackToTop
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp />
            <span>Back to Top</span>
          </BackToTop>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;