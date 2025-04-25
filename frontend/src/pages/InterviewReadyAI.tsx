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
  const [showMockInterviewModal, setShowMockInterviewModal] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userResponses, setUserResponses] = useState<{ [key: string]: string }>({});
  const [mockInterviewFinished, setMockInterviewFinished] = useState<boolean>(false);
  const questionsRef = useRef<HTMLDivElement>(null);
  
  // Interview tracking modal state
  const [showInterviewTracker, setShowInterviewTracker] = useState<boolean>(false);
  const [interviews, setInterviews] = useState<Array<{
    company: string;
    position: string;
    date: string;
    status: string;
    notes: string;
  }>>([
    {
      company: "Tech Solutions Inc.",
      position: "Senior Developer",
      date: "2025-04-15",
      status: "Completed",
      notes: "Technical interview with team lead. Discussed system architecture and API design."
    },
    {
      company: "Digital Innovations",
      position: "Frontend Engineer",
      date: "2025-04-20",
      status: "Scheduled",
      notes: "Second round with the product team. Prepare portfolio examples."
    }
  ]);
  const [newInterview, setNewInterview] = useState({
    company: "",
    position: "",
    date: "",
    status: "Scheduled",
    notes: ""
  });
  
  // Book a session modal state
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    type: "Mock Interview"
  });
  const [bookSessionModal, setBookSessionModal] = useState<boolean>(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState<boolean>(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    topic: ""
  });
  
  // Resource modal states
  const [showBodyLanguageTips, setShowBodyLanguageTips] = useState<boolean>(false);
  const [showSalaryNegotiationGuide, setShowSalaryNegotiationGuide] = useState<boolean>(false);
  const [showVirtualInterviewTips, setShowVirtualInterviewTips] = useState<boolean>(false);
  
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

  // Handle booking session
  const handleBookSession = () => {
    setBookSessionModal(true);
  };
  
  // Handle closing booking modal
  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };

  const handleCloseBookSession = () => {
    setBookSessionModal(false);
  };

  const handleCloseBookingConfirmation = () => {
    setShowBookingConfirmation(false);
  };
  
  // Handle booking form input changes
  const handleBookingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value
    });
  };
  
  // Handle submitting booking form
  const handleSubmitBooking = () => {
    // Basic validation
    if (!bookingFormData.name || !bookingFormData.email || !bookingFormData.date || !bookingFormData.time || !bookingFormData.topic) {
      alert("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would send the booking info to an API
    setBookSessionModal(false);
    setShowBookingConfirmation(true);
  };
  
  // Handle opening resource modals
  const handleOpenBodyLanguageTips = () => {
    setShowBodyLanguageTips(true);
  };
  
  const handleOpenSalaryNegotiationGuide = () => {
    setShowSalaryNegotiationGuide(true);
  };
  
  const handleOpenVirtualInterviewTips = () => {
    setShowVirtualInterviewTips(true);
  };
  
  // Handle closing resource modals
  const handleCloseResourceModal = () => {
    setShowBodyLanguageTips(false);
    setShowSalaryNegotiationGuide(false);
    setShowVirtualInterviewTips(false);
  };

  // Handle opening the interview tracker modal
  const handleOpenInterviewTracker = () => {
    setShowInterviewTracker(true);
  };

  // Handle closing the interview tracker modal
  const handleCloseInterviewTracker = () => {
    setShowInterviewTracker(false);
  };
  
  // Handle adding a new interview to the tracker
  const handleAddInterview = () => {
    // Basic validation
    if (!newInterview.company || !newInterview.position || !newInterview.date) {
      alert("Please fill in all required fields (Company, Position, and Date)");
      return;
    }
    
    // Add the new interview to the list
    setInterviews([...interviews, newInterview]);
    
    // Reset the form
    setNewInterview({
      company: "",
      position: "",
      date: "",
      status: "Scheduled",
      notes: ""
    });
  };
  
  // Handle input changes for the new interview form
  const handleInterviewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInterview({
      ...newInterview,
      [name]: value
    });
  };
  
  // Handle deleting an interview from the tracker
  const handleDeleteInterview = (index: number) => {
    const updatedInterviews = [...interviews];
    updatedInterviews.splice(index, 1);
    setInterviews(updatedInterviews);
  };
  
  // Handle updating an interview status
  const handleUpdateInterviewStatus = (index: number, newStatus: string) => {
    const updatedInterviews = [...interviews];
    updatedInterviews[index] = {
      ...updatedInterviews[index],
      status: newStatus
    };
    setInterviews(updatedInterviews);
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
            <button className="update-btn" onClick={handleOpenInterviewTracker}>Track Your Interviews</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Mock Interview Sessions</h2>
            <p className="card-subtitle">
              Practice with our AI-powered mock interviewer and get real-time feedback on your responses.
            </p>
            <p className="scholarship-text">First session free!</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }} onClick={handleBookSession}>Book a Session</button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Interview Resources</h2>
            <p className="card-subtitle">
              Access additional resources to help you prepare for your interviews
            </p>
            <div style={{ marginTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }} onClick={handleOpenBodyLanguageTips}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Body Language Tips</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }} onClick={handleOpenSalaryNegotiationGuide}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Salary Negotiation Guide</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }} onClick={handleOpenVirtualInterviewTips}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Virtual Interview Best Practices</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Interview Tracker Modal */}
      {showInterviewTracker && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseInterviewTracker}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Interview Tracker</h2>
            
            {/* Add New Interview Form */}
            <div style={{ 
              marginBottom: "30px", 
              padding: "20px", 
              backgroundColor: "var(--primary-light)",
              borderRadius: "8px" 
            }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Add New Interview</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Company*
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newInterview.company}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Position*
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={newInterview.position}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Date*
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newInterview.date}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={newInterview.status}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Offer Received">Offer Received</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={newInterview.notes}
                  onChange={handleInterviewInputChange}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    minHeight: "80px"
                  }}
                  placeholder="Add any notes about the interview, questions asked, or follow-up tasks..."
                />
              </div>
              
              <button 
                onClick={handleAddInterview}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Add Interview
              </button>
            </div>
            
            {/* Interviews List */}
            <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Your Interviews</h3>
            
            {interviews.length === 0 ? (
              <p>No interviews tracked yet. Add your first interview above.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Company</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Position</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Date</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Status</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map((interview, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px" }}>{interview.company}</td>
                        <td style={{ padding: "10px" }}>{interview.position}</td>
                        <td style={{ padding: "10px" }}>{new Date(interview.date).toLocaleDateString()}</td>
                        <td style={{ padding: "10px" }}>
                          <select
                            value={interview.status}
                            onChange={(e) => handleUpdateInterviewStatus(index, e.target.value)}
                            style={{ 
                              padding: "5px", 
                              borderRadius: "5px",
                              border: "1px solid var(--border-light)"
                            }}
                          >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Offer Received">Offer Received</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              onClick={() => {
                                // Show notes in an alert for simplicity
                                alert(`Notes for ${interview.company} interview:\n\n${interview.notes || "No notes available"}`);
                              }}
                              style={{
                                backgroundColor: "#f0f0f0",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                            </button>
                            <button
                              onClick={() => handleDeleteInterview(index)}
                              style={{
                                backgroundColor: "#ffebee",
                                color: "#d32f2f",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                cursor: "pointer"
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Book a Session Modal */}
      {bookSessionModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "500px",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseBookSession}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Book a Session</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmitBooking();
            }}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name</label>
                <input
                  type="text"
                  id="name"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.name}
                  onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                  required
                />
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                <input
                  type="email"
                  id="email"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.email}
                  onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                  required
                />
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="date" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Date</label>
                <input
                  type="date"
                  id="date"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.date}
                  onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="time" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Time</label>
                <select
                  id="time"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.time}
                  onChange={(e) => setBookingFormData({...bookingFormData, time: e.target.value})}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="topic" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Session Topic</label>
                <select
                  id="topic"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.topic}
                  onChange={(e) => setBookingFormData({...bookingFormData, topic: e.target.value})}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="Mock Interview">Mock Interview</option>
                  <option value="Resume Review">Resume Review</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="Technical Preparation">Technical Preparation</option>
                  <option value="Behavioral Interview Prep">Behavioral Interview Prep</option>
                </select>
              </div>
              
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Schedule Session
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingConfirmation && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "500px",
            padding: "25px",
            position: "relative",
            textAlign: "center"
          }}>
            <h2 style={{ marginBottom: "15px", color: "var(--primary)" }}>Booking Confirmed!</h2>
            <p style={{ marginBottom: "20px", fontSize: "16px" }}>
              Your session has been booked successfully. We've sent a confirmation email to {bookingFormData.email} with all the details.
            </p>
            <p style={{ marginBottom: "30px", fontSize: "15px" }}>
              <strong>Date:</strong> {bookingFormData.date}<br />
              <strong>Time:</strong> {bookingFormData.time}<br />
              <strong>Topic:</strong> {bookingFormData.topic}
            </p>
            <button
              onClick={handleCloseBookingConfirmation}
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Resource Modals */}
      {/* Body Language Tips Modal */}
      {showBodyLanguageTips && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseResourceModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Body Language Tips for Interviews</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>1. Maintain Good Posture</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Sit up straight with shoulders back but relaxed. Good posture conveys confidence and attentiveness.
                Avoid slouching or leaning too far back, which can signal disinterest or overconfidence.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>2. Practice Effective Eye Contact</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Maintain natural eye contact with your interviewer(s), looking at them for 5-7 seconds at a time before briefly looking away.
                In panel interviews, make eye contact with the person asking the question, but also glance at other panel members while answering.
                For virtual interviews, look at your camera (not the screen) to create the impression of eye contact.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>3. Monitor Your Hand Gestures</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Use natural, open hand gestures to emphasize points and show engagement.
                Keep gestures contained within your personal space—wild movements can be distracting.
                Avoid nervous habits like pen-clicking, hair-twirling, or excessive fidgeting.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>4. Present an Engaged Expression</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Display a pleasant, attentive facial expression with occasional smiles.
                Nod occasionally to show you're listening and understanding.
                Be mindful of unconscious facial expressions that might convey confusion or disagreement.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>5. Control Your Nervous Energy</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Practice deep, slow breathing before and during the interview to remain calm.
                Plant both feet on the floor to ground yourself and reduce leg-shaking.
                Channel nervous energy into focused enthusiasm rather than random movements.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>6. Mirror Appropriately</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Subtly match the interviewer's communication style and energy level to build rapport.
                Don't overdo mirroring—it should feel natural, not forced.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>7. Practice Before the Interview</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Record yourself during mock interviews to identify unconscious body language habits.
                Practice with a friend who can provide feedback on your nonverbal communication.
                Rehearse in similar attire and setting as the actual interview to feel more comfortable.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Salary Negotiation Guide Modal */}
      {showSalaryNegotiationGuide && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseResourceModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Salary Negotiation Guide</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>1. Research Your Market Value</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Use sites like Glassdoor, Payscale, and LinkedIn Salary to research typical compensation for your role, experience level, and location.
                Speak with industry colleagues or recruiters to gather additional data points.
                Consider your unique skills and qualifications that might place you above the average.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>2. Delay Salary Discussions</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                When possible, avoid sharing your salary expectations early in the interview process.
                If asked directly, you can say: "I'd like to learn more about the role and responsibilities before discussing compensation."
                If pressed, provide a salary range rather than a specific number.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>3. Let the Employer Make the First Offer</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Ideally, let the employer name a figure first to avoid undervaluing yourself.
                When they make an offer, thank them and ask for time to consider it (24-48 hours is reasonable).
                Use this time to carefully evaluate the entire compensation package, not just the base salary.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>4. Make a Counter-Offer</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Begin your response by expressing enthusiasm for the role and appreciation for the offer.
                Present your counter-offer at the higher end of your researched range.
                Justify your counter with specific points about your skills, experience, and the value you'll bring.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>5. Consider the Total Package</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Remember that compensation includes more than just base salary (benefits, bonuses, equity, PTO, flexibility, etc.).
                If there's limited flexibility on salary, negotiate for improvements in other areas of the package.
                Prioritize the elements that matter most to you and focus your negotiations there.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>6. Use the Right Language</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Frame your requests collaboratively rather than adversarially: "How can we find a package that works for both of us?"
                Use confident but respectful language: "Based on my research and experience, I was expecting a salary closer to X."
                Express gratitude throughout the process, regardless of the outcome.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>7. Get It in Writing</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Once you've reached an agreement, request a formal offer letter that details all aspects of the compensation package.
                Review the letter carefully to ensure it matches your understanding of the agreement.
                Don't be afraid to ask for clarification on any unclear items before accepting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Interview Best Practices Modal */}
      {showVirtualInterviewTips && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseResourceModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Virtual Interview Best Practices</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>1. Test Your Technology</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Test your camera, microphone, and internet connection at least 24 hours before the interview.
                Familiarize yourself with the video platform being used (Zoom, Microsoft Teams, Google Meet, etc.).
                Have a backup plan ready in case of technical difficulties (phone number to call, alternative device).
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>2. Set Up Your Environment</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Choose a quiet location with minimal background distractions.
                Ensure you have good lighting on your face (natural light is best, or position a lamp in front of you).
                Arrange a neutral, professional background or use a simple virtual background if needed.
                Position your camera at eye level and sit at an appropriate distance (head and shoulders should be visible).
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>3. Dress Professionally</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Dress as you would for an in-person interview, including bottoms (in case you need to stand up).
                Avoid busy patterns or bright colors that can be distracting on camera.
                Consider how your outfit appears on screen—test your appearance in advance.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>4. Mind Your Virtual Body Language</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Look at the camera (not the screen) when speaking to create the impression of eye contact.
                Sit up straight with good posture and avoid excessive movement.
                Nod and smile to show engagement, as some nonverbal cues are lost in virtual settings.
                Keep hand gestures within the frame when emphasizing points.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>5. Eliminate Distractions</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Turn off notifications on your computer and phone.
                Close unnecessary browser tabs and applications.
                Inform household members about your interview to prevent interruptions.
                Have a "do not disturb" sign ready if needed.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>6. Prepare Your Materials</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Have a copy of your resume, the job description, and prepared notes within reach.
                Keep a notepad and pen handy for taking notes during the interview.
                Have a glass of water nearby in case your throat gets dry.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>7. Practice Virtual Interview Etiquette</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Join the meeting 5-10 minutes early to address any last-minute technical issues.
                Mute yourself when not speaking if there's any background noise.
                Speak clearly and slightly slower than normal, pausing occasionally to account for possible audio delays.
                If experiencing technical difficulties, stay calm and communicate the issue professionally.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewReadyAI;