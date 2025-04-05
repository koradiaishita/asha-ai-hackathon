import React from 'react';
import { ChatWidget } from '../components/ChatWidget';
import '../App.css';

function UpskillNavigator() {
  // Add a navigation handler that will be implemented when router is installed
  const navigateToHome = () => {
    window.location.href = '/'; // Simple navigation without router
  };

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
                <span className="nav-icon mic-icon"></span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item active">
                <span className="nav-icon briefcase-icon"></span>
                <span className="nav-text">Upskill Navigator</span>
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
          {/* Upskill Navigator Hero Section */}
          <section className="featured-jobs">
            <h2>Master In-Demand Skills</h2>
            <div className="job-card" style={{ padding: "25px" }}>
              <div className="job-info">
                <h3 className="job-title">Access premium courses and start your learning journey today</h3>
                <div style={{ marginTop: "20px" }}>
                  <button 
                    className="update-btn" 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      background: "var(--primary)", 
                      borderRadius: "8px",
                      padding: "10px 20px"
                    }}
                  >
                    <span>Browse Courses</span>
                    <span style={{ marginLeft: "10px", fontSize: "18px" }}>→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="featured-jobs">
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "15px", 
              marginTop: "15px" 
            }}>
              <div className="job-card" style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "15px" }}>⏱️</div>
                <h3 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Learning Hours</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "var(--primary)" }}>2k+</p>
              </div>
              
              <div className="job-card" style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "15px" }}>🏆</div>
                <h3 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Success Stories</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "var(--primary)" }}>50+</p>
              </div>
              
              <div className="job-card" style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "15px" }}>📚</div>
                <h3 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Topics</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "var(--primary)" }}>15+</p>
              </div>
              
              <div className="job-card" style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "15px" }}>💫</div>
                <h3 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Avg. Salary Hike</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "var(--primary)" }}>3.2x</p>
              </div>
            </div>
          </section>

          {/* Featured Courses */}
          <section className="featured-jobs">
            <div className="section-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <h2>Featured Courses</h2>
              <span style={{ color: "var(--primary)", cursor: "pointer" }}>View all →</span>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "15px"
            }}>
              {/* Course Card 1 */}
              <div className="job-card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ height: "150px", background: "#f5f5f5", position: "relative" }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px", 
                    background: "#fff", 
                    borderRadius: "4px", 
                    padding: "5px 10px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    Bestseller
                  </div>
                </div>
                <div style={{ padding: "15px" }}>
                  <h3 style={{ marginBottom: "5px", fontSize: "16px" }}>Data Science Fundamentals</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>Learn the basics of data analysis and visualization</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold" }}>₹2,499</span>
                    <button className="update-btn" style={{ padding: "5px 10px", fontSize: "14px" }}>Enroll Now</button>
                  </div>
                </div>
              </div>
              
              {/* Course Card 2 */}
              <div className="job-card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ height: "150px", background: "#f5f5f5", position: "relative" }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px", 
                    background: "#e8f5e9", 
                    borderRadius: "4px", 
                    padding: "5px 10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#4caf50"
                  }}>
                    New
                  </div>
                </div>
                <div style={{ padding: "15px" }}>
                  <h3 style={{ marginBottom: "5px", fontSize: "16px" }}>Full-Stack Web Development</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>Master modern web development technologies</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold" }}>₹3,999</span>
                    <button className="update-btn" style={{ padding: "5px 10px", fontSize: "14px" }}>Enroll Now</button>
                  </div>
                </div>
              </div>
              
              {/* Course Card 3 */}
              <div className="job-card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ height: "150px", background: "#f5f5f5", position: "relative" }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px", 
                    background: "#fff3e0", 
                    borderRadius: "4px", 
                    padding: "5px 10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#ff9800"
                  }}>
                    Popular
                  </div>
                </div>
                <div style={{ padding: "15px" }}>
                  <h3 style={{ marginBottom: "5px", fontSize: "16px" }}>UX/UI Design Essentials</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>Create beautiful, user-friendly interfaces</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold" }}>₹2,999</span>
                    <button className="update-btn" style={{ padding: "5px 10px", fontSize: "14px" }}>Enroll Now</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Popular Categories */}
          <section className="featured-jobs">
            <h2>Popular Categories</h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "15px",
              marginTop: "15px"
            }}>
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>💻</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>Technology</h3>
              </div>
              
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>📊</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>Data Science</h3>
              </div>
              
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>🎨</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>Design</h3>
              </div>
              
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>📱</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>Marketing</h3>
              </div>
              
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>📈</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>Finance</h3>
              </div>
              
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>👩‍💼</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>Leadership</h3>
              </div>
              
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>🔍</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>Research</h3>
              </div>
              
              <div className="job-card" style={{ 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>👥</div>
                <h3 style={{ textAlign: "center", fontSize: "15px" }}>HR</h3>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Your Learning Journey</h2>
            <div className="profile-image" style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "var(--text-gray)" }}>No courses enrolled yet</p>
            </div>
            <button className="update-btn">Explore Courses</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Skill Assessment</h2>
            <p className="card-subtitle">
              Take our free skill assessment to discover your strengths and areas for improvement.
            </p>
            <p className="scholarship-text">15-minute assessment</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }}>Start Assessment</button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Learning Paths</h2>
            <p className="card-subtitle">
              Curated course sequences to master a specific role or technology
            </p>
            <div style={{ marginTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Data Scientist Path</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Full-Stack Developer Path</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Product Manager Path</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default UpskillNavigator;