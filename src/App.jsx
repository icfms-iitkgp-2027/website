import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, MapPin, Mail, Globe, Zap, Cpu, Truck, ShieldCheck, 
  Leaf, Settings, ArrowRight, Navigation as MapNavigation, 
  Heart, Building2, BookOpen, Bell, Scale, BrainCircuit, Workflow, X, Menu, ExternalLink,
  Facebook, Twitter, Linkedin, Timer, Award, Users, Book, ChevronUp, Plus, Play
} from 'lucide-react';

/**
 * ICFMS 2027 - THE OFFICIAL INTERFACE
 * Version 13.4: Final Production Build (Launch Ready)
 * Design: Apple Pro Aesthetic, Mobile-Optimized Bento, YouTube Integration
 */

// --- PERFORMANCE-OPTIMIZED TECH BACKGROUND ---
const TechCanvas = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    if (!mountRef.current) return;
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const particlesGeometry = new THREE.BufferGeometry();
      const count = window.innerWidth < 768 ? 120 : 400; 
      const posArray = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) posArray[i] = (Math.random() - 0.5) * 80;
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: '#0071e3',
        transparent: true,
        opacity: 0.1,
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      camera.position.z = 35;

      const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.00015;
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
        if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      };
    } catch (e) {
      console.warn("WebGL suppressed for performance.");
    }
  }, []);
  
  return <div ref={mountRef} className="fixed inset-0 z-[-1] pointer-events-none bg-white" />;
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const FORM_URL = "https://forms.gle/2ejuthB7udhpyVYL8";
  const imgPath = {
    logo: "https://raw.githubusercontent.com/kapil2020/web/main/logo%20pj.png",
    hero: "https://raw.githubusercontent.com/kapil2020/web/main/carousel-2.jpg.png", 
    venue: "https://raw.githubusercontent.com/kapil2020/web/main/venue1.jpg",
    architecture: "https://raw.githubusercontent.com/kapil2020/web/main/Gallery/MobilityAI1_Cover.png?raw=true",
  };

  const handleSubmission = () => window.open(FORM_URL, '_blank', 'noopener,noreferrer');

  useEffect(() => {
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
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const themes = [
    { title: "Energy for Mobility", icon: <Zap size={24}/>, desc: "Hydrogen fuel cells, battery ecosystems, and clean propulsion.", color: "from-[#ff3b30] to-[#ff9500]" }, 
    { title: "Mobility Technologies", icon: <Cpu size={24}/>, desc: "Connected sensors, IoT integration, and smart vehicle hardware.", color: "from-[#0071e3] to-[#5ac8fa]" }, 
    { title: "Vehicular Systems", icon: <Settings size={24}/>, desc: "Advanced engineering, aerodynamics, and structural dynamics.", color: "from-[#5856d6] to-[#af52de]" }, 
    { title: "Policy & Economics", icon: <Scale size={24}/>, desc: "Global standards, market models, and regulatory frameworks.", color: "from-[#8e8e93] to-[#1d1d1f]" }, 
    { title: "Safety & Autonomy", icon: <ShieldCheck size={24}/>, desc: "AI-driven safety, V2X, and autonomous navigation protocols.", color: "from-[#ff2d55] to-[#ff3b30]" }, 
    { title: "Smart Infrastructure", icon: <Building2 size={24}/>, desc: "Intelligent roads, futuristic hubs, and transit facility design.", color: "from-[#34c759] to-[#0071e3]" }, 
    { title: "Logistics 4.0", icon: <Truck size={24}/>, desc: "Automated delivery, freight management, and warehouse robotics.", color: "from-[#ff9500] to-[#ffcc00]" }, 
    { title: "Urban & Sustainable", icon: <Leaf size={24}/>, desc: "Low-carbon behavior, green urbanism, and transit-oriented development.", color: "from-[#28cd41] to-[#34c759]" }, 
    { title: "Integrated Planning", icon: <Workflow size={24}/>, desc: "Holistic modeling of urban spaces and transportation layers.", color: "from-[#00c7be] to-[#0071e3]" }, 
    { title: "Data Science & AI", icon: <BrainCircuit size={24}/>, desc: "Big data analytics and predictive modeling for transit networks.", color: "from-[#af52de] to-[#0071e3]" }  
  ];

  const faqs = [
    { q: "What is the core focus of ICFMS 2027?", a: "The conference focuses on architecting future mobility through clean energy, autonomous intelligence, and sustainable urban transit systems." },
    { q: "How can I participate as a delegate?", a: "Registration will open following the abstract acceptance phase. Please stay tuned to our official portal for the live link." },
    { q: "Are there publication opportunities?", a: "Yes, selected full paper will publish in indexed conference proceedings and special issue journal's." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1d1d1f] selection:bg-blue-100 overflow-x-hidden">
      <TechCanvas />
      
      {/* --- PROGRESS BAR --- */}
      <motion.div className="fixed top-0 left-0 right-0 h-[4px] bg-[#0071e3] origin-left z-[2000]" style={{ scaleX }} />

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-[1500] transition-all duration-500 border-b ${scrolled ? 'bg-white/95 backdrop-blur-xl border-black/10 py-3 shadow-sm' : 'bg-white border-transparent py-4 md:py-8'}`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#" className="h-10 md:h-12 block transition-transform hover:scale-105 active:scale-95">
              <img src={imgPath.logo} alt="IIT KGP" className="h-full w-auto object-contain" />
            </a>
            <div className="hidden sm:block border-l border-black/10 pl-4 h-6">
              <p className="text-[14px] font-bold text-[#1d1d1f] tracking-tight leading-none h-full flex items-center uppercase">ICFMS 2027</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {['Heritage', 'About', 'Themes', 'Dates', 'Venue'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-[13px] font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0071e3] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button onClick={handleSubmission} className="bg-[#0071e3] text-white text-[13px] px-6 py-2.5 rounded-full font-bold hover:bg-[#0077ed] transition-all active:scale-95 shadow-md">
              Submit Abstract
            </button>
          </div>

          <button className="lg:hidden text-[#1d1d1f] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE NAV OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-[1400] bg-white pt-24 px-10 flex flex-col gap-10">
            {['Heritage', 'About', 'Themes', 'Dates', 'Venue'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-4xl font-bold text-[#1d1d1f] border-b border-black/5 pb-4" onClick={() => setIsMenuOpen(false)}>{link}</a>
            ))}
            <button onClick={handleSubmission} className="bg-[#0071e3] text-white py-6 rounded-2xl font-bold text-xl shadow-lg">Submit Abstract</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-48 pb-20">
        <div className="max-w-[1200px] mx-auto w-full text-center space-y-12">
          <div className="space-y-6">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#0071e3] font-bold text-sm md:text-lg uppercase tracking-[0.3em]">
              IIT KHARAGPUR PRESENTS
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[#1d1d1f] text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-[1.05]">
              The International Conference on <br className="hidden md:block" /> Future Mobility Systems
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-[#424245] text-xl md:text-3xl max-w-4xl mx-auto font-medium leading-relaxed">
              Innovating human movement through the intelligent convergence <br className="hidden md:block" /> of energy, data, and autonomous systems.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <button onClick={handleSubmission} className="bg-[#0071e3] text-white px-14 py-5 rounded-full font-bold text-xl hover:bg-[#0077ed] transition-all flex items-center gap-3 shadow-xl">
              Submit Abstract <ArrowRight size={24} />
            </button>
            <div className="flex flex-col text-left border-l-4 border-[#0071e3] pl-8 py-2">
               <span className="text-xl font-bold text-[#1d1d1f]">28—31 Jan 2027</span>
               <span className="text-lg font-semibold text-[#86868b]">Research Park, Kolkata</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.2 }} className="mt-16 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-black/5 bg-slate-100 aspect-[4/3] md:aspect-[21/9]">
            <img src={imgPath.hero} alt="IIT Kharagpur Main Building" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* --- STATS BENTO GRID --- */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Award className="text-[#0071e3]" size={32}/>, title: "First Mobility Conference", sub: "Regional Area" },
              { icon: <Workflow className="text-[#34c759]" size={32}/>, title: "10+ Tracks", sub: "Scientific Matrix" },
              { icon: <Users className="text-[#5856d6]" size={32}/>, title: "500+ Delegates", sub: "Global Network" },
              { icon: <Book className="text-white" size={32}/>, title: "Publication Opportunity", sub: "Selected full paper in indexed conference proceedings and special issue journal's", dark: true }
            ].map((stat, i) => (
              <div key={i} className={`${stat.dark ? 'bg-[#0071e3] text-white shadow-xl' : 'bg-white text-[#1d1d1f] shadow-sm'} p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between border border-black/5 transition-transform hover:scale-[1.02]`}>
                <div className="mb-6">{stat.icon}</div>
                <div>
                  <p className="text-xl md:text-2xl font-bold tracking-tight leading-none">{stat.title}</p>
                  <p className={`${stat.dark ? 'text-white/60' : 'text-[#86868b]'} text-[10px] mt-4 font-bold uppercase tracking-widest`}>{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COUNTDOWN TRACKER --- */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <p className="text-[#0071e3] font-bold text-sm uppercase tracking-widest">Action Deadline</p>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tight text-[#1d1d1f]">Submission Closes In.</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-10">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit, i) => (
              <div key={i} className="bg-[#f5f5f7] w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 rounded-[2rem] md:rounded-[3.5rem] flex flex-col items-center justify-center shadow-sm border border-black/5 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                <span className="text-3xl md:text-7xl font-bold tracking-tighter text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{String(unit.value).padStart(2, '0')}</span>
                <span className="text-[#86868b] text-[9px] md:text-xs font-bold uppercase tracking-widest mt-2">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PLATINUM JUBILEE --- */}
      <section id="heritage" className="py-24 md:py-60 bg-[#f5f5f7] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-[#0071e3] font-bold text-lg uppercase tracking-widest">Historic 75 Years</h2>
                <h3 className="text-[#1d1d1f] text-6xl md:text-9xl font-bold tracking-tight leading-none text-[#1d1d1f]">Platinum <br /> Jubilee.</h3>
              </div>
              <div className="bg-white p-10 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-black/5 shadow-sm">
                 <p className="text-[#1d1d1f] text-2xl md:text-4xl font-bold leading-tight italic mb-10">
                   "August 18, 2025 – August 18, 2027. Dedicated to the service of the nation."
                 </p>
                 <p className="text-[#424245] text-xl leading-relaxed font-medium">Marking three-quarters of a century defined by innovation, excellence, and global academic leadership.</p>
              </div>
           </div>
           <div className="flex justify-center relative">
              <motion.div whileInView={{ scale: 1 }} initial={{ scale: 0.9 }} transition={{ duration: 0.8 }} className="bg-white rounded-[4rem] md:rounded-[6rem] p-12 md:p-28 shadow-2xl border border-black/5 flex items-center justify-center max-w-lg w-full relative">
                 <img src={imgPath.logo} alt="PJ Logo" className="w-full h-auto" />
                 <div className="absolute -bottom-8 -right-8 bg-[#0071e3] text-white p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl"><p className="text-5xl md:text-6xl font-bold italic leading-none">75</p></div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 md:py-48 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
           <div className="space-y-10">
              <h2 className="text-[#1d1d1f] text-5xl md:text-8xl font-bold tracking-tight leading-[1.1]">The Mother of <br /> <span className="text-[#86868b]">Indian Innovation.</span></h2>
              <p className="text-[#1d1d1f] text-xl md:text-2xl leading-relaxed font-light">
                Established in 1951, IIT Kharagpur is the cradle of technical education in India. Born from the site of the Hijli Detention Camp, it remains the most diversified institute merging heritage with global research.
              </p>
              <button onClick={() => window.open("https://www.iitkgp.ac.in/about-iitkgp")} className="bg-[#1d1d1f] text-white px-10 py-4 rounded-full font-bold hover:bg-black transition-all inline-flex items-center gap-3 shadow-md">
                 Explore Institutional History <ExternalLink size={18}/>
              </button>
           </div>
           <div className="rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-[#f5f5f7]">
              <img src={imgPath.architecture} alt="Defining Smart Mobility" className="w-full h-auto object-cover" />
           </div>
        </div>
      </section>

      {/* --- VISION VIDEO SECTION --- */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-[#0071e3] font-bold text-sm uppercase tracking-widest">Conference Vision</h2>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tight text-[#1d1d1f]">Insights into Future Mobility.</h3>
          </div>
          
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} transition={{ duration: 1 }}
            className="w-full max-w-5xl mx-auto rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)] bg-black aspect-video relative group"
          >
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dDdnP4PaXV4?autoplay=0&rel=0&modestbranding=1" 
              title="ICFMS 2027 Vision Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* --- THEMES: VIBRANT BENTO --- */}
      <section id="themes" className="py-24 md:py-48 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-24 space-y-4 text-center lg:text-left">
            <h2 className="text-[#0071e3] font-bold text-sm uppercase tracking-widest">Scientific Core</h2>
            <h3 className="text-5xl md:text-8xl font-bold tracking-tight text-[#1d1d1f]">Conference Themes.</h3>
            <p className="text-[#86868b] text-xl max-w-2xl font-light italic">Converging energy, intelligence, and sustainable urban modeling.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {themes.map((t, idx) => (
              <motion.div key={idx} whileHover={{ y: -10 }} className={`p-8 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br ${t.color} flex flex-col justify-between min-h-[320px] md:min-h-[350px] shadow-lg group relative overflow-hidden`}>
                <div className="absolute top-[-5%] right-[-5%] w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                <div className="text-white">{t.icon}</div>
                <div className="space-y-4">
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-tight">{t.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed">{t.desc}</p>
                  <div className="h-[1px] w-12 bg-white/30 rounded-full" />
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Track {idx + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TIMELINE --- */}
      <section id="dates" className="py-24 md:py-48 bg-[#f5f5f7] scroll-mt-20">
        <div className="max-w-[1000px] mx-auto px-6 space-y-24">
           <h2 className="text-[#1d1d1f] text-6xl md:text-9xl font-bold text-center tracking-tighter">Key Dates.</h2>
           <div className="space-y-6">
              {[
                { l: "Abstract Submission Opens", d: "15 Feb 2026", active: true },
                { l: "Abstract Submission Deadline", d: "15 May 2026", active: true },
                { l: "Acceptance Notification", d: "30 Jun 2026", active: false },
                { l: "Full Paper Submission", d: "01 Aug 2026", active: false },
                { l: "Final Decision Notification", d: "01 Oct 2026", active: false }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 md:p-14 rounded-[2rem] md:rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center group border border-transparent hover:border-black/5 transition-all shadow-sm">
                   <div className="text-center md:text-left mb-6 md:mb-0 text-left">
                      <p className="text-[#86868b] text-[13px] font-bold uppercase tracking-widest mb-2">Phase 0{i+1}</p>
                      <h4 className="text-[#1d1d1f] text-3xl font-bold tracking-tight">{item.l}</h4>
                   </div>
                   <p className={`text-3xl md:text-6xl font-bold tracking-tighter italic ${item.active ? 'text-[#0071e3]' : 'text-[#d2d2d7]'}`}>{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 md:py-48 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
           <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-center mb-24 text-[#1d1d1f]">Common Questions.</h3>
           <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#f5f5f7] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-black/5">
                   <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full p-8 md:p-10 flex justify-between items-center text-left hover:bg-[#e8e8ed] transition-colors">
                      <span className="text-xl md:text-2xl font-bold text-[#1d1d1f]">{faq.q}</span>
                      {activeFaq === i ? <ChevronUp size={24} color="#0071e3"/> : <Plus size={24} color="#86868b"/>}
                   </button>
                   <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-10 pb-10 overflow-hidden">
                           <p className="text-lg text-[#424245] leading-relaxed font-medium pt-6 border-t border-black/5">{faq.a}</p>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- VENUE --- */}
      <section id="venue" className="py-24 md:py-48 bg-[#f5f5f7] scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
           <div className="bg-[#1d1d1f] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[650px] shadow-3xl">
              <div className="lg:w-3/5 p-12 md:p-28 flex flex-col justify-center space-y-12">
                 <div className="space-y-8">
                    <span className="bg-[#0071e3] text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest inline-block shadow-lg">The Research Park</span>
                    <h2 className="text-7xl md:text-[130px] font-bold text-white tracking-tighter italic leading-none">Kolkata.</h2>
                 </div>
                 <div className="space-y-8 border-l-[12px] border-[#0071e3] pl-12 text-left text-white">
                    <p className="text-white text-3xl md:text-5xl font-bold uppercase tracking-tight italic">Innovation Hub</p>
                    <p className="text-[#86868b] text-2xl leading-relaxed max-w-lg font-medium">
                      Newtown, West Bengal. A world-class technical cluster hosting the global nexus of Future Mobility.
                    </p>
                 </div>
                 <button onClick={() => window.open("https://maps.app.goo.gl/JmFBsApsZ6si41WSA", "_blank")} className="bg-white text-black w-fit px-16 py-6 rounded-full font-bold text-xl hover:bg-[#0071e3] hover:text-white transition-all shadow-xl active:scale-95">
                    View Directions
                 </button>
              </div>
              <div className="lg:w-2/5 overflow-hidden">
                 <img src={imgPath.venue} alt="Kolkata Venue" className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0" />
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white pt-48 pb-16 border-t border-black/5 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 text-[#1d1d1f]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-40">
             <div className="space-y-10 text-left">
                <img src={imgPath.logo} alt="ICFMS" className="h-20 w-auto" />
                <div className="space-y-4">
                  <p className="text-[#1d1d1f] text-4xl font-bold tracking-tighter uppercase leading-none italic">योगः कर्मसु कौशलम्</p>
                  <p className="text-sm font-bold text-[#0071e3] uppercase tracking-widest">Excellence in Action is Yoga.</p>
                </div>
                <p className="text-xl text-[#424245] font-medium italic leading-relaxed">"Dedicated to the service of the nation since 1951."</p>
             </div>
             
             <div className="lg:col-span-2 space-y-12 text-left">
                <h5 className="text-[#86868b] text-[13px] font-bold uppercase tracking-widest border-b border-black/10 pb-5 inline-block">Official Correspondence</h5>
                <div className="space-y-6">
                   <p className="text-[#1d1d1f] text-5xl font-bold tracking-tighter">Prof Arkopal K. Goswami, PhD</p>
                   <div className="space-y-2 pt-2 text-xl font-semibold">
                      <p className="text-[#1d1d1f]">Associate Professor, RCGSIDM</p>
                      <p className="text-[#86868b] leading-relaxed uppercase text-[15px] tracking-widest">Associate Dean, International Relations <br /> IIT Kharagpur</p>
                   </div>
                </div>
                <div className="flex flex-wrap gap-10">
                   <a href="mailto:icfms.iitkgp@gmail.com" className="text-[#0071e3] text-xl font-bold hover:underline underline-offset-8">icfms.iitkgp@gmail.com</a>
                   <a href="https://www.mustlab.in/" target="_blank" className="text-[#0071e3] text-xl font-bold hover:underline underline-offset-8">mustlab.in</a>
                </div>
             </div>

             <div className="space-y-12 text-left">
                <h5 className="text-[#86868b] text-[13px] font-bold uppercase tracking-widest border-b border-black/10 pb-5 inline-block">Resources</h5>
                <ul className="space-y-6 text-[#1d1d1f] text-xl font-bold">
                   <li><a href="https://www.iitkgp.ac.in" className="hover:text-[#0071e3] transition-colors decoration-2 underline-offset-4">Institute Portal</a></li>
                   <li><a href="https://www.iitkgp.ac.in/pj" target="_blank" rel="noopener noreferrer" className="hover:text-[#0071e3] transition-colors decoration-2 underline-offset-4">Platinum Jubilee Website</a></li>
                </ul>
             </div>
          </div>

          <div className="pt-24 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="text-[#86868b] text-[13px] font-bold text-center md:text-left uppercase tracking-widest leading-loose max-w-md">
                &copy; 2027 ICFMS | Indian Institute of Technology Kharagpur <br /> 
                A Global Forum on the Future of Human Mobility.
             </div>
             <div className="text-[20px] text-[#1d1d1f] font-bold flex items-center gap-4 group">
                Made with love <Heart size={26} className="text-red-500 fill-current animate-pulse group-hover:scale-125 transition-transform" /> by <a href="https://kapil2020.github.io/website" target="_blank" className="text-[#0071e3] hover:underline underline-offset-8">Kapil</a>
             </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: #ffffff; }
        ::-webkit-scrollbar-thumb { background: #d2d2d7; border-radius: 10px; border: 3px solid #ffffff; }
        ::-webkit-scrollbar-thumb:hover { background: #86868b; }
        img { max-width: 100%; height: auto; display: block; }
      `}} />
    </div>
  );
};

export default App;