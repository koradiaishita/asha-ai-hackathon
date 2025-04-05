import React, { useState } from 'react';
import { ChatWidget } from '../components/ChatWidget';
import { ResumeFeatureContent } from '../components/resume-features/ResumeFeatureContent';
import '../App.css';

// Define feature types and content
const FEATURES = {
  HOME: 'home',
  ATS: 'ats',
  COVER_LETTER: 'cover-letter',
  ANALYSIS: 'analysis',
  INTERVIEW: 'interview',
  ROADMAP: 'roadmap',
  PROJECTS: 'projects',
};

function ResumeAI() {
  const [selectedFeature, setSelectedFeature] = useState<string>(FEATURES.HOME);

  // Add a navigation handler that will be implemented when router is installed
  const navigateToHome = () => {
    window.location.href = '/'; // Simple navigation without router
  };

  // Function to render specific feature content based on selection
  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case FEATURES.ATS:
        return (
          <ResumeFeatureContent
            title="ATS-Friendly Resume"
            icon="📊"
            description="Create resumes that pass through Applicant Tracking Systems with optimized keywords and formatting."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>What is an ATS?</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                Applicant Tracking Systems (ATS) are software applications that employers use to manage job applications 
                and screen resumes. They scan your resume for keywords and qualifications before a human reviews it.
              </p>
              
              <h4 style={{ marginBottom: "15px" }}>How our AI helps:</h4>
              <ul style={{ marginLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                <li style={{ marginBottom: "10px" }}>Scans job descriptions to identify key requirements and skills</li>
                <li style={{ marginBottom: "10px" }}>Reorganizes your resume format to be ATS-compatible</li>
                <li style={{ marginBottom: "10px" }}>Suggests industry-specific keywords to include</li>
                <li style={{ marginBottom: "10px" }}>Removes formatting that confuses ATS systems</li>
                <li style={{ marginBottom: "10px" }}>Provides a compatibility score for specific job descriptions</li>
              </ul>
              
              <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
                <button className="update-btn">Optimize Existing Resume</button>
                <button className="update-btn" style={{ background: "var(--primary)" }}>Create New ATS Resume</button>
              </div>
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.COVER_LETTER:
        return (
          <ResumeFeatureContent
            title="Tailored Cover Letter"
            icon="✉️"
            description="Create personalized cover letters that match specific job descriptions and highlight relevant skills."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>Why a tailored cover letter matters</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                A personalized cover letter demonstrates your interest in the specific role and company,
                highlighting why you're the perfect candidate for this particular position.
              </p>
              
              <h4 style={{ marginBottom: "15px" }}>Our AI cover letter creator:</h4>
              <ul style={{ marginLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                <li style={{ marginBottom: "10px" }}>Analyzes job descriptions to identify key requirements</li>
                <li style={{ marginBottom: "10px" }}>Matches your experience to the role's needs</li>
                <li style={{ marginBottom: "10px" }}>Creates compelling narratives about your career journey</li>
                <li style={{ marginBottom: "10px" }}>Adapts tone to match company culture</li>
                <li style={{ marginBottom: "10px" }}>Provides multiple versions to choose from</li>
              </ul>
              
              <div style={{ marginTop: "20px", padding: "15px", background: "var(--primary-light)", borderRadius: "8px" }}>
                <h4 style={{ marginBottom: "10px" }}>Enter Job Description:</h4>
                <textarea 
                  placeholder="Paste the job description here..." 
                  style={{ 
                    width: "100%", 
                    minHeight: "100px", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)"
                  }}
                />
                <button className="update-btn" style={{ marginTop: "15px" }}>Generate Cover Letter</button>
              </div>
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.ANALYSIS:
        return (
          <ResumeFeatureContent
            title="Detailed Resume Analysis"
            icon="🔍"
            description="Get comprehensive feedback on your resume with actionable suggestions for improvement."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>What our analysis provides:</h4>
              <ul style={{ marginLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                <li style={{ marginBottom: "10px" }}>Content evaluation - strength of your impact statements</li>
                <li style={{ marginBottom: "10px" }}>Skill gap analysis - comparing your profile with job market demands</li>
                <li style={{ marginBottom: "10px" }}>Format and readability assessment</li>
                <li style={{ marginBottom: "10px" }}>Keyword optimization recommendations</li>
                <li style={{ marginBottom: "10px" }}>Industry-specific best practices</li>
              </ul>
              
              <div style={{ 
                border: "2px dashed var(--border-light)", 
                borderRadius: "8px", 
                padding: "30px", 
                textAlign: "center",
                marginBottom: "20px" 
              }}>
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>📄</div>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                  Upload your resume to get a detailed analysis
                </p>
                <button className="update-btn" style={{ marginTop: "10px" }}>
                  Upload Resume
                </button>
              </div>
              
              <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                You'll receive a detailed report with specific improvement suggestions within minutes.
              </p>
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.INTERVIEW:
        return (
          <ResumeFeatureContent
            title="Interview Guide"
            icon="🎯"
            description="Prepare for interviews with personalized questions based on your resume and target role."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>How our interview guide helps:</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                Our AI analyzes your resume and target job descriptions to create a personalized
                interview preparation guide with likely questions and suggested answers.
              </p>
              
              <div style={{ 
                marginTop: "20px", 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "15px",
                marginBottom: "20px"
              }}>
                <div style={{ 
                  background: "var(--primary-light)", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Role-specific Questions</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Get questions tailored to the specific role you're applying for, 
                    covering technical skills and job requirements.
                  </p>
                </div>
                
                <div style={{ 
                  background: "var(--light-purple)", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Experience-based Questions</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Practice questions based on your unique work experience 
                    and how to frame your answers effectively.
                  </p>
                </div>
                
                <div style={{ 
                  background: "#e8f5e9", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Behavioral Questions</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Prepare for questions about workplace behavior, team collaboration,
                    and problem-solving approaches.
                  </p>
                </div>
                
                <div style={{ 
                  background: "#fff3e0", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Mock Interview Practice</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Get real-time feedback on your answers with our AI-powered 
                    mock interview simulator.
                  </p>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                <button className="update-btn">Upload Resume</button>
                <button className="update-btn" style={{ background: "var(--primary)" }}>Start Mock Interview</button>
              </div>
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.ROADMAP:
        return (
          <ResumeFeatureContent
            title="Career Roadmap"
            icon="🗺️"
            description="Get a personalized career development path with skills to acquire and milestones to achieve."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>Plan your career journey</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                Our AI analyzes your current skills, experience, and career goals to create 
                a personalized roadmap for your professional development.
              </p>
              
              <div style={{ 
                background: "var(--primary-light)", 
                padding: "20px", 
                borderRadius: "8px",
                marginBottom: "20px" 
              }}>
                <h4 style={{ marginBottom: "15px" }}>Your Career Roadmap Includes:</h4>
                <ul style={{ marginLeft: "20px", marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                  <li style={{ marginBottom: "10px" }}>Skill gap analysis for your target roles</li>
                  <li style={{ marginBottom: "10px" }}>Recommended learning resources and certifications</li>
                  <li style={{ marginBottom: "10px" }}>Timeline with achievable milestones</li>
                  <li style={{ marginBottom: "10px" }}>Industry trends and emerging skills in your field</li>
                  <li style={{ marginBottom: "10px" }}>Alternative career paths based on your transferable skills</li>
                </ul>
              </div>
              
              <div style={{ marginTop: "20px" }}>
                <h4 style={{ marginBottom: "15px" }}>Get Started:</h4>
                <div style={{ display: "flex", gap: "15px" }}>
                  <input 
                    type="text" 
                    placeholder="Your current job title" 
                    style={{ 
                      flex: 1, 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)" 
                    }} 
                  />
                  <input 
                    type="text" 
                    placeholder="Your target job title" 
                    style={{ 
                      flex: 1, 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)" 
                    }} 
                  />
                </div>
                <button className="update-btn" style={{ marginTop: "15px" }}>Generate Career Roadmap</button>
              </div>
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.PROJECTS:
        return (
          <ResumeFeatureContent
            title="Project Recommendations"
            icon="📂"
            description="Discover industry-relevant projects to enhance your portfolio and demonstrate your skills."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>Why portfolio projects matter:</h4>
              <p style={{ marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                Having relevant projects in your portfolio demonstrates your practical skills and initiative
                to potential employers, especially important for those changing careers or with less experience.
              </p>
              
              <div style={{ 
                background: "var(--light-purple)", 
                padding: "20px", 
                borderRadius: "8px",
                marginBottom: "20px" 
              }}>
                <h4 style={{ marginBottom: "15px" }}>Our Project Recommendations Include:</h4>
                <ul style={{ marginLeft: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                  <li style={{ marginBottom: "10px" }}>Industry-specific projects that showcase relevant skills</li>
                  <li style={{ marginBottom: "10px" }}>Detailed project descriptions and implementation guides</li>
                  <li style={{ marginBottom: "10px" }}>Skill-building projects of varying difficulty levels</li>
                  <li style={{ marginBottom: "10px" }}>Resources and tutorials to help you complete projects</li>
                  <li style={{ marginBottom: "10px" }}>Tips for presenting projects effectively on your resume</li>
                </ul>
              </div>
              
              <div style={{ marginTop: "25px" }}>
                <h4 style={{ marginBottom: "15px" }}>Find Projects for Your Field:</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                  <span className="newly-added" style={{ cursor: "pointer" }}>Software Development</span>
                  <span className="newly-added" style={{ cursor: "pointer" }}>Data Analysis</span>
                  <span className="newly-added" style={{ cursor: "pointer" }}>UX/UI Design</span>
                  <span className="newly-added" style={{ cursor: "pointer" }}>Digital Marketing</span>
                  <span className="newly-added" style={{ cursor: "pointer" }}>Project Management</span>
                  <span className="newly-added" style={{ cursor: "pointer" }}>Content Creation</span>
                </div>
                <button className="update-btn" style={{ marginTop: "10px" }}>Get Custom Project Ideas</button>
              </div>
            </div>
          </ResumeFeatureContent>
        );
      
      default:
        return (
          <>
            <section className="featured-jobs">
              <h2>Resume AI Assistant</h2>
              <div className="job-card" style={{ padding: "25px" }}>
                <div className="job-info">
                  <h3 className="job-title">Enhance Your Resume with AI</h3>
                  <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                    Our AI-powered resume tool helps women craft compelling resumes
                    that highlight their skills and experiences effectively.
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                    <span className="newly-added" style={{ background: "var(--light-purple)" }}>Resume Analysis</span>
                    <span className="newly-added" style={{ background: "var(--primary-light)" }}>Skills Optimization</span>
                    <span className="newly-added" style={{ background: "#e8f5e9" }}>ATS Compatibility</span>
                    <span className="newly-added" style={{ background: "#fff3e0" }}>Career Gap Solutions</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Services Section - New Feature Cards */}
            <section className="featured-jobs">
              <h2>Our AI-Powered Resume Services</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginTop: "15px" }}>
                {/* ATS-Friendly Resume */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.ATS)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>📊</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>ATS-Friendly Resume</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Create resumes that pass through Applicant Tracking Systems with optimized keywords and formatting.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.ATS); }}
                  >
                    Optimize Resume
                  </button>
                </div>

                {/* Tailored Cover Letter */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.COVER_LETTER)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>✉️</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Tailored Cover Letter</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Create personalized cover letters that match specific job descriptions and highlight relevant skills.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.COVER_LETTER); }}
                  >
                    Create Cover Letter
                  </button>
                </div>

                {/* Resume Analysis */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.ANALYSIS)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>🔍</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Detailed Analysis</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Get comprehensive feedback on your resume with actionable suggestions for improvement.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.ANALYSIS); }}
                  >
                    Analyze Resume
                  </button>
                </div>

                {/* Interview Guide */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.INTERVIEW)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>🎯</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Interview Guide</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Prepare for interviews with personalized questions based on your resume and target role.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.INTERVIEW); }}
                  >
                    Prepare for Interview
                  </button>
                </div>

                {/* Career Roadmap */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.ROADMAP)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>🗺️</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Career Roadmap</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Get a personalized career development path with skills to acquire and milestones to achieve.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.ROADMAP); }}
                  >
                    Plan Career Path
                  </button>
                </div>

                {/* Recommended Projects */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.PROJECTS)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>📂</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Project Recommendations</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Discover industry-relevant projects to enhance your portfolio and demonstrate your skills.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.PROJECTS); }}
                  >
                    View Projects
                  </button>
                </div>
              </div>
            </section>

            <section className="featured-jobs">
              <h2>Upload Your Resume</h2>
              <div className="job-card" style={{ padding: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ 
                  border: "2px dashed var(--border-light)", 
                  borderRadius: "8px", 
                  padding: "40px", 
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "20px" 
                }}>
                  <div style={{ fontSize: "40px", marginBottom: "15px" }}>📄</div>
                  <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                    Drag and drop your resume here or click to browse
                  </p>
                  <button className="update-btn" style={{ marginTop: "10px" }}>
                    Upload Resume
                  </button>
                </div>
                
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Supported formats: PDF, DOCX, RTF (Max size: 5MB)
                </p>
              </div>
            </section>

            <section className="featured-jobs">
              <h2>How Resume AI Works</h2>
              <div className="work-mode-options" style={{ marginTop: "15px" }}>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">1. Upload your resume</span>
                </div>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">2. AI analyzes strengths & gaps</span>
                </div>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">3. Get personalized suggestions</span>
                </div>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">4. Download enhanced resume</span>
                </div>
              </div>
            </section>
          </>
        );
    }
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
              <li className="nav-item active">
                <span className="nav-icon mic-icon"></span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
                <span className="nav-icon briefcase-icon"></span>
                <span className="nav-text">Jobs</span>
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

        {/* Main Content - Resume AI Specific */}
        <main className="main-content">
          {selectedFeature !== FEATURES.HOME && (
            <div style={{ marginBottom: "20px" }}>
              <button 
                onClick={() => setSelectedFeature(FEATURES.HOME)}
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  display: "flex", 
                  alignItems: "center",
                  color: "var(--primary)",
                  cursor: "pointer",
                  padding: "5px 0"
                }}
              >
                ← Back to all features
              </button>
            </div>
          )}
          
          {renderFeatureContent()}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Resume Strength Score</h2>
            <div className="profile-image" style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "18px",
              color: "var(--text-gray)"
            }}>
              Upload your resume to get a score
            </div>
            <button 
              className="update-btn"
              onClick={() => setSelectedFeature(FEATURES.ANALYSIS)}
            >
              Analyze Resume
            </button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Resume Tips for Career Breaks</h2>
            <p className="card-subtitle">
              Learn how to positively frame career gaps and highlight transferable skills in your resume.
            </p>
            <p className="scholarship-text">Free resource!</p>
            <div className="card-image">
              {/* Career break tips image */}
            </div>
          </div>
        </aside>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default ResumeAI;
