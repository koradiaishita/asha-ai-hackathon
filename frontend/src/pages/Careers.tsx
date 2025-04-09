import React from 'react';
import '../App.css';
import '../pages/BackToHome.css';

function Careers() {
  // Navigation handler to go back to home
  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="herkey-logo">JobsForHer</span>
          <span className="turns-ten">empowering women</span>
        </div>
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Main Content */}
        <main className="main-content" style={{ flex: 1, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span 
              onClick={navigateToHome} 
              style={{ 
                cursor: 'pointer',
                marginRight: '10px',
                fontSize: '24px',
                display: 'inline-block',
                width: '30px',
                height: '30px',
                lineHeight: '30px',
                textAlign: 'center',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                background: 'transparent',
                color: 'var(--primary)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              ←
            </span>
            <h2>Career Application</h2>
          </div>

          <div style={{ 
            background: '#fff',
            borderRadius: '8px',
            padding: '25px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              background: 'var(--primary-light)',
              padding: '15px',
              borderRadius: '6px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '5px' }}>Application Submitted!</h3>
              <p>Thank you for applying. Our team will review your application and get back to you soon.</p>
            </div>

            <h3 style={{ marginBottom: '20px' }}>Complete Your Application</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Additional information saved! We'll update your application.');
            }} style={{ 
              backgroundColor: 'rgba(236, 242, 255, 0.7)', 
              padding: '20px', 
              borderRadius: '8px',
              border: '1px solid #dbe4ff'
            }}>
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ color: '#3F51B5', marginBottom: '15px' }}>How Resume AI Works</h4>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '10px', 
                  backgroundColor: '#ffffff', 
                  padding: '15px',
                  borderRadius: '6px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      backgroundColor: '#3F51B5', 
                      color: 'white', 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>1</span>
                    <span>Upload your resume</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      backgroundColor: '#3F51B5', 
                      color: 'white', 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>2</span>
                    <span>AI analyzes strengths & gaps</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      backgroundColor: '#3F51B5', 
                      color: 'white', 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>3</span>
                    <span>Get personalized suggestions</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      backgroundColor: '#3F51B5', 
                      color: 'white', 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>4</span>
                    <span>Download enhanced resume</span>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Update your resume
                </label>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Why are you interested in this position?
                </label>
                <textarea 
                  rows={4}
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Share why you're interested in this role and what makes you a good fit..."
                ></textarea>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Availability to start
                </label>
                <select
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Select your availability</option>
                  <option value="immediately">Immediately</option>
                  <option value="2weeks">2 weeks notice</option>
                  <option value="1month">1 month notice</option>
                  <option value="2months">2+ months notice</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                  <input
                    type="checkbox"
                    style={{ marginRight: '8px' }}
                  />
                  I agree to receive job-related communications
                </label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button 
                  type="button"
                  style={{ 
                    padding: '10px 20px',
                    background: 'transparent',
                    color: 'var(--primary)',
                    border: '1px solid var(--primary)',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={navigateToHome}
                >
                  Back to Jobs
                </button>
                
                <button 
                  type="submit"
                  style={{ 
                    padding: '10px 20px',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Save Additional Info
                </button>
              </div>
            </form>
          </div>

          <div style={{ 
            marginTop: '20px',
            background: '#fff',
            borderRadius: '8px',
            padding: '25px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '15px' }}>Similar Job Recommendations</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Similar job 1 */}
              <div style={{ 
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '5px' }}>Senior UX Designer</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
                    Design Studio • Bangalore • Remote
                  </p>
                </div>
                <button 
                  style={{ 
                    padding: '8px 15px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Apply
                </button>
              </div>

              {/* Similar job 2 */}
              <div style={{ 
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '5px' }}>Product Designer</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
                    Tech Innovations • Hyderabad • Hybrid
                  </p>
                </div>
                <button 
                  style={{ 
                    padding: '8px 15px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Apply
                </button>
              </div>

              {/* Similar job 3 */}
              <div style={{ 
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '5px' }}>UI/UX Specialist</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
                    Digital Solutions • Mumbai • Work From Home
                  </p>
                </div>
                <button 
                  style={{ 
                    padding: '8px 15px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Careers;
