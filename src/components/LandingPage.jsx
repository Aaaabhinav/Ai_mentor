import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="main_container bg-gray-900">
      <nav className="nav-gradient fixed w-full z-50">
        <div className="max-w-100 flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="AI Mentor Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">AI Mentor</span>
          </a>
          <button 
            onClick={toggleMenu}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" 
            aria-controls="navbar-solid-bg" 
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <a href="#home" className="block py-2 px-3 md:p-0 text-white bg-purple-600 rounded-lg md:bg-transparent md:text-purple-400 md:hover:text-purple-300">Home</a>
              </li>
              <li>
                <a href="#about" className="block py-2 px-3 md:p-0 text-white rounded-lg hover:bg-gray-700 md:hover:bg-transparent md:hover:text-purple-300">About</a>
              </li>
              <li>
                <a href="#services" className="block py-2 px-3 md:p-0 text-white rounded-lg hover:bg-gray-700 md:hover:bg-transparent md:hover:text-purple-300">Services</a>
              </li>
              <li>
                <a href="#contact" className="block py-2 px-3 md:p-0 text-white rounded-lg hover:bg-gray-700 md:hover:bg-transparent md:hover:text-purple-300">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="landing-page">
        {/* Hero Section */}
        <div id="home" className="hero-section">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-5xl font-bold mb-8">Welcome to AI Mentor</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Empowering educators with AI-powered assistance to provide personalized feedback at scale
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <button 
                onClick={() => navigate('/direct-response')} 
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2"
              >
                Get Direct Response
              </button>
              <button 
                onClick={() => navigate('/weekly-scheduler')} 
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2"
              >
                Get Weekly Scheduler
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">About AI Mentor</h2>
            
            {/* Main About Content */}
            <div className="feature-card p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                    alt="Teachers helping students" 
                    className="rounded-2xl shadow-2xl w-full h-auto transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-purple-400">The Challenge</h3>
                    <p className="text-gray-300 text-left leading-relaxed">
                      Teachers in schools, coaching centers, and colleges often face a heavy workload when providing individualized feedback to students in large classrooms. Manual grading and feedback processes are time-consuming, leaving educators with limited time to focus on teaching and mentoring.
                    </p>
                    <p className="text-gray-300 text-left leading-relaxed">
                      This challenge is particularly acute in under-resourced settings, where teacher-to-student ratios are high. As a result, students miss out on personalized guidance, which is critical for their academic growth and success.
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-6 space-y-4">
                    <h3 className="text-2xl font-semibold text-purple-400">Our Solution</h3>
                    <p className="text-gray-300 text-left leading-relaxed">
                      AI Mentor addresses this challenge by providing an intelligent assistant that helps teachers automate grading and provide personalized feedback to each student. By reducing the administrative burden, educators can focus more on what they do best: inspiring and guiding students to reach their full potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="feature-card p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">Time Savings</h3>
                <p className="text-gray-400">
                  Reduce grading time by up to 70%, allowing teachers to focus on instructional activities and student engagement.
                </p>
              </div>
              <div className="feature-card p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">Consistent Feedback</h3>
                <p className="text-gray-400">
                  Provide reliable, consistent feedback to all students, eliminating unconscious biases in assessment.
                </p>
              </div>
              <div className="feature-card p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <div className="text-purple-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">Personalized Learning</h3>
                <p className="text-gray-400">
                  Tailor feedback to each student's unique needs, helping them understand their strengths and areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <div className="text-purple-600 dark:text-purple-400 mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Automated Assignment Grading</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  Upload assignments and get them graded instantly with detailed feedback for each student.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Multiple subject support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Customizable grading rubrics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Bulk processing capability
                  </li>
                </ul>
              </div>
              
              {/* Service 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <div className="text-purple-600 dark:text-purple-400 mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Personalized Feedback Generation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  Provide detailed, personalized feedback to each student based on their work.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Adaptive to student level
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Detailed improvement suggestions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Positive reinforcement focused
                  </li>
                </ul>
              </div>
              
              {/* Service 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <div className="text-purple-600 dark:text-purple-400 mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Progress Tracking & Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  Monitor student progress over time with comprehensive analytics and insights.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Visual performance dashboards
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Identify knowledge gaps
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Export detailed reports
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Contact Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Contact Information Card */}
              <div className="feature-card p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <h3 className="text-2xl font-semibold mb-6 text-purple-300">Get in Touch</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Interested in bringing AI Mentor to your educational institution? Have questions about how our platform can help your teachers and students? Reach out to us today!
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-purple-400 p-3 rounded-lg bg-purple-400/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-purple-300">Email</p>
                      <p className="text-gray-400">contact@aimentor.edu</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-purple-400 p-3 rounded-lg bg-purple-400/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-purple-300">Phone</p>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-purple-400 p-3 rounded-lg bg-purple-400/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-purple-300">Address</p>
                      <p className="text-gray-400">123 Education Lane, Learning City, CA 94105</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <p className="text-gray-400 mb-4">Connect With Us</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form Card */}
              <div className="feature-card p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-purple-300 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                      placeholder="How can we help?" 
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition duration-300 transform hover:-translate-y-1"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="AI Mentor Logo" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap text-white">AI Mentor</span>
                </a>
                <p className="mt-2 text-sm text-gray-400">Empowering educators with AI-powered assistance</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm"> {new Date().getFullYear()} AI Mentor</p>
                <p className="text-sm mt-1">Aligned with UN SDG 4: Quality Education</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;