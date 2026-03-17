import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaGraduationCap, 
  FaBriefcase, 
  FaHeart,
  FaDownload,
  FaCalendarAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const AboutContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
`;

const AboutHero = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const ProfileImage = styled(motion.div)`
  position: relative;
  
  img {
    width: 100%;
    max-width: 400px;
    border-radius: var(--border-radius);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transition: var(--transition);
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    border-radius: var(--border-radius);
    z-index: -1;
    opacity: 0.3;
  }
`;

const AboutText = styled.div`
  color: var(--text-light);
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Description = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const PersonalInfo = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  
  svg {
    color: var(--primary-color);
  }
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const StatsSection = styled.section`
  margin-bottom: 5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
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
  }
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const StatLabel = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`;

const TimelineSection = styled.section`
  margin-bottom: 5rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: var(--text-light);
  margin-bottom: 3rem;
  font-size: clamp(2rem, 4vw, 3rem);
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  
  &:nth-child(odd) {
    left: 0;
    text-align: right;
    padding-right: 2rem;
    
    @media (max-width: 768px) {
      left: 40px;
      text-align: left;
      padding-right: 0;
      padding-left: 1rem;
    }
  }
  
  &:nth-child(even) {
    left: 50%;
    padding-left: 2rem;
    
    @media (max-width: 768px) {
      left: 40px;
      padding-left: 1rem;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.2);
    
    @media (min-width: 769px) {
      right: ${props => props.index % 2 === 0 ? '-31px' : 'auto'};
      left: ${props => props.index % 2 !== 0 ? '-31px' : 'auto'};
    }
    
    @media (max-width: 768px) {
      left: -30px;
    }
  }
`;

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TimelineDate = styled.span`
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 600;
`;

const TimelineTitle = styled.h4`
  color: var(--text-light);
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const TimelineDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const About = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '25+', label: 'Happy Clients' },
    { number: '15+', label: 'Technologies' }
  ];

  const timelineData = [
    {
      date: '2024 - Present',
      title: 'Senior Full-Stack Developer',
      description: 'Leading development of complex web applications using React, Node.js, and modern cloud technologies. Mentoring junior developers and architecting scalable solutions.'
    },
    {
      date: '2022 - 2024',
      title: 'Full-Stack Developer',
      description: 'Developed and maintained multiple web applications using MERN stack. Improved application performance by 40% and implemented automated testing procedures.'
    },
    {
      date: '2021 - 2022',
      title: 'Frontend Developer',
      description: 'Specialized in creating responsive and interactive user interfaces using React, Vue.js, and modern CSS frameworks. Collaborated with UX/UI designers to implement pixel-perfect designs.'
    },
    {
      date: '2020 - 2021',
      title: 'Computer Science Graduate',
      description: 'Graduated with honors from University. Specialized in software engineering, data structures, and algorithms. Completed several innovative projects in web development.'
    }
  ];

  return (
    <AboutContainer>
      <AboutContent>
        <AboutHero>
          <ProfileImage
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/api/placeholder/400/500" 
              alt="Profile" 
              onError={(e) => {
                e.target.src = '/api/placeholder/400/500';
              }}
            />
          </ProfileImage>
          
          <AboutText>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About Me
            </Title>
            
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Passionate developer crafting digital experiences
            </Subtitle>
            
            <Description
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>
                Hello! I'm a passionate full-stack developer with over 3 years of experience 
                in creating exceptional digital experiences. I specialize in modern web 
                technologies including React, Node.js, and MongoDB, with a strong focus on 
                performance, accessibility, and user experience.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying up-to-date with 
                the latest industry trends. When I'm not coding, you'll find me exploring 
                new technologies, contributing to open-source projects, or sharing knowledge 
                with the developer community.
              </p>
            </Description>
            
            <PersonalInfo
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <InfoItem>
                <FaUser />
                <span>John Doe</span>
              </InfoItem>
              <InfoItem>
                <FaCalendarAlt />
                <span>25 Years Old</span>
              </InfoItem>
              <InfoItem>
                <FaMapMarkerAlt />
                <span>New York, USA</span>
              </InfoItem>
              <InfoItem>
                <FaGraduationCap />
                <span>Computer Science</span>
              </InfoItem>
            </PersonalInfo>
            
            <DownloadButton
              href="/resume.pdf"
              download
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Download Resume
            </DownloadButton>
          </AboutText>
        </AboutHero>

        <StatsSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            My Numbers
          </SectionTitle>
          
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </StatsSection>

        <TimelineSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            My Journey
          </SectionTitle>
          
          <Timeline>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                index={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TimelineContent>
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;