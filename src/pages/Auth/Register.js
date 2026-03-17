import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { 
  FaEye, 
  FaEyeSlash, 
  FaSpinner, 
  FaUser, 
  FaLock, 
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
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
  max-width: 500px;
  
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  
  &.success {
    border-color: #27ae60;
    background: rgba(39, 174, 96, 0.05);
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

const ValidationIcon = styled.div`
  position: absolute;
  right: 3rem;
  color: ${props => props.valid ? '#27ae60' : '#e74c3c'};
  z-index: 2;
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
`;

const StrengthMeter = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 0.5rem;
`;

const StrengthBar = styled.div`
  flex: 1;
  height: 4px;
  background: ${props => props.active ? props.color : '#e9ecef'};
  border-radius: 2px;
  transition: background 0.3s ease;
`;

const StrengthText = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color};
  font-weight: 600;
`;

const PasswordCriteria = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

const CriteriaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.met ? '#27ae60' : '#e74c3c'};
  margin: 0.25rem 0;
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

const SignInLink = styled.div`
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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 2) return '#e74c3c';
    if (strength < 4) return '#f39c12';
    return '#27ae60';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  React.useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const passwordCriteria = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains number', met: /[0-9]/.test(password) },
    { text: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      });
      
      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Logo>
          <h1>Create Account</h1>
          <p>Join us and start your journey</p>
        </Logo>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  id="firstName"
                  className={errors.firstName ? 'error' : ''}
                  placeholder="John"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters'
                    }
                  })}
                />
              </InputWrapper>
              {errors.firstName && (
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  id="lastName"
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Doe"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters'
                    }
                  })}
                />
              </InputWrapper>
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                id="email"
                className={errors.email ? 'error' : ''}
                placeholder="john@example.com"
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
                className={errors.password ? 'error' : password && passwordStrength >= 3 ? 'success' : ''}
                placeholder="Create a strong password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  validate: (value) => {
                    if (calculatePasswordStrength(value) < 3) {
                      return 'Password is too weak';
                    }
                    return true;
                  }
                })}
              />
              {password && (
                <ValidationIcon valid={passwordStrength >= 3}>
                  {passwordStrength >= 3 ? <FaCheckCircle /> : <FaTimesCircle />}
                </ValidationIcon>
              )}
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
            
            {password && (
              <PasswordStrength>
                <StrengthMeter>
                  {[...Array(5)].map((_, index) => (
                    <StrengthBar
                      key={index}
                      active={index < passwordStrength}
                      color={getPasswordStrengthColor(passwordStrength)}
                    />
                  ))}
                </StrengthMeter>
                <StrengthText color={getPasswordStrengthColor(passwordStrength)}>
                  {getPasswordStrengthText(passwordStrength)}
                </StrengthText>
                <PasswordCriteria>
                  {passwordCriteria.map((criteria, index) => (
                    <CriteriaItem key={index} met={criteria.met}>
                      {criteria.met ? <FaCheckCircle /> : <FaTimesCircle />}
                      {criteria.text}
                    </CriteriaItem>
                  ))}
                </PasswordCriteria>
              </PasswordStrength>
            )}
            
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className={errors.confirmPassword ? 'error' : confirmPassword && confirmPassword === password ? 'success' : ''}
                placeholder="Confirm your password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => {
                    if (value !== password) {
                      return 'Passwords do not match';
                    }
                    return true;
                  }
                })}
              />
              {confirmPassword && (
                <ValidationIcon valid={confirmPassword === password}>
                  {confirmPassword === password ? <FaCheckCircle /> : <FaTimesCircle />}
                </ValidationIcon>
              )}
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting || passwordStrength < 3}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinning" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </SubmitButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SignInLink>
          Already have an account? <Link to="/login">Sign in here</Link>
        </SignInLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register;