import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaAward, 
  FaHeart, 
  FaMusic, 
  FaCamera, 
  FaGamepad,
  FaDownload
} from 'react-icons/fa';

const AboutContainer = styled.div`
  padding: 80px 0;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 100px;
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
  font-size: 1.3rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const PersonalInfo = styled.section`
  margin-bottom: 100px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProfileImage = styled(motion.div)`
  text-align: center;
`;

const Avatar = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    font-size: 3rem;
  }
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #667eea;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

const AboutText = styled(motion.div)`
  h2 {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  .highlight {
    color: #667eea;
    font-weight: 600;
  }
`;

const ExperienceSection = styled.section`
  margin-bottom: 100px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  margin-bottom: 3rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #667eea;
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.side === 'left' ? 'flex-end' : 'flex-start'};
  padding: 20px 0;
  position: relative;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 70px;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 30px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    transform: translateX(-50%);
    border: 4px solid white;
    box-shadow: 0 0 0 4px #667eea;
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: calc(50% - 40px);
  position: relative;
  
  @media (max-width: 768px) {
    width: calc(100% - 40px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    ${props => props.side === 'left' ? 
      'border-left-color: white; right: -20px;' : 
      'border-right-color: white; left: -20px;'
    }
    
    @media (max-width: 768px) {
      border-right-color: white;
      border-left-color: transparent;
      left: -20px;
    }
  }
  
  .icon {
    font-size: 1.5rem;
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  .date {
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .company {
    color: #888;
    font-style: italic;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

const InterestsSection = styled.section`
  margin-bottom: 100px;
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const InterestCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
  
  .icon {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

const StatsSection = styled.section`
  background: white;
  padding: 4rem 2rem;
  border-radius: 20px;
  margin-top: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  .number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #667eea;
    display: block;
  }
  
  .label {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [interestsRef, interestsInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const experiences = [
    {
      type: 'work',
      icon: FaBriefcase,
      date: '2022 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies. Managing a team of 5 developers.',
      side: 'right'
    },
    {
      type: 'work',
      icon: FaBriefcase,
      date: '2020 - 2022',
      title: 'Full Stack Developer',
      company: 'Digital Agency Pro',
      description: 'Developed responsive web applications and e-commerce platforms. Collaborated with design teams to implement pixel-perfect UIs.',
      side: 'left'
    },
    {
      type: 'education',
      icon: FaGraduationCap,
      date: '2016 - 2020',
      title: 'Bachelor of Computer Science',
      company: 'University of Technology',
      description: 'Graduated Magna Cum Laude with focus on Software Engineering and Web Development.',
      side: 'right'
    },
    {
      type: 'achievement',
      icon: FaAward,
      date: '2021',
      title: 'Best Developer Award',
      company: 'Tech Conference 2021',
      description: 'Recognized for outstanding contribution to open source projects and community involvement.',
      side: 'left'
    }
  ];

  const interests = [
    {
      icon: FaMusic,
      title: 'Music Production',
      description: 'I love creating electronic music in my spare time and experimenting with different genres.'
    },
    {
      icon: FaCamera,
      title: 'Photography',
      description: 'Capturing moments and exploring the world through the lens of my camera.'
    },
    {
      icon: FaGamepad,
      title: 'Gaming',
      description: 'Passionate gamer who enjoys both indie games and AAA titles across various platforms.'
    },
    {
      icon: FaHeart,
      title: 'Volunteering',
      description: 'Teaching programming to underprivileged kids and contributing to community projects.'
    }
  ];

  return (
    <AboutContainer>
      <Container>
        <HeroSection ref={heroRef}>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            About Me
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get to know the person behind the code
          </Subtitle>
        </HeroSection>

        <PersonalInfo>
          <InfoGrid>
            <ProfileImage
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Avatar>JD</Avatar>
              <ResumeButton 
                href="/resume.pdf" 
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                Download Resume
              </ResumeButton>
            </ProfileImage>

            <AboutText
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2>Hello! I'm John Doe</h2>
              <p>
                I'm a <span className="highlight">passionate full-stack developer</span> with over 5 years 
                of experience creating digital experiences that make a difference. My journey in web 
                development started during college when I built my first website, and I've been 
                hooked ever since.
              </p>
              <p>
                I specialize in <span className="highlight">modern JavaScript frameworks</span> like 
                React and Vue.js, along with Node.js for backend development. I'm particularly 
                passionate about creating applications that are not only functional but also 
                provide exceptional user experiences.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing my knowledge through blog posts and mentoring. 
                I believe in continuous learning and staying updated with the latest industry trends.
              </p>
              <p>
                I'm always excited to work on challenging projects and collaborate with teams 
                that share the same passion for creating amazing digital products.
              </p>
            </AboutText>
          </InfoGrid>
          
          <StatsSection>
            <StatsGrid>
              <StatItem
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="number">50+</span>
                <span className="label">Projects Completed</span>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <span className="number">5+</span>
                <span className="label">Years Experience</span>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="number">30+</span>
                <span className="label">Happy Clients</span>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <span className="number">100+</span>
                <span className="label">GitHub Contributions</span>
              </StatItem>
            </StatsGrid>
          </StatsSection>
        </PersonalInfo>

        <ExperienceSection ref={experienceRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            My Journey
          </SectionTitle>
          
          <TimelineContainer>
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              return (
                <TimelineItem 
                  key={index} 
                  side={exp.side}
                  initial={{ opacity: 0, x: exp.side === 'left' ? -50 : 50 }}
                  animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <TimelineContent side={exp.side}>
                    <div className="icon">
                      <IconComponent />
                    </div>
                    <div className="date">{exp.date}</div>
                    <h3>{exp.title}</h3>
                    <div className="company">{exp.company}</div>
                    <p>{exp.description}</p>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </TimelineContainer>
        </ExperienceSection>

        <InterestsSection ref={interestsRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={interestsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            What I Love Doing
          </SectionTitle>
          
          <InterestsGrid>
            {interests.map((interest, index) => {
              const IconComponent = interest.icon;
              return (
                <InterestCard
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={interestsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="icon">
                    <IconComponent />
                  </div>
                  <h3>{interest.title}</h3>
                  <p>{interest.description}</p>
                </InterestCard>
              );
            })}
          </InterestsGrid>
        </InterestsSection>
      </Container>
    </AboutContainer>
  );
};

export default About;