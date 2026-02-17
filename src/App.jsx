import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  Calendar, MapPin, Mail, Globe, Zap, Cpu, Truck, ShieldCheck, 
  Leaf, Settings, BarChart, Facebook, Twitter, Linkedin, Instagram, 
  Youtube, Layers, ArrowRight, CheckCircle2, Timer, Navigation as MapNavigation, 
  Heart, Building2, Mic2, BookOpen, Bell, Scale, BrainCircuit, Workflow, X, Menu, ExternalLink
} from 'lucide-react';

/**
 * ICFMS 2027 - PREMIER FUTURISTIC INTERFACE
 * Version 4.1: Enhanced Architecture Visuals, Clean Footer, Optimized Tech Feel
 */

// --- 3D WEBGL PARTICLE ENVIRONMENT ---
const TechCanvas = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1800;
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) posArray[i] = (Math.random() - 0.5) * 90;
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.07,
      color: '#60a5fa',
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 35;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0006;
      particlesMesh.rotation.x += 0.0003;
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
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const imgPath = {
    logo: "https://raw.githubusercontent.com/kapil2020/web/main/logo%20pj.png",
    hero: "https://raw.githubusercontent.com/kapil2020/web/main/carousel-2.jpg.png",
    venue: "https://raw.githubusercontent.com/kapil2020/web/main/venue1.jpg",
    architecture: "https://raw.githubusercontent.com/kapil2020/web/main/Gallery/MobilityAI1_Cover.png?raw=true",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date("2026-05-15T23:59:59").getTime();
      const diff = target - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => { clearInterval(timer); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const themes = [
    { title: "Energy for Mobility", icon: <Zap />, color: "from-cyan-500/20 to-blue-500/10", border: "border-cyan-500/30", text: "text-cyan-400" },
    { title: "Mobility Technologies", icon: <Cpu />, color: "from-indigo-500/20 to-purple-500/10", border: "border-indigo-500/30", text: "text-indigo-400" },
    { title: "Vehicular Technology", icon: <Settings />, color: "from-blue-600/20 to-cyan-400/10", border: "border-blue-500/30", text: "text-blue-400" },
    { title: "Policy & Economics", icon: <Scale />, color: "from-purple-600/20 to-pink-500/10", border: "border-purple-500/30", text: "text-purple-400" },
    { title: "Traffic & Autonomy", icon: <ShieldCheck />, color: "from-red-500/20 to-orange-500/10", border: "border-red-500/30", text: "text-red-400" },
    { title: "Smart Infrastructure", icon: <Building2 />, color: "from-emerald-500/20 to-teal-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
    { title: "Logistics & Supply", icon: <Truck />, color: "from-orange-500/20 to-yellow-500/10", border: "border-orange-500/30", text: "text-orange-400" },
    { title: "Urban & Sustainable", icon: <Leaf />, color: "from-green-500/20 to-emerald-500/10", border: "border-green-500/30", text: "text-green-400" },
    { title: "Integrated Planning", icon: <Workflow />, color: "from-cyan-500/20 to-indigo-500/10", border: "border-cyan-500/30", text: "text-cyan-400" },
    { title: "Data Science & AI", icon: <BrainCircuit />, color: "from-fuchsia-500/20 to-pink-500/10", border: "border-fuchsia-500/30", text: "text-fuchsia-400" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-200 selection:bg-blue-500 overflow-x-hidden">
      <TechCanvas />
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-600 origin-left z-[1000]" style={{ scaleX }} />

      {/* --- COMING SOON MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowModal(false)}></div>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative bg-slate-900 border border-blue-500/30 p-10 rounded-[3rem] max-w-lg w-full shadow-2xl">
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={32}/></button>
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20"><Bell className="w-12 h-12 text-blue-500 animate-bounce" /></div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Official Notice</h3>
                <p className="text-slate-400 text-lg">The submission portal for <span className="text-blue-400 font-bold uppercase">ICFMS 2027</span> will launch on Feb 15, 2026. Stay tuned for the live link.</p>
                <div className="py-4 px-6 bg-white/5 rounded-2xl border border-white/10 text-blue-400 font-bold uppercase tracking-widest text-sm">Access Coming Soon</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-[500] transition-all duration-500 ${scrolled ? 'bg-[#020617]/90 backdrop-blur-2xl border-b border-white/5 py-4 shadow-xl' : 'bg-transparent py-10'}`}>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-6 group">
            <div className="bg-white p-1 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
              <img src={imgPath.logo} alt="IIT KGP" className="h-10 md:h-12 w-auto" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black text-blue-500 tracking-[0.4em] uppercase mb-0.5">IIT Kharagpur</p>
              <p className="text-white font-black text-xl tracking-tighter uppercase leading-none">ICFMS 2027</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {['Heritage', 'About', 'Themes', 'Dates', 'Venue'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-400 transition-colors">
                {link}
              </a>
            ))}
            <button onClick={() => setShowModal(true)} className="px-8 py-3 bg-white text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all">
              Register
            </button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={32}/> : <Menu size={32}/>}</button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex flex-col pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={imgPath.hero} className="w-full h-full object-cover opacity-60 brightness-[0.7]" alt="IIT KGP Building" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center pb-24 md:pb-40">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-8 space-y-12">
              <div className="inline-flex items-center gap-4 py-2 px-6 bg-blue-600/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Official Call for Abstracts</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-8xl xl:text-[110px] font-black text-white leading-[0.85] tracking-tighter uppercase">
                  International <br /> 
                  Conference <span className="text-blue-500 italic font-serif lowercase">on</span> <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-500 drop-shadow-[0_0_30px_rgba(37,99,235,0.35)]">
                    Future Mobility Systems
                  </span>
                </h1>
              </div>

              <div className="flex flex-col md:flex-row gap-10 border-l-4 border-blue-600 pl-10">
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest opacity-60">Conference Date</p>
                  <p className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight italic">28 — 31 Jan 2027</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest opacity-60">Conference Venue</p>
                  <p className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight italic leading-none">Research Park, Kolkata</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                <button onClick={() => setShowModal(true)} className="px-14 py-7 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">
                  Submit Abstract
                </button>
                <a href="#themes" className="px-14 py-7 border-2 border-white/20 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md">
                  View 10 Tracks
                </a>
              </div>
            </motion.div>

            {/* Smart Mobility Architecture Image - Visual Focus */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="hidden lg:flex lg:col-span-4 justify-end relative">
               <div className="relative group w-full max-w-sm">
                  {/* Glowing Effect Background */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-[4rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                  
                  {/* Glassmorphic Frame */}
                  <div className="relative border-2 border-white/20 rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)] transform rotate-3 group-hover:rotate-0 transition-all duration-1000 bg-slate-900/50 backdrop-blur-sm">
                     <img 
                        src={imgPath.architecture} 
                        alt="Smart Mobility Architectural Vision" 
                        className="w-full h-auto brightness-110 contrast-125 saturate-125 object-cover" 
                     />
                  </div>
                  
                  {/* Futuristic Corner Badge */}
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl" />
                  <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-cyan-400 rounded-tr-3xl" />
               </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="bg-[#020617]/60 backdrop-blur-3xl border-t border-white/10 py-12">
           <div className="max-w-[1500px] mx-auto px-6 flex flex-wrap justify-center lg:justify-between gap-12">
              {[
                { l: "Research Tracks", v: "10" },
                { l: "Global Keynotes", v: "40+" },
                { l: "Target Delegates", v: "500+" },
                { l: "Special Journals", v: "Top Tier" }
              ].map((s, i) => (
                <div key={i} className="space-y-1 min-w-[160px]">
                  <p className="text-3xl font-black text-white tracking-tighter uppercase italic">{s.v}</p>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-60">{s.l}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- PLATINUM JUBILEE SECTION --- */}
      <section id="heritage" className="py-40 bg-white text-slate-900 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-14 z-10">
              <div className="space-y-6">
                 <h2 className="text-[12px] font-black text-blue-600 tracking-[0.6em] uppercase">The Legacy</h2>
                 <h3 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase text-slate-950">Platinum <br /> Jubilee</h3>
              </div>
              <div className="space-y-8">
                 <p className="text-3xl font-bold text-slate-800 leading-tight italic border-l-8 border-blue-600 pl-10">
                   "August 18, 2025 – August 18, 2027. Celebrating 75 Years of being dedicated to the service of the nation."
                 </p>
                 <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">To mark this occasion, the Institute recalls the contributions of generations who have made IIT Kharagpur what it is—a time to rededicate and build for future generations.</p>
              </div>
           </div>
           <div className="relative">
              <motion.div initial={{ rotate: 10, scale: 0.9 }} whileInView={{ rotate: 0, scale: 1 }} transition={{ duration: 1.2 }} className="aspect-square bg-slate-50 rounded-[6rem] overflow-hidden shadow-2xl border-[20px] border-white flex items-center justify-center p-20">
                 <img src={imgPath.logo} alt="Platinum Jubilee Logo" className="w-full h-auto opacity-90" />
              </motion.div>
              <div className="absolute -bottom-10 -right-4 bg-slate-950 text-white p-14 rounded-[3.5rem] shadow-3xl">
                 <p className="text-7xl font-black italic tracking-tighter leading-none text-blue-500">1951</p>
                 <p className="text-[11px] font-black uppercase tracking-[0.3em] mt-3">Birth of an Icon</p>
              </div>
        </div>
        </div>
      </section>

      {/* --- ABOUT IIT KHARAGPUR --- */}
      <section id="about" className="py-40 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/50 skew-x-[-15deg] translate-x-1/2" />
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl space-y-12">
            <h2 className="text-[12px] font-black text-blue-600 tracking-[0.6em] uppercase">About The Mother Institute</h2>
            <h3 className="text-6xl md:text-[110px] font-black text-slate-950 tracking-tighter uppercase leading-[0.85]">The Foundation <br /> of Innovation</h3>
            <p className="text-2xl text-slate-600 leading-relaxed">
              IIT Kharagpur, the first and the oldest of the IITs, was born in May 1950 in the Hijli Detention Camp. Since its formal inauguration by Maulana Abul Kalam Azad on August 18, 1951, it has remained the cradle of Indian technical education—diversifying from traditional engineering into law, management, and medical sciences.
            </p>
            <div className="flex flex-wrap gap-12 pt-6">
               <a href="https://www.iitkgp.ac.in/about-iitkgp" target="_blank" rel="noreferrer" className="inline-flex items-center gap-6 px-10 py-5 bg-slate-950 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-600 transition-all group">
                  Institutional History <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </a>
               <div className="flex items-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  <Globe size={18} className="text-blue-500" /> 2100 Acre Research Ecosystem
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THEMES: CYBER-GLASS ESTHETIC --- */}
      <section id="themes" className="py-40 bg-[#020617] relative">
        <div className="max-w-[1500px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-32">
            <div className="space-y-6">
               <h2 className="text-[12px] font-black text-blue-500 tracking-[0.6em] uppercase">Scientific Matrix</h2>
               <h3 className="text-7xl md:text-[120px] font-black text-white tracking-tighter uppercase leading-none">The 10 <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 italic">Themes</span></h3>
            </div>
            <p className="max-w-md text-slate-500 font-medium text-lg leading-relaxed italic border-l-4 border-blue-500 pl-8">Charting the technical convergence of future mobility architectures, AI, and sustainable ecosystems.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {themes.map((t, idx) => (
              <motion.div 
                whileHover={{ y: -15 }}
                key={idx} className={`p-10 rounded-[3.5rem] bg-gradient-to-br ${t.color} border ${t.border} backdrop-blur-xl group cursor-pointer shadow-xl relative overflow-hidden min-h-[380px] flex flex-col justify-between transition-all duration-500`}
              >
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000" />
                <div>
                   <div className={`w-16 h-16 rounded-2xl bg-slate-900 border ${t.border} flex items-center justify-center mb-10 transition-all shadow-[0_0_20px_rgba(37,99,235,0.1)] group-hover:bg-white group-hover:text-slate-950 ${t.text}`}>
                     {React.cloneElement(t.icon, { size: 30 })}
                   </div>
                   <h4 className="text-2xl font-black leading-tight tracking-tighter uppercase text-white group-hover:text-blue-200 transition-colors">{t.title}</h4>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Track {String(idx + 1).padStart(2, '0')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DATES --- */}
      <section id="dates" className="py-40 bg-white text-slate-900">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="text-center mb-32 space-y-4">
            <h2 className="text-[12px] font-black text-blue-600 tracking-[0.5em] uppercase">Roadmap 2026/27</h2>
            <h3 className="text-7xl md:text-[110px] font-black tracking-tighter uppercase text-slate-950 leading-none">Key Dates</h3>
          </div>

          <div className="grid gap-4 max-w-6xl mx-auto">
             {[
               { l: "Abstract Submission Opens", d: "15 Feb 2026", active: true },
               { l: "Abstract Submission Deadline", d: "15 May 2026", active: true },
               { l: "Acceptance Notification", d: "30 Jun 2026", active: false },
               { l: "Full Paper Submission", d: "01 Aug 2026", active: false },
               { l: "Decision Notification", d: "01 Oct 2026", active: false },
               { l: "Final Paper Submission", d: "10 Nov 2026", active: false }
             ].map((date, i) => (
               <motion.div whileHover={{ x: 15 }} key={i} className={`flex flex-col md:flex-row md:items-center justify-between p-10 md:p-12 rounded-[3.5rem] border-2 transition-all ${date.active ? 'bg-slate-950 border-blue-500 shadow-2xl text-white' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="space-y-1">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${date.active ? 'text-blue-400' : 'text-slate-400'}`}>Phase 0{i+1}</p>
                    <h4 className="text-3xl font-black uppercase tracking-tighter">{date.l}</h4>
                  </div>
                  <div className="flex items-center gap-10 mt-6 md:mt-0">
                    <span className={`text-4xl md:text-6xl font-black italic tracking-tighter ${date.active ? 'text-white' : 'text-blue-600'}`}>{date.d}</span>
                    {date.active && <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />}
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- VENUE --- */}
      <section id="venue" className="py-40 bg-[#020617] overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6">
           <div className="bg-slate-900 rounded-[5rem] overflow-hidden flex flex-col lg:flex-row border border-white/5 shadow-2xl relative">
              <div className="lg:w-1/2 p-12 md:p-24 flex flex-col justify-center space-y-16 bg-slate-900 z-10 relative">
                 <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 bg-blue-600/20 text-blue-400 px-6 py-2 rounded-full font-black uppercase text-[11px] tracking-widest">
                       <MapPin size={18} /> Rajarhat, Kolkata
                    </div>
                    <h2 className="text-7xl md:text-[110px] font-black text-white leading-none tracking-tighter uppercase italic">Research <br /> <span className="text-blue-500 font-serif lowercase">Park</span></h2>
                 </div>
                 <div className="border-l-8 border-blue-600 pl-12 space-y-4">
                    <p className="text-white text-4xl font-black uppercase tracking-tighter">IIT Kharagpur Center</p>
                    <p className="text-slate-400 text-xl font-medium">Newtown, Kolkata 700135. <br /> A premier technical hub for industry-academia collaboration.</p>
                 </div>
                 <a href="https://maps.app.goo.gl/JmFBsApsZ6si41WSA" target="_blank" rel="noreferrer" className="inline-flex items-center gap-8 bg-white text-slate-950 px-16 py-8 rounded-[2.5rem] font-black uppercase text-sm tracking-widest hover:bg-blue-600 hover:text-white transition-all group">
                    View Directions <MapNavigation size={28} className="group-hover:translate-x-2 transition-transform" />
                 </a>
              </div>
              <div className="lg:w-1/2 h-[500px] lg:h-auto overflow-hidden relative">
                 <img src={imgPath.venue} alt="Kolkata Venue" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden lg:block" />
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER & CORRESPONDENCE --- */}
      <footer className="bg-[#01030d] pt-40 pb-16 border-t border-white/5 relative z-10">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-4 gap-24">
           
           <div className="lg:col-span-1 space-y-12 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-6">
                 <div className="bg-white p-3 rounded-2xl h-16 w-16 shadow-xl"><img src={imgPath.logo} alt="ICFMS" className="h-full w-auto" /></div>
                 <h4 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">ICFMS 2027</h4>
              </div>
              <p className="text-xl text-slate-500 leading-relaxed font-medium italic">Architecting the future of human mobility through technical excellence.</p>
              <div className="flex justify-center sm:justify-start gap-8">
                 {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                   <button key={i} className="text-slate-500 hover:text-blue-500 transition-colors"><Icon size={26} /></button>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-2 space-y-12">
              <h5 className="text-[11px] font-black text-blue-500 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Correspondence</h5>
              <div className="flex flex-col sm:flex-row gap-10 items-start">
                 <div className="p-8 bg-blue-600/10 rounded-[2.5rem] border border-blue-600/20 text-blue-500 shrink-0 shadow-2xl transition-transform hover:scale-110"><Mail size={44} /></div>
                 <div className="space-y-8">
                    <div className="space-y-2">
                       <p className="text-white font-black uppercase text-3xl md:text-5xl tracking-tighter leading-none italic underline decoration-blue-600 decoration-4 underline-offset-8 mb-6">Prof Arkopal K. Goswami, PhD</p>
                       <p className="text-blue-400 font-bold uppercase tracking-widest text-[11px]">Associate Professor, RCGSIDM</p>
                       <p className="text-slate-300 font-medium uppercase tracking-[0.2em] text-[11px]">Associate Dean, International Relations</p>
                       <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">IIT Kharagpur</p>
                    </div>
                    <div className="flex flex-wrap gap-8">
                       <a href="mailto:icfms.iitkgp@gmail.com" className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-[12px] bg-white/5 px-8 py-5 rounded-2xl hover:bg-blue-600 transition-all border border-white/5">
                          <Mail size={18} className="text-blue-400" /> icfms.iitkgp@gmail.com
                       </a>
                       <a href="https://www.mustlab.in/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-[12px] bg-white/5 px-8 py-5 rounded-2xl hover:bg-blue-600 transition-all border border-white/5">
                          <Globe size={18} className="text-blue-400" /> Visit Lab Site
                       </a>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-1 space-y-12 text-center sm:text-left">
              <h5 className="text-[11px] font-black text-blue-500 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Resources</h5>
              <ul className="space-y-6 text-slate-500 font-black uppercase tracking-widest text-[11px]">
                 <li><a href="https://www.iitkgp.ac.in" target="_blank" className="hover:text-white transition-colors">Main Institute Portal</a></li>
                 <li><a href="https://www.mustlab.in" target="_blank" className="hover:text-white transition-colors">MUST Laboratory Hub</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">75 Years Gallery</a></li>
              </ul>
           </div>
        </div>

        {/* --- CREDITS & MOTTO --- */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 mt-40 pt-20 border-t border-white/10">
           <div className="grid md:grid-cols-2 gap-16 items-center text-center md:text-left">
              <div className="space-y-6">
                 <p className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
                    योगः कर्मसु कौशलम् 
                 </p>
                 <p className="text-[12px] font-black text-blue-500 uppercase tracking-[0.5em] leading-relaxed">
                    Excellence in Action is Yoga
                 </p>
                 <div className="h-px w-20 bg-slate-800 mx-auto md:mx-0" />
                 <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose">
                    Dedicated to the Service of the Nation <br />
                    Since 1951
                 </p>
              </div>

              <div className="flex flex-col md:items-end justify-center">
                 <div className="p-8 rounded-[3rem] text-center md:text-right">
                    <div className="flex items-center gap-4 justify-center md:justify-end mb-2">
                       <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Made with love</span>
                       <Heart size={14} className="text-red-500 fill-current animate-pulse" />
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                       by <a 
                          href="https://kapil2020.github.io/website" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-white transition-colors underline decoration-blue-600 decoration-2 underline-offset-4"
                       >Kapil</a>
                    </p>
                 </div>
              </div>
           </div>

           <div className="mt-20 pt-10 border-t border-white/5 opacity-40 text-[9px] font-black uppercase tracking-[0.6em] flex flex-col md:flex-row justify-between items-center gap-6">
              <p>&copy; 2027 ICFMS | Indian Institute of Technology Kharagpur</p>
              <p>International Research Convention</p>
           </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; border: 3px solid #020617; }
        ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}} />
    </div>
  );
};

export default App;