import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './App.css';

// Enhanced animation configurations
const pageVariants = {
  initial: { opacity: 0 },
  in: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  out: { opacity: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const textReveal = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0, rotate: -5 },
  show: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
};

const slideUp = {
  hidden: { y: 60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30
    }
  }
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30
    }
  }
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30
    }
  }
};

const rotate3D = {
  hidden: { rotateX: 90, opacity: 0 },
  show: {
    rotateX: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 30
    }
  }
};

const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const glow = {
  initial: { boxShadow: "0 0 0px rgba(58, 134, 255, 0)" },
  animate: {
    boxShadow: [
      "0 0 0px rgba(58, 134, 255, 0)",
      "0 0 20px rgba(58, 134, 255, 0.6)",
      "0 0 0px rgba(58, 134, 255, 0)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// New Streamlined Process Animation
const processStepAnimation = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    rotateX: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      duration: 0.8
    }
  }
};

const connectorAnimation = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: {
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'process', 'tech', 'portfolio', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div 
      className="App"
      ref={containerRef}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <ScrollProgress />
      <DynamicBackground scrollYProgress={scrollYProgress} />
      <Navbar 
        activeSection={activeSection} 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
      />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Services />
      <Process />
      <TechnologyStack />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </motion.div>
  );
}

// Simple Normal Cursor Component
function NormalCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    };

    const updateCursor = () => {
      const elements = document.querySelectorAll('a, button, input, textarea, select, .nav-link, .btn');
      const isPointerElement = Array.from(elements).some(el => 
        el.matches(':hover') || el === document.activeElement
      );
      setIsPointer(isPointerElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', updateCursor);
    };
  }, []);

  return (
    <>
      <motion.div 
        className="normal-cursor"
        animate={{ 
          x: cursorPosition.x - 8, 
          y: cursorPosition.y - 8,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ 
          type: "tween",
          duration: 0.1,
          ease: "linear"
        }}
      />
    </>
  );
}

// Scroll Progress Component
function ScrollProgress() {
  const [scroll, setScroll] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScroll(scrolled);
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return (
    <motion.div 
      className="scroll-progress"
      initial={{ width: 0 }}
      animate={{ width: `${scroll}%` }}
      transition={{ type: "spring", damping: 30, stiffness: 100 }}
    />
  );
}

