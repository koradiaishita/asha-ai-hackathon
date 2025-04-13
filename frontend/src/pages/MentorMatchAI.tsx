import React, { useState, useRef } from 'react';
import { mentorsData } from '../data/jobsData';
import { ChatWidget } from '../components/ChatWidget';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './MentorMatchAI.css';

function MentorMatchAI() {
  // State for mentor functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [showMentorRequest, setShowMentorRequest] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookmarkedMentors, setBookmarkedMentors] = useState<number[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [message, setMessage] = useState('');
  const requestFormRef = useRef<HTMLDivElement>(null);

  // Add a navigation handler
  const navigate = useNavigate();
  
  const navigateToHome = () => {
    navigate('/');
  };
  
  // Navigate to specific pages using React Router
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Filter mentors based on search and expertise
  const filteredMentors = mentorsData.filter(mentor => {
    const matchesSearch = searchTerm === '' || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === null || 
      mentor.expertise.some(exp => exp.toLowerCase().includes(selectedExpertise.toLowerCase()));

    const showsBookmarked = !showBookmarked || bookmarkedMentors.includes(mentor.id);
    
    return matchesSearch && matchesExpertise && showsBookmarked;
  });

  // Handle bookmark toggling
  const handleToggleBookmark = (mentorId: number) => {
    setBookmarkedMentors(prev => {
      if (prev.includes(mentorId)) {
        return prev.filter(id => id !== mentorId);
      } else {
        return [...prev, mentorId];
      }
    });
  };

  // Handle mentor request
  const handleRequestMentor = (mentor: any) => {
    setSelectedMentor(mentor);
    setShowMentorRequest(true);
    setTimeout(() => {
      requestFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle submitting mentor request
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Request sent to ${selectedMentor.name}! They will contact you soon to schedule your first session.`);
    setShowMentorRequest(false);
    setMessage('');
  };

  // Find my match functionality
  const handleFindMatch = () => {
    alert("Based on your profile and career goals, we've identified 3 potential mentors who would be a great match! Check your email for our detailed recommendations.");
  };

  // Become a mentor functionality
  const handleBecomeMentor = () => {
    navigateTo('/become-mentor');
  };

  return (
    <div className="mentor-match-container">
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
        <button onClick={navigateToHome} style={{ marginRight: "15px", background: "transparent", border: "none", cursor: "pointer", fontSize: "20px" }}>
          ← Home
        </button>
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="nav-menu">
            <ul>
              <li className="nav-item" onClick={() => navigateTo('/resume-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📄</span>
                </span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item" onClick={() => navigateTo('/skillup-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📚</span>
                </span>
                <span className="nav-text">SkillUp AI</span>
              </li>
              <li className="nav-item" onClick={() => navigateTo('/project-ideas-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📂</span>
                </span>
                <span className="nav-text">ProjectIdeas AI</span>
              </li>
              <li className="nav-item" onClick={() => navigateTo('/interview-ready-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>🎯</span>
                </span>
                <span className="nav-text">InterviewReady AI</span>
              </li>
              <li className="nav-item active">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>👥</span>
                </span>
                <span className="nav-text">MentorMatch AI</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📅</span>
                </span>
                <span className="nav-text">Events</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📊</span>
                </span>
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
          {/* MentorMatch AI Hero Section */}
          <section className="featured-jobs">
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <button 
                onClick={navigateToHome} 
                style={{ 
                  background: "none", 
                  border: "none", 
                  cursor: "pointer", 
                  fontSize: "24px", 
                  marginRight: "10px",
                  color: "var(--primary)"
                }}
              >
                ←
              </button>
              <h2>Find Your Perfect Mentor</h2>
            </div>
            <div className="job-card" style={{ padding: "25px" }}>
              <div className="job-info">
                <h3 className="job-title">Connect with experienced women leaders in your field</h3>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                  Our AI-powered matching system connects you with mentors who have the specific expertise 
                  you need and understand the unique challenges women face in their careers.
                </p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                  <span className="newly-added" style={{ background: "var(--light-purple)" }}>1:1 Mentorship</span>
                  <span className="newly-added" style={{ background: "var(--primary-light)" }}>Career Guidance</span>
                  <span className="newly-added" style={{ background: "#e8f5e9" }}>Leadership Skills</span>
                  <span className="newly-added" style={{ background: "#fff3e0" }}>Industry Insights</span>
                </div>
              </div>
            </div>
          </section>

          {/* Mentor Search Section */}
          <section className="featured-jobs">
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "15px" 
            }}>
              <h2>Browse Mentors</h2>
              <div>
                <button 
                  className={`update-btn ${!showBookmarked ? 'active' : ''}`} 
                  style={{ 
                    marginRight: "10px", 
                    background: !showBookmarked ? "var(--primary)" : "transparent",
                    color: !showBookmarked ? "white" : "var(--primary)",
                    border: !showBookmarked ? "none" : "1px solid var(--primary)"
                  }}
                  onClick={() => setShowBookmarked(false)}
                >
                  All Mentors
                </button>
                <button 
                  className={`update-btn ${showBookmarked ? 'active' : ''}`}
                  style={{ 
                    background: showBookmarked ? "var(--primary)" : "transparent",
                    color: showBookmarked ? "white" : "var(--primary)",
                    border: showBookmarked ? "none" : "1px solid var(--primary)"
                  }}
                  onClick={() => setShowBookmarked(true)}
                >
                  My Mentors ({bookmarkedMentors.length})
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <input 
                type="text"
                placeholder="Search mentors by name, role, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "12px 15px", 
                  borderRadius: "8px",
                  border: "1px solid var(--border-light)",
                  fontSize: "15px"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Filter by Expertise:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <span 
                  className={`newly-added ${selectedExpertise === 'Leadership' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'Leadership' ? "var(--primary)" : "var(--light-purple)",
                    color: selectedExpertise === 'Leadership' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'Leadership' ? null : 'Leadership')}
                >
                  Leadership
                </span>
                <span 
                  className={`newly-added ${selectedExpertise === 'Technology' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'Technology' ? "var(--primary)" : "var(--primary-light)",
                    color: selectedExpertise === 'Technology' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'Technology' ? null : 'Technology')}
                >
                  Technology
                </span>
                <span 
                  className={`newly-added ${selectedExpertise === 'UX/UI Design' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'UX/UI Design' ? "var(--primary)" : "#e8f5e9",
                    color: selectedExpertise === 'UX/UI Design' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'UX/UI Design' ? null : 'UX/UI Design')}
                >
                  UX/UI Design
                </span>
                <span 
                  className={`newly-added ${selectedExpertise === 'Marketing' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'Marketing' ? "var(--primary)" : "#fff3e0",
                    color: selectedExpertise === 'Marketing' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'Marketing' ? null : 'Marketing')}
                >
                  Marketing
                </span>
              </div>
            </div>

            {filteredMentors.length === 0 ? (
              <div className="job-card" style={{ padding: "30px", textAlign: "center" }}>
                <p style={{ fontSize: "16px", color: "var(--text-gray)" }}>
                  {showBookmarked ? 
                    "You haven't bookmarked any mentors yet. Browse all mentors to find someone you connect with!" : 
                    "No mentors match your current search criteria. Try adjusting your filters or search term."}
                </p>
              </div>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                gap: "20px"
              }}>
                {filteredMentors.map(mentor => (
                  <div 
                    key={mentor.id} 
                    className="job-card" 
                    style={{ 
                      padding: "20px", 
                      display: "flex", 
                      flexDirection: "column",
                      height: "100%"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                      <div style={{ 
                        width: "60px", 
                        height: "60px", 
                        borderRadius: "50%", 
                        background: "#e6e6e6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "#666"
                      }}>
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <button 
                        onClick={() => handleToggleBookmark(mentor.id)}
                        style={{ 
                          background: "transparent", 
                          border: "none", 
                          cursor: "pointer",
                          fontSize: "20px",
                          color: bookmarkedMentors.includes(mentor.id) ? "var(--primary)" : "#ccc"
                        }}
                      >
                        {bookmarkedMentors.includes(mentor.id) ? '★' : '☆'}
                      </button>
                    </div>
                    
                    <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{mentor.name}</h3>
                    <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>
                      {mentor.role} at {mentor.company}
                    </p>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
                        <strong>Experience:</strong> {mentor.experience}
                      </p>
                      <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
                        <strong>Availability:</strong> {mentor.availability}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                        <strong style={{ marginRight: "5px" }}>Rating:</strong>
                        <span style={{ color: "#ff9800", marginRight: "5px" }}>{'★'.repeat(Math.floor(mentor.rating))}</span>
                        <span>{mentor.rating} ({mentor.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ fontSize: "14px", marginBottom: "5px" }}><strong>Expertise:</strong></p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {mentor.expertise.map((exp, index) => (
                          <span 
                            key={index}
                            style={{ 
                              fontSize: "12px", 
                              background: "#f1f1f1", 
                              padding: "3px 8px", 
                              borderRadius: "10px", 
                              color: "#666" 
                            }}
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="update-btn" 
                      style={{ 
                        marginTop: "auto", 
                        background: "var(--primary)",
                        width: "100%"
                      }}
                      onClick={() => handleRequestMentor(mentor)}
                    >
                      Request Mentorship
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Mentor Request Form */}
          {showMentorRequest && (
            <section className="featured-jobs" ref={requestFormRef}>
              <h2>Request Mentorship from {selectedMentor.name}</h2>
              <div className="job-card" style={{ padding: "25px" }}>
                <form onSubmit={handleSubmitRequest}>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      What specific areas would you like guidance on?
                    </label>
                    <select 
                      style={{ 
                        width: "100%", 
                        padding: "10px", 
                        borderRadius: "5px",
                        border: "1px solid var(--border-light)"
                      }}
                      required
                    >
                      <option value="">Select an area of focus</option>
                      {selectedMentor.expertise.map((exp: string, index: number) => (
                        <option key={index} value={exp}>{exp}</option>
                      ))}
                      <option value="Career Transition">Career Transition</option>
                      <option value="Work-Life Balance">Work-Life Balance</option>
                      <option value="Returning to Work">Returning to Work After a Break</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      Preferred mentorship format
                    </label>
                    <div style={{ display: "flex", gap: "15px" }}>
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="format" value="one-on-one" defaultChecked style={{ marginRight: "5px" }} />
                        One-on-One Sessions
                      </label>
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="format" value="email" style={{ marginRight: "5px" }} />
                        Email Mentorship
                      </label>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      Your career stage
                    </label>
                    <select 
                      style={{ 
                        width: "100%", 
                        padding: "10px", 
                        borderRadius: "5px",
                        border: "1px solid var(--border-light)"
                      }}
                      required
                    >
                      <option value="">Select your career stage</option>
                      <option value="Early Career">Early Career (0-3 years)</option>
                      <option value="Mid Career">Mid Career (3-10 years)</option>
                      <option value="Senior">Senior (10+ years)</option>
                      <option value="Returning">Returning After a Career Break</option>
                      <option value="Transitioning">Career Transition</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      Message to {selectedMentor.name}
                    </label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Introduce yourself and explain why you'd like ${selectedMentor.name} as your mentor...`}
                      style={{ 
                        width: "100%", 
                        padding: "10px", 
                        borderRadius: "5px",
                        border: "1px solid var(--border-light)",
                        minHeight: "120px",
                        resize: "vertical"
                      }}
                      required
                    />
                  </div>
                  
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button 
                      type="button"
                      className="update-btn" 
                      style={{ 
                        background: "transparent", 
                        border: "1px solid var(--border-light)" 
                      }}
                      onClick={() => setShowMentorRequest(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="update-btn" 
                      style={{ 
                        background: "var(--primary)", 
                        flex: 1
                      }}
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* How It Works Section */}
          <section className="featured-jobs">
            <h2>How MentorMatch Works</h2>
            <div className="work-mode-options" style={{ marginTop: "15px", marginBottom: "20px" }}>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">1. Browse profiles and find your perfect mentor match</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">2. Send a personalized request explaining your goals</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">3. Schedule your first session and begin your journey</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">4. Build a meaningful long-term mentoring relationship</span>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="featured-jobs">
            <h2>Success Stories</h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
              gap: "20px",
              marginTop: "15px"
            }}>
              <div className="job-card" style={{ padding: "20px" }}>
                <div style={{ fontSize: "20px", color: "var(--primary)", marginBottom: "10px" }}>❝</div>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  "My mentor helped me transition from a technical role to product management. Her guidance was invaluable in navigating this career shift while balancing family responsibilities."
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "#e6e6e6",
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    RA
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Riya A.</p>
                    <p style={{ fontSize: "12px", color: "#666" }}>Product Manager, Bangalore</p>
                  </div>
                </div>
              </div>
              
              <div className="job-card" style={{ padding: "20px" }}>
                <div style={{ fontSize: "20px", color: "var(--primary)", marginBottom: "10px" }}>❝</div>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  "After a 4-year career break to raise my children, my mentor helped me update my skills and rebuild my confidence. I'm now working at a company with flexible hours."
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "#e6e6e6",
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    SM
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Sneha M.</p>
                    <p style={{ fontSize: "12px", color: "#666" }}>UX Designer, Pune</p>
                  </div>
                </div>
              </div>
              
              <div className="job-card" style={{ padding: "20px" }}>
                <div style={{ fontSize: "20px", color: "var(--primary)", marginBottom: "10px" }}>❝</div>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  "My mentor helped me navigate challenges as the only woman on my engineering team and develop leadership skills. I've since been promoted to team lead."
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "#e6e6e6",
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    PK
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Priyanka K.</p>
                    <p style={{ fontSize: "12px", color: "#666" }}>Engineering Lead, Hyderabad</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">My Mentors</h2>
            <div style={{ padding: "15px 0" }}>
              <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>
                {bookmarkedMentors.length > 0 
                  ? `You have bookmarked ${bookmarkedMentors.length} mentor${bookmarkedMentors.length > 1 ? 's' : ''}.` 
                  : "You haven't bookmarked any mentors yet."}
              </p>
              {bookmarkedMentors.length > 0 && (
                <button 
                  className="update-btn" 
                  style={{ width: "100%", background: "var(--primary)" }}
                  onClick={() => setShowBookmarked(true)}
                >
                  View My Mentors
                </button>
              )}
            </div>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Find My Match</h2>
            <p className="card-subtitle">
              Not sure who to choose? Let our AI find the perfect mentor based on your career goals and challenges.
            </p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }} onClick={handleFindMatch}>
              Get Matched
            </button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Become a Mentor</h2>
            <p className="card-subtitle">
              Share your expertise and help other women advance in their careers.
            </p>
            <p className="scholarship-text">Build your network and leadership skills!</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }} onClick={handleBecomeMentor}>
              Apply Now
            </button>
          </div>
          
          <div style={{ 
            marginTop: "20px", 
            border: "1px solid var(--border-light)", 
            borderRadius: "8px", 
            padding: "15px" 
          }}>
            <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Upcoming Mentor Events</h3>
            <div style={{ marginBottom: "15px", borderBottom: "1px solid var(--border-light)", paddingBottom: "10px" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>Women in Tech Panel Discussion</p>
              <p style={{ fontSize: "12px", color: "var(--text-gray)" }}>April 20, 2025 • Virtual</p>
            </div>
            <div style={{ marginBottom: "15px", borderBottom: "1px solid var(--border-light)", paddingBottom: "10px" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>Group Mentoring: Career Transitions</p>
              <p style={{ fontSize: "12px", color: "var(--text-gray)" }}>April 25, 2025 • Virtual</p>
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>Leadership Skills Workshop</p>
              <p style={{ fontSize: "12px", color: "var(--text-gray)" }}>May 3, 2025 • Bangalore</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  </div>
  );
}

export default MentorMatchAI;
