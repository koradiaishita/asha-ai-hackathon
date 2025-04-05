import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ResumeAI from './pages/ResumeAI.tsx'

// Simple client-side routing based on the URL path
const renderApp = () => {
  const path = window.location.pathname;
  const root = createRoot(document.getElementById('root')!);
  
  if (path === '/resume-ai') {
    root.render(
      <StrictMode>
        <ResumeAI />
      </StrictMode>
    );
  } else {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

// Initial render
renderApp();

// Handle browser back/forward navigation
window.addEventListener('popstate', renderApp);
