import { useState, useRef } from 'react';
import { ChatWidget } from '../components/ChatWidget';
import '../App.css';

function SkillUpAI() {
  // Career roadmap state and handlers
  const [careerRoadmap, setCareerRoadmap] = useState<any>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);
  const [currentJobTitle, setCurrentJobTitle] = useState<string>("");
  const [targetJobTitle, setTargetJobTitle] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const featuredCoursesRef = useRef<HTMLElement>(null);
  
  // Add a navigation handler that will be implemented when router is installed
  const navigateToHome = () => {
    window.location.href = '/'; // Simple navigation without router
  };
  
  // Handle browse courses button click
  const handleBrowseCoursesClick = () => {
    if (featuredCoursesRef.current) {
      featuredCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle enroll now button click
  const handleEnrollNow = (courseName: string) => {
    alert(`You've successfully enrolled in "${courseName}". Your journey begins now!`);
  };
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    alert(`You selected the ${category} category. We'll show you relevant courses in this category soon!`);
  };
  
  // Handle generating career roadmap
  const handleGenerateCareerRoadmap = () => {
    if (!currentJobTitle.trim() || !targetJobTitle.trim()) {
      alert("Please enter both your current and target job titles.");
      return;
    }
    
    setIsGeneratingRoadmap(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, we would send the job titles to an API
      setCareerRoadmap({
        currentRole: currentJobTitle,
        targetRole: targetJobTitle,
        timeEstimate: "2-3 years",
        skillGaps: [
          "Advanced data analytics",
          "Project management certification",
          "Leadership experience",
          "Strategic planning",
          "Industry-specific knowledge"
        ],
        milestones: [
          {
            title: "Short-term (0-6 months)",
            tasks: [
              "Complete a certified project management course",
              "Take on a team leadership role in current position",
              "Develop data analysis skills through online courses",
              "Network with professionals in target role",
              "Create 2-3 portfolio projects demonstrating key skills"
            ]
          },
          {
            title: "Mid-term (6-18 months)",
            tasks: [
              "Obtain relevant industry certification",
              "Seek a role with more responsibility in current field",
              "Contribute to cross-functional projects to build experience",
              "Develop mentorship relationships with senior professionals",
              "Present at industry events or webinars to build visibility"
            ]
          },
          {
            title: "Long-term (18+ months)",
            tasks: [
              "Apply for transitional roles that bridge current and target positions",
              "Complete advanced training specific to target role",
              "Build a portfolio showcasing relevant accomplishments",
              "Develop expertise in emerging industry trends",
              "Target companies with clear advancement paths to your goal"
            ]
          }
        ],
        recommendedResources: [
          "LinkedIn Learning: 'Path to becoming a " + targetJobTitle + "'",
          "Coursera Professional Certificate in related field",
          "Industry-specific conferences and networking events",
          "Professional association membership",
          "Recommended books and thought leaders to follow"
        ]
      });
      
      setIsGeneratingRoadmap(false);
    }, 3000);
  };
  
  // Handle downloading career roadmap as PDF
  const handleDownloadRoadmap = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      if (roadmapRef.current) {
        // Create a PDF representation using HTML2Canvas and jsPDF
        import('html2canvas')
          .then(html2canvas => html2canvas.default(roadmapRef.current!))
          .then(canvas => {
            import('jspdf').then(({ default: jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              pdf.save(`Career_Roadmap_${currentJobTitle}_to_${targetJobTitle}.pdf`.replace(/\s+/g, '_'));
              setIsDownloading(false);
            });
          });
      } else {
        alert("PDF generation failed. Please try again.");
        setIsDownloading(false);
      }
    }, 1000);
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
              <li className="nav-item" onClick={() => window.location.href = '/resume-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📄</span>
                </span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item active">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📚</span>
                </span>
                <span className="nav-text">SkillUp AI</span>
              </li>
              <li className="nav-item" onClick={() => window.location.href = '/project-ideas-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📂</span>
                </span>
                <span className="nav-text">ProjectIdeas AI</span>
              </li>
              <li className="nav-item" onClick={() => window.location.href = '/interview-ready-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>🎯</span>
                </span>
                <span className="nav-text">InterviewReady AI</span>
              </li>
              <li className="nav-item" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
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
          {/* SkillUp AI Hero Section */}
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
              <h2>Master In-Demand Skills</h2>
            </div>
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
                      padding: "10px 20px",
                      cursor: "pointer"
                    }}
                    onClick={handleBrowseCoursesClick}
                  >
                    <span>Browse Courses</span>
                    <span style={{ marginLeft: "10px", fontSize: "18px" }}>→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Career Roadmap Section */}
          <section className="featured-jobs">
            <h2>Create Your Career Roadmap</h2>
            
            {/* White container with introduction text and pink content box */}
            <div className="job-card" style={{ 
              padding: "30px", 
              background: "white", 
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              border: "1px solid var(--border-light)",
              marginBottom: "20px" 
            }}>
              {/* Introduction text */}
              <p style={{ 
                marginBottom: "25px", 
                color: "var(--text-gray)",
                fontSize: "15px",
                lineHeight: "1.6"
              }}>
                Get a personalized career development path with skills to acquire and milestones to achieve. 
                Our AI analyzes your current skills, experience, and career goals to create 
                a personalized roadmap for your professional development.
              </p>
              
              {/* Pink container with roadmap details */}
              <div style={{ 
                padding: "25px", 
                background: "var(--primary-light)", 
                borderRadius: "8px",
                border: "1px solid rgba(255, 105, 180, 0.1)",
                marginBottom: "25px" 
              }}>
                <h4 style={{ marginBottom: "20px", color: "#333" }}>Your Career Roadmap Includes:</h4>
                <ul style={{ marginLeft: "20px", marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                  <li style={{ marginBottom: "10px" }}>Skill gap analysis for your target roles</li>
                  <li style={{ marginBottom: "10px" }}>Recommended learning resources and certifications</li>
                  <li style={{ marginBottom: "10px" }}>Timeline with achievable milestones</li>
                  <li style={{ marginBottom: "10px" }}>Industry trends and emerging skills in your field</li>
                  <li style={{ marginBottom: "10px" }}>Alternative career paths based on your transferable skills</li>
                </ul>
              
                <h4 style={{ marginBottom: "15px", marginTop: "25px", color: "#333" }}>Enter Your Current and Target Job Titles:</h4>
                <input 
                  type="text"
                  placeholder="Current Job Title"
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    marginBottom: "15px",
                    background: "white"
                  }}
                  value={currentJobTitle}
                  onChange={(e) => setCurrentJobTitle(e.target.value)}
                />
                <input 
                  type="text"
                  placeholder="Target Job Title"
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    marginBottom: "20px",
                    background: "white"
                  }}
                  value={targetJobTitle}
                  onChange={(e) => setTargetJobTitle(e.target.value)}
                />
                <button 
                  className="update-btn" 
                  onClick={handleGenerateCareerRoadmap}
                  disabled={isGeneratingRoadmap}
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontWeight: "600"
                  }}
                >
                  {isGeneratingRoadmap ? "Generating..." : "Generate Career Roadmap"}
                </button>
              </div>
            </div>

              {careerRoadmap && (
                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ marginBottom: "15px" }}>Your Career Roadmap:</h4>
                  <div 
                    ref={roadmapRef}
                    style={{ 
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      padding: "20px",
                      background: "white",
                      marginBottom: "20px"
                    }}
                  >
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Current Role: {careerRoadmap.currentRole}</h5>
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Target Role: {careerRoadmap.targetRole}</h5>
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Estimated Time: {careerRoadmap.timeEstimate}</p>
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Skill Gaps:</p>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {careerRoadmap.skillGaps.map((skill: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{skill}</li>
                      ))}
                    </ul>
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Milestones:</p>
                    {careerRoadmap.milestones.map((milestone: any, index: number) => (
                      <div key={index} style={{ marginBottom: "15px" }}>
                        <h6 style={{ marginBottom: "5px", fontSize: "14px", color: "#333" }}>{milestone.title}</h6>
                        <ul style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>
                          {milestone.tasks.map((task: string, idx: number) => (
                            <li key={idx} style={{ marginBottom: "5px" }}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Recommended Resources:</p>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {careerRoadmap.recommendedResources.map((resource: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button 
                      className="update-btn"
                      onClick={handleDownloadRoadmap}
                      disabled={isDownloading}
                    >
                      {isDownloading ? "Preparing PDF..." : "Download Career Roadmap"}
                    </button>
                  </div>
                </div>
              )}
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
          <section className="featured-jobs" ref={featuredCoursesRef}>
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
                    <button 
                      className="update-btn" 
                      style={{ padding: "5px 10px", fontSize: "14px" }}
                      onClick={() => handleEnrollNow("Data Science Fundamentals")}
                    >
                      Enroll Now
                    </button>
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
                    <button 
                      className="update-btn" 
                      style={{ padding: "5px 10px", fontSize: "14px" }}
                      onClick={() => handleEnrollNow("Full-Stack Web Development")}
                    >
                      Enroll Now
                    </button>
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
                    <button 
                      className="update-btn" 
                      style={{ padding: "5px 10px", fontSize: "14px" }}
                      onClick={() => handleEnrollNow("UX/UI Design Essentials")}
                    >
                      Enroll Now
                    </button>
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

export default SkillUpAI;