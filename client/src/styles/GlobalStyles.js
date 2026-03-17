import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --text-primary: #333333;
    --text-secondary: #666666;
    --text-light: #ffffff;
    --background-light: #ffffff;
    --background-dark: #1a1a1a;
    --shadow-light: rgba(0, 0, 0, 0.1);
    --shadow-medium: rgba(0, 0, 0, 0.2);
    --shadow-dark: rgba(0, 0, 0, 0.3);
    --border-radius: 12px;
    --transition: all 0.3s ease;
    --max-width: 1200px;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: var(--text-primary);
    overflow-x: hidden;
  }

  code {
    font-family: 'Fira Code', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    margin-bottom: 1em;
    font-size: clamp(1rem, 2vw, 1.1rem);
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition);
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    transition: var(--transition);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul {
    list-style: none;
  }

  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-padding {
    padding: 4rem 0;
  }

  .glass-effect {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .gradient-text {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .btn-primary {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 12px 30px;
    border-radius: var(--border-radius);
    font-weight: 500;
    transition: var(--transition);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  .btn-secondary {
    background: transparent;
    color: var(--primary-color);
    padding: 12px 30px;
    border: 2px solid var(--primary-color);
    border-radius: var(--border-radius);
    font-weight: 500;
    transition: var(--transition);
    
    &:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-2px);
    }
  }

  .floating-animation {
    animation: floating 6s ease-in-out infinite;
  }

  @keyframes floating {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
    
    .section-padding {
      padding: 2rem 0;
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-light);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
  }
`;

export default GlobalStyles;