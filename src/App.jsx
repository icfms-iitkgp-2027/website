import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  MapPin, 
  Mail, 
  Globe, 
  Clock, 
  FileText, 
  Users, 
  Award, 
  ChevronRight, 
  Menu, 
  X,
  Zap,
  Cpu,
  Truck, 
  ShieldCheck,
  Leaf,
  Settings,
  BarChart,
  ExternalLink,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Layers,
  Link as LinkIcon,
  ArrowRight,
  CheckCircle2,
  Timer,
  Navigation as MapNavigation,
  Heart,
  History,
  Building2,
  Mic2,
  BookOpen,
  Info,
  Bell,
  Scale,
  BrainCircuit,
  Workflow
} from 'lucide-react';

/**
 * ICFMS 2027 - International Conference on Future Mobility Systems
 * Version 3.1: Optimized for mobile, enhanced visibility, and specific date updates.
 */

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const imgPath = {
    logo: "https://raw.githubusercontent.com/kapil2020/web/main/logo%20pj.png",
    hero: "https://raw.githubusercontent.com/kapil2020/web/main/carousel-2.jpg.png",
    venue: "https://raw.githubusercontent.com/kapil2020/web/main/venue1.jpg",
    architecture: "https://raw.githubusercontent.com/kapil2020/web/main/Gallery/MobilityAI1_Cover.png?raw=true",
    flyer: "https://raw.githubusercontent.com/kapil2020/web/main/linkedln.png"
  };

  const calculateTimeLeft = useCallback(() => {
    const targetDate = new Date("2026-05-15T23:59:59").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [calculateTimeLeft]);

  const toggleModal = () => setShowModal(!showModal);

  const themes = [
    { title: "Energy for Mobility", icon: <Zap />, desc: "Sustainable energy sources, hydrogen fuel cells, and advanced battery ecosystems." },
    { title: "Mobility Technologies", icon: <Cpu />, desc: "Smart vehicle systems, sensors, and the evolution of connected mobility hardware." },
    { title: "Vehicular Technology", icon: <Settings />, desc: "Modern automotive engineering, aerodynamics, and propulsion system innovations." },
    { title: "Policy, Economics, & Regulations", icon: <Scale />, desc: "Frameworks for governance, market models, and global mobility standards." },
    { title: "Traffic, Safety, & Autonomy", icon: <ShieldCheck />, desc: "AI-driven safety protocols, autonomous navigation, and traffic flow optimization." },
    { title: "Infrastructure for Mobility", icon: <Building2 />, desc: "Smart roads, futuristic hubs, and integrated transit facility design." },
    { title: "Mobility for Logistics & Supply Chains", icon: <Truck />, desc: "Automated delivery systems, freight management, and warehouse robotics." },
    { title: "Sustainable Urban Mobility", icon: <Leaf />, desc: "Low-carbon transit behavior, pedestrian-centric planning, and green urbanism." },
    { title: "Integrated Landuse Transport Planning", icon: <Workflow />, desc: "Holistic modeling of urban spaces and transit-oriented development." },
    { title: "Data Science & AI in Mobility", icon: <BrainCircuit />, desc: "Big data analytics, predictive modeling, and AI applications for transit." }
  ];

  return (
    <div className="min-h-screen bg-[#05070a] font-sans text-slate-300 selection:bg-blue-600 selection:text-white scroll-smooth overflow-x-hidden">
      
      {/* --- COMING SOON MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={toggleModal}></div>
          <div className="relative bg-[#0d1117] border border-blue-500/30 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-[0_0_80px_rgba(37,99,235,0.25)] animate-in zoom-in duration-300">
            <button onClick={toggleModal} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                <Bell className="w-10 h-10 text-blue-500 animate-pulse" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Registration Status</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  The <span className="text-blue-400 font-bold uppercase">ICFMS 2027</span> official portal is currently being configured. 
                </p>
              </div>
              <div className="py-6 px-8 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Notice</p>
                <p className="text-white font-bold text-xl uppercase tracking-tighter text-center">More Information Coming Soon</p>
              </div>
              <button onClick={toggleModal} className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-900/40">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- NAVIGATION BAR --- */}
      <nav className={`fixed w-full z-[500] transition-all duration-500 ${scrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6 md:py-10'}`}>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-6 z-[501]">
            <a href="#" className="h-10 md:h-12 bg-white p-1 rounded-lg hover:scale-105 transition-transform shadow-xl shrink-0">
              <img src={imgPath.logo} alt="IIT KGP" className="h-full w-auto" />
            </a>
            <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase leading-none mb-1">IIT Kharagpur</p>
              <p className="text-white font-black text-xl tracking-tighter uppercase leading-none">ICFMS 2027</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {['Heritage', 'Themes', 'Dates', 'Venue'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-500 transition-colors">
                {link}
              </a>
            ))}
            <button onClick={toggleModal} className="px-8 py-3 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-blue-600 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              Register
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white z-[501] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[499] bg-slate-950 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-top duration-300 px-6">
            <div className="sm:hidden mb-6 text-center">
              <p className="text-blue-500 font-black text-[10px] tracking-[0.5em] uppercase mb-2">IIT Kharagpur</p>
              <p className="text-white font-black text-4xl tracking-tighter uppercase">ICFMS 2027</p>
            </div>
            {['Heritage', 'Themes', 'Dates', 'Venue'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-4xl font-black text-white uppercase tracking-tighter" onClick={() => setIsMenuOpen(false)}>
                {link}
              </a>
            ))}
            <button onClick={() => { setIsMenuOpen(false); toggleModal(); }} className="w-full max-w-xs px-12 py-5 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-full shadow-2xl">
              Call for Abstracts
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
        {/* Visual Background - Enhanced Visibility */}
        <div className="absolute inset-0 z-0">
          <img src={imgPath.hero} className="w-full h-full object-cover opacity-40 grayscale-[0.4]" alt="IIT KGP Building" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 w-full grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8 md:space-y-10 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-4 py-2 px-5 bg-blue-600/10 border border-blue-500/20 rounded-full backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Official Call for Abstracts</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-widest opacity-80 leading-tight">International Conference on</h2>
              <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                Future <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500">Mobility</span> <br />
                Systems
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 border-l-4 border-blue-600 pl-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Conference Dates</p>
                <p className="text-xl md:text-2xl font-bold text-white uppercase">28 — 31 Jan 2027</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Global Venue</p>
                <p className="text-xl md:text-2xl font-bold text-white uppercase leading-tight">Research Park, Kolkata</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
              <button onClick={toggleModal} className="px-10 py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-blue-600 transition-all shadow-2xl shadow-blue-600/40 active:scale-95">
                Submit Abstract
              </button>
              <a href="#themes" className="px-10 py-5 border border-white/20 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
                Scientific Themes
              </a>
            </div>
          </div>

          {/* Right Graphical Focus */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
             <div className="relative group max-w-sm">
                <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative border-4 border-white/5 rounded-[3rem] overflow-hidden shadow-3xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                   <img src={imgPath.architecture} alt="Architecture" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-2xl">
                   <p className="text-4xl font-black text-white leading-none">75</p>
                   <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-1">Golden Years</p>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Strip - Responsive & Updated */}
        <div className="mt-16 lg:mt-24 bg-slate-950/60 backdrop-blur-xl border-y border-white/5 py-10">
           <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex flex-wrap justify-center lg:justify-between gap-10 md:gap-12 text-center sm:text-left">
              {[
                { label: "Scientific Tracks", val: "10" },
                { label: "Guest Speakers", val: "40+" },
                { label: "Target Delegates", val: "500+" },
                { label: "Publication Opportunities", val: "Top Tier Special Issue Journals" }
              ].map((s, i) => (
                <div key={i} className={`flex-1 min-w-[140px] max-w-sm space-y-2 ${i === 3 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                  <p className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none">{s.val}</p>
                  <p className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-80 leading-tight">{s.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- DEADLINE SECTION --- */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 text-white">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Abstract Submissions</h3>
            <p className="text-blue-100 font-bold uppercase tracking-widest text-sm mt-3 opacity-90 border-b border-blue-400 inline-block pb-1">Final Deadline: May 15, 2026</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10 w-full lg:w-auto">
             {[
               { l: 'Days', v: timeLeft.days },
               { l: 'Hrs', v: timeLeft.hours },
               { l: 'Min', v: timeLeft.minutes },
               { l: 'Sec', v: timeLeft.seconds }
             ].map((u, i) => (
               <div key={i} className="flex flex-col items-center">
                 <span className="text-4xl md:text-6xl font-black tracking-tighter leading-none">{String(u.v).padStart(2, '0')}</span>
                 <span className="text-[9px] md:text-[10px] font-black text-blue-900 uppercase tracking-widest mt-2 opacity-60">{u.l}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- HERITAGE SECTION --- */}
      <section id="heritage" className="py-24 md:py-32 bg-white text-slate-950">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
           <div className="space-y-10 md:space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-[12px] font-black text-blue-600 tracking-[0.5em] uppercase">The Institution</h2>
                <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">IIT KGP <br /> Platinum <br /> Jubilee</h3>
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed max-w-xl">
                Founded in <span className="text-slate-950 font-black italic">1951</span>, IIT Kharagpur marks <span className="text-slate-950 font-black underline decoration-blue-600 decoration-8 underline-offset-8">75 Golden Years</span> of service to the nation. ICFMS 2027 commemorates this milestone by architecting the future mobility landscape.
              </p>
              <div className="pt-10 border-t border-slate-200 flex flex-wrap gap-8 md:gap-12">
                 <div>
                    <p className="text-4xl md:text-5xl font-black tracking-tighter text-blue-600">1951</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">Foundation</p>
                 </div>
                 <div>
                    <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">2027</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">75 Year Milestone</p>
                 </div>
              </div>
           </div>
           <div className="relative flex justify-center order-1 lg:order-2">
              <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white w-full max-w-sm md:max-w-md">
                <img src={imgPath.hero} alt="IIT KGP Architecture" className="w-full h-full object-cover" />
              </div>
           </div>
        </div>
      </section>

      {/* --- SCIENTIFIC THEMES --- */}
      <section id="themes" className="py-24 md:py-32 bg-[#0d1117] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24">
            <div className="space-y-4">
               <h2 className="text-[12px] font-black text-blue-500 tracking-[0.6em] uppercase">Academic Tracks</h2>
               <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">Conference <br /> Themes</h3>
            </div>
            <p className="max-w-md text-slate-500 font-medium text-base md:text-lg leading-relaxed uppercase tracking-widest text-[10px]">Pioneering the next era of energy, computation, and infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-l border-t border-white/10">
            {themes.map((t, idx) => (
              <div key={idx} className="p-8 md:p-12 border-r border-b border-white/10 hover:bg-blue-600/10 transition-all group relative overflow-hidden min-h-[320px] md:min-h-[380px] flex flex-col justify-between">
                <div>
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 mb-8 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                    {React.cloneElement(t.icon, { className: "w-6 h-6 md:w-7 md:h-7" })}
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">{t.title}</h4>
                  <p className="text-slate-500 group-hover:text-slate-300 transition-colors leading-relaxed text-sm font-medium">{t.desc}</p>
                </div>
                <div className="mt-8 pt-6 md:pt-8 border-t border-white/5">
                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Track {idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MILESTONES / DATES --- */}
      <section id="dates" className="py-24 md:py-32 bg-[#05070a]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h3 className="text-[11px] font-black text-blue-500 tracking-[0.6em] uppercase mb-4">The Timeline</h3>
            <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">Important Dates</h3>
          </div>

          <div className="grid gap-4 md:gap-6">
             {[
               { l: "Abstract Submission Opens", d: "15 Feb 2026", active: true },
               { l: "Abstract Submission Deadline", d: "15 May 2026", active: true },
               { l: "Abstract Acceptance Notice", d: "30 Jun 2026", active: false },
               { l: "Full Paper Submission", d: "01 Aug 2026", active: false },
               { l: "Decision Notification", d: "01 Oct 2026", active: false }
             ].map((date, i) => (
               <div key={i} className={`flex flex-col md:flex-row md:items-center justify-between p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] border-2 transition-all ${date.active ? 'bg-blue-600/10 border-blue-500 shadow-xl' : 'bg-white/5 border-white/5 opacity-50'}`}>
                  <h4 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">{date.l}</h4>
                  <div className="flex items-center gap-6 md:gap-8 mt-4 md:mt-0">
                    <span className={`text-2xl md:text-5xl font-black italic uppercase tracking-tighter ${date.active ? 'text-blue-500' : 'text-slate-600'}`}>{date.d}</span>
                    {date.active && <div className="w-3 md:w-4 h-3 md:h-4 rounded-full bg-green-500 animate-pulse shadow-[0_0_20px_#22c55e]"></div>}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- VENUE --- */}
      <section id="venue" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
           <div className="bg-[#05070a] rounded-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-3xl border-8 border-slate-50 relative">
              <div className="lg:w-1/2 p-10 md:p-24 flex flex-col justify-center space-y-12 md:space-y-16 relative z-10 bg-[#05070a]">
                 <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 bg-blue-600/20 text-blue-400 px-5 py-1.5 rounded-full font-black uppercase text-[10px] tracking-widest">
                       <MapPin size={16} /> Rajarhat, Kolkata
                    </div>
                    <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">Research <br /> <span className="text-blue-600 font-serif italic lowercase block md:inline">Park</span></h2>
                 </div>
                 <div className="border-l-8 border-blue-600 pl-10">
                    <p className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">IIT Kharagpur Center</p>
                    <p className="text-slate-400 text-lg md:text-xl mt-3">Newtown, West Bengal 700135</p>
                 </div>
                 <div>
                    <a href="https://maps.app.goo.gl/JmFBsApsZ6si41WSA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-8 bg-white text-[#05070a] px-10 py-5 md:px-14 md:py-7 rounded-3xl font-black uppercase text-sm tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 group">
                      Get Directions
                      <MapNavigation size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                 </div>
              </div>
              <div className="lg:w-1/2 h-[400px] md:h-[500px] lg:h-auto overflow-hidden group relative">
                 <img src={imgPath.venue} alt="Kolkata Research Park" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors"></div>
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER & CORRESPONDENCE --- */}
      <footer className="bg-[#05070a] pt-32 pb-16 border-t border-white/5 relative">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-4 gap-16 md:gap-20">
           
           {/* Branding Col */}
           <div className="lg:col-span-1 space-y-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-4">
                 <div className="bg-white p-3 rounded-xl h-14 w-14 shrink-0">
                    <img src={imgPath.logo} alt="ICFMS 2027" className="h-full w-auto" />
                 </div>
                 <h4 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">ICFMS 2027</h4>
              </div>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Leading the global discourse on future mobility ecosystems and sustainable urban transit.
              </p>
              <div className="flex justify-center sm:justify-start gap-4">
                 {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                   <button key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white shadow-lg">
                      <Icon size={20} />
                   </button>
                 ))}
              </div>
           </div>

           {/* Correspondence Col */}
           <div className="lg:col-span-2 space-y-10">
              <h5 className="text-[11px] font-black text-blue-500 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Correspondence</h5>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                 <div className="p-5 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-500 shrink-0">
                    <Mail size={32} />
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <p className="text-white font-black uppercase text-2xl md:text-3xl tracking-tighter leading-none">Prof Arkopal K. Goswami, PhD</p>
                       <div className="space-y-1">
                          <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Associate Professor, RCGSIDM</p>
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Associate Dean, International Relations</p>
                          <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">IIT Kharagpur</p>
                       </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 pt-2">
                       <a href="mailto:icfms.iitkgp@gmail.com" className="flex items-center gap-3 text-white font-bold hover:text-blue-500 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5 shadow-md">
                          <Mail size={18} />
                          <span className="text-sm">icfms.iitkgp@gmail.com</span>
                       </a>
                       <a href="https://www.mustlab.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white font-bold hover:text-blue-500 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5 shadow-md">
                          <Globe size={18} />
                          <span className="text-sm">www.mustlab.in</span>
                       </a>
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Nav Col */}
           <div className="lg:col-span-1 space-y-10 text-center sm:text-left">
              <h5 className="text-[11px] font-black text-blue-500 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Resources</h5>
              <ul className="space-y-4">
                 {['Heritage', 'Themes', 'Dates', 'Venue'].map(l => (
                   <li key={l}><a href={`#${l.toLowerCase()}`} className="text-slate-500 hover:text-white font-black text-[12px] uppercase tracking-[0.2em] transition-colors">{l}</a></li>
                 ))}
                 <li><a href="https://www.iitkgp.ac.in" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white font-black text-[12px] uppercase tracking-[0.2em] transition-colors">IIT Kharagpur Official</a></li>
              </ul>
           </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] text-center md:text-left leading-loose opacity-60">
              &copy; 2027 ICFMS | Indian Institute of Technology Kharagpur <br />
              Yogaḥ Karmasu Kauśalam — Excellence in Action is Yoga
           </div>
           <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500">
              Crafted with <Heart size={14} className="text-red-600 fill-current" /> for <a href="#" className="text-blue-500 hover:text-white transition-colors font-bold">Kapil</a>
           </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #05070a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; border: 3px solid #05070a; }
        ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
      `}} />
    </div>
  );
};

export default App;
