import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import { 
  FaReact, 
  FaVuejs, 
  FaNodeJs, 
  FaPython, 
  FaDatabase, 
  FaGitAlt,
  FaAws,
  FaDocker,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaFigma,
  FaPhp
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql, 
  SiExpress, 
  SiGraphql,
  SiRedis,
  SiKubernetes,
  SiTailwindcss,
  SiNextdotjs,
  SiNestjs
} from 'react-icons/si';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const SkillsContainer = styled.div`
  padding: 80px 0;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: 1.2rem;
  color: #666;
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
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .category-icon {
    font-size: 1.8rem;
    color: #667eea;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  padding: 8px 16px;
  border-radius: 25px;
  color: #666;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
  
  .skill-icon {
    font-size: 1.2rem;
  }
`;

const ChartsSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  margin-bottom: 3rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  h4 {
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.3rem;
  }
`;

const ProgressSection = styled.section`
  margin-bottom: 4rem;
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProgressCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1rem;
  
  .skill-info {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .skill-icon {
      font-size: 1.5rem;
      color: #667eea;
    }
    
    .skill-name {
      font-weight: 600;
      color: #333;
    }
  }
  
  .skill-level {
    color: #667eea;
    font-weight: 600;
  }
`;

const ProgressBar = styled.div`
  background: #f0f0f0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
`;

const CertificationsSection = styled.section`
  margin-bottom: 4rem;
`;

const CertificationsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const CertificationCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .cert-icon {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  h4 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .issuer {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .date {
    color: #999;
    font-size: 0.8rem;
  }
`;

const Skills = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [chartsRef, chartsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [progressRef, progressInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const skillCategories = [
    {
      title: 'Frontend',
      icon: FaReact,
      skills: [
        { name: 'React', icon: FaReact },
        { name: 'Vue.js', icon: FaVuejs },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'JavaScript', icon: FaJsSquare },
        { name: 'HTML5', icon: FaHtml5 },
        { name: 'CSS3', icon: FaCss3Alt },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Next.js', icon: SiNextdotjs }
      ]
    },
    {
      title: 'Backend',
      icon: FaNodeJs,
      skills: [
        { name: 'Node.js', icon: FaNodeJs },
        { name: 'Express.js', icon: SiExpress },
        { name: 'NestJS', icon: SiNestjs },
        { name: 'Python', icon: FaPython },
        { name: 'PHP', icon: FaPhp },
        { name: 'GraphQL', icon: SiGraphql }
      ]
    },
    {
      title: 'Database',
      icon: FaDatabase,
      skills: [
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Redis', icon: SiRedis },
        { name: 'MySQL', icon: FaDatabase }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: FaAws,
      skills: [
        { name: 'AWS', icon: FaAws },
        { name: 'Docker', icon: FaDocker },
        { name: 'Kubernetes', icon: SiKubernetes },
        { name: 'Git', icon: FaGitAlt },
        { name: 'Figma', icon: FaFigma }
      ]
    }
  ];

  const skillLevels = [
    { name: 'React', icon: FaReact, level: 95 },
    { name: 'Node.js', icon: FaNodeJs, level: 90 },
    { name: 'TypeScript', icon: SiTypescript, level: 85 },
    { name: 'MongoDB', icon: SiMongodb, level: 88 },
    { name: 'AWS', icon: FaAws, level: 75 },
    { name: 'Python', icon: FaPython, level: 80 },
    { name: 'Vue.js', icon: FaVuejs, level: 82 },
    { name: 'Docker', icon: FaDocker, level: 70 }
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: FaAws
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022',
      icon: FaReact
    },
    {
      name: 'MongoDB Associate Developer',
      issuer: 'MongoDB University',
      date: '2022',
      icon: SiMongodb
    },
    {
      name: 'Node.js Application Developer',
      issuer: 'OpenJS Foundation',
      date: '2021',
      icon: FaNodeJs
    }
  ];

  // Chart data
  const barChartData = {
    labels: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Python'],
    datasets: [
      {
        label: 'Skill Level (%)',
        data: [95, 90, 85, 88, 75, 80],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(241, 196, 15, 0.8)',
          'rgba(231, 76, 60, 0.8)'
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(241, 196, 15, 1)',
          'rgba(231, 76, 60, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const doughnutData = {
    labels: ['Frontend', 'Backend', 'Database', 'DevOps'],
    datasets: [
      {
        data: [40, 30, 15, 15],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(46, 204, 113, 0.8)'
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)'
        ],
        borderWidth: 2
      }
    ]
  };

  const radarData = {
    labels: ['Problem Solving', 'Teamwork', 'Communication', 'Leadership', 'Creativity', 'Adaptability'],
    datasets: [
      {
        label: 'Soft Skills',
        data: [90, 85, 88, 75, 82, 92],
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <SkillsContainer>
      <Container>
        <Header ref={headerRef}>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            My Skills
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A comprehensive overview of my technical skills and expertise
          </Subtitle>
        </Header>

        <SkillsGrid>
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <SkillCategory
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3>
                  <CategoryIcon className="category-icon" />
                  {category.title}
                </h3>
                <SkillsList>
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <SkillItem
                        key={skillIndex}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <SkillIcon className="skill-icon" />
                        {skill.name}
                      </SkillItem>
                    );
                  })}
                </SkillsList>
              </SkillCategory>
            );
          })}
        </SkillsGrid>

        <ChartsSection ref={chartsRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={chartsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Skills Visualization
          </SectionTitle>
          
          <ChartsGrid>
            <ChartCard
              initial={{ opacity: 0, x: -50 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4>Technical Skills Proficiency</h4>
              <div style={{ height: '300px' }}>
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </ChartCard>

            <ChartCard
              initial={{ opacity: 0, x: 50 }}
              animate={chartsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4>Skill Distribution</h4>
              <div style={{ height: '300px' }}>
                <Doughnut data={doughnutData} options={chartOptions} />
              </div>
            </ChartCard>

            <ChartCard
              initial={{ opacity: 0, y: 50 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ gridColumn: 'span 2' }}
            >
              <h4>Soft Skills Assessment</h4>
              <div style={{ height: '400px' }}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </ChartCard>
          </ChartsGrid>
        </ChartsSection>

        <ProgressSection ref={progressRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={progressInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Skill Levels
          </SectionTitle>
          
          <ProgressGrid>
            {skillLevels.map((skill, index) => {
              const SkillIcon = skill.icon;
              return (
                <ProgressCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={progressInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <ProgressHeader>
                    <div className="skill-info">
                      <SkillIcon className="skill-icon" />
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-level">{skill.level}%</span>
                  </ProgressHeader>
                  <ProgressBar>
                    <ProgressFill
                      initial={{ width: 0 }}
                      animate={progressInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                    />
                  </ProgressBar>
                </ProgressCard>
              );
            })}
          </ProgressGrid>
        </ProgressSection>

        <CertificationsSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={progressInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Certifications & Achievements
          </SectionTitle>
          
          <CertificationsList>
            {certifications.map((cert, index) => {
              const CertIcon = cert.icon;
              return (
                <CertificationCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={progressInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <CertIcon className="cert-icon" />
                  <h4>{cert.name}</h4>
                  <div className="issuer">{cert.issuer}</div>
                  <div className="date">{cert.date}</div>
                </CertificationCard>
              );
            })}
          </CertificationsList>
        </CertificationsSection>
      </Container>
    </SkillsContainer>
  );
};

export default Skills;