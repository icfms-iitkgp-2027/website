import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  MapPin, Mail, Globe, Zap, Cpu, Truck, ShieldCheck, 
  Leaf, Settings, ArrowRight, Navigation as MapNavigation, 
  Heart, Building2, BookOpen, Scale, BrainCircuit, Workflow, X, Menu, ExternalLink,
  Award, Users, Book, Plus, Play, ArrowUp
} from 'lucide-react';

/**
 * ICFMS 2027 - ULTIMATE PRO EDITION
 * Design: Ultra-Premium Apple Pro Aesthetic, Fluid Bento, WebGL Kinetics, 3D Interactions
 */

// --- PERFORMANCE-OPTIMIZED FLUID TECH BACKGROUND ---
const TechCanvas = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    let animationFrameId;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const particlesGeometry = new THREE.BufferGeometry();
      const count = window.innerWidth < 768 ? 1200 : 3500; // Optimized for mobile
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);

      let i = 0, j = 0;
      for (let ix = 0; ix < 50; ix++) {
        for (let iy = 0; iy < (count / 50); iy++) {
          positions[i] = ix * 2 - 50; 
          positions[i + 1] = 0;       
          positions[i + 2] = iy * 2 - 50; 
          scales[j] = 1;
          i += 3;
          j++;
        }
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color('#0071e3') },
          time: { value: 0 }
        },
        vertexShader: `
          uniform float time;
          attribute float scale;
          void main() {
            vec3 p = position;
            p.y = sin(p.x * 0.1 + time) * 2.0 + cos(p.z * 0.1 + time) * 2.0;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = scale * (15.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
            gl_FragColor = vec4(color, 0.3);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      particlesMesh.rotation.x = Math.PI / 4;
      scene.add(particlesMesh);
      
      camera.position.y = 10;
      camera.position.z = 25;

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const onDocumentMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
      };
      
      // Only add mouse movement on non-touch devices
      if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', onDocumentMouseMove);
      }

      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;
        
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y + 10) * 0.02;
        camera.lookAt(scene.position);

        particlesMaterial.uniforms.time.value = clock.getElapsedTime() * 0.8;
        
        renderer.render(scene, camera);
      };
      
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onDocumentMouseMove);
        cancelAnimationFrame(animationFrameId);
        if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      };
    } catch (e) {
      console.warn("WebGL suppressed for performance.");
    }
  }, []);
  
  return <div ref={mountRef} className="fixed inset-0 z-[-1] pointer-events-none bg-[#fdfdfd]" />;
};

// --- CUSTOM INTERACTIVE CURSOR ---
const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const updateMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const checkHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('.interactive-element');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', checkHover);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', checkHover);
    };
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference hidden md:flex"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 2 : 1,
        border: isHovering ? '1px solid rgba(255,255,255,0.8)' : '0px solid transparent',
        backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
    >
      <motion.div 
        className="w-2 h-2 rounded-full bg-white"
        animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }}
      />
    </motion.div>
  );
};

// --- REUSABLE COMPONENTS ---
const FadeIn = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, onClick, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e) => {
    // Disable on mobile
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- 3D TILT CARD EFFECT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    // Disable on mobile/touch to prevent scrolling glitches
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`perspective-[1200px] ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full w-full rounded-[inherit] transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
};

// --- HAND DRAWN APPLE PENCIL EFFECT ---
const HandDrawnHighlight = ({ children, color = "#0071e3", delay = 1 }) => {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg className="absolute -inset-x-4 md:-inset-x-6 -inset-y-2 md:-inset-y-4 w-[calc(100%+32px)] md:w-[calc(100%+48px)] h-[calc(100%+16px)] md:h-[calc(100%+32px)] pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M 8,50 C 15,10 85,5 92,40 C 97,75 25,95 12,70 C 5,55 15,30 40,25" 
          fill="none" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
};

