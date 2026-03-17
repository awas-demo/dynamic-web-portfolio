import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(102, 126, 234, 0.1);
  border-left: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: var(--text-light);
  font-size: 1rem;
  font-weight: 500;
`;

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <SpinnerContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;