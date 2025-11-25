// App.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Animation configurations
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const fadeInLeft = {
  hidden: { x: -60, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const fadeInRight = {
  hidden: { x: 60, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const rotateIn = {
  hidden: { rotate: -180, opacity: 0 },
  show: { 
    rotate: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const bounceIn = {
  hidden: { y: -100, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 10
    }
  }
};

const flipIn = {
  hidden: { rotateY: 90, opacity: 0 },
  show: { 
    rotateY: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const pulseAnimation = {
  hidden: { scale: 1 },
  show: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const floatAnimation = {
  hidden: { y: 0 },
  show: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const shakeAnimation = {
  hidden: { x: 0 },
  show: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5
    }
  }
};

const tadaAnimation = {
  hidden: { scale: 1, rotate: 0 },
  show: {
    scale: [1, 1.1, 1.1, 1.1, 1],
    rotate: [0, -3, -3, 3, -3, 0],
    transition: {
      duration: 1
    }
  }
};

const wobbleAnimation = {
  hidden: { x: 0, rotate: 0 },
  show: {
    x: [0, -25, 20, -15, 10, -5, 0],
    rotate: [0, -5, 3, -3, 2, -1, 0],
    transition: {
      duration: 1
    }
  }
};

const jelloAnimation = {
  hidden: { skewX: 0, skewY: 0 },
  show: {
    skewX: [0, 30, -20, 15, -10, 5, 0],
    skewY: [0, 10, -8, 6, -4, 2, 0],
    transition: {
      duration: 1
    }
  }
};

const heartBeatAnimation = {
  hidden: { scale: 1 },
  show: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 1.3,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const rubberBandAnimation = {
  hidden: { scaleX: 1, scaleY: 1 },
  show: {
    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    transition: {
      duration: 1
    }
  }
};

const bounceAnimation = {
  hidden: { y: 0 },
  show: {
    y: [0, -30, 0, -15, 0, -5, 0],
    transition: {
      duration: 1
    }
  }
};

const flashAnimation = {
  hidden: { opacity: 1 },
  show: {
    opacity: [1, 0, 1, 0, 1],
    transition: {
      duration: 1
    }
  }
};

const swingAnimation = {
  hidden: { rotateZ: 0 },
  show: {
    rotateZ: [0, 15, -10, 5, -5, 0],
    transition: {
      duration: 1
    }
  }
};

const rollInAnimation = {
  hidden: { x: -100, rotate: -120, opacity: 0 },
  show: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const zoomIn = {
  hidden: { scale: 0.5, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const lightSpeedIn = {
  hidden: { x: 100, skewX: -30, opacity: 0 },
  show: {
    x: 0,
    skewX: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Update active section on scroll
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
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
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <EnhancedParticleBackground />
      <Navbar 
        activeSection={activeSection} 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
      />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </motion.div>
  );
}

// Enhanced Particle Background Component
function EnhancedParticleBackground() {
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  }));

  return (
    <div className="enhanced-particle-background">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="enhanced-particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: particle.color,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Animated gradient background */}
      <motion.div 
        className="animated-gradient"
        animate={{
          background: [
            'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(45deg, #764ba2 0%, #667eea 100%)',
            'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
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
        className="loading-logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <motion.i 
          className="fas fa-code"
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        TechNova Solutions
      </motion.h2>
      <motion.div 
        className="loading-bar"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// Navbar Component
function Navbar({ activeSection, isMenuOpen, toggleMenu, scrollToSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="nav-container">
        <motion.div 
          className="logo"
          whileHover="hover"
          variants={{
            hover: {
              scale: 1.1,
              transition: { type: "spring", stiffness: 400 }
            }
          }}
        >
          <motion.i 
            className="fas fa-code"
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 5
            }}
          />
          <span>TechNova</span>
        </motion.div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
              variants={{
                hover: {
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <a 
                href={`#${item.id}`} 
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.div 
          className="hamburger" 
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <motion.i 
            className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </div>
    </motion.nav>
  );
}

// Hero Component
function Hero({ scrollToSection }) {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Web Development", "AI Solutions", "Digital Marketing", "Creative Design"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Transform Your <span className="highlight">Digital Vision</span>
          </motion.h1>
          
          <motion.div className="animated-text" variants={fadeInUp}>
            <span>We Specialize in </span>
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

          <motion.p className="hero-description" variants={fadeInUp}>
            We are a full-service software house providing cutting-edge solutions 
            from web development to AI agents and everything in between.
          </motion.p>

          <motion.div className="hero-buttons" variants={fadeInUp}>
            <motion.button 
              className="btn btn-primary"
              onClick={() => scrollToSection('services')}
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(108, 99, 255, 0.3)"
                },
                tap: { scale: 0.95 }
              }}
            >
              Our Services
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255, 101, 132, 0.3)"
                },
                tap: { scale: 0.95 }
              }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="floating-card card-1"
            animate={{
              y: [0, -20, 0],
              rotateZ: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <i className="fas fa-code"></i>
          </motion.div>
          <motion.div 
            className="floating-card card-2"
            animate={{
              y: [0, 15, 0],
              rotateZ: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <i className="fas fa-robot"></i>
          </motion.div>
          <motion.div 
            className="floating-card card-3"
            animate={{
              y: [0, -25, 0],
              rotateZ: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <i className="fas fa-mobile-alt"></i>
          </motion.div>
          
          <motion.div 
            className="main-visual"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="code-window">
              <div className="window-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="code-content">
                <motion.pre
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <code>{`// Building the future
function createSolution() {
  return innovation + creativity;
}

const yourSuccess = await createSolution();`}</code>
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
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span>Scroll Down</span>
        <motion.div 
          className="arrow"
          animate={{
            y: [0, 5, 0],
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

// About Component
function About() {
  const stats = [
    { number: "150+", label: "Projects", icon: "fas fa-rocket" },
    { number: "50+", label: "Clients", icon: "fas fa-users" },
    { number: "5+", label: "Years", icon: "fas fa-calendar" },
    { number: "24/7", label: "Support", icon: "fas fa-headset" }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>About TechNova</h2>
          <p>We transform ideas into powerful digital solutions</p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h3 variants={fadeInLeft}>Driving Digital Innovation</motion.h3>
            <motion.p variants={fadeInLeft}>
              At TechNova, we combine technical expertise with creative thinking to deliver 
              exceptional digital products. Our team of skilled developers, designers, and 
              strategists work together to bring your vision to life.
            </motion.p>
            <motion.p variants={fadeInLeft}>
              We believe in building long-term partnerships with our clients, providing 
              ongoing support and innovation to help your business thrive in the digital age.
            </motion.p>

            <motion.div 
              className="stats"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-item"
                  variants={fadeInUp}
                  whileHover="hover"
                  custom={index}
                  variants={{
                    hover: {
                      y: -10,
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400 }
                    }
                  }}
                >
                  <motion.div 
                    className="stat-icon"
                    whileHover={shakeAnimation}
                  >
                    <i className={stat.icon}></i>
                  </motion.div>
                  <motion.h4 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.h4>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="team-illustration"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="person person-1"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }}
              >
                <motion.div 
                  className="avatar"
                  whileHover={tadaAnimation}
                />
                <motion.div 
                  className="info"
                  whileHover={{ scale: 1.1 }}
                >
                  <span>Developer</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="person person-2"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <motion.div 
                  className="avatar"
                  whileHover={tadaAnimation}
                />
                <motion.div 
                  className="info"
                  whileHover={{ scale: 1.1 }}
                >
                  <span>Designer</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="person person-3"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <motion.div 
                  className="avatar"
                  whileHover={tadaAnimation}
                />
                <motion.div 
                  className="info"
                  whileHover={{ scale: 1.1 }}
                >
                  <span>Manager</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Component
function Services() {
  const services = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies.',
      features: ['React', 'Node.js', 'Responsive'],
      color: '#6c63ff'
    },
    {
      icon: 'fas fa-video',
      title: 'Video Editing',
      description: 'Professional video editing for marketing and corporate needs.',
      features: ['4K Quality', 'Motion Graphics', 'Color Grading'],
      color: '#ff6584'
    },
    {
      icon: 'fas fa-palette',
      title: 'Graphic Design',
      description: 'Creative design solutions including logos and branding.',
      features: ['UI/UX Design', 'Brand Identity', 'Print Design'],
      color: '#4CAF50'
    },
    {
      icon: 'fas fa-search',
      title: 'SEO',
      description: 'Search engine optimization to improve online visibility.',
      features: ['Keyword Research', 'Technical SEO', 'Content Strategy'],
      color: '#2196F3'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Marketing',
      description: 'Digital marketing strategies to grow your brand.',
      features: ['Social Media', 'PPC Campaigns', 'Analytics'],
      color: '#FF9800'
    },
    {
      icon: 'fab fa-wordpress',
      title: 'WordPress',
      description: 'Custom WordPress development and plugins.',
      features: ['Custom Themes', 'Plugin Development', 'WooCommerce'],
      color: '#21759b'
    },
    {
      icon: 'fas fa-robot',
      title: 'AI Agents',
      description: 'Intelligent AI solutions and automation systems.',
      features: ['Chatbots', 'Web Scraping', 'Automation'],
      color: '#9C27B0'
    },
    {
      icon: 'fas fa-globe',
      title: 'Large Scale Web',
      description: 'Scalable solutions for high-traffic platforms.',
      features: ['Microservices', 'Cloud Architecture', 'Load Balancing'],
      color: '#607D8B'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'App Development',
      description: 'Native and cross-platform mobile applications.',
      features: ['React Native', 'Flutter', 'Native Apps'],
      color: '#E91E63'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Maintenance',
      description: 'Ongoing support and maintenance services.',
      features: ['24/7 Support', 'Security Updates', 'Performance'],
      color: '#795548'
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
          <h2>Our Services</h2>
          <p>Comprehensive digital solutions for your business</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="service-card"
      variants={fadeInUp}
      custom={index}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hover: {
          y: -15,
          scale: 1.05,
          transition: { type: "spring", stiffness: 400 }
        }
      }}
    >
      <motion.div 
        className="service-icon"
        style={{ background: service.color }}
        whileHover={pulseAnimation}
      >
        <motion.i 
          className={service.icon}
          animate={isHovered ? 
            { 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            } : {}
          }
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      
      <motion.h3
        animate={isHovered ? { color: service.color } : {}}
      >
        {service.title}
      </motion.h3>
      
      <p>{service.description}</p>
      
      <motion.div 
        className="service-features"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
      >
        {service.features.map((feature, idx) => (
          <motion.span 
            key={idx}
            className="feature-tag"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            {feature}
          </motion.span>
        ))}
      </motion.div>
      
      <motion.div 
        className="service-hover"
        initial={{ opacity: 0, y: 20 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        <motion.button 
          className="btn btn-small"
          style={{ background: service.color }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>

      <motion.div 
        className="service-background"
        style={{ background: service.color }}
        initial={{ scale: 0 }}
        animate={isHovered ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.div>
  );
}

// Portfolio Component
function Portfolio() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "project1",
      description: "Full-featured online store with payment integration"
    },
    {
      title: "AI Chatbot",
      category: "AI Solutions",
      image: "project2",
      description: "Intelligent customer service automation"
    },
    {
      title: "Mobile Banking App",
      category: "App Development",
      image: "project3",
      description: "Secure financial management application"
    },
    {
      title: "Corporate Website",
      category: "Web Design",
      image: "project4",
      description: "Modern responsive corporate website"
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
          <h2>Our Portfolio</h2>
          <p>See some of our amazing projects</p>
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
              variants={fadeInUp}
              whileHover="hover"
              variants={{
                hover: {
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <div className="portfolio-image">
                <div className="project-placeholder">
                  <i className="fas fa-image"></i>
                </div>
                <div className="portfolio-overlay">
                  <motion.button 
                    className="btn btn-small"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Component
function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      content: "TechNova transformed our business with their innovative solutions. Their team is professional and delivered beyond our expectations.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      content: "The website they built for us increased our conversions by 150%. Their attention to detail is remarkable.",
      avatar: "MC"
    },
    {
      name: "Emily Davis",
      role: "Startup Founder",
      content: "Working with TechNova was a game-changer. Their AI solutions automated our processes and saved us countless hours.",
      avatar: "ED"
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
          <h2>What Our Clients Say</h2>
          <p>Don't just take our word for it</p>
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
              variants={fadeInUp}
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
                >
                  <i className="fas fa-quote-left"></i>
                </motion.div>
                <p>"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <div className="avatar-circle">
                  {testimonial.avatar}
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Contact Component
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
          <h2>Get In Touch</h2>
          <p>Ready to start your project? Contact us today</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h3 variants={fadeInLeft}>Let's Talk About Your Project</motion.h3>
            <motion.p variants={fadeInLeft}>
              We're here to help you bring your ideas to life. Get in touch with us 
              and let's discuss how we can work together to achieve your goals.
            </motion.p>

            <motion.div 
              className="contact-details"
              variants={staggerContainer}
            >
              <motion.div 
                className="contact-item"
                variants={fadeInLeft}
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
                  whileHover={bounceAnimation}
                >
                  <i className="fas fa-envelope"></i>
                </motion.div>
                <div>
                  <h4>Email</h4>
                  <p>info@technova.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="contact-item"
                variants={fadeInLeft}
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
                  whileHover={bounceAnimation}
                >
                  <i className="fas fa-phone"></i>
                </motion.div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div 
                className="contact-item"
                variants={fadeInLeft}
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
                  whileHover={bounceAnimation}
                >
                  <i className="fas fa-map-marker-alt"></i>
                </motion.div>
                <div>
                  <h4>Address</h4>
                  <p>123 Tech Street, Innovation City</p>
                </div>
              </motion.div>
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
            <motion.div 
              className="form-group"
              whileFocus="focus"
              variants={{
                focus: {
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileFocus="focus"
              variants={{
                focus: {
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileFocus="focus"
              variants={{
                focus: {
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a Service</option>
                <option value="web-development">Web Development</option>
                <option value="ai-agents">AI Agents</option>
                <option value="app-development">App Development</option>
                <option value="seo">SEO & Marketing</option>
              </select>
            </motion.div>

            <motion.div 
              className="form-group"
              whileFocus="focus"
              variants={{
                focus: {
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </motion.div>

            <motion.button 
              type="submit" 
              className="btn btn-primary btn-full"
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(108, 99, 255, 0.3)"
                },
                tap: { scale: 0.95 }
              }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
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
            className="footer-section"
            variants={fadeInUp}
          >
            <motion.div 
              className="logo"
              whileHover="hover"
              variants={{
                hover: {
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
            >
              <motion.i 
                className="fas fa-code"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
              <span>TechNova</span>
            </motion.div>
            <motion.p variants={fadeInUp}>
              Transforming ideas into digital reality through innovative 
              software solutions and cutting-edge technology.
            </motion.p>
            <motion.div 
              className="social-links"
              variants={staggerContainer}
            >
              {['facebook-f', 'twitter', 'linkedin-in', 'github'].map((platform, index) => (
                <motion.a 
                  key={platform}
                  href="#"
                  className="social-link"
                  variants={fadeInUp}
                  custom={index}
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: {
                      y: -5,
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 400 }
                    },
                    tap: { scale: 0.9 }
                  }}
                >
                  <i className={`fab fa-${platform}`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {['Services', 'Company', 'Contact'].map((section, sectionIndex) => (
            <motion.div 
              key={section}
              className="footer-section"
              variants={fadeInUp}
              custom={sectionIndex}
            >
              <motion.h4 variants={fadeInUp}>{section}</motion.h4>
              <motion.ul variants={staggerContainer}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeInUp}
                    whileHover="hover"
                    variants={{
                      hover: {
                        x: 10,
                        transition: { type: "spring", stiffness: 400 }
                      }
                    }}
                  >
                    <a href="#">{section} Link {index + 1}</a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2023 TechNova Solutions. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default App;