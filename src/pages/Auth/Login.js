import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaSpinner, FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const AuthCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #e74c3c;
    background: rgba(231, 76, 60, 0.05);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #999;
  z-index: 2;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  
  &:hover {
    color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ForgotPassword = styled(Link)`
  text-align: center;
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #5a6fd8;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e9ecef;
  }
  
  span {
    padding: 0 1rem;
    color: #999;
    font-size: 0.9rem;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      color: #5a6fd8;
    }
  }
`;

const DemoCredentials = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #667eea;
  
  h4 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  p {
    color: #666;
    font-size: 0.8rem;
    margin: 0.25rem 0;
  }
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setValue('email', 'demo@example.com');
    setValue('password', 'demo123');
  };

  return (
    <AuthContainer>
      <AuthCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Logo>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </Logo>

        <DemoCredentials
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4>Demo Account</h4>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
          <button 
            type="button" 
            onClick={fillDemoCredentials}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginTop: '0.5rem'
            }}
          >
            Use Demo Credentials
          </button>
        </DemoCredentials>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="email"
                id="email"
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </InputWrapper>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <ForgotPassword to="/forgot-password">
            Forgot your password?
          </ForgotPassword>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinning" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </SubmitButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SignUpLink>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </SignUpLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;