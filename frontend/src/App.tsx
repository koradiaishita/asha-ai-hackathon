import './App.css'
import { ChatWidget } from './components/ChatWidget'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import ResumeAI from './pages/ResumeAI'
import UpskillNavigator from './pages/UpskillNavigator'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume-ai" element={<ResumeAI />} />
        <Route path="/upskill-navigator" element={<UpskillNavigator />} />
      </Routes>
    </Router>
  )
}

// HomePage component for the main landing page
function HomePage() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="herkey-logo">JobsForHer</span>
          <span className="turns-ten">empowering women</span>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search jobs, skills or career opportunities" 
            className="search-input" 
          />
        </div>
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="nav-menu">
            <ul>
              <li className="nav-item">
                <Link to="/resume-ai" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="nav-icon mic-icon"></span>
                  <span className="nav-text">Resume AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/upskill-navigator" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="nav-icon briefcase-icon"></span>
                  <span className="nav-text">Upskill Navigator</span>
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-icon building-icon"></span>
                <span className="nav-text">Companies</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon group-icon"></span>
                <span className="nav-text">Community</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon post-icon"></span>
                <span className="nav-text">Career Resources</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon network-icon"></span>
                <span className="nav-text">Mentorship</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon calendar-icon"></span>
                <span className="nav-text">Events</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon grid-icon"></span>
                <span className="nav-text">More</span>
              </li>
            </ul>
            <div className="herkey-business">
              <button className="business-btn">
                <span className="business-icon">☰</span>
                JobsForHer for Employers
              </button>
            </div>
            <div className="app-download">
              <img src="/google-play-badge.png" alt="Get it on Google Play" className="google-play" />
            </div>
            <div className="social-icons">
              <span className="social-icon"></span>
              <span className="social-icon"></span>
              <span className="social-icon"></span>
              <span className="social-icon"></span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Work Mode Section */}
          <section className="work-mode-section">
            <div className="section-header">
              <h2>Discover opportunities by work mode</h2>
              <span className="filter-icon"></span>
            </div>
            <div className="work-mode-options">
              <div className="mode-card wfh">
                <span className="mode-icon home-icon"></span>
                <span className="mode-text">Work From Home</span>
              </div>
              <div className="mode-card hybrid">
                <span className="mode-icon hybrid-icon"></span>
                <span className="mode-text">Hybrid</span>
              </div>
              <div className="mode-card part-time">
                <span className="mode-icon clock-icon"></span>
                <span className="mode-text">Part Time</span>
              </div>
              <div className="mode-card full-time">
                <span className="mode-icon building-icon"></span>
                <span className="mode-text">Full Time</span>
              </div>
            </div>
          </section>

          {/* Featured Jobs Section */}
          <section className="featured-jobs">
            <h2>Women-friendly Jobs</h2>
            
            {/* Job Card 1 */}
            <div className="job-card">
              <div className="company-logo">
                <span className="herkey-job-logo"></span>
              </div>
              <div className="job-info">
                <h3 className="job-title">Senior Project Manager</h3>
                <h4 className="company-name">Tech Innovations</h4>
                <p className="job-location">Bangalore | Remote | 5-8 Yr</p>
                <p className="job-tags">Project Management • Team Leadership +3</p>
                <span className="newly-added">Returnship Friendly</span>
              </div>
              <div className="job-actions">
                <button className="bookmark-btn"></button>
                <button className="apply-btn">
                  <span className="lightning-icon"></span>
                  Easy Apply
                </button>
              </div>
            </div>
            
            {/* Job Card 2 */}
            <div className="job-card">
              <div className="company-logo">
                <span className="herkey-job-logo"></span>
              </div>
              <div className="job-info">
                <h3 className="job-title">UX Design Lead</h3>
                <h4 className="company-name">Creative Solutions</h4>
                <p className="job-location">Mumbai | Hybrid | 3-6 Yr</p>
                <p className="job-tags">UI/UX • Product Design +4</p>
                <span className="newly-added">Women Preferred</span>
              </div>
              <div className="job-actions">
                <button className="bookmark-btn"></button>
                <button className="apply-btn">
                  <span className="lightning-icon"></span>
                  Easy Apply
                </button>
              </div>
            </div>
          </section>

          {/* Asha AI Description Section */}
          <section className="featured-jobs">
            <h2>Meet Asha - Your Career Assistant</h2>
            <div className="job-card" style={{ padding: "25px" }}>
              <div className="job-info">
                <h3 className="job-title">Asha AI Chatbot</h3>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                  Asha is an AI-powered virtual assistant designed to guide women in their career journey. 
                  Ask about jobs, events, mentorship programs, and more!
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                  <span className="newly-added" style={{ background: "var(--light-purple)" }}>Contextual Awareness</span>
                  <span className="newly-added" style={{ background: "var(--primary-light)" }}>Real-time Information</span>
                  <span className="newly-added" style={{ background: "#e8f5e9" }}>Bias Prevention</span>
                  <span className="newly-added" style={{ background: "#fff3e0" }}>Privacy Focused</span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--purple-text)", fontWeight: "500" }}>
                  Click the chat icon in the bottom right corner to start a conversation with Asha!
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Complete your career profile!</h2>
            <div className="profile-image">
              {/* Profile completion illustration */}
            </div>
            <button className="update-btn">Update now</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Returning to work after a career break?</h2>
            <p className="card-subtitle">
              JobsForHer's Returnship Program helps women rebuild confidence and skills for a successful career comeback.
            </p>
            <p className="scholarship-text">Limited spots available!</p>
            <div className="card-image">
              {/* Career break program image */}
            </div>
          </div>
        </aside>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App