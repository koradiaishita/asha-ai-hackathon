import './App.css'
import { ChatWidget } from './components/ChatWidget'
import { Link } from 'react-router-dom'
import ProjectIdeasAI from './pages/ProjectIdeasAI'
import InterviewReadyAI from './pages/InterviewReadyAI'
import ResumeAI from './pages/ResumeAI'
import SkillUpAI from './pages/SkillUpAI'
// Import Material UI icons
import HomeIcon from '@mui/icons-material/Home'
import DescriptionIcon from '@mui/icons-material/Description'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import GroupIcon from '@mui/icons-material/Group'
import SchoolIcon from '@mui/icons-material/School'
import EventIcon from '@mui/icons-material/Event'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import MenuIcon from '@mui/icons-material/Menu'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import AppsIcon from '@mui/icons-material/Apps'

function App() {
  return <HomePage />;
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
          <SearchIcon className="search-icon" fontSize="small" />
        </div>
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="nav-menu">
            <ul>
              <li className="nav-item">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <HomeIcon className="nav-icon" />
                  <span className="nav-text">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/resume-ai" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <DescriptionIcon className="nav-icon" />
                  <span className="nav-text">Resume AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/skillup-ai" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <BusinessCenterIcon className="nav-icon" />
                  <span className="nav-text">SkillUp AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/project-ideas-ai" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <FolderSpecialIcon className="nav-icon" />
                  <span className="nav-text">ProjectIdeas AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/interview-ready-ai" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <GroupIcon className="nav-icon" />
                  <span className="nav-text">InterviewReadyAI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <SchoolIcon className="nav-icon" />
                  <span className="nav-text">MentorMatch AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon className="nav-icon" />
                  <span className="nav-text">Events</span>
                </div>
              </li>
              <li className="nav-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ContactSupportIcon className="nav-icon" />
                  <span className="nav-text">Contact us</span>
                </div>
              </li>
            </ul>
            <div className="herkey-business">
              <button className="business-btn">
                <MenuIcon className="business-icon" />
                JobsForHer for Employers
              </button>
            </div>
            <div className="app-download">
              <img src="/google-play-badge.png" alt="Get it on Google Play" className="google-play" />
            </div>
            <div className="social-icons">
              <FacebookIcon className="social-icon" />
              <TwitterIcon className="social-icon" />
              <LinkedInIcon className="social-icon" />
              <InstagramIcon className="social-icon" />
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Work Mode Section */}
          <section className="work-mode-section">
            <div className="section-header">
              <h2>Discover opportunities by work mode</h2>
              <FilterListIcon className="filter-icon" />
            </div>
            <div className="work-mode-options">
              <div className="mode-card wfh">
                <HomeWorkIcon className="mode-icon" />
                <span className="mode-text">Work From Home</span>
              </div>
              <div className="mode-card hybrid">
                <WbSunnyIcon className="mode-icon" />
                <span className="mode-text">Hybrid</span>
              </div>
              <div className="mode-card part-time">
                <AccessTimeIcon className="mode-icon" />
                <span className="mode-text">Part Time</span>
              </div>
              <div className="mode-card full-time">
                <BusinessCenterIcon className="mode-icon" />
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
                <BookmarkBorderIcon className="bookmark-btn" />
                <button className="apply-btn">
                  <FlashOnIcon className="lightning-icon" />
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
                <BookmarkBorderIcon className="bookmark-btn" />
                <button className="apply-btn">
                  <FlashOnIcon className="lightning-icon" />
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