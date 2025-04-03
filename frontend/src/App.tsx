import './App.css'
import { ChatWidget } from './components/ChatWidget'

function App() {
  return (
    <div className="app">
      <div className="wave"></div>
      <div className="hero">
        <h1>Welcome to ASHA AI</h1>
        <p>
          Empowering women in their professional journeys through intelligent conversations
          and personalized guidance. Join us in shaping the future of career development
          with AI-driven solutions.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="cta-button">Get Started</button>
          <button className="cta-button">Learn More</button>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Smart Career Guidance</h3>
          <p>Get personalized career recommendations and insights powered by advanced AI technology.</p>
        </div>
        <div className="feature-card">
          <h3>Job Matching</h3>
          <p>Connect with opportunities that align perfectly with your skills and aspirations.</p>
        </div>
        <div className="feature-card">
          <h3>Mentorship Programs</h3>
          <p>Access exclusive mentorship opportunities and guidance from industry leaders.</p>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}

export default App
