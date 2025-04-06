import React, { useState, useRef } from 'react';

interface ProjectRecommendationsProps {
  onViewAllClick?: () => void;
}

export function ProjectRecommendations({ onViewAllClick }: ProjectRecommendationsProps) {
  const [projectCategory, setProjectCategory] = useState<string>("");
  const [customProjectField, setCustomProjectField] = useState<string>("");
  const [projectIdeas, setProjectIdeas] = useState<any>(null);
  const [isGeneratingProjects, setIsGeneratingProjects] = useState<boolean>(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  
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
              description: "Create a responsive personal portfolio website that showcases your projects and skills.",
              skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
              timeEstimate: "2-3 weeks"
            },
            {
              title: "Task Management Application",
              description: "Build a task management app with features like task creation and prioritization.",
              skills: ["React/Vue", "State Management", "Local Storage"],
              timeEstimate: "3-4 weeks"
            }
          ]
        },
        "Data Analysis": {
          beginner: [
            {
              title: "Sales Data Visualization",
              description: "Create a dashboard that visualizes sales data to identify trends and patterns.",
              skills: ["Data Cleaning", "Visualization", "Basic Statistics"],
              timeEstimate: "2-3 weeks"
            },
            {
              title: "Customer Segmentation",
              description: "Analyze customer data to identify distinct segments based on behavior.",
              skills: ["Data Wrangling", "Clustering", "Data Visualization"],
              timeEstimate: "3-4 weeks"
            }
          ]
        },
        "UX/UI Design": {
          beginner: [
            {
              title: "Mobile App Redesign",
              description: "Redesign an existing app to improve user experience and visual design.",
              skills: ["User Research", "Wireframing", "Visual Design"],
              timeEstimate: "3-4 weeks"
            }
          ]
        },
        "Digital Marketing": {
          beginner: [
            {
              title: "Social Media Campaign",
              description: "Plan and execute a social media campaign for a product or service.",
              skills: ["Content Strategy", "Analytics", "Visual Content"],
              timeEstimate: "3-4 weeks"
            }
          ]
        }
      };
      
      // Default to Software Development if the category isn't found
      const projectData = projectsByField[fieldToUse] || projectsByField["Software Development"];
      
      setProjectIdeas(projectData);
      setIsGeneratingProjects(false);
    }, 1500);
  };

  return (
    <div className="project-recommendations">
      <h2 className="card-title">Portfolio Project Ideas</h2>
      <p className="card-subtitle" style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
        Enhance your resume with relevant projects
      </p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "15px" }}>
        <span 
          className="project-category" 
          style={{ 
            cursor: "pointer",
            padding: "5px 10px",
            background: "var(--primary-light)",
            borderRadius: "15px",
            fontSize: "12px"
          }} 
          onClick={() => handleGenerateProjectIdeas("Software Development")}
        >
          Software Dev
        </span>
        <span 
          className="project-category" 
          style={{ 
            cursor: "pointer",
            padding: "5px 10px",
            background: "var(--light-purple)",
            borderRadius: "15px",
            fontSize: "12px"
          }} 
          onClick={() => handleGenerateProjectIdeas("Data Analysis")}
        >
          Data Analysis
        </span>
        <span 
          className="project-category" 
          style={{ 
            cursor: "pointer",
            padding: "5px 10px",
            background: "#e8f5e9",
            borderRadius: "15px",
            fontSize: "12px"
          }} 
          onClick={() => handleGenerateProjectIdeas("UX/UI Design")}
        >
          UX/UI Design
        </span>
      </div>
      
      {isGeneratingProjects ? (
        <div style={{ textAlign: "center", padding: "15px" }}>
          <p>Generating project ideas...</p>
        </div>
      ) : projectIdeas ? (
        <div ref={projectsRef}>
          <h3 style={{ marginBottom: "10px", fontSize: "15px" }}>{projectCategory} Projects</h3>
          {projectIdeas.beginner && projectIdeas.beginner.slice(0, 2).map((project: any, index: number) => (
            <div key={index} style={{ 
              marginBottom: "15px", 
              padding: "10px", 
              borderRadius: "8px",
              border: "1px solid var(--border-light)",
              background: "#f9f9f9"
            }}>
              <h4 style={{ marginBottom: "5px", fontSize: "14px", display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "8px", fontSize: "16px" }}>
                  {project.title.includes("Website") ? "🌐" : 
                   project.title.includes("Dashboard") ? "📊" : 
                   project.title.includes("App") ? "📱" : 
                   project.title.includes("Data") ? "📈" : 
                   project.title.includes("Analysis") ? "🔍" : "📂"}
                </span>
                {project.title}
              </h4>
              <p style={{ fontSize: "12px", color: "var(--text-gray)", marginBottom: "5px" }}>
                {project.description}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {project.skills.slice(0, 2).map((skill: string, i: number) => (
                    <span key={i} style={{ 
                      fontSize: "10px", 
                      background: "#f1f1f1", 
                      padding: "3px 6px", 
                      borderRadius: "10px" 
                    }}>
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 2 && (
                    <span style={{ 
                      fontSize: "10px", 
                      padding: "3px 0", 
                    }}>+{project.skills.length - 2}</span>
                  )}
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-gray)" }}>
                  {project.timeEstimate}
                </span>
              </div>
            </div>
          ))}
          <button 
            className="update-btn" 
            style={{ 
              width: "100%", 
              textAlign: "center", 
              marginTop: "10px",
              fontSize: "14px",
              padding: "8px"
            }}
            onClick={onViewAllClick}
          >
            View All Projects
          </button>
        </div>
      ) : (
        <div style={{ 
          padding: "15px", 
          borderRadius: "8px",
          border: "1px dashed var(--border-light)",
          textAlign: "center",
          marginTop: "10px"
        }}>
          <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
            Click on a category above to see project ideas
          </p>
        </div>
      )}
    </div>
  );
}