import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaGitAlt, 
  FaAws,
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiMongodb, 
  SiGraphql, 
  SiDocker,
  SiKubernetes,
  SiRedis
} from 'react-icons/si';
import { skillsAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const SkillsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const SkillsContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--text-light);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryTitle = styled.h3`
  color: var(--text-light);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .icon {
    font-size: 1.8rem;
    color: var(--primary-color);
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SkillInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  
  .skill-icon {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
  
  .skill-name {
    color: var(--text-light);
    font-weight: 500;
  }
`;

const SkillLevel = styled.div`
  color: var(--primary-color);
  font-weight: 600;
  min-width: 40px;
  text-align: right;
`;

const SkillBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border-radius: 4px;
  width: ${props => props.level}%;
`;

const ChartsSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: var(--text-light);
  margin-bottom: 3rem;
  font-size: clamp(2rem, 4vw, 3rem);
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  h3 {
    color: var(--text-light);
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }
`;

const CertificationsSection = styled.section``;

const CertificationsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CertificationCard = styled(motion.div)`
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

const CertificationTitle = styled.h4`
  color: var(--text-light);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const CertificationIssuer = styled.p`
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CertificationDate = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to load skills. Please try again later.');
      // Set mock data for demonstration
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  // Mock skills data
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <FaReact className="icon" />,
      skills: [
        { name: 'React', icon: <FaReact className="skill-icon" />, level: 95 },
        { name: 'TypeScript', icon: <SiTypescript className="skill-icon" />, level: 90 },
        { name: 'JavaScript', icon: <FaJs className="skill-icon" />, level: 95 },
        { name: 'HTML5', icon: <FaHtml5 className="skill-icon" />, level: 98 },
        { name: 'CSS3', icon: <FaCss3Alt className="skill-icon" />, level: 90 }
      ]
    },
    {
      title: 'Backend Development',
      icon: <FaNodeJs className="icon" />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs className="skill-icon" />, level: 90 },
        { name: 'Python', icon: <FaPython className="skill-icon" />, level: 85 },
        { name: 'GraphQL', icon: <SiGraphql className="skill-icon" />, level: 80 },
        { name: 'MongoDB', icon: <SiMongodb className="skill-icon" />, level: 88 },
        { name: 'Redis', icon: <SiRedis className="skill-icon" />, level: 75 }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: <FaAws className="icon" />,
      skills: [
        { name: 'AWS', icon: <FaAws className="skill-icon" />, level: 80 },
        { name: 'Docker', icon: <SiDocker className="skill-icon" />, level: 85 },
        { name: 'Kubernetes', icon: <SiKubernetes className="skill-icon" />, level: 70 },
        { name: 'Git', icon: <FaGitAlt className="skill-icon" />, level: 95 }
      ]
    }
  ];

  // Chart data
  const barChartData = {
    labels: ['Frontend', 'Backend', 'DevOps', 'Database', 'Mobile'],
    datasets: [
      {
        label: 'Skill Level',
        data: [95, 88, 80, 85, 75],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(240, 147, 251, 0.8)',
          'rgba(102, 126, 234, 0.6)',
          'rgba(118, 75, 162, 0.6)',
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(240, 147, 251, 1)',
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const radarChartData = {
    labels: ['Problem Solving', 'Communication', 'Leadership', 'Creativity', 'Adaptability', 'Time Management'],
    datasets: [
      {
        label: 'Soft Skills',
        data: [90, 85, 80, 88, 92, 87],
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(118, 75, 162, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(118, 75, 162, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          backdropColor: 'transparent',
        },
      },
    },
  };

  const certifications = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2024'
    },
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023'
    },
    {
      title: 'Node.js Certification',
      issuer: 'OpenJS Foundation',
      date: '2023'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      date: '2022'
    }
  ];

  if (loading) {
    return (
      <SkillsContainer>
        <SkillsContent>
          <LoadingSpinner text="Loading skills..." />
        </SkillsContent>
      </SkillsContainer>
    );
  }

  return (
    <SkillsContainer>
      <SkillsContent>
        <Header>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Skills & Expertise
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A comprehensive overview of my technical skills, tools, and expertise 
            gained through years of development experience.
          </Subtitle>
        </Header>

        <SkillsGrid>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <CategoryTitle>
                {category.icon}
                {category.title}
              </CategoryTitle>
              
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                  >
                    <SkillItem>
                      <SkillInfo>
                        {skill.icon}
                        <span className="skill-name">{skill.name}</span>
                      </SkillInfo>
                      <SkillLevel>{skill.level}%</SkillLevel>
                    </SkillItem>
                    <SkillBar>
                      <SkillProgress
                        level={skill.level}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.5 }}
                      />
                    </SkillBar>
                  </motion.div>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>

        <ChartsSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills Overview
          </SectionTitle>
          
          <ChartsGrid>
            <ChartContainer
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Technical Skills</h3>
              <div style={{ height: '300px' }}>
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </ChartContainer>

            <ChartContainer
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Soft Skills</h3>
              <div style={{ height: '300px' }}>
                <Radar data={radarChartData} options={radarOptions} />
              </div>
            </ChartContainer>
          </ChartsGrid>
        </ChartsSection>

        <CertificationsSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Certifications
          </SectionTitle>
          
          <CertificationsList>
            {certifications.map((cert, index) => (
              <CertificationCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <CertificationTitle>{cert.title}</CertificationTitle>
                <CertificationIssuer>{cert.issuer}</CertificationIssuer>
                <CertificationDate>{cert.date}</CertificationDate>
              </CertificationCard>
            ))}
          </CertificationsList>
        </CertificationsSection>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default Skills;