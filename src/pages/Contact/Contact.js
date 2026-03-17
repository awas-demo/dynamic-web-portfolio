import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaPaperPlane,
  FaSpinner
} from 'react-icons/fa';
import { api } from '../../utils/api';

const ContactContainer = styled.div`
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const InfoTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const InfoDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ContactDetails = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
  }
  
  .content {
    flex: 1;
    
    .label {
      color: #999;
      font-size: 0.9rem;
      margin-bottom: 4px;
    }
    
    .value {
      color: #333;
      font-weight: 600;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f8f9fa;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const FormDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &.half {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const Label = styled.label`
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  
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
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const MapSection = styled.section`
  margin-top: 4rem;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
`;

const MapTitle = styled(motion.h3)`
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
`;

const MapPlaceholder = styled.div`
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  text-align: center;
`;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [formRef, formInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'john.doe@example.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Address',
      value: 'New York, NY, USA'
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/johndoe',
      label: 'LinkedIn'
    },
    {
      icon: FaGithub,
      url: 'https://github.com/johndoe',
      label: 'GitHub'
    },
    {
      icon: FaTwitter,
      url: 'https://twitter.com/johndoe',
      label: 'Twitter'
    },
    {
      icon: FaEnvelope,
      url: 'mailto:john.doe@example.com',
      label: 'Email'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would call your API here
      // await api.post('/contact', data);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Container>
        <Header ref={headerRef}>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind? Let's work together to create something amazing!
          </Subtitle>
        </Header>

        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <InfoTitle>Let's Start a Conversation</InfoTitle>
            <InfoDescription>
              I'm always interested in hearing about new projects and opportunities. 
              Whether you're a company looking to hire, or you're just passionate about 
              technology and want to chat, I'd love to hear from you.
            </InfoDescription>

            <ContactDetails>
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <ContactItem
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="icon">
                      <IconComponent />
                    </div>
                    <div className="content">
                      <div className="label">{item.label}</div>
                      <div className="value">{item.value}</div>
                    </div>
                  </ContactItem>
                );
              })}
            </ContactDetails>

            <SocialLinks>
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <SocialLink
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent />
                  </SocialLink>
                );
              })}
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormTitle>Send Me a Message</FormTitle>
            <FormDescription>
              Fill out the form below and I'll get back to you as soon as possible.
            </FormDescription>

            <FormGroup className="half">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  type="text"
                  id="firstName"
                  className={errors.firstName ? 'error' : ''}
                  {...register('firstName', { 
                    required: 'First name is required',
                    minLength: { value: 2, message: 'First name must be at least 2 characters' }
                  })}
                />
                {errors.firstName && (
                  <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  type="text"
                  id="lastName"
                  className={errors.lastName ? 'error' : ''}
                  {...register('lastName', { 
                    required: 'Last name is required',
                    minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                  })}
                />
                {errors.lastName && (
                  <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                )}
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                className={errors.email ? 'error' : ''}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                type="text"
                id="subject"
                className={errors.subject ? 'error' : ''}
                {...register('subject', { 
                  required: 'Subject is required',
                  minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                })}
              />
              {errors.subject && (
                <ErrorMessage>{errors.subject.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                className={errors.message ? 'error' : ''}
                placeholder="Tell me about your project..."
                {...register('message', { 
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' }
                })}
              />
              {errors.message && (
                <ErrorMessage>{errors.message.message}</ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinning" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </SubmitButton>
          </ContactForm>
        </ContactContent>

        <MapSection>
          <MapTitle
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where to Find Me
          </MapTitle>
          <MapPlaceholder>
            <div>
              <FaMapMarkerAlt style={{ fontSize: '3rem', marginBottom: '1rem' }} />
              <div>New York, NY, USA</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
                Available for remote work worldwide
              </div>
            </div>
          </MapPlaceholder>
        </MapSection>
      </Container>
    </ContactContainer>
  );
};

export default Contact;