import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPaintBrush, FaMobile } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.8;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  
  &.primary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: #667eea;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: white;
  opacity: 0.7;
  
  span {
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
`;

const FloatingElements = styled.div`
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
`;

const AboutPreview = styled.section`
  padding: 100px 20px;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
`;

const AboutText = styled(motion.div)`
  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const SkillsPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #667eea;
  }
  
  h4 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

const Home = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-preview');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingElements = [
    { icon: FaCode, top: '10%', left: '10%' },
    { icon: FaPaintBrush, top: '20%', right: '15%' },
    { icon: FaMobile, top: '70%', left: '5%' },
    { icon: FaGithub, top: '60%', right: '10%' },
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <FloatingElements>
          {floatingElements.map((element, index) => {
            const IconComponent = element.icon;
            return (
              <FloatingElement
                key={index}
                style={{
                  top: element.top,
                  left: element.left,
                  right: element.right,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                <IconComponent />
              </FloatingElement>
            );
          })}
        </FloatingElements>
        
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm John Doe
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Full Stack Developer
          </HeroSubtitle>
          
          <HeroDescription
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I create beautiful, responsive web applications using modern technologies.
            Passionate about clean code and user experience.
          </HeroDescription>
          
          <CTAButtons
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CTAButton to="/portfolio" className="primary">
              View My Work
            </CTAButton>
            <CTAButton to="/contact" className="secondary">
              <FaEnvelope />
              Get In Touch
            </CTAButton>
          </CTAButtons>
          
          <SocialLinks
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="mailto:john@example.com">
              <FaEnvelope />
            </SocialLink>
          </SocialLinks>
        </HeroContent>
        
        <ScrollIndicator
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll Down</span>
          <FaArrowDown />
        </ScrollIndicator>
      </HeroSection>
      
      <AboutPreview id="about-preview">
        <Container>
          <SectionTitle
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            About Me
          </SectionTitle>
          
          <AboutGrid>
            <AboutText
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3>Welcome to my digital world!</h3>
              <p>
                I'm a passionate full-stack developer with over 5 years of experience
                creating web applications that make a difference. I love turning complex
                problems into simple, beautiful solutions.
              </p>
              <p>
                My expertise spans across modern web technologies, and I'm always
                eager to learn new tools and frameworks to stay at the forefront
                of web development.
              </p>
              <CTAButton to="/about" className="primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
                Learn More About Me
              </CTAButton>
            </AboutText>
            
            <SkillsPreview>
              <SkillCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="icon">
                  <FaCode />
                </div>
                <h4>Frontend Development</h4>
                <p>React, Vue.js, TypeScript, CSS3</p>
              </SkillCard>
              
              <SkillCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="icon">
                  <FaPaintBrush />
                </div>
                <h4>UI/UX Design</h4>
                <p>Figma, Adobe Creative Suite</p>
              </SkillCard>
              
              <SkillCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="icon">
                  <FaMobile />
                </div>
                <h4>Backend Development</h4>
                <p>Node.js, Express, MongoDB</p>
              </SkillCard>
            </SkillsPreview>
          </AboutGrid>
        </Container>
      </AboutPreview>
    </HomeContainer>
  );
};

export default Home;