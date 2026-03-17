import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';
import { 
  FooterContainer, 
  FooterContent, 
  FooterSection, 
  FooterTitle, 
  FooterLink, 
  SocialLinks, 
  SocialLink,
  FooterBottom,
  Copyright
} from './Footer.styles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Portfolio</FooterTitle>
          <p>
            A modern web portfolio showcasing skills, projects, and experience.
            Built with React and modern web technologies.
          </p>
          <SocialLinks>
            <SocialLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              as={motion.a}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FiGithub />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              as={motion.a}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FiLinkedin />
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              as={motion.a}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FiTwitter />
            </SocialLink>
            <SocialLink
              href="mailto:contact@portfolio.com"
              as={motion.a}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FiMail />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink as={Link} to="/">Home</FooterLink>
          <FooterLink as={Link} to="/about">About</FooterLink>
          <FooterLink as={Link} to="/portfolio">Portfolio</FooterLink>
          <FooterLink as={Link} to="/skills">Skills</FooterLink>
          <FooterLink as={Link} to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink href="#">Web Development</FooterLink>
          <FooterLink href="#">Frontend Development</FooterLink>
          <FooterLink href="#">Backend Development</FooterLink>
          <FooterLink href="#">UI/UX Design</FooterLink>
          <FooterLink href="#">Consulting</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <p>Email: contact@portfolio.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Location: San Francisco, CA</p>
          <FooterLink as={Link} to="/contact">
            Send Message
          </FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Dynamic Web Portfolio. Made with{' '}
            <FiHeart style={{ color: '#e74c3c', display: 'inline' }} />{' '}
            by Your Name
          </motion.div>
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;