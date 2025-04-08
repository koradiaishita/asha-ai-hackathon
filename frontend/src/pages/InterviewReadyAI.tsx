import { useState, useRef } from 'react';
import { ChatWidget } from '../components/ChatWidget';
import '../App.css';

function InterviewReadyAI() {
  // Interview preparation state and handlers
  const [interviewQuestions, setInterviewQuestions] = useState<any>(null);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState<boolean>(false);
  const [jobTitleForInterview, setJobTitleForInterview] = useState<string>("");
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const questionsRef = useRef<HTMLDivElement>(null);
  
  // Add a navigation handler that will be implemented when router is installed
  const navigateToHome = () => {
    window.location.href = '/'; // Simple navigation without router
  };
  
  // Toggle question expansion to show/hide answers
  const toggleQuestionExpansion = (category: string, index: number) => {
    const questionId = `${category}-${index}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Handle generating interview questions
  const handleGenerateInterviewQuestions = () => {
    if (!jobTitleForInterview.trim()) {
      alert("Please enter a job title to generate relevant interview questions.");
      return;
    }
    
    setIsGeneratingInterview(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, we would send the job title and resume to an API
      setInterviewQuestions({
        roleSpecific: [
          {
            question: "Describe your experience with agile development methodologies.",
            answer: "In my previous role at XYZ company, I worked in a scrum environment where we had daily stand-ups, bi-weekly sprints, and regular retrospectives. I contributed to refining user stories, participated in planning poker for estimations, and helped maintain our team's Kanban board. This agile approach helped us deliver incremental value to customers while adapting to changing requirements efficiently."
          },
          {
            question: "How do you approach testing and quality assurance in your projects?",
            answer: "I believe in a proactive approach to quality, where testing is integrated throughout the development lifecycle. I write unit tests for my code and participate in code reviews. For larger features, I create test plans covering various scenarios including edge cases. I've also implemented automated testing pipelines to catch regressions early. When bugs are identified, I document steps to reproduce, fix the issue, and add regression tests."
          },
          {
            question: "Can you explain your process for solving complex technical problems?",
            answer: "I follow a systematic approach: First, I ensure I understand the problem thoroughly, asking clarifying questions if needed. Then I break it down into smaller, manageable components. I research existing solutions and best practices, then formulate potential approaches. Before implementing, I evaluate each approach based on factors like performance, scalability, and maintenance. Once I've chosen a solution, I implement it incrementally, testing each step. Finally, I document the solution and any lessons learned for future reference."
          },
          {
            question: "What tools and frameworks are you most experienced with?",
            answer: "I have extensive experience with [specific tools/frameworks relevant to the job]. For example, I've used React for building complex user interfaces, Node.js for backend services, and MongoDB for database solutions. I'm proficient with Git for version control and have experience with CI/CD tools like Jenkins. I stay updated with industry trends and continuously learn new technologies through online courses and personal projects."
          },
          {
            question: "How do you stay updated with the latest technologies in your field?",
            answer: "I follow industry blogs and newsletters like [specific examples], participate in online communities such as Stack Overflow and GitHub, and attend virtual conferences and webinars. I dedicate time each week to learning through platforms like Udemy and Coursera. I also build side projects to experiment with new technologies and contribute to open-source projects when possible, which helps me gain practical experience with emerging tools and frameworks."
          }
        ],
        behavioral: [
          {
            question: "Tell me about a time when you had to meet a tight deadline.",
            answer: "At my previous company, we had a critical client deliverable with an immovable deadline due to regulatory requirements. Two weeks before delivery, we discovered significant changes needed to the data processing pipeline. I immediately assessed the situation, reprioritized our sprint backlog, and divided tasks among team members based on strengths. I worked extra hours to handle the most complex components while keeping stakeholders informed of our progress. We successfully delivered on time by focusing on essential requirements first and implementing an efficient testing strategy. This experience reinforced my ability to perform under pressure and make quick, effective decisions."
          },
          {
            question: "Describe a situation where you had to work with a difficult team member.",
            answer: "I once collaborated with a team member who was resistant to adopting new methodologies that the rest of the team had agreed to implement. Instead of escalating the issue immediately, I scheduled a one-on-one meeting to understand their concerns. I discovered they had previous negative experiences with similar changes and were worried about productivity impacts. I acknowledged their concerns and suggested we try the new approach with a small, low-risk project first, with clear checkpoints to evaluate success. By respecting their experience while encouraging growth, they gradually became more comfortable with the change and eventually became an advocate for the new methodologies."
          },
          {
            question: "How do you handle criticism of your work?",
            answer: "I view constructive criticism as valuable feedback that helps me grow professionally. When receiving criticism, I listen actively without becoming defensive, ask clarifying questions to fully understand the concerns, and thank the person for their input. I then evaluate the feedback objectively and develop an action plan for improvement. For example, after a code review where my documentation was criticized, I immediately improved that specific code and also created better documentation templates for future projects. I regularly seek feedback proactively because I believe continuous improvement is essential for professional growth."
          },
          {
            question: "Give an example of when you took initiative on a project.",
            answer: "During a web application project, I noticed our user authentication process was creating friction for new users, leading to a high drop-off rate. Though it wasn't part of my assigned tasks, I researched best practices for authentication flows and created a prototype of an improved system. I presented this to my team lead with data on potential impact, and after receiving approval, implemented the solution. The result was a 30% increase in new user registrations. This experience showed me the importance of looking beyond assigned tasks to find opportunities for meaningful improvements."
          },
          {
            question: "How do you prioritize tasks when you have multiple deadlines?",
            answer: "I use a combination of urgency, importance, and effort required to prioritize tasks. First, I identify any dependencies that might block other work. Then I assess each task's impact on business goals and stakeholder needs. For complex situations, I create a priority matrix to visualize these factors. I also maintain open communication with stakeholders to ensure alignment on priorities. During a recent product launch, we faced competing deadlines for multiple features. By using this approach, I helped the team focus on the highest-impact items first, resulting in a successful launch with all essential features, while less critical items were scheduled for the next release."
          }
        ],
        technical: [
          {
            question: "Explain the difference between REST and GraphQL APIs.",
            answer: "REST APIs organize data into multiple endpoints, each returning fixed data structures. Clients typically need multiple requests to different endpoints to gather complete information. GraphQL, however, provides a single endpoint where clients can specify exactly what data they need. This reduces over-fetching and under-fetching of data. REST excels in caching and is widely adopted, while GraphQL offers more flexibility and efficiency in data retrieval, particularly for complex applications with varying data requirements. I've implemented both approaches and choose between them based on project needs, using REST for simpler applications and GraphQL for more complex UIs with diverse data needs."
          },
          {
            question: "How would you optimize a slow-performing application?",
            answer: "I follow a methodical approach to optimization: First, I identify bottlenecks through profiling and monitoring tools rather than making assumptions. Once I understand where the performance issues lie—whether in database queries, network requests, frontend rendering, or elsewhere—I address them systematically. For database issues, I might optimize queries, add indexes, or implement caching. For frontend performance, I could implement code splitting, lazy loading, or optimize render cycles. Throughout the process, I establish performance metrics and conduct benchmark tests to quantify improvements. I also focus on balancing performance gains against code complexity to ensure maintainability."
          },
          {
            question: "Describe your approach to data structures and algorithms.",
            answer: "I believe in selecting the appropriate data structure or algorithm based on the specific requirements and constraints of the problem. While optimizing for runtime and space complexity is important, I also consider readability, maintainability, and the specific use case. For example, while a hash map provides O(1) lookups, a simple array might be more appropriate for small datasets where cache locality matters. When tackling complex problems, I start by understanding the requirements thoroughly, then consider different approaches before implementing. I've applied this thinking in practice when I optimized our application's search functionality by replacing a linear search algorithm with a more efficient indexed approach, significantly improving performance for large datasets."
          },
          {
            question: "What security considerations do you keep in mind when developing applications?",
            answer: "Security needs to be integrated throughout the development process, not added as an afterthought. I focus on several key areas: input validation to prevent injection attacks; proper authentication and authorization to ensure users can only access appropriate resources; data encryption both in transit and at rest; secure handling of sensitive information like credentials and tokens; and protection against common vulnerabilities like XSS and CSRF. I stay updated on security best practices and use tools like static analysis and vulnerability scanners. In my previous role, I implemented a security review process that became standard practice for all releases, helping us identify and address potential vulnerabilities before deployment."
          },
          {
            question: "How do you ensure your code is maintainable and scalable?",
            answer: "Maintainability starts with clean, well-structured code following consistent patterns and style guidelines. I write self-documenting code with descriptive naming and add comments for complex logic. For scalability, I design systems with appropriate abstractions and separation of concerns, making it easier to modify components without affecting others. I use principles like SOLID and design patterns where appropriate. Testing is also crucial—I write unit and integration tests to verify behavior and catch regressions. In previous projects, I've implemented modular architectures that allowed us to scale specific components independently as user load increased. I also emphasize knowledge sharing through documentation and code reviews to ensure the entire team understands the system design."
          }
        ],
        suggested: [
          {
            question: "Your resume mentions experience with [specific technology]. Can you elaborate on a challenging project where you used it?",
            answer: "In my role at [previous company], I led a project to [specific example relevant to the mentioned technology]. The main challenge was [describe technical or business challenge]. I applied [specific technology] by [explain implementation details]. This required deep understanding of [relevant technical concepts]. The outcome was [quantifiable results if possible]. This experience strengthened my abilities in [relevant skills] and demonstrated how [specific technology] can be leveraged to solve complex business problems effectively."
          },
          {
            question: "I see you worked at [previous company]. What was the most valuable lesson you learned there?",
            answer: "My time at [previous company] taught me the critical importance of [key lesson - e.g., cross-functional collaboration, user-centered design, data-driven decision making]. In that environment, I observed how [specific example of the lesson in practice]. One particular project demonstrated this when [brief story illustrating the lesson]. This experience fundamentally shaped my approach to [relevant aspect of professional practice] and I've since applied this lesson at [another company or project] by [specific application of the lesson], which resulted in [positive outcome]."
          },
          {
            question: "You list [skill] on your resume. How have you applied this in your previous roles?",
            answer: "I've applied [skill] extensively throughout my career. At [previous company], I [specific example of using the skill in a professional context]. This required me to [describe technical or professional application]. The challenge was [describe obstacle or complexity]. By leveraging my expertise in [skill], I was able to [describe solution or approach]. The result was [quantifiable outcome if possible]. Additionally, I've continued developing this skill through [mention relevant training, projects, or continued education], which has allowed me to [describe how skill has evolved or been further applied]."
          },
          {
            question: "Can you walk me through how you would approach [specific scenario relevant to the job]?",
            answer: "For approaching [specific scenario], I would start by [initial step - e.g., gathering requirements, analyzing data, consulting stakeholders]. This provides the foundation for [reason for this approach]. Next, I would [second step in the process], focusing particularly on [key considerations]. When challenges arise, such as [anticipated obstacle], my strategy would be to [mitigation approach]. Throughout the process, I would ensure [ongoing considerations - e.g., communication, quality control, stakeholder updates]. I applied a similar approach when [brief example from past experience] which resulted in [positive outcome]. This structured methodology ensures comprehensive solutions while maintaining flexibility to adapt to changing requirements."
          },
          {
            question: "What aspects of [job function] do you find most interesting and why?",
            answer: "I'm particularly drawn to [specific aspect of job function] because it combines [technical element] with [broader impact or purpose]. The challenge of [specific challenge in this area] requires both analytical thinking and creative problem-solving, which aligns perfectly with my strengths. I find satisfaction in [specific outcome or impact of this work]. My interest developed through [relevant experience or project] where I discovered how [insight gained]. I stay engaged with this aspect of [job function] by [continuous learning approach - e.g., following industry trends, participating in relevant communities]. This passion drives me to continuously improve and contribute meaningfully to organizations through [specific contributions related to this aspect]."
          }
        ]
      });
      
      setIsGeneratingInterview(false);
    }, 3000);
  };

  // Handle downloading interview questions as PDF
  const handleDownloadInterviewQuestions = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      if (questionsRef.current) {
        // Create a PDF representation using HTML2Canvas and jsPDF
        import('html2canvas')
          .then(html2canvas => html2canvas.default(questionsRef.current!))
          .then(canvas => {
            import('jspdf').then(({ default: jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              pdf.save(`Interview_Questions_${jobTitleForInterview.replace(/\s+/g, '_')}.pdf`);
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
              <li className="nav-item" onClick={() => window.location.href = '/project-ideas-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📂</span>
                </span>
                <span className="nav-text">ProjectIdeas AI</span>
              </li>
              <li className="nav-item active">
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
          {/* InterviewReady AI Hero Section */}
          <section className="featured-jobs">
            <h2>Ace Your Next Interview</h2>
            <div className="job-card" style={{ padding: "25px" }}>
              <div className="job-info">
                <h3 className="job-title">Prepare for interviews with personalized questions based on your resume and target role</h3>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                  Our AI analyzes your resume and target job descriptions to create a personalized
                  interview preparation guide with likely questions and suggested answers.
                </p>
              </div>
            </div>
          </section>

          <section className="featured-jobs">
            <h2>How Our Interview Guide Helps</h2>
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
          </section>
          
          <section className="featured-jobs">
            <h2>Generate Interview Questions</h2>
            <div style={{ marginTop: "20px", padding: "15px", background: "var(--primary-light)", borderRadius: "8px" }}>
              <h4 style={{ marginBottom: "10px" }}>Enter Job Title:</h4>
              <input 
                type="text"
                placeholder="e.g., Software Engineer"
                style={{ 
                  width: "100%", 
                  padding: "10px", 
                  borderRadius: "5px",
                  border: "1px solid var(--border-light)",
                  marginBottom: "15px"
                }}
                value={jobTitleForInterview}
                onChange={(e) => setJobTitleForInterview(e.target.value)}
              />
              <button 
                className="update-btn" 
                onClick={handleGenerateInterviewQuestions}
                disabled={isGeneratingInterview}
              >
                {isGeneratingInterview ? "Generating..." : "Generate Interview Questions"}
              </button>
            </div>
          </section>

          {interviewQuestions && (
            <section className="featured-jobs">
              <h2>Your Interview Questions for {jobTitleForInterview}</h2>
              <div 
                ref={questionsRef}
                style={{ 
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  padding: "20px",
                  background: "white",
                  marginBottom: "20px"
                }}
              >
                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Role-specific Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.roleSpecific.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`roleSpecific-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("roleSpecific", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Behavioral Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.behavioral.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`behavioral-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("behavioral", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Technical Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.technical.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`technical-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("technical", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Resume-Based Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.suggested.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`suggested-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("suggested", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
                <button 
                  className="update-btn"
                  onClick={handleDownloadInterviewQuestions}
                  disabled={isDownloading}
                >
                  {isDownloading ? "Preparing PDF..." : "Download Interview Questions"}
                </button>
                <button 
                  className="update-btn"
                  style={{ background: "var(--primary)" }}
                >
                  Start Mock Interview
                </button>
              </div>
            </section>
          )}

          {/* Interview Preparation Tips */}
          <section className="featured-jobs">
            <h2>Interview Preparation Tips</h2>
            <div className="job-card" style={{ padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>1. Research the Company</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Understand the company's mission, values, products/services, and recent news to demonstrate genuine interest.
                </p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>2. Practice Your Responses</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Rehearse answers to common questions using the STAR method (Situation, Task, Action, Result) for behavioral questions.
                </p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>3. Prepare Thoughtful Questions</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Have 3-5 insightful questions ready to ask the interviewer about the role, team, and company.
                </p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>4. Plan Your First Impression</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Dress appropriately, arrive early (or log in early for virtual interviews), and prepare a concise professional introduction.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>5. Follow Up Afterward</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Send a thank-you email within 24 hours expressing appreciation and reiterating your interest in the position.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Interview Success Rate</h2>
            <div className="profile-image" style={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "18px",
              color: "var(--text-gray)",
              height: "150px"
            }}>
              <div style={{ fontSize: "48px", color: "var(--primary)", fontWeight: "bold", marginBottom: "10px" }}>
                85%
              </div>
              <p style={{ fontSize: "14px" }}>of our users report interview success</p>
            </div>
            <button className="update-btn">Track Your Interviews</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Mock Interview Sessions</h2>
            <p className="card-subtitle">
              Practice with our AI-powered mock interviewer and get real-time feedback on your responses.
            </p>
            <p className="scholarship-text">First session free!</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }}>Book a Session</button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Interview Resources</h2>
            <p className="card-subtitle">
              Access additional resources to help you prepare for your interviews
            </p>
            <div style={{ marginTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Body Language Tips</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Salary Negotiation Guide</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Virtual Interview Best Practices</span>
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

export default InterviewReadyAI;