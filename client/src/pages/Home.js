import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaCode, 
  FaLaptopCode, 
  FaMobile, 
  FaRocket,
  FaDownload
} from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 2;
  position: relative;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: 1rem;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  
  &.primary {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  cursor: pointer;
  
  .arrow {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const ServicesSection = styled.section`
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const ServicesContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: var(--text-light);
  margin-bottom: 3rem;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const ServiceTitle = styled.h3`
  color: var(--text-light);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(2px);
`;

const Home = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'Creating modern, responsive websites and web applications using cutting-edge technologies and best practices.'
    },
    {
      icon: FaLaptopCode,
      title: 'Frontend Development',
      description: 'Building engaging user interfaces with React, Vue.js, and modern CSS frameworks for optimal user experience.'
    },
    {
      icon: FaMobile,
      title: 'Mobile Development',
      description: 'Developing cross-platform mobile applications using React Native and native technologies.'
    },
    {
      icon: FaRocket,
      title: 'Performance Optimization',
      description: 'Optimizing websites and applications for speed, accessibility, and search engine visibility.'
    }
  ];

  return (
    <>
      <HeroSection>
        <BackgroundElements>
          <FloatingElement
            size="200px"
            style={{ top: '10%', left: '10%' }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          <FloatingElement
            size="150px"
            style={{ top: '60%', right: '15%' }}
            animate={{
              y: [0, 20, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          <FloatingElement
            size="100px"
            style={{ bottom: '20%', left: '20%' }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </BackgroundElements>

        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Creative Developer & Designer
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I craft exceptional digital experiences with modern technologies, 
            focusing on performance, accessibility, and user satisfaction.
          </HeroSubtitle>
          
          <CTAButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CTAButton to="/portfolio" className="primary">
              View My Work
              <FaArrowRight />
            </CTAButton>
            <CTAButton to="/contact" className="secondary">
              Get In Touch
              <FaDownload />
            </CTAButton>
          </CTAButtons>
        </HeroContent>

        <ScrollIndicator
          onClick={scrollToServices}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p>Scroll to explore</p>
          <div className="arrow">↓</div>
        </ScrollIndicator>
      </HeroSection>

      <ServicesSection id="services">
        <ServicesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What I Do
          </SectionTitle>
          
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <ServiceIcon>
                  <service.icon />
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContainer>
      </ServicesSection>
    </>
  );
};

export default Home;