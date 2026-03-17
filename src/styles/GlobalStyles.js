import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #5a6fd8;
  }

  /* Selection styles */
  ::selection {
    background: rgba(102, 126, 234, 0.2);
    color: inherit;
  }

  ::-moz-selection {
    background: rgba(102, 126, 234, 0.2);
    color: inherit;
  }

  /* Focus styles */
  :focus {
    outline: 2px solid rgba(102, 126, 234, 0.5);
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Link reset */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* List reset */
  ul, ol {
    list-style: none;
  }

  /* Image reset */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Form element reset */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Animations */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideLeft {
    from {
      transform: translateX(30px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideRight {
    from {
      transform: translateX(-30px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  /* Utility classes */
  .spinning {
    animation: spin 1s linear infinite;
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  .slide-up {
    animation: slideUp 0.5s ease-out;
  }

  .slide-down {
    animation: slideDown 0.5s ease-out;
  }

  .slide-left {
    animation: slideLeft 0.5s ease-out;
  }

  .slide-right {
    animation: slideRight 0.5s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  .bounce {
    animation: bounce 2s infinite;
  }

  /* Text utilities */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Spacing utilities */
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }

  .ml-1 { margin-left: 0.5rem; }
  .ml-2 { margin-left: 1rem; }
  .ml-3 { margin-left: 1.5rem; }
  .ml-4 { margin-left: 2rem; }

  .mr-1 { margin-right: 0.5rem; }
  .mr-2 { margin-right: 1rem; }
  .mr-3 { margin-right: 1.5rem; }
  .mr-4 { margin-right: 2rem; }

  .p-1 { padding: 0.5rem; }
  .p-2 { padding: 1rem; }
  .p-3 { padding: 1.5rem; }
  .p-4 { padding: 2rem; }

  /* Display utilities */
  .d-none { display: none; }
  .d-block { display: block; }
  .d-flex { display: flex; }
  .d-inline { display: inline; }
  .d-inline-block { display: inline-block; }

  /* Flexbox utilities */
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  /* Color utilities */
  .text-primary { color: #667eea; }
  .text-secondary { color: #6c757d; }
  .text-success { color: #28a745; }
  .text-danger { color: #dc3545; }
  .text-warning { color: #ffc107; }
  .text-info { color: #17a2b8; }
  .text-light { color: #f8f9fa; }
  .text-dark { color: #343a40; }
  .text-muted { color: #6c757d; }

  /* Background utilities */
  .bg-primary { background-color: #667eea; }
  .bg-secondary { background-color: #6c757d; }
  .bg-success { background-color: #28a745; }
  .bg-danger { background-color: #dc3545; }
  .bg-warning { background-color: #ffc107; }
  .bg-info { background-color: #17a2b8; }
  .bg-light { background-color: #f8f9fa; }
  .bg-dark { background-color: #343a40; }
  .bg-white { background-color: #ffffff; }

  /* Shadow utilities */
  .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }

  .shadow {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .shadow-lg {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  }

  .shadow-none {
    box-shadow: none;
  }

  /* Border utilities */
  .border { border: 1px solid #dee2e6; }
  .border-top { border-top: 1px solid #dee2e6; }
  .border-right { border-right: 1px solid #dee2e6; }
  .border-bottom { border-bottom: 1px solid #dee2e6; }
  .border-left { border-left: 1px solid #dee2e6; }
  .border-0 { border: 0; }

  .rounded { border-radius: 0.25rem; }
  .rounded-sm { border-radius: 0.125rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-xl { border-radius: 1rem; }
  .rounded-circle { border-radius: 50%; }

  /* Position utilities */
  .position-relative { position: relative; }
  .position-absolute { position: absolute; }
  .position-fixed { position: fixed; }
  .position-sticky { position: sticky; }

  /* Responsive design breakpoints */
  @media (max-width: 576px) {
    .d-sm-none { display: none; }
    .d-sm-block { display: block; }
    .d-sm-flex { display: flex; }
    .text-sm-center { text-align: center; }
  }

  @media (max-width: 768px) {
    .d-md-none { display: none; }
    .d-md-block { display: block; }
    .d-md-flex { display: flex; }
    .text-md-center { text-align: center; }
  }

  @media (max-width: 992px) {
    .d-lg-none { display: none; }
    .d-lg-block { display: block; }
    .d-lg-flex { display: flex; }
    .text-lg-center { text-align: center; }
  }

  @media (max-width: 1200px) {
    .d-xl-none { display: none; }
    .d-xl-block { display: block; }
    .d-xl-flex { display: flex; }
    .text-xl-center { text-align: center; }
  }

  /* Print styles */
  @media print {
    .d-print-none {
      display: none !important;
    }
    
    .d-print-block {
      display: block !important;
    }
    
    .d-print-inline {
      display: inline !important;
    }
    
    .d-print-inline-block {
      display: inline-block !important;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :root {
      --primary-color: #000080;
      --secondary-color: #333333;
      --accent-color: #800080;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Dark mode support (for future implementation) */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg-color: #1a1a1a;
      --text-color: #ffffff;
      --card-bg: #2d2d2d;
    }
  }
`;

export default GlobalStyles;