// Dynamic Background Component
function DynamicBackground({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  
  return (
    <motion.div 
      className="dynamic-background"
      style={{ scale, rotate }}
    >
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      <div className="gradient-orb orb-3" />
      <div className="grid-overlay" />
    </motion.div>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="loading-container"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="loading-logo"
          variants={scaleIn}
        >
          <motion.div 
            className="logo-icon"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 10L30 30M30 10L10 30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M20 5V35" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M5 20H35" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </motion.div>
        
        <motion.div className="loading-text">
          <motion.h1
            variants={textReveal}
          >
            <span className="logo-text">ASW CodeCraft</span>
          </motion.h1>
          <motion.p
            variants={textReveal}
            transition={{ delay: 0.1 }}
          >
            Premium Software Solutions
          </motion.p>
        </motion.div>

        <motion.div 
          className="loading-bar-container"
          variants={slideUp}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 1.8, 
              ease: "easeInOut",
              delay: 0.4
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Navbar Component with Glassmorphism
function Navbar({ activeSection, isMenuOpen, toggleMenu, scrollToSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100,
        delay: 0.5
      }}
    >
      <div className="nav-container">
        <motion.div 
          // className="logo"
          // whileHover={{ scale: 1.05 }}
          // whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">
            ASW <span className="highlight">CodeCraft</span>
          </span>
        </motion.div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
              whileHover={{ y: -2 }}
            >
              <motion.a 
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.span 
                  className="nav-indicator"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>

        <motion.button 
          className="hamburger" 
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div 
            className="hamburger-line"
            animate={isMenuOpen ? 
              { rotate: 45, y: 8 } : 
              { rotate: 0, y: 0 }
            }
          />
          <motion.div 
            className="hamburger-line"
            animate={isMenuOpen ? 
              { opacity: 0 } : 
              { opacity: 1 }
            }
          />
          <motion.div 
            className="hamburger-line"
            animate={isMenuOpen ? 
              { rotate: -45, y: -8 } : 
              { rotate: 0, y: 0 }
            }
          />
        </motion.button>
      </div>
    </motion.nav>
  );
}

// Cinematic Hero Section
function Hero({ scrollToSection }) {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Custom Web Development", "WordPress Solutions", "AI Innovation", "Graphic Design"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="home" className="hero" ref={containerRef}>
      <motion.div 
        className="hero-background"
        style={{ y }}
      >
        <div className="gradient-overlay" />
      </motion.div>

      <div className="hero-content">
        <motion.div 
          className="hero-text"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="hero-title"
            variants={textReveal}
          >
            Crafting{" "}
            <span className="gradient-text">Digital Excellence</span>
            {" "}for Tomorrow's Leaders
          </motion.h1>

          <motion.div 
            className="animated-text"
            variants={slideUp}
            transition={{ delay: 0.2 }}
          >
            <span>Specializing in </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                className="rotating-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {texts[textIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p 
            className="hero-description"
            variants={slideUp}
            transition={{ delay: 0.3 }}
          >
            We deliver world-class digital solutions with cutting-edge technology, 
            exceptional design, and unmatched performance for businesses worldwide.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            variants={staggerContainer}
            transition={{ delayChildren: 0.4 }}
          >
            <motion.button 
              className="btn btn-primary"
              onClick={() => scrollToSection('services')}
              variants={slideUp}
              whileHover="hover"
              whileTap="tap"
              animate="animate"
              variants={{
                hover: { 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(90, 70, 255, 0.4)"
                },
                tap: { scale: 0.95 },
                animate: glow
              }}
            >
              Explore Services
              <motion.span 
                className="btn-icon"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>

            <motion.button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
              variants={slideUp}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Consultation
            </motion.button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            variants={staggerContainer}
            transition={{ delayChildren: 0.6 }}
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                variants={slideUp}
                whileHover={{ y: -5 }}
              >
                <motion.h3 
                  className="stat-value"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >
                  {stat.value}
                </motion.h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="floating-elements">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                className={`floating-element element-${i}`}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
          
          <motion.div 
            className="code-visualization"
            variants={float}
            animate="animate"
          >
            <div className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <span className="control-dot red" />
                  <span className="control-dot yellow" />
                  <span className="control-dot green" />
                </div>
                <span className="window-title">solution.js</span>
              </div>
              <div className="code-content">
                <motion.pre
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {`// Premium Digital Solutions
class ASWCodeCraft {
  constructor() {
    this.founder = "Abdul Sami";
    this.expertise = "AI & Web Development";
    this.quality = "premium";
  }

  async deliverProject(client) {
    const solution = await this.architect();
    const development = await this.develop(solution);
    return this.deliver(development);
  }

  architect() {
    return {
      webDevelopment: 'custom-coded',
      wordPress: 'optimized',
      graphicDesign: 'creative',
      seo: 'performance-focused'
    };
  }
}

const yourSuccess = new ASWCodeCraft();`}
                </motion.pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => scrollToSection('about')}
      >
        <span>Explore More</span>
        <motion.div 
          className="arrow-down"
          animate={{
            y: [0, 5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
}

// About Section
function About() {
  const teamMembers = [
    { name: "Abdul Sami", role: "Founder & Lead Developer", expertise: "AI & Web Development" },
    { name: "Ammar Imam", role: "Senior Web Developer", expertise: "React & Node.js" },
    { name: "Salman", role: "WordPress Specialist", expertise: "WordPress Development" },
    { name: "Aijaz", role: "Graphic Designer", expertise: "UI/UX & Branding" },
    { name: "Ahmed", role: "SEO Specialist", expertise: "Digital Marketing" },
    { name: "Abdullah", role: "Project Manager", expertise: "Client Relations" }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            className="section-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Meet Our <span className="gradient-text">Expert Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A dedicated team of professionals committed to delivering exceptional digital solutions
          </motion.p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h3 variants={slideInLeft}>
              Led by Abdul Sami - Founder & AI/Web Developer
            </motion.h3>
            <motion.p variants={slideInLeft}>
              ASW CodeCraft was founded by <strong>Abdul Sami</strong>, an expert in Artificial Intelligence 
              and Web Development. With a passion for technology and innovation, Abdul leads our team 
              in creating cutting-edge digital solutions that transform businesses.
            </motion.p>
            <motion.p variants={slideInLeft}>
              Our founder's expertise in AI and modern web technologies ensures that every project 
              we undertake benefits from the latest advancements in the industry.
            </motion.p>

            <motion.div 
              className="about-features"
              variants={staggerContainer}
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="feature-card"
                  variants={slideUp}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <motion.div 
                    className="feature-icon"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {member.name.charAt(0)}
                  </motion.div>
                  <h4>{member.name}</h4>
                  <p className="role">{member.role}</p>
                  <p className="expertise">{member.expertise}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: 100, rotateY: 90 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            viewport={{ once: true }}
          >
            <div className="visual-container">
              <motion.div 
                className="cube"
                animate={{ 
                  rotateX: 360,
                  rotateY: 360 
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="orbital-ring"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div 
                    key={i}
                    className="orbital-point"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function Services() {
  const services = [
    {
      icon: "💻",
      title: "Custom Web Development",
      description: "Tailor-made websites built from scratch using modern technologies like React, Next.js, and Node.js.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: "📝",
      title: "WordPress Websites",
      description: "Professional WordPress websites with custom themes, plugins, and complete setup.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: "🎨",
      title: "Graphic Design",
      description: "Creative graphic design services including logos, branding, marketing materials, and UI/UX design.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      icon: "⚙️",
      title: "Monthly Maintenance",
      description: "Regular website maintenance, updates, security checks, and performance optimization.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      icon: "🎬",
      title: "Video Editing",
      description: "Professional video editing services for promotional videos, tutorials, and social media content.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      icon: "🔍",
      title: "SEO Services",
      description: "Comprehensive SEO strategies to improve your website's visibility and search engine rankings.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
      icon: "🔄",
      title: "Website Renewal",
      description: "Modernize and update existing websites with new designs, features, and improved performance.",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
    },
    {
      icon: "🤖",
      title: "AI Solutions",
      description: "Custom AI and machine learning solutions for automation, analytics, and intelligent features.",
      gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Our Expertise</span>
          <h2>Premium <span className="gradient-text">Services</span></h2>
          <p>Comprehensive digital solutions for every business need</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              variants={rotate3D}
              custom={index}
              whileHover="hover"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hover: {
                  y: -20,
                  rotateX: 5,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <motion.div 
                className="service-icon"
                style={{ background: service.gradient }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {service.icon}
              </motion.div>
              
              <motion.h3
                animate={{ color: "#ffffff" }}
                whileHover={{ color: service.gradient.split(' ')[1] }}
              >
                {service.title}
              </motion.h3>
              
              <p>{service.description}</p>
              
              <motion.div 
                className="service-cta"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
              </motion.div>

              <motion.div 
                className="service-glow"
                style={{ background: service.gradient }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Process Section - Completely Updated
function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { 
      number: "01", 
      title: "Discovery", 
      desc: "We begin by understanding your vision, goals, and requirements through detailed consultation.",
      icon: "🔍",
      color: "#3a46ff"
    },
    { 
      number: "02", 
      title: "Strategy", 
      desc: "Crafting a comprehensive plan with timelines, technologies, and project architecture.",
      icon: "📋",
      color: "#9d4edd"
    },
    { 
      number: "03", 
      title: "Design", 
      desc: "Creating intuitive, beautiful interfaces and user experiences with modern design principles.",
      icon: "🎨",
      color: "#00d9ff"
    },
    { 
      number: "04", 
      title: "Development", 
      desc: "Building robust, scalable solutions using cutting-edge technologies and best practices.",
      icon: "⚡",
      color: "#43e97b"
    },
    { 
      number: "05", 
      title: "Testing", 
      desc: "Rigorous quality assurance and testing to ensure flawless performance across all devices.",
      icon: "🧪",
      color: "#fa709a"
    },
    { 
      number: "06", 
      title: "Launch", 
      desc: "Deployment, monitoring, and ongoing support to ensure long-term success.",
      icon: "🚀",
      color: "#fee140"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="process" className="process">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Our Methodology</span>
          <h2>Streamlined <span className="gradient-text">Process</span></h2>
          <p>A proven workflow that ensures quality and efficiency at every step</p>
        </motion.div>

        <div className="process-container">
          <motion.div 
            className="process-visualization"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="process-circle">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="process-orbital"
                  style={{
                    transform: `rotate(${index * 60}deg) translateX(200px) rotate(${index * -60}deg)`
                  }}
                  animate={activeStep === index ? "active" : "inactive"}
                  variants={{
                    active: {
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 300 }
                    },
                    inactive: {
                      scale: 1,
                      transition: { type: "spring", stiffness: 300 }
                    }
                  }}
                >
                  <motion.div 
                    className="process-node"
                    style={{ background: step.color }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="step-icon">{step.icon}</span>
                    <div className="node-pulse" style={{ borderColor: step.color }} />
                  </motion.div>
                </motion.div>
              ))}
              
              <motion.div 
                className="process-center"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <div className="center-glow" />
                <div className="center-core">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14 8L20 8L15.5 11.5L17 18L12 14.5L7 18L8.5 11.5L4 8L10 8L12 2Z" fill="white"/>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="process-steps">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                className="step-detail"
                initial={{ opacity: 0, x: 50, rotateX: 15 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  damping: 25
                }}
              >
                <motion.div 
                  className="step-number-large"
                  style={{ background: steps[activeStep].color }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {steps[activeStep].number}
                </motion.div>
                
                <motion.h3 
                  className="step-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {steps[activeStep].title}
                </motion.h3>
                
                <motion.p 
                  className="step-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {steps[activeStep].desc}
                </motion.p>

                <motion.div 
                  className="step-progress"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                  style={{ background: steps[activeStep].color }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="step-navigation">
              {steps.map((_, index) => (
                <motion.button
                  key={index}
                  className={`step-dot ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    background: activeStep === index ? steps[index].color : "rgba(255, 255, 255, 0.1)",
                    scale: activeStep === index ? 1.2 : 1
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          className="process-timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="timeline-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="timeline-marker"
                style={{ background: step.color }}
                whileHover={{ scale: 1.3, rotate: 360 }}
              >
                <span>{step.icon}</span>
              </motion.div>
              
              <div className="timeline-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Technology Stack Section with Logos
function TechnologyStack() {
  const technologies = [
    { 
      name: "React", 
      icon: "⚛️",
      color: "#61DAFB",
      description: "Frontend library for building user interfaces"
    },
    { 
      name: "Next.js", 
      icon: "▲",
      color: "#000000",
      description: "React framework for production"
    },
    { 
      name: "Node.js", 
      icon: "🟢",
      color: "#339933",
      description: "JavaScript runtime environment"
    },
    { 
      name: "Python", 
      icon: "🐍",
      color: "#3776AB",
      description: "High-level programming language"
    },
    { 
      name: "TypeScript", 
      icon: "📘",
      color: "#3178C6",
      description: "Typed JavaScript superset"
    },
    { 
      name: "WordPress", 
      icon: "W",
      color: "#21759B",
      description: "Content management system"
    },
    { 
      name: "PHP", 
      icon: "🐘",
      color: "#777BB4",
      description: "Server-side scripting language"
    },
    { 
      name: "MySQL", 
      icon: "🐬",
      color: "#4479A1",
      description: "Relational database management"
    },
    { 
      name: "MongoDB", 
      icon: "🍃",
      color: "#47A248",
      description: "NoSQL database"
    },
    { 
      name: "Tailwind", 
      icon: "🎨",
      color: "#38B2AC",
      description: "CSS framework"
    },
    { 
      name: "Figma", 
      icon: "🖌️",
      color: "#F24E1E",
      description: "Design and prototyping tool"
    },
    { 
      name: "Adobe Suite", 
      icon: "🎬",
      color: "#FF0000",
      description: "Creative software suite"
    },
    { 
      name: "Git", 
      icon: "📊",
      color: "#F05032",
      description: "Version control system"
    },
    { 
      name: "AWS", 
      icon: "☁️",
      color: "#FF9900",
      description: "Cloud computing platform"
    },
    { 
      name: "Docker", 
      icon: "🐳",
      color: "#2496ED",
      description: "Containerization platform"
    },
    { 
      name: "TensorFlow", 
      icon: "🤖",
      color: "#FF6F00",
      description: "Machine learning framework"
    },
    { 
      name: "OpenAI", 
      icon: "🧠",
      color: "#412991",
      description: "AI research and deployment"
    },
    { 
      name: "SEO Tools", 
      icon: "🔍",
      color: "#34A853",
      description: "Search engine optimization"
    }
  ];

  return (
    <section id="tech" className="tech-stack">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Our Toolkit</span>
          <h2>Technology <span className="gradient-text">Stack</span></h2>
          <p>Powered by the most advanced and reliable technologies</p>
        </motion.div>

        <motion.div 
          className="tech-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div 
              key={index}
              className="tech-card"
              variants={scaleIn}
              custom={index}
              whileHover="hover"
              variants={{
                hover: {
                  y: -10,
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <motion.div 
                className="tech-icon"
                style={{ background: tech.color }}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="tech-logo">{tech.icon}</span>
              </motion.div>
              <motion.h4
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {tech.name}
              </motion.h4>
              <motion.p 
                className="tech-description"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {tech.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="tech-cloud"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
}

// Portfolio Section with Fake Images
function Portfolio() {
  const projects = [
    {
      title: "Fitness Gym Website",
      category: "Web Development",
      link: "https://gym-web-pink-eight.vercel.app/",
      description: "Modern fitness website with booking system and training programs",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      color: "#FF6B6B"
    },
    {
      title: "Gym Sample Website",
      category: "Web Development",
      link: "https://gym-sample-web-vbcw.vercel.app/",
      description: "Responsive gym website with membership plans and trainer profiles",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w-800&h=600&fit=crop",
      color: "#4ECDC4"
    },
    {
      title: "E-commerce Clone",
      category: "Web Development",
      link: "https://newclone-eight.vercel.app/",
      description: "Modern e-commerce platform with shopping cart and payment integration",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      color: "#FFD166"
    },
    {
      title: "Hotel Booking Platform",
      category: "Web Development",
      link: "https://hotels-plum.vercel.app/",
      description: "Hotel reservation system with room booking and payment processing",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      color: "#06D6A0"
    },
    {
      title: "Real Estate Portal",
      category: "Web Development",
      link: "https://indubai-estate.vercel.app/",
      description: "Property listing platform with search filters and agent profiles",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      color: "#118AB2"
    },
    {
      title: "Travel & Tourism Website",
      category: "Web Development",
      link: "https://surti-tour.vercel.app/trips",
      description: "Tour booking platform with destination packages and reviews",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      color: "#EF476F"
    },
    {
      title: "Gaming Zone",
      category: "Web Development",
      link: "https://gamingzone-sample-web.vercel.app/",
      description: "Gaming community website with tournaments and player profiles",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      color: "#7209B7"
    },
    {
      title: "Restaurant Website",
      category: "Web Development",
      link: "https://resturant-sample-web-ya4y.vercel.app/",
      description: "Restaurant website with menu, online ordering, and reservations",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      color: "#FF9E00"
    }
  ];

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Our Work</span>
          <h2>Featured <span className="gradient-text">Projects</span></h2>
          <p>Showcase of our premium digital solutions</p>
        </motion.div>

        <motion.div 
          className="portfolio-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="portfolio-item"
              variants={slideUp}
              whileHover="hover"
              variants={{
                hover: {
                  y: -20,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <div className="portfolio-image">
                <motion.div 
                  className="image-container"
                  style={{ 
                    background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button 
                      className="btn btn-small"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => window.open(project.link, '_blank')}
                      style={{ background: project.color }}
                    >
                      View Live Project
                    </motion.button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="project-badge"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ background: project.color }}
                >
                  {project.category}
                </motion.div>
              </div>
              <div className="portfolio-content">
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  style={{ color: project.color }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  className="project-tech"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      name: "Alexandra Chen",
      role: "Business Owner, Fitness Gym",
      content: "ASW CodeCraft delivered an amazing gym website that exceeded our expectations. The booking system works perfectly!",
      avatar: "AC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Hotel Manager",
      content: "Our hotel booking platform transformed our business. Exceptional quality and professional service throughout.",
      avatar: "MR"
    },
    {
      name: "Sophia Williams",
      role: "Restaurant Owner",
      content: "Working with ASW was a game-changer. Our restaurant website brought in 40% more online orders.",
      avatar: "SW"
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Client Stories</span>
          <h2>What Our <span className="gradient-text">Clients Say</span></h2>
          <p>Trusted by businesses worldwide</p>
        </motion.div>

        <motion.div 
          className="testimonials-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card"
              variants={slideInLeft}
              custom={index}
              whileHover="hover"
              variants={{
                hover: {
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <div className="testimonial-content">
                <motion.div 
                  className="quote-icon"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ rotate: 360 }}
                >
                  "
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {testimonial.content}
                </motion.p>
              </div>
              <div className="testimonial-author">
                <motion.div 
                  className="avatar-circle"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div className="author-info">
                  <motion.h4
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {testimonial.name}
                  </motion.h4>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {testimonial.role}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  const contactDetails = [
    { icon: "✉️", title: "Email", info: "abdulsamimyousuf0@gmail.com", link: "mailto:abdulsamimyousuf0@gmail.com" },
    { icon: "📞", title: "Phone", info: "+92 3032385244", link: "tel:+923032385244" },
    { icon: "📱", title: "Instagram", info: "@asw.codecraft", link: "https://www.instagram.com/asw.codecraft/" },
    { icon: "👥", title: "Facebook", info: "ASW CodeCraft", link: "https://www.facebook.com/profile.php?id=61586069521233" },
    { icon: "💼", title: "LinkedIn", info: "code-craft-asw", link: "https://www.linkedin.com/in/code-craft-asw-44175138b/" },
    { icon: "🐙", title: "GitHub", info: "AbdulSami-786", link: "https://github.com/AbdulSami-786/" }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Get In Touch</span>
          <h2>Start Your <span className="gradient-text">Project</span></h2>
          <p>Let's discuss how we can transform your vision into reality</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h3 variants={slideInLeft}>
              Ready to Elevate Your Digital Presence?
            </motion.h3>
            <motion.p variants={slideInLeft}>
              Contact us for a free consultation and discover how our premium 
              digital solutions can drive your business forward.
            </motion.p>

            <motion.div 
              className="contact-details"
              variants={staggerContainer}
            >
              {contactDetails.map((detail, index) => (
                <motion.div 
                  key={index}
                  className="contact-item"
                  variants={slideInLeft}
                  whileHover="hover"
                  variants={{
                    hover: {
                      x: 10,
                      transition: { type: "spring", stiffness: 400 }
                    }
                  }}
                >
                  <motion.div 
                    className="contact-icon"
                    whileHover={{ scale: 1.2 }}
                  >
                    {detail.icon}
                  </motion.div>
                  <div>
                    <h4>{detail.title}</h4>
                    <a href={detail.link} target="_blank" rel="noopener noreferrer" className="contact-link">
                      {detail.info}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {['name', 'email', 'company', 'service'].map((field, index) => (
              <motion.div 
                key={field}
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {field === 'service' ? (
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="web-dev">Custom Web Development</option>
                    <option value="wordpress">WordPress Website</option>
                    <option value="design">Graphic Design</option>
                    <option value="maintenance">Monthly Maintenance</option>
                    <option value="video">Video Editing</option>
                    <option value="seo">SEO Services</option>
                    <option value="renewal">Website Renewal</option>
                    <option value="ai">AI Solutions</option>
                  </select>
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={
                      field === 'name' ? 'Your Name' :
                      field === 'email' ? 'Your Email' :
                      field === 'company' ? 'Company Name' :
                      'Select Service'
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                )}
              </motion.div>
            ))}

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.button 
              type="submit" 
              className="btn btn-primary btn-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(90, 70, 255, 0.4)"
                },
                tap: { scale: 0.95 }
              }}
            >
              Send Message
              <motion.span 
                className="btn-icon"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// Fixed Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const socialLinks = [
    { name: "Instagram", link: "https://www.instagram.com/asw.codecraft/", icon: "📷", color: "#E4405F" },
    { name: "Facebook", link: "https://www.facebook.com/profile.php?id=61586069521233", icon: "📘", color: "#1877F2" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/code-craft-asw-44175138b/", icon: "💼", color: "#0A66C2" },
    { name: "GitHub", link: "https://github.com/AbdulSami-786/", icon: "💻", color: "#181717" },
    { name: "Email", link: "mailto:abdulsamimyousuf0@gmail.com", icon: "✉️", color: "#EA4335" },
    { name: "Phone", link: "tel:+923032385244", icon: "📱", color: "#25D366" }
  ];

  const footerLinks = {
    "Services": [
      { label: "Web Development", href: "#services" },
      { label: "WordPress Solutions", href: "#services" },
      { label: "Graphic Design", href: "#services" },
      { label: "SEO Services", href: "#services" },
      { label: "AI Solutions", href: "#services" },
      { label: "Video Editing", href: "#services" }
    ],
    "Quick Links": [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#about" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" }
    ],
    "Legal": [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Support Center", href: "#" },
      { label: "FAQ", href: "#" }
    ]
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      alert('Thank you for subscribing!');
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        <motion.div 
          className="footer-content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div 
            className="footer-section main-section"
            variants={slideInLeft}
          >
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <motion.span 
                className="logo-icon"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14 8L20 8L15.5 11.5L17 18L12 14.5L7 18L8.5 11.5L4 8L10 8L12 2Z" fill="url(#gradient)" stroke="url(#gradient)" strokeWidth="1.5"/>
                  <defs>
                    <linearGradient id="gradient" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3a46ff"/>
                      <stop offset="1" stopColor="#9d4edd"/>
                    </linearGradient>
                  </defs>
                </svg>
              </motion.span> */}
              <span className="logo-text">
                ASW <span className="highlight">CodeCraft</span>
              </span>
            </motion.div>
            <motion.p 
              className="footer-description"
              variants={slideInLeft}
              transition={{ delay: 0.1 }}
            >
              Premium digital solutions crafted with excellence, 
              innovation, and unparalleled attention to detail.
            </motion.p>
            
            <motion.div 
              className="social-links"
              variants={staggerContainer}
            >
              {socialLinks.map((platform, index) => (
                <motion.a 
                  key={platform.name}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  variants={scaleIn}
                  custom={index}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    backgroundColor: platform.color
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={platform.name}
                >
                  <span className="social-icon">{platform.icon}</span>
                  <span className="social-tooltip">{platform.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
            <motion.div 
              key={section}
              className="footer-section"
              variants={slideUp}
              custom={sectionIndex}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h4 
                className="footer-heading"
                variants={slideUp}
              >
                {section}
              </motion.h4>
              <motion.ul 
                className="footer-links-list"
                variants={staggerContainer}
              >
                {links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.label}
                    variants={slideUp}
                    custom={linkIndex}
                  >
                    <a 
                      href={link.href} 
                      className="footer-link"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          const element = document.getElementById(link.href.substring(1));
                          if (element) {
                            window.scrollTo({
                              top: element.offsetTop - 80,
                              behavior: 'smooth'
                            });
                          }
                        }
                      }}
                    >
                      {link.label}
                      <motion.span 
                        className="link-arrow"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="footer-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <motion.div 
              className="newsletter-section"
              variants={slideInLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h5>Stay Updated</h5>
              <p>Subscribe to our newsletter for the latest updates</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.button 
                  type="submit"
                  className="btn btn-small"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>

            <motion.div 
              className="copyright-section"
              variants={slideInRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p>&copy; {currentYear} <strong>ASW CodeCraft</strong>. All rights reserved.</p>
              <div className="legal-links">
                <a href="#">Privacy Policy</a>
                <span className="divider">•</span>
                <a href="#">Terms of Service</a>
                <span className="divider">•</span>
                <a href="#">Cookie Policy</a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default App;