// --- MAIN APPLICATION ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const FORM_URL = "https://forms.gle/2ejuthB7udhpyVYL8";
  const ABSTRACT_FORMAT_URL = "https://docs.google.com/document/d/1cizaD2wW5rKBIDA5wxeRDuNv6e_NQwoAB1ld8htey_c/edit?usp=sharing";
  
  const imgPath = {
    logo: "https://raw.githubusercontent.com/kapil2020/web/main/logo%20pj.png",
    hero: "https://raw.githubusercontent.com/kapil2020/web/main/carousel-2.jpg.png", 
    venue: "https://raw.githubusercontent.com/kapil2020/web/main/venue1.jpg",
    architecture: "https://raw.githubusercontent.com/kapil2020/web/main/Gallery/MobilityAI1_Cover.png?raw=true",
  };

  const handleSubmission = () => window.open(FORM_URL, '_blank', 'noopener,noreferrer');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    const timer = setInterval(() => {
      const targetDate = new Date("2026-05-15T23:59:59").getTime();
      const diff = targetDate - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTopBtn(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const themes = [
    { title: "Energy for Mobility", icon: <Zap size={28} strokeWidth={1.5}/>, desc: "Hydrogen fuel cells, battery ecosystems, and clean propulsion.", color: "from-[#ff3b30] to-[#ff9500]", shadow: "shadow-[0_0_40px_-10px_rgba(255,59,48,0.5)]" }, 
    { title: "Mobility Technologies", icon: <Cpu size={28} strokeWidth={1.5}/>, desc: "Connected sensors, IoT integration, and smart vehicle hardware.", color: "from-[#0071e3] to-[#5ac8fa]", shadow: "shadow-[0_0_40px_-10px_rgba(0,113,227,0.5)]" }, 
    { title: "Vehicular Systems", icon: <Settings size={28} strokeWidth={1.5}/>, desc: "Advanced engineering, aerodynamics, and structural dynamics.", color: "from-[#5856d6] to-[#af52de]", shadow: "shadow-[0_0_40px_-10px_rgba(88,86,214,0.5)]" }, 
    { title: "Policy & Economics", icon: <Scale size={28} strokeWidth={1.5}/>, desc: "Global standards, market models, and regulatory frameworks.", color: "from-[#8e8e93] to-[#424245]", shadow: "shadow-[0_0_40px_-10px_rgba(142,142,147,0.5)]" }, 
    { title: "Safety & Autonomy", icon: <ShieldCheck size={28} strokeWidth={1.5}/>, desc: "AI-driven safety, V2X, and autonomous navigation protocols.", color: "from-[#ff2d55] to-[#ff3b30]", shadow: "shadow-[0_0_40px_-10px_rgba(255,45,85,0.5)]" }, 
    { title: "Smart Infrastructure", icon: <Building2 size={28} strokeWidth={1.5}/>, desc: "Intelligent roads, futuristic hubs, and transit facility design.", color: "from-[#34c759] to-[#00c7be]", shadow: "shadow-[0_0_40px_-10px_rgba(52,199,89,0.5)]" }, 
    { title: "Logistics 4.0", icon: <Truck size={28} strokeWidth={1.5}/>, desc: "Automated delivery, freight management, and warehouse robotics.", color: "from-[#ff9500] to-[#ffcc00]", shadow: "shadow-[0_0_40px_-10px_rgba(255,149,0,0.5)]" }, 
    { title: "Urban & Sustainable", icon: <Leaf size={28} strokeWidth={1.5}/>, desc: "Low-carbon behavior, green urbanism, and transit-oriented development.", color: "from-[#28cd41] to-[#34c759]", shadow: "shadow-[0_0_40px_-10px_rgba(40,205,65,0.5)]" }, 
    { title: "Integrated Planning", icon: <Workflow size={28} strokeWidth={1.5}/>, desc: "Holistic modeling of urban spaces and transportation layers.", color: "from-[#00c7be] to-[#0071e3]", shadow: "shadow-[0_0_40px_-10px_rgba(0,199,190,0.5)]" }, 
    { title: "Data Science & AI", icon: <BrainCircuit size={28} strokeWidth={1.5}/>, desc: "Big data analytics and predictive modeling for transit networks.", color: "from-[#af52de] to-[#5856d6]", shadow: "shadow-[0_0_40px_-10px_rgba(175,82,222,0.5)]" }  
  ];

  const faqs = [
    { q: "What is the core focus of ICFMS 2027?", a: "The conference focuses on architecting future mobility through clean energy, autonomous intelligence, and sustainable urban transit systems. We aim to bridge the gap between academic research and industrial application." },
    { q: "How can I participate as a delegate?", a: "Registration will open following the abstract acceptance phase. A dedicated portal will be launched where you can secure your spot, choose tracks, and book accommodation." },
    { q: "Are there publication opportunities?", a: "Absolutely. All selected full papers will be published in indexed conference proceedings (Scopus/Web of Science), with exceptional papers invited for special issue journals." }
  ];

  // Animation variants for mobile menu items
  const menuVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 + 0.1, type: "spring", stiffness: 300, damping: 24 } })
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] font-sans text-[#1d1d1f] selection:bg-[#0071e3]/20 overflow-x-hidden relative">
      <CustomCursor />
      <TechCanvas />
      
      {/* --- FLOATING TOP BUTTON --- */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[2000] p-4 md:p-5 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full shadow-2xl hover:bg-white hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,113,227,0.3)] transition-all group interactive-element"
          >
            <ArrowUp size={24} className="text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- PROGRESS BAR --- */}
      <motion.div className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#0071e3] to-[#5ac8fa] origin-left z-[2000]" style={{ scaleX }} />

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-[1500] transition-all duration-500 ${scrolled ? 'bg-white/85 backdrop-blur-2xl border-b border-black/5 py-4' : 'bg-transparent py-5 md:py-10'}`}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 md:gap-5">
            <a href="#" onClick={scrollToTop} className="h-9 md:h-12 block transition-transform hover:scale-105 interactive-element">
              <img src={imgPath.logo} alt="IIT KGP" className="h-full w-auto object-contain drop-shadow-sm transition-all duration-500" />
            </a>
            <div className="hidden sm:block border-l-[1.5px] pl-4 md:pl-5 h-6 transition-colors duration-500 border-black/10">
              <p className="text-[13px] md:text-[15px] font-bold tracking-tight leading-none h-full flex items-center uppercase transition-colors duration-500 text-[#1d1d1f]">ICFMS 2027</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 px-8 py-3 rounded-full border shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 bg-white/60 backdrop-blur-xl border-black/5">
            {['Heritage', 'About', 'Themes', 'Dates', 'Venue'].map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={link} href={`#${link.toLowerCase()}`} 
                className="text-[14px] font-semibold transition-colors relative group text-[#424245] hover:text-[#0071e3] interactive-element"
              >
                {link}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] transition-all group-hover:w-full rounded-full bg-[#0071e3]"></span>
              </motion.a>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
            <MagneticButton onClick={handleSubmission} className="text-[14px] px-8 py-3.5 rounded-full font-bold transition-colors shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] flex items-center gap-2 group bg-[#1d1d1f] text-white hover:bg-[#0071e3] interactive-element relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Submit Abstract
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></div>
            </MagneticButton>
          </motion.div>

          <button className="lg:hidden p-2.5 backdrop-blur-xl rounded-full border shadow-sm transition-colors duration-500 bg-white/80 text-[#1d1d1f] border-black/10 interactive-element active:scale-95" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE NAV OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(25px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3 } }} 
            className="fixed inset-0 z-[1400] bg-white/95 pt-28 px-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-6 mt-4">
              {['Heritage', 'About', 'Themes', 'Dates', 'Venue'].map((link, i) => (
                <motion.a 
                  custom={i}
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  key={link} href={`#${link.toLowerCase()}`} 
                  className="text-4xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tighter border-b border-black/5 pb-4 interactive-element" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <motion.button 
              custom={5}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => { setIsMenuOpen(false); handleSubmission(); }} 
              className="mt-6 bg-[#0071e3] text-white py-5 rounded-[2rem] font-bold text-xl shadow-[0_20px_40px_-10px_rgba(0,113,227,0.4)] interactive-element active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Submit Abstract</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-active:animate-shimmer"></div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 md:pt-48 pb-12 md:pb-16 w-full z-10 flex flex-col items-center justify-center min-h-[100svh]">
        <div className="w-full max-w-[1400px] mx-auto px-5 md:px-6 text-center flex flex-col items-center z-20">

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} 
            className="px-4 md:px-5 py-2 rounded-full border border-black/5 bg-white/60 backdrop-blur-xl shadow-sm mb-6 md:mb-8 inline-flex items-center gap-2 md:gap-3 interactive-element"
          >
            <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse"></span>
            <span className="text-[#1d1d1f] font-bold text-[9px] md:text-xs uppercase tracking-[0.2em]">IIT Kharagpur Presents</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
            className="text-[#1d1d1f] text-[11.5vw] md:text-[6.5vw] lg:text-[75px] xl:text-[85px] font-bold tracking-tighter leading-[1.05] text-balance"
          >
            The International Conference on <br />
            <HandDrawnHighlight color="#5ac8fa" delay={1.2}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0071e3] via-[#5ac8fa] to-[#0071e3] animate-gradient-x bg-[length:200%_auto] pb-1 md:pb-2 inline-block drop-shadow-sm">
                Future Mobility Systems
              </span>
            </HandDrawnHighlight>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} 
            className="text-[#424245] mt-5 md:mt-6 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-snug text-balance px-4"
          >
            Innovating human movement through the intelligent convergence of energy, data, and autonomous systems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} 
            className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-3 md:gap-4 bg-white/80 backdrop-blur-2xl px-4 md:px-5 py-3 rounded-2xl sm:rounded-full border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center sm:text-left mx-4"
          >
            <div className="bg-[#0071e3]/10 p-2 md:p-2.5 rounded-full shrink-0">
              <BookOpen size={16} className="text-[#0071e3] md:w-[18px] md:h-[18px]" />
            </div>
            <p className="text-[#1d1d1f] text-[11px] md:text-sm font-semibold max-w-[280px] md:max-w-md leading-tight">
              <span className="text-[#0071e3] uppercase tracking-[0.1em] text-[9px] md:text-[10px] font-bold block sm:inline sm:mr-2 mb-1 sm:mb-0">Indexed Pubs</span> 
              Selected full paper in indexed conference proceedings and special issue journals.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} 
            className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-6 pt-8 md:pt-10 w-full px-6"
          >
            <MagneticButton onClick={handleSubmission} className="w-full sm:w-auto bg-[#1d1d1f] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-xl hover:bg-[#0071e3] transition-colors flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,113,227,0.3)] relative overflow-hidden group interactive-element active:scale-95">
              <span className="relative z-10 flex items-center gap-2">Submit Abstract <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </MagneticButton>
            
            <div className="flex flex-col text-center sm:text-left sm:pl-6 py-1 sm:border-l-[3px] border-black/10 mt-4 sm:mt-0">
               <span className="text-base md:text-xl font-bold text-[#1d1d1f] leading-tight">28—31 Jan 2027</span>
               <span className="text-[13px] md:text-base font-semibold text-[#86868b] flex items-center justify-center sm:justify-start gap-1 mt-1">
                 <MapPin size={14}/> Research Park, Kolkata
               </span>
            </div>
          </motion.div>

        </div>

        {/* Hero Image Block below the text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-12 md:mt-24 z-10"
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-black/5 bg-black group interactive-element">
             <img src={imgPath.hero} alt="IIT KGP" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[15s] ease-out" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
             {/* Glowing Play Icon Overlay */}
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform">
                 <Play className="text-white ml-1 md:ml-2 w-6 h-6 md:w-8 md:h-8" fill="white" />
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* --- STATS BENTO GRID --- */}
      <section className="pb-20 md:pb-24 pt-10 relative z-40 md:-mt-24 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 pointer-events-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Award size={28} md:size={32} strokeWidth={1.5}/>, title: "1st Edition", sub: "Global Initiative", color: "text-[#0071e3]", bg: "bg-white/80 backdrop-blur-2xl" },
              { icon: <Workflow size={28} md:size={32} strokeWidth={1.5}/>, title: "10 Tracks", sub: "Scientific Matrix", color: "text-[#34c759]", bg: "bg-white/80 backdrop-blur-2xl" },
              { icon: <Users size={28} md:size={32} strokeWidth={1.5}/>, title: "500+ Peers", sub: "Global Network", color: "text-[#5856d6]", bg: "bg-white/80 backdrop-blur-2xl" },
              { icon: <Book size={28} md:size={32} strokeWidth={1.5}/>, title: "Publications", sub: "Indexed Proceedings", color: "text-white", bg: "bg-[#1d1d1f] text-white backdrop-blur-xl border-white/10", dark: true }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`${stat.bg} p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-between min-h-[180px] md:min-h-[220px] border border-black/5 shadow-xl shadow-black/[0.04] transition-all hover:-translate-y-2 hover:shadow-2xl group interactive-element`}>
                  <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-[1rem] md:rounded-2xl w-fit ${stat.dark ? 'bg-white/10' : 'bg-gray-50 group-hover:scale-110 transition-transform'}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                  <div>
                    <p className={`text-2xl md:text-3xl font-bold tracking-tight leading-none mb-2 ${stat.dark ? 'text-white' : 'text-[#1d1d1f]'}`}>{stat.title}</p>
                    <p className={`${stat.dark ? 'text-white/60' : 'text-[#86868b]'} text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]`}>{stat.sub}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- PLATINUM JUBILEE --- */}
      <section id="heritage" className="py-24 md:py-48 bg-[#f5f5f7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-bl from-[#0071e3]/10 to-transparent rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-16 md:gap-20 items-center relative z-10">
           <div className="space-y-8 md:space-y-12 text-center lg:text-left">
              <FadeIn className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-black/10 bg-white shadow-sm">
                   <Award size={14} className="text-[#0071e3]" />
                   <h2 className="text-[#1d1d1f] font-bold text-[10px] md:text-xs uppercase tracking-widest">Historic 75 Years</h2>
                </div>
                <h3 className="text-[#1d1d1f] text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter leading-[0.9]">Platinum <br className="hidden sm:block"/> <span className="text-[#86868b]">Jubilee.</span></h3>
              </FadeIn>
              <FadeIn delay={0.2} className="bg-white p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-black/5 shadow-xl shadow-black/[0.02] text-left">
                 <p className="text-[#1d1d1f] text-xl md:text-3xl font-bold leading-tight italic mb-6 md:mb-8 border-l-4 border-[#0071e3] pl-4 md:pl-6">
                   "August 18, 2025 – August 18, 2027. Dedicated to the service of the nation."
                 </p>
                 <p className="text-[#424245] text-base md:text-lg leading-relaxed font-medium">Marking three-quarters of a century defined by innovation, excellence, and global academic leadership. IIT Kharagpur continues to forge the future.</p>
              </FadeIn>
           </div>
           
           <div className="flex justify-center relative h-full min-h-[350px] md:min-h-[500px] items-center">
              <TiltCard className="w-full max-w-[350px] md:max-w-[500px] aspect-square interactive-element">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }} 
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
                  transition={{ duration: 1, type: "spring" }} 
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-md rounded-full p-12 md:p-24 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white/50 flex items-center justify-center w-full h-full relative z-10"
                >
                   <img src={imgPath.logo} alt="PJ Logo" className="w-full h-auto drop-shadow-2xl" />
                   
                   <motion.div 
                     animate={{ y: [0, -10, 0] }} 
                     transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                     className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-4 bg-gradient-to-br from-[#0071e3] to-[#005bb5] text-white p-6 md:p-14 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl border-[3px] md:border-4 border-white backdrop-blur-xl"
                   >
                     <p className="text-4xl md:text-8xl font-bold italic leading-none tracking-tighter drop-shadow-md">75</p>
                   </motion.div>
                </motion.div>
              </TiltCard>
           </div>
        </div>
      </section>

      {/* --- COUNTDOWN TRACKER --- */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]"></div>

        <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center space-y-12 md:space-y-20 relative z-10">
          <FadeIn className="space-y-4 md:space-y-6">
            <h2 className="text-[#0071e3] font-bold text-xs md:text-sm uppercase tracking-[0.2em]">Action Deadline</h2>
            <h3 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter text-[#1d1d1f] text-balance">Submission Closes In.</h3>
          </FadeIn>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <TiltCard className="w-20 h-20 sm:w-28 sm:h-28 md:w-56 md:h-56">
                  <div className="w-full h-full bg-[#fcfcfc] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[3.5rem] flex flex-col items-center justify-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] shadow-md md:shadow-xl shadow-black/[0.03] group hover:bg-[#0071e3] transition-colors duration-500 ease-out border border-black/5 interactive-element">
                    <span className="text-2xl sm:text-4xl md:text-8xl font-bold tracking-tighter text-[#1d1d1f] group-hover:text-white transition-colors duration-500 font-mono">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[#86868b] text-[8px] sm:text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-1 md:mt-4 group-hover:text-white/80 transition-colors">
                      {unit.label}
                    </span>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 md:py-48 bg-[#1d1d1f] text-white scroll-mt-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[80vw] h-[120vw] md:h-[80vw] bg-[#0071e3] rounded-full blur-[100px] md:blur-[150px] opacity-20 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
           <div className="space-y-8 md:space-y-12 text-center lg:text-left">
              <FadeIn>
                <h2 className="text-5xl sm:text-6xl md:text-[8vw] lg:text-[100px] font-bold tracking-tighter leading-[0.9]">
                  The Mother of <br className="hidden sm:block"/> <span className="text-white/40">Innovation.</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-white/70 text-base md:text-2xl leading-relaxed font-light text-balance px-4 lg:px-0">
                  Established in 1951, IIT Kharagpur is the cradle of technical education in India. Born from the site of the Hijli Detention Camp, it remains the most diversified institute merging profound heritage with cutting-edge global research.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <MagneticButton onClick={() => window.open("https://www.iitkgp.ac.in/about-iitkgp")} className="bg-white text-[#1d1d1f] px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-lg hover:bg-[#f5f5f7] transition-all inline-flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] interactive-element">
                   Explore Heritage <ExternalLink size={16} className="md:w-[18px] md:h-[18px]"/>
                </MagneticButton>
              </FadeIn>
           </div>
           <FadeIn delay={0.3} className="relative group perspective-[1000px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0071e3] to-purple-500 rounded-[2rem] md:rounded-[4rem] blur-xl md:blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
              <TiltCard className="rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 relative z-10 bg-[#2c2c2e] interactive-element">
                 <img src={imgPath.architecture} alt="Defining Smart Mobility" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 mix-blend-luminosity hover:mix-blend-normal" />
              </TiltCard>
           </FadeIn>
        </div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <div className="bg-[#1d1d1f] py-6 md:py-8 border-t border-white/10 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee inline-block text-white/20 font-bold text-2xl md:text-6xl tracking-[0.1em] uppercase">
          INNOVATING HUMAN MOVEMENT &nbsp;✦&nbsp; ARCHITECTING FUTURE TRANSIT &nbsp;✦&nbsp; POWERING SMART INFRASTRUCTURE &nbsp;✦&nbsp; CONNECTING THE GLOBE &nbsp;✦&nbsp; 
        </div>
        <div className="animate-marquee inline-block text-white/20 font-bold text-2xl md:text-6xl tracking-[0.1em] uppercase" aria-hidden="true">
          INNOVATING HUMAN MOVEMENT &nbsp;✦&nbsp; ARCHITECTING FUTURE TRANSIT &nbsp;✦&nbsp; POWERING SMART INFRASTRUCTURE &nbsp;✦&nbsp; CONNECTING THE GLOBE &nbsp;✦&nbsp; 
        </div>
      </div>

      {/* --- VISION VIDEO SECTION --- */}
      <section className="py-24 md:py-48 bg-[#fdfdfd]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 text-center space-y-12 md:space-y-20">
          <FadeIn className="space-y-4 md:space-y-6">
            <h2 className="text-[#0071e3] font-bold text-xs md:text-sm uppercase tracking-[0.2em]">Conference Vision</h2>
            <h3 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter text-[#1d1d1f]">Insights into Mobility.</h3>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="relative w-full max-w-6xl mx-auto group px-2 md:px-0">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2rem] md:rounded-[3rem] blur-xl md:blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              <div className="rounded-[1.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-black aspect-video relative z-10 border border-white/20 interactive-element">
                <iframe 
                  className="absolute inset-0 w-full h-full pointer-events-auto"
                  src="https://www.youtube.com/embed/dDdnP4PaXV4?autoplay=0&rel=0&modestbranding=1" 
                  title="ICFMS 2027 Vision Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- THEMES: VIBRANT BENTO --- */}
      <section id="themes" className="py-24 md:py-48 bg-[#f5f5f7] scroll-mt-20 rounded-[2rem] md:rounded-[5rem] mx-2 md:mx-6 shadow-sm border border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 relative z-10">
          <FadeIn className="mb-16 md:mb-24 space-y-4 md:space-y-6 text-center lg:text-left">
            <h2 className="text-[#0071e3] font-bold text-xs md:text-sm uppercase tracking-[0.2em]">Scientific Core</h2>
            <h3 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tighter text-[#1d1d1f] leading-none">Thematic <br className="hidden lg:block"/> Tracks.</h3>
            <p className="text-[#86868b] text-base md:text-3xl max-w-2xl mx-auto lg:mx-0 font-light leading-snug text-balance">Converging energy, intelligence, and sustainable urban modeling into 10 distinct paradigms.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {themes.map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.05} className="h-full">
                <TiltCard className="h-full">
                  <div className={`p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br ${t.color} flex flex-col justify-between h-full min-h-[250px] md:min-h-[350px] ${t.shadow} group relative overflow-hidden transition-all duration-500 interactive-element`}>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="text-white bg-white/20 w-fit p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                      {React.cloneElement(t.icon, { size: window.innerWidth < 768 ? 20 : 28 })}
                    </div>
                    
                    <div className="space-y-2 md:space-y-4 relative z-10 mt-6 md:mt-0">
                      <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-tight">{t.title}</h3>
                      <p className="text-white/80 text-xs md:text-sm font-medium leading-relaxed">{t.desc}</p>
                      <div className="h-[2px] w-8 md:w-12 bg-white/40 rounded-full my-3 md:my-4" />
                      <p className="text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Track 0{idx + 1}</p>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- TIMELINE WITH SCROLL PROGRESS --- */}
      <section id="dates" className="py-24 md:py-48 bg-[#fdfdfd] scroll-mt-20 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-5 md:px-6">
           <FadeIn className="text-center mb-16 md:mb-24">
             <h2 className="text-[#1d1d1f] text-5xl sm:text-6xl md:text-[100px] font-bold tracking-tighter">Key Dates.</h2>
           </FadeIn>
           
           <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[2px] bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="w-full bg-[#0071e3] origin-top"
                  style={{ scaleY: scrollYProgress }} 
                />
              </div>

              <div className="space-y-8 md:space-y-20">
                {[
                  { l: "Abstract Submission Opens", d: "15 Feb 2026", active: false, done: true },
                  { l: "Abstract Submission Deadline", d: "15 May 2026", active: true, done: false }, // Currently Active Phase based on today's date
                  { l: "Acceptance Notification", d: "30 Jun 2026", active: false, done: false },
                  { l: "Full Paper Submission", d: "01 Aug 2026", active: false, done: false },
                  { l: "Final Decision Notification", d: "01 Oct 2026", active: false, done: false }
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="relative pl-12 sm:pl-20 md:pl-32 group cursor-default">
                      {/* Timeline Dot */}
                      <div className={`absolute left-[0.6rem] md:left-[2.85rem] top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full border-[3px] md:border-4 border-white shadow-sm z-10 transition-colors duration-300 ${item.active ? 'bg-[#ff3b30] shadow-[0_0_15px_rgba(255,59,48,0.6)] animate-pulse' : (item.done ? 'bg-[#0071e3]' : 'bg-gray-300 group-hover:bg-[#0071e3]/50')}`}></div>
                      
                      <div className={`bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[3rem] flex flex-col md:flex-row justify-between items-start md:items-center shadow-[0_5px_20px_-10px_rgba(0,0,0,0.03)] md:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] border transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] ${item.active ? 'border-[#ff3b30]/30 hover:border-[#ff3b30]/50 shadow-[0_10px_30px_-10px_rgba(255,59,48,0.1)]' : (item.done ? 'border-[#0071e3]/20' : 'border-black/5')} interactive-element`}>
                         <div className="mb-2 md:mb-0">
                            <div className="flex items-center gap-3 mb-1 md:mb-2">
                              <p className={`text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] ${item.active ? 'text-[#ff3b30]' : 'text-[#86868b]'}`}>Phase 0{i+1}</p>
                              {item.active && <span className="bg-[#ff3b30]/10 text-[#ff3b30] text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Live</span>}
                            </div>
                            <h4 className="text-[#1d1d1f] text-lg sm:text-xl md:text-3xl font-bold tracking-tight">{item.l}</h4>
                         </div>
                         <p className={`text-xl sm:text-2xl md:text-4xl font-bold tracking-tighter ${item.active ? 'text-[#ff3b30]' : (item.done ? 'text-[#0071e3]' : 'text-[#d2d2d7]')}`}>{item.d}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 md:py-32 bg-[#f5f5f7] rounded-[2rem] md:rounded-[5rem] mx-2 md:mx-6 mb-16 md:mb-24 shadow-sm border border-black/5">
        <div className="max-w-[800px] mx-auto px-5 md:px-6">
           <FadeIn>
             <h3 className="text-4xl sm:text-5xl md:text-[80px] font-bold tracking-tighter text-center mb-12 md:mb-20 text-[#1d1d1f] leading-none">Common <br className="hidden sm:block"/> Questions.</h3>
           </FadeIn>
           <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-sm border border-black/5 transition-all hover:shadow-md interactive-element">
                     <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full p-6 md:p-10 flex justify-between items-center text-left">
                        <span className="text-base sm:text-lg md:text-2xl font-bold text-[#1d1d1f] pr-4 md:pr-8 leading-snug">{faq.q}</span>
                        <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }} className="bg-[#f5f5f7] p-1.5 md:p-2 rounded-full shrink-0">
                           <Plus size={20} className="text-[#0071e3] md:w-6 md:h-6"/>
                        </motion.div>
                     </button>
                     <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }} 
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="px-6 md:px-10 pb-6 md:pb-10 overflow-hidden"
                          >
                             <p className="text-sm md:text-lg text-[#424245] leading-relaxed font-medium pt-4 md:pt-6 border-t border-black/5">{faq.a}</p>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
                </FadeIn>
              ))}
           </div>
        </div>
      </section>

      {/* --- VENUE (DARK MODE CONTRAST) --- */}
      <section id="venue" className="py-24 md:py-48 bg-[#1d1d1f] text-white scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:60px_60px]"></div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 relative z-10">
           <div className="bg-[#2c2c2e] rounded-[2rem] md:rounded-[4rem] overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[500px] md:min-h-[700px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/10">
              <div className="lg:w-1/2 p-8 sm:p-12 md:p-24 lg:p-32 flex flex-col justify-center space-y-10 md:space-y-16 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0071e3]/20 to-transparent pointer-events-none"></div>

                 <FadeIn className="space-y-4 md:space-y-6 relative z-10">
                    <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] inline-block shadow-lg">Location Context</span>
                    <h2 className="text-6xl sm:text-7xl md:text-[120px] font-bold text-white tracking-tighter leading-[0.9]">Kolkata.</h2>
                 </FadeIn>
                 
                 <FadeIn delay={0.2} className="space-y-4 md:space-y-6 border-l-[3px] md:border-l-[4px] border-[#0071e3] pl-5 md:pl-8 text-left text-white relative z-10">
                    <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">The Research Park</p>
                    <p className="text-[#a1a1a6] text-base md:text-xl leading-relaxed max-w-lg font-light text-balance">
                      Located in Newtown, West Bengal. A state-of-the-art technical cluster architected to host the global nexus of future mobility.
                    </p>
                 </FadeIn>
                 
                 <FadeIn delay={0.4} className="relative z-10 pt-4 md:pt-0">
                   <MagneticButton onClick={() => window.open("https://maps.app.goo.gl/JmFBsApsZ6si41WSA", "_blank")} className="bg-white text-[#1d1d1f] w-full sm:w-fit px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-sm md:text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center sm:justify-start gap-3 interactive-element">
                      View Directions <MapNavigation size={18} className="md:w-5 md:h-5"/>
                   </MagneticButton>
                 </FadeIn>
              </div>
              <div className="lg:w-1/2 relative group overflow-hidden min-h-[300px] md:min-h-[400px] interactive-element">
                 <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-1000"></div>
                 <img src={imgPath.venue} alt="Kolkata Venue" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" />
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#fdfdfd] pt-24 md:pt-40 pb-12 md:pb-16 relative overflow-hidden">
        <div className="absolute top-10 left-0 w-full text-center overflow-hidden pointer-events-none opacity-[0.02] flex justify-center">
          <span className="text-[25vw] md:text-[30vw] font-bold tracking-tighter whitespace-nowrap leading-none">ICFMS</span>
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-6 text-[#1d1d1f] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-20 md:mb-32">
             <div className="space-y-6 md:space-y-10 text-left">
                <img src={imgPath.logo} alt="ICFMS" className="h-16 md:h-20 w-auto mix-blend-multiply" />
                <div className="space-y-2 md:space-y-4">
                  <p className="text-[#1d1d1f] text-2xl md:text-3xl font-bold tracking-tighter uppercase leading-none">योगः कर्मसु कौशलम्</p>
                  <p className="text-[10px] md:text-xs font-bold text-[#0071e3] uppercase tracking-[0.2em]">Excellence in Action is Yoga.</p>
                </div>
                <p className="text-base md:text-lg text-[#86868b] font-medium leading-relaxed">"Dedicated to the service of the nation since 1951."</p>
             </div>
             
             <div className="lg:col-span-2 space-y-6 md:space-y-10 text-left">
                <h5 className="text-[#1d1d1f] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8">Official Correspondence</h5>
                <div className="space-y-3 md:space-y-4">
                   <p className="text-[#1d1d1f] text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter">Prof. Arkopal K. Goswami</p>
                   <div className="space-y-1 pt-1 md:pt-2 text-sm sm:text-base md:text-lg font-medium">
                      <p className="text-[#424245]">Associate Professor, RCGSIDM</p>
                      <p className="text-[#86868b] uppercase text-xs md:text-sm tracking-widest mt-1 md:mt-2">Associate Dean, International Relations <br /> IIT Kharagpur</p>
                   </div>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-10 pt-4 md:pt-6">
                   <a href="mailto:icfms.iitkgp@gmail.com" className="text-[#0071e3] text-base md:text-lg font-bold hover:text-[#1d1d1f] transition-colors flex items-center gap-2 border-b-2 border-[#0071e3]/30 pb-1 hover:border-[#1d1d1f] interactive-element w-full sm:w-auto">
                     <Mail size={16} className="md:w-[18px] md:h-[18px] shrink-0"/> <span className="truncate">icfms.iitkgp@gmail.com</span>
                   </a>
                   <a href="https://www.mustlab.in/" target="_blank" rel="noreferrer" className="text-[#0071e3] text-base md:text-lg font-bold hover:text-[#1d1d1f] transition-colors flex items-center gap-2 border-b-2 border-[#0071e3]/30 pb-1 hover:border-[#1d1d1f] interactive-element w-full sm:w-auto">
                     <Globe size={16} className="md:w-[18px] md:h-[18px] shrink-0"/> mustlab.in
                   </a>
                </div>
             </div>

             <div className="space-y-6 md:space-y-10 text-left mt-8 lg:mt-0">
                <h5 className="text-[#1d1d1f] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8">Resources</h5>
                <ul className="space-y-4 md:space-y-6 text-[#424245] text-base md:text-lg font-semibold">
                   <li><a href="https://www.iitkgp.ac.in" target="_blank" rel="noreferrer" className="hover:text-[#0071e3] transition-colors flex items-center gap-2 group interactive-element"><ArrowRight size={14} className="md:w-4 md:h-4 text-gray-300 group-hover:text-[#0071e3] transition-colors"/> Institute Portal</a></li>
                   <li><a href="https://www.iitkgp.ac.in/pj" target="_blank" rel="noreferrer" className="hover:text-[#0071e3] transition-colors flex items-center gap-2 group interactive-element"><ArrowRight size={14} className="md:w-4 md:h-4 text-gray-300 group-hover:text-[#0071e3] transition-colors"/> Platinum Jubilee Site</a></li>
                   <li><a href={ABSTRACT_FORMAT_URL} target="_blank" rel="noreferrer" className="hover:text-[#0071e3] transition-colors flex items-center gap-2 group interactive-element"><ArrowRight size={14} className="md:w-4 md:h-4 text-gray-300 group-hover:text-[#0071e3] transition-colors"/> Abstract Formatting</a></li>
                </ul>
             </div>
          </div>

          <div className="pt-8 md:pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
             <div className="text-[#86868b] text-[9px] md:text-[11px] font-bold text-center md:text-left uppercase tracking-[0.15em] leading-relaxed max-w-lg">
                &copy; 2027 ICFMS | Indian Institute of Technology Kharagpur <br className="hidden md:block"/> 
                A Global Forum on the Future of Human Mobility.
             </div>
             <div className="text-xs md:text-sm text-[#424245] font-semibold flex items-center gap-2 md:gap-3 bg-[#f5f5f7] px-4 md:px-6 py-2.5 md:py-3 rounded-full">
                Engineered with <Heart size={14} className="md:w-4 md:h-4 text-red-500 fill-current animate-pulse" /> by <a href="https://kapil2020.github.io/website" target="_blank" rel="noreferrer" className="text-[#1d1d1f] font-bold hover:text-[#0071e3] transition-colors interactive-element">Kapil</a>
             </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        :root { --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif; }
        body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 8px; }
        @media (min-width: 768px) { ::-webkit-scrollbar { width: 10px; } }
        ::-webkit-scrollbar-track { background: #fdfdfd; }
        ::-webkit-scrollbar-thumb { background: #d2d2d7; border-radius: 20px; border: 3px solid #fdfdfd; }
        ::-webkit-scrollbar-thumb:hover { background: #86868b; }
        
        .text-balance { text-wrap: balance; }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }

        /* Hide default cursor on desktop when hovering over interactive elements */
        @media (hover: hover) and (pointer: fine) {
          .interactive-element:hover, button:hover, a:hover {
            cursor: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default App;