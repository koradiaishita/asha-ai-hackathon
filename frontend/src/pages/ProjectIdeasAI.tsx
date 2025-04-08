import { useState, useRef } from 'react';
import { ChatWidget } from '../components/ChatWidget';
import '../App.css';

function ProjectIdeasAI() {
  // Project recommendations state and handlers
  const [projectCategory, setProjectCategory] = useState<string>("");
  const [customProjectField, setCustomProjectField] = useState<string>("");
  const [projectIdeas, setProjectIdeas] = useState<any>(null);
  const [isGeneratingProjects, setIsGeneratingProjects] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Add a navigation handler that will be implemented when router is installed
  const navigateToHome = () => {
    window.location.href = '/'; // Simple navigation without router
  };

  // Handle generating project ideas
  const handleGenerateProjectIdeas = (category: string = "") => {
    const fieldToUse = category || customProjectField;
    
    if (!fieldToUse.trim()) {
      alert("Please select a field or enter a custom field for project ideas.");
      return;
    }
    
    setIsGeneratingProjects(true);
    setProjectCategory(fieldToUse);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, we would send the field to an API
      // Generate projects based on the selected field
      const projectsByField: {[key: string]: any} = {
        "Software Development": {
          beginner: [
            {
              title: "Personal Portfolio Website",
              description: "Create a responsive personal portfolio website that showcases your projects, skills, and contact information. Implement responsive design, dark/light mode toggle, and contact form.",
              skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
              timeEstimate: "2-3 weeks",
              resources: ["GitHub Pages for hosting", "MDN Web Docs", "CSS-Tricks"]
            },
            {
              title: "Task Management Application",
              description: "Build a task management app with features like task creation, categorization, priority levels, due dates, and notification reminders.",
              skills: ["Front-end framework (React/Vue)", "State Management", "Local Storage"],
              timeEstimate: "3-4 weeks",
              resources: ["React/Vue documentation", "CodePen examples", "YouTube tutorials"]
            },
            {
              title: "Weather Dashboard",
              description: "Create a weather dashboard that fetches data from a weather API and displays current conditions and forecasts for multiple locations.",
              skills: ["API Integration", "Data Visualization", "Asynchronous JavaScript"],
              timeEstimate: "2 weeks",
              resources: ["OpenWeather API", "Chart.js", "Axios documentation"]
            }
          ],
          intermediate: [
            {
              title: "E-commerce Product Page",
              description: "Build a full-featured e-commerce product page with image gallery, product variations, reviews, cart functionality, and recommended products.",
              skills: ["Advanced CSS/SCSS", "JavaScript", "API Integration", "State Management"],
              timeEstimate: "4-6 weeks",
              resources: ["Stripe API docs", "Commerce.js", "Design systems"]
            },
            {
              title: "Real-time Chat Application",
              description: "Develop a real-time chat application with features like private messaging, group chats, notifications, and message history.",
              skills: ["WebSockets", "Authentication", "Database Integration", "UI/UX Design"],
              timeEstimate: "6-8 weeks",
              resources: ["Socket.io documentation", "Firebase", "Authentication libraries"]
            }
          ],
          advanced: [
            {
              title: "Full-stack Social Network",
              description: "Create a social network platform with user profiles, posts, comments, likes, follows, and notifications. Implement proper authentication and authorization.",
              skills: ["Full-stack Development", "Database Design", "Authentication", "Scalability"],
              timeEstimate: "8-12 weeks",
              resources: ["MERN/MEAN stack tutorials", "AWS/Google Cloud", "Security best practices"]
            },
            {
              title: "AI-Powered Code Assistant",
              description: "Build a code assistant tool that uses AI to suggest code improvements, detect bugs, and provide documentation. Integrate with popular code editors.",
              skills: ["Machine Learning", "NLP", "API Design", "IDE Extensions"],
              timeEstimate: "10-14 weeks",
              resources: ["OpenAI API", "IDE extension documentation", "ML model training"]
            }
          ]
        },
        "Data Analysis": {
          beginner: [
            {
              title: "Sales Data Visualization Dashboard",
              description: "Create a dashboard that visualizes sales data to identify trends, top-performing products, and seasonal patterns.",
              skills: ["Data Cleaning", "Visualization Tools", "Basic Statistics"],
              timeEstimate: "2-3 weeks",
              resources: ["Tableau Public", "Power BI", "Sample datasets"]
            },
            {
              title: "Customer Segmentation Analysis",
              description: "Analyze customer data to identify distinct segments based on purchasing behavior, demographics, and engagement.",
              skills: ["Data Wrangling", "Clustering Algorithms", "Data Visualization"],
              timeEstimate: "3-4 weeks",
              resources: ["Kaggle datasets", "Python data science libraries", "Industry reports"]
            }
          ],
          intermediate: [
            {
              title: "Predictive Sales Forecasting",
              description: "Build a model to predict future sales based on historical data, incorporating seasonality, trends, and external factors.",
              skills: ["Time Series Analysis", "Regression Models", "Feature Engineering"],
              timeEstimate: "5-6 weeks",
              resources: ["Forecasting libraries", "Business intelligence tools", "Statistical methods"]
            },
            {
              title: "Market Basket Analysis",
              description: "Identify patterns in purchase behavior to discover which products are frequently bought together, useful for recommendation systems.",
              skills: ["Association Rule Mining", "Data Processing", "Business Intelligence"],
              timeEstimate: "4-5 weeks",
              resources: ["R/Python libraries", "Retail datasets", "Academic papers"]
            }
          ],
          advanced: [
            {
              title: "Machine Learning for Churn Prediction",
              description: "Develop an ML model to predict customer churn and identify at-risk customers, with an intervention strategy recommendation system.",
              skills: ["Advanced ML Algorithms", "Feature Selection", "Model Deployment", "Business Strategy"],
              timeEstimate: "8-10 weeks",
              resources: ["ML platforms", "Cloud computing services", "Telco customer churn dataset"]
            },
            {
              title: "Natural Language Processing for Product Reviews",
              description: "Apply NLP techniques to analyze product review sentiment, extract key themes, and identify improvement opportunities.",
              skills: ["NLP", "Sentiment Analysis", "Text Mining", "Data Visualization"],
              timeEstimate: "7-9 weeks",
              resources: ["NLTK/spaCy", "Word embeddings", "Review datasets"]
            }
          ]
        },
        "UX/UI Design": {
          beginner: [
            {
              title: "Mobile App Redesign",
              description: "Select an existing app with usability issues and redesign it to improve user experience, information architecture, and visual design.",
              skills: ["User Research", "Wireframing", "Visual Design", "Prototyping"],
              timeEstimate: "3-4 weeks",
              resources: ["Figma/Adobe XD", "Material Design guidelines", "iOS Human Interface Guidelines"]
            },
            {
              title: "Landing Page Optimization",
              description: "Design and test multiple versions of a landing page to optimize for conversions and user engagement.",
              skills: ["Conversion-centered Design", "Visual Hierarchy", "A/B Testing"],
              timeEstimate: "2-3 weeks",
              resources: ["Landing page examples", "Heat mapping tools", "Design principles"]
            }
          ],
          intermediate: [
            {
              title: "Design System Creation",
              description: "Build a comprehensive design system with components, patterns, documentation, and usage guidelines for a fictional product.",
              skills: ["Component Design", "Documentation", "Design Principles", "Consistency"],
              timeEstimate: "6-8 weeks",
              resources: ["Design systems examples", "Style guide tools", "Component libraries"]
            },
            {
              title: "E-commerce User Experience Overhaul",
              description: "Research, design, and test improvements to the complete user journey for an e-commerce platform, from discovery to checkout.",
              skills: ["User Journey Mapping", "Usability Testing", "Interaction Design", "Information Architecture"],
              timeEstimate: "7-9 weeks",
              resources: ["E-commerce UX research", "User testing platforms", "Checkout optimization guides"]
            }
          ],
          advanced: [
            {
              title: "Multi-platform Design Ecosystem",
              description: "Design a cohesive user experience across web, mobile, tablet, and wearable platforms for a digital product.",
              skills: ["Cross-platform Design", "Responsive Design", "Design Strategy", "Advanced Prototyping"],
              timeEstimate: "10-12 weeks",
              resources: ["Multi-device design guidelines", "Advanced prototyping tools", "Case studies"]
            },
            {
              title: "Accessibility-First Application Design",
              description: "Design a fully accessible application that adheres to WCAG standards while maintaining visual appeal and usability for all users.",
              skills: ["Accessibility Standards", "Inclusive Design", "User Testing with Diverse Users", "Assistive Technology"],
              timeEstimate: "8-10 weeks",
              resources: ["WCAG guidelines", "Accessibility testing tools", "Inclusive design toolkits"]
            }
          ]
        },
        "Digital Marketing": {
          beginner: [
            {
              title: "Social Media Marketing Campaign",
              description: "Plan, execute, and analyze a social media campaign for a product or service, including content creation and performance metrics.",
              skills: ["Content Strategy", "Platform Selection", "Analytics", "Visual Content Creation"],
              timeEstimate: "3-4 weeks",
              resources: ["Social media scheduling tools", "Analytics platforms", "Content calendars"]
            },
            {
              title: "Email Marketing Sequence",
              description: "Design and implement an email marketing sequence with lead magnet, welcome series, and conversion-focused emails.",
              skills: ["Email Copywriting", "Automation", "A/B Testing", "List Segmentation"],
              timeEstimate: "2-3 weeks",
              resources: ["Email marketing platforms", "Copywriting guides", "Template examples"]
            }
          ],
          intermediate: [
            {
              title: "SEO Content Strategy",
              description: "Develop a comprehensive SEO content strategy including keyword research, content creation, and on-page optimization.",
              skills: ["Keyword Research", "Content Planning", "On-page SEO", "Analytics"],
              timeEstimate: "6-8 weeks",
              resources: ["SEO tools", "Google Search Console", "Content optimization guides"]
            },
            {
              title: "Multi-channel Marketing Campaign",
              description: "Create and execute a cohesive marketing campaign across multiple channels (social, email, content, paid) with consistent messaging.",
              skills: ["Campaign Planning", "Budget Allocation", "Cross-channel Analytics", "Audience Targeting"],
              timeEstimate: "7-9 weeks",
              resources: ["Marketing automation platforms", "Attribution models", "Campaign management tools"]
            }
          ],
          advanced: [
            {
              title: "Marketing Analytics Dashboard",
              description: "Build a comprehensive marketing analytics dashboard that centralizes data from multiple platforms and provides actionable insights.",
              skills: ["Data Integration", "Visualization", "Metrics Selection", "ROI Calculation"],
              timeEstimate: "8-10 weeks",
              resources: ["Data visualization tools", "API integrations", "Dashboard design principles"]
            },
            {
              title: "Growth Marketing Experiment System",
              description: "Design a system for continuous marketing experimentation, including hypothesis generation, test design, analysis, and implementation.",
              skills: ["Experiment Design", "Statistical Analysis", "Growth Frameworks", "Process Management"],
              timeEstimate: "10-12 weeks",
              resources: ["Growth hacking case studies", "A/B testing platforms", "Statistical analysis tools"]
            }
          ]
        },
        "Project Management": {
          beginner: [
            {
              title: "Event Planning and Execution",
              description: "Plan and manage a virtual or in-person event, from concept to execution, including timeline, budget, and stakeholder management.",
              skills: ["Timeline Management", "Budget Planning", "Stakeholder Communication", "Risk Assessment"],
              timeEstimate: "4-6 weeks",
              resources: ["Project management tools", "Event planning templates", "Budget tracking sheets"]
            },
            {
              title: "Process Documentation and Improvement",
              description: "Document an existing business process, identify inefficiencies, and implement improvements with measurable results.",
              skills: ["Process Mapping", "Documentation", "Efficiency Analysis", "Change Management"],
              timeEstimate: "3-4 weeks",
              resources: ["Process mapping tools", "Documentation templates", "Best practices guides"]
            }
          ],
          intermediate: [
            {
              title: "Agile Team Management Simulation",
              description: "Simulate managing an agile development team through a complete project cycle, handling sprints, backlog, and team dynamics.",
              skills: ["Agile Methodologies", "Sprint Planning", "Team Leadership", "Product Backlog Management"],
              timeEstimate: "6-8 weeks",
              resources: ["Agile project management tools", "Scrum guides", "Team simulation exercises"]
            },
            {
              title: "Cross-functional Product Launch",
              description: "Plan and execute a simulated product launch, coordinating across marketing, development, sales, and customer support teams.",
              skills: ["Cross-team Coordination", "Launch Planning", "Timeline Management", "Communication Planning"],
              timeEstimate: "7-9 weeks",
              resources: ["Product launch playbooks", "Project management methodologies", "RACI matrices"]
            }
          ],
          advanced: [
            {
              title: "Portfolio Management System",
              description: "Develop a system for managing multiple projects as a portfolio, including resource allocation, prioritization, and strategic alignment.",
              skills: ["Resource Management", "Strategic Planning", "Project Selection", "Portfolio Metrics"],
              timeEstimate: "10-12 weeks",
              resources: ["Portfolio management frameworks", "Resource management tools", "Strategic alignment models"]
            },
            {
              title: "Enterprise Project Management Office",
              description: "Design the structure, processes, and tools for an enterprise PMO, including governance, templates, and reporting systems.",
              skills: ["PMO Design", "Governance Frameworks", "Reporting Systems", "Change Management"],
              timeEstimate: "12-16 weeks",
              resources: ["PMO setup guides", "Governance frameworks", "Enterprise tool evaluation"]
            }
          ]
        },
        "Content Creation": {
          beginner: [
            {
              title: "Blog Series Development",
              description: "Research, plan, and create a series of blog posts on a specific topic, including content strategy, SEO optimization, and promotion.",
              skills: ["Content Planning", "SEO Writing", "Editorial Calendar", "Basic HTML"],
              timeEstimate: "3-4 weeks",
              resources: ["Content management systems", "SEO tools", "Writing guides"]
            },
            {
              title: "Video Tutorial Series",
              description: "Create a series of instructional videos on a topic you're knowledgeable about, including planning, recording, editing, and distribution.",
              skills: ["Scriptwriting", "Video Recording", "Basic Editing", "YouTube Optimization"],
              timeEstimate: "4-6 weeks",
              resources: ["Video editing software", "Microphone recommendations", "YouTube creator guides"]
            }
          ],
          intermediate: [
            {
              title: "Content Marketing Case Study",
              description: "Develop a detailed case study about a successful brand or campaign, including research, interviews, data analysis, and visual presentation.",
              skills: ["Research Methods", "Data Visualization", "Storytelling", "Interview Techniques"],
              timeEstimate: "5-7 weeks",
              resources: ["Case study examples", "Data visualization tools", "Interview guides"]
            },
            {
              title: "Podcast Creation and Launch",
              description: "Plan, record, edit, and launch a podcast series, including concept development, guest coordination, and promotion strategy.",
              skills: ["Audio Production", "Interview Skills", "Content Planning", "Distribution Strategy"],
              timeEstimate: "6-8 weeks",
              resources: ["Podcast hosting platforms", "Audio editing software", "Podcast launch playbooks"]
            }
          ],
          advanced: [
            {
              title: "Interactive Digital Publication",
              description: "Create an interactive digital publication combining text, images, videos, and interactive elements on a specialized topic.",
              skills: ["Multimedia Content Creation", "Interactive Design", "Advanced Storytelling", "Digital Publishing"],
              timeEstimate: "8-10 weeks",
              resources: ["Digital publishing platforms", "Interactive content tools", "Multimedia storytelling examples"]
            },
            {
              title: "Multi-format Content Ecosystem",
              description: "Develop a comprehensive content ecosystem around a specific topic, with strategic repurposing across blog, video, social, email, and downloadable formats.",
              skills: ["Content Strategy", "Cross-format Adaptation", "Audience Targeting", "Content Distribution"],
              timeEstimate: "10-12 weeks",
              resources: ["Content repurposing methodologies", "Multi-channel distribution tools", "Content performance analytics"]
            }
          ]
        }
      };
      
      // Default to Software Development if the category isn't found
      const projectData = projectsByField[fieldToUse] || projectsByField["Software Development"];
      
      setProjectIdeas(projectData);
      setIsGeneratingProjects(false);
    }, 3000);
  };
  
  // Handle downloading project ideas as PDF
  const handleDownloadProjectIdeas = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      if (projectsRef.current) {
        // Create a PDF representation using HTML2Canvas and jsPDF
        import('html2canvas')
          .then(html2canvas => html2canvas.default(projectsRef.current!))
          .then(canvas => {
            import('jspdf').then(({ default: jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              pdf.save(`${projectCategory}_Project_Ideas.pdf`.replace(/\s+/g, '_'));
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
              <li className="nav-item" onClick={() => window.location.href = '/skillup-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📚</span>
                </span>
                <span className="nav-text">SkillUp AI</span>
              </li>
              <li className="nav-item active">
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
          {/* ProjectIdeas AI Hero Section */}
          <section className="featured-jobs">
            <h2>Project Recommendations</h2>
            <div className="job-card" style={{ padding: "25px" }}>
              <div className="job-info">
                <h3 className="job-title">Discover industry-relevant projects to enhance your portfolio and demonstrate your skills.</h3>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
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
              </div>
            </div>
          </section>

          <section className="featured-jobs">
            <h2>Find Projects for Your Field</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
              <span 
                className="newly-added" 
                style={{ cursor: "pointer" }} 
                onClick={() => handleGenerateProjectIdeas("Software Development")}
              >
                Software Development
              </span>
              <span 
                className="newly-added" 
                style={{ cursor: "pointer" }} 
                onClick={() => handleGenerateProjectIdeas("Data Analysis")}
              >
                Data Analysis
              </span>
              <span 
                className="newly-added" 
                style={{ cursor: "pointer" }} 
                onClick={() => handleGenerateProjectIdeas("UX/UI Design")}
              >
                UX/UI Design
              </span>
              <span 
                className="newly-added" 
                style={{ cursor: "pointer" }} 
                onClick={() => handleGenerateProjectIdeas("Digital Marketing")}
              >
                Digital Marketing
              </span>
              <span 
                className="newly-added" 
                style={{ cursor: "pointer" }} 
                onClick={() => handleGenerateProjectIdeas("Project Management")}
              >
                Project Management
              </span>
              <span 
                className="newly-added" 
                style={{ cursor: "pointer" }} 
                onClick={() => handleGenerateProjectIdeas("Content Creation")}
              >
                Content Creation
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                Enter a custom field to get more targeted project recommendations:
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <input 
                  type="text"
                  placeholder="e.g., Machine Learning, Frontend Development, etc."
                  style={{ 
                    flex: 1,
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)"
                  }}
                  value={customProjectField}
                  onChange={(e) => setCustomProjectField(e.target.value)}
                />
                <button 
                  className="update-btn" 
                  onClick={() => handleGenerateProjectIdeas()}
                  disabled={isGeneratingProjects || !customProjectField.trim()}
                >
                  {isGeneratingProjects ? "Generating..." : "Get Custom Project Ideas"}
                </button>
              </div>
            </div>
          </section>
                
          {projectIdeas && (
            <section className="featured-jobs">
              <h2>Project Ideas for {projectCategory}:</h2>
              <div 
                ref={projectsRef}
                style={{ 
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  padding: "20px",
                  background: "white",
                  marginBottom: "20px"
                }}
              >
                <div>
                  <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Beginner Level Projects:</h3>
                  {projectIdeas.beginner.map((project: any, index: number) => (
                    <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
                      <h4 style={{ marginBottom: "5px", fontSize: "16px", color: "#333" }}>{project.title}</h4>
                      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>{project.description}</p>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Skills: </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                          {project.skills.map((skill: string, idx: number) => (
                            <span key={idx} style={{ fontSize: "12px", background: "#f1f1f1", padding: "3px 8px", borderRadius: "10px", color: "#666" }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: "13px", color: "#666" }}><b>Time Estimate:</b> {project.timeEstimate}</p>
                      <div style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Resources: </span>
                        <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "13px", color: "#666" }}>
                          {project.resources.map((resource: string, idx: number) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: "25px" }}>
                  <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Intermediate Level Projects:</h3>
                  {projectIdeas.intermediate.map((project: any, index: number) => (
                    <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
                      <h4 style={{ marginBottom: "5px", fontSize: "16px", color: "#333" }}>{project.title}</h4>
                      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>{project.description}</p>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Skills: </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                          {project.skills.map((skill: string, idx: number) => (
                            <span key={idx} style={{ fontSize: "12px", background: "#f1f1f1", padding: "3px 8px", borderRadius: "10px", color: "#666" }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: "13px", color: "#666" }}><b>Time Estimate:</b> {project.timeEstimate}</p>
                      <div style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Resources: </span>
                        <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "13px", color: "#666" }}>
                          {project.resources.map((resource: string, idx: number) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: "25px" }}>
                  <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Advanced Level Projects:</h3>
                  {projectIdeas.advanced.map((project: any, index: number) => (
                    <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
                      <h4 style={{ marginBottom: "5px", fontSize: "16px", color: "#333" }}>{project.title}</h4>
                      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>{project.description}</p>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Skills: </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                          {project.skills.map((skill: string, idx: number) => (
                            <span key={idx} style={{ fontSize: "12px", background: "#f1f1f1", padding: "3px 8px", borderRadius: "10px", color: "#666" }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: "13px", color: "#666" }}><b>Time Estimate:</b> {project.timeEstimate}</p>
                      <div style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Resources: </span>
                        <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "13px", color: "#666" }}>
                          {project.resources.map((resource: string, idx: number) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "15px" }}>
                <button 
                  className="update-btn"
                  onClick={handleDownloadProjectIdeas}
                  disabled={isDownloading}
                >
                  {isDownloading ? "Preparing PDF..." : "Download Project Ideas"}
                </button>
              </div>
            </section>
          )}

          {/* How ProjectIdeas AI Works */}
          <section className="featured-jobs">
            <h2>How ProjectIdeas AI Works</h2>
            <div className="work-mode-options" style={{ marginTop: "15px" }}>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">1. Select your field</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">2. AI generates project ideas</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">3. Choose projects by skill level</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">4. Build your portfolio</span>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Your Portfolio</h2>
            <div className="profile-image" style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "var(--text-gray)" }}>No projects added yet</p>
            </div>
            <button className="update-btn">Track Your Projects</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Project Management Tools</h2>
            <p className="card-subtitle">
              Track your project progress and showcase your completed work with our portfolio builder.
            </p>
            <p className="scholarship-text">Free tools for JFH members!</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }}>Access Tools</button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Featured Portfolios</h2>
            <p className="card-subtitle">
              Get inspired by browsing portfolios from women who have successfully built career-changing projects
            </p>
            <div style={{ marginTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>UX Designer Portfolio</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Full-Stack Developer Projects</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Data Analyst Showcase</span>
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

export default ProjectIdeasAI;