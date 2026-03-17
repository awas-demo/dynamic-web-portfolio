import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: var(--bg-dark);
  color: var(--text-light);
  padding: 60px 0 20px;
  margin-top: 80px;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 30px;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    color: var(--gray-300);
    line-height: 1.6;
    margin: 0;
  }
`;

export const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-light);
`;

export const FooterLink = styled.a`
  color: var(--gray-300);
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    color: var(--primary-light);
    transform: translateX(4px);
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  border-radius: 50%;
  text-decoration: none;
  transition: all var(--transition-normal);
  font-size: 18px;

  &:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 40px;
  padding-top: 20px;
`;

export const Copyright = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  color: var(--gray-400);
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;