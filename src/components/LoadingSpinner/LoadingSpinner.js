import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'large' ? '60px' : '20px'};
`;

const Spinner = styled(motion.div)`
  width: ${props => 
    props.size === 'large' ? '60px' : 
    props.size === 'medium' ? '40px' : 
    '20px'
  };
  height: ${props => 
    props.size === 'large' ? '60px' : 
    props.size === 'medium' ? '40px' : 
    '20px'
  };
  border: ${props => 
    props.size === 'large' ? '4px' : 
    props.size === 'medium' ? '3px' : 
    '2px'
  } solid var(--gray-200);
  border-top: ${props => 
    props.size === 'large' ? '4px' : 
    props.size === 'medium' ? '3px' : 
    '2px'
  } solid var(--primary-color);
  border-radius: 50%;
`;

const LoadingText = styled.p`
  margin-top: 16px;
  color: var(--text-secondary);
  font-size: ${props => 
    props.size === 'large' ? '18px' : 
    props.size === 'medium' ? '16px' : 
    '14px'
  };
`;

const LoadingSpinner = ({ size = 'medium', text, className }) => {
  return (
    <SpinnerContainer size={size} className={className}>
      <div>
        <Spinner
          size={size}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        {text && <LoadingText size={size}>{text}</LoadingText>}
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;