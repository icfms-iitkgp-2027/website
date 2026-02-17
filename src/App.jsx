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
  HardHat,
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
  History
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const FORM_URL = "https://forms.gle/2ejuthB7udhpyVYL8";

  const calculateTimeLeft = useCallback(() => {
    // Target date for the countdown
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [calculateTimeLeft]);

  const themes = [
    { title: "Energy for Mobility", icon: <Zap />, color: "blue", desc: "Hydrogen fuel cells, EV charging infrastructure, and smart grid integration for transportation." },
    { title: "Mobility Technologies", icon: <Settings />, color: "indigo", desc: "Sensors, AI, and Machine Learning applications in modern transit and personal transport." },
    { title: "Vehicular Technology", icon: <Cpu />, color: "violet", desc: "Advanced powertrain design, lightweight materials, and vehicle dynamics optimization." },
    { title: "Policy & Regulations", icon: <FileText />, color: "slate", desc: "Legal frameworks for autonomous vehicles and economic models for shared mobility." },
    { title: "Traffic & Autonomy", icon: <ShieldCheck />, color: "red", desc: "Connected vehicle safety, V2X communications, and multi-layered traffic flow management." },
    { title: "Infrastructure Design", icon: <HardHat />, color: "amber", desc: "Smart roads, futuristic airport design, and sustainable rail network developments." },
    { title: "Logistics & Supply Chains", icon: <Truck />, color: "orange", desc: "Last-mile delivery innovations, drone logistics, and automated warehouse management." },
    { title: "Sustainable Mobility", icon: <Leaf />, color: "emerald", desc: "Pedestrian-centric urban planning and low-carbon travel behavior modeling." },
    { title: "Data & Planning", icon: <BarChart />, color: "cyan", desc: "Predictive analytics for transit demand and big data for urban transportation planning." }
  ];

  const dates = [
    { label: "Abstract Submission", date: "15 May 2026", status: "Active Now", color: "from-blue-600 to-cyan-500", icon: <FileText className="w-6 h-6 text-white" /> },
    { label: "Abstract Acceptance", date: "30 June 2026", status: "Upcoming", color: "from-indigo-600 to-blue-500", icon: <CheckCircle2 className="w-6 h-6 text-white" /> },
    { label: "Full Paper Submission", date: "01 August 2026", status: "Upcoming", color: "from-violet-600 to-indigo-500", icon: <Layers className="w-6 h-6 text-white" /> },
    { label: "Decision Notification", date: "01 October 2026", status: "Upcoming", color: "from-fuchsia-600 to-violet-500", icon: <Award className="w-6 h-6 text-white" /> },
    { label: "Final Paper Submission", date: "10 November 2026", status: "Upcoming", color: "from-pink-600 to-fuchsia-500", icon: <Calendar className="w-6 h-6 text-white" /> }
  ];

  const imgPath = {
    logo: "https://raw.githubusercontent.com/kapil2020/web/main/logo%20pj.png",
    hero: "https://raw.githubusercontent.com/kapil2020/web/main/carousel-2.jpg.png",
    venue: "https://raw.githubusercontent.com/kapil2020/web/main/venue1.jpg",
    architecture: "https://raw.githubusercontent.com/kapil2020/web/main/architechture.png",
    flyer: "https://raw.githubusercontent.com/kapil2020/web/main/linkedln.png"
  };

  const getColorClasses = (color) => {
    const map = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
      violet: "bg-violet-50 text-violet-600 border-violet-100",
      slate: "bg-slate-50 text-slate-600 border-slate-100",
      red: "bg-red-50 text-red-600 border-red-100",
      amber: "bg-amber-50 text-amber-600 border-amber-100",
      orange: "bg-orange-50 text-orange-600 border-orange-100",
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
    };
    return map[color] || map.blue;
  };

  const handleAction = () => {
    window.open(FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 scroll-smooth overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-3 border-b border-slate-100' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <a href="#" className="bg-white p-1 rounded-lg shadow-md h-10 md:h-12 flex items-center transition-transform hover:scale-105">
                <img src={imgPath.logo} alt="IIT KGP" className="h-full w-auto" />
              </a>
              <div className="flex flex-col border-l border-slate-300/30 pl-3">
                <span className={`text-[8px] md:text-[10px] font-black tracking-widest uppercase leading-none mb-1 transition-colors ${scrolled ? 'text-blue-900' : 'text-white'}`}>
                  IIT Kharagpur
                </span>
                <span className={`text-base md:text-xl font-black transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                  ICFMS 2027
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'Heritage', 'Themes', 'Venue', 'Dates', 'Flyer'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-[12px] font-bold tracking-widest uppercase transition-all hover:text-blue-500 ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
                  {item}
                </a>
              ))}
              <button 
                onClick={handleAction}
                className="bg-blue-600 text-white px-6 py-2.5 rounded font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all border border-transparent hover:border-blue-600 shadow-lg"
              >
                Register
              </button>
            </div>

            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className={scrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900' : 'text-white'} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white fixed inset-0 z-50 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-right duration-300">
            <button className="absolute top-6 right-6 p-4" onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8 text-slate-900" /></button>
            {['Home', 'Heritage', 'Themes', 'Venue', 'Dates', 'Flyer'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-3xl font-black text-slate-900 uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button 
              onClick={() => { setIsMenuOpen(false); handleAction(); }}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl"
            >
              Register Now
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10"></div>
            <img src={imgPath.hero} alt="IIT Kharagpur Main Building" className="w-full h-full object-cover opacity-80" />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
            International Conference on <br className="hidden md:block" />
            <span className="text-blue-500">Future Mobility Systems</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto tracking-wide">
            28-31 January 2027 | IIT Kharagpur Research Park, Kolkata
          </p>

          <div className="pt-8">
             <button 
              onClick={handleAction}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-md font-bold text-lg transition shadow-[0_20px_50px_rgba(37,99,235,0.4)] tracking-widest uppercase border-b-4 border-blue-800 active:translate-y-1 active:border-b-0 cursor-pointer"
             >
               Submit Abstract
             </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3 opacity-30">
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">Scroll</span>
           <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Countdown Tracker */}
      <section className="py-20 bg-slate-900 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-blue-400 uppercase tracking-[0.4em] font-black text-xs">
                <Timer className="w-5 h-5 animate-pulse" />
                <span>Countdown to Deadline</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">Abstract Submission Closes</h3>
              <p className="text-slate-400 font-medium uppercase tracking-[0.1em]">May 15, 2026 | 23:59 IST</p>
            </div>
            
            <div className="grid grid-cols-4 gap-3 md:gap-8">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds }
              ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl md:rounded-3xl p-4 md:p-8 w-20 sm:w-28 md:w-36 backdrop-blur-md transition-all hover:bg-white/10">
                  <span className="text-2xl md:text-5xl font-black text-white tracking-tighter mb-1 md:mb-2">{String(unit.value).padStart(2, '0')}</span>
                  <span className="text-[8px] md:text-[11px] font-bold text-blue-400 uppercase tracking-widest">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Platinum Jubilee Section */}
      <section id="heritage" className="py-24 md:py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
          <div className="relative z-10 space-y-12">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 text-[25rem] font-black text-slate-100/50 z-0 select-none font-serif hidden md:block leading-none">75</div>
            
            <div className="flex flex-col items-center gap-4 uppercase tracking-[0.6em] font-black text-blue-600 text-[10px] md:text-xs">
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-2"></div>
              <span>August 18, 2025 — August 18, 2027</span>
            </div>

            <h3 className="text-5xl md:text-9xl font-bold text-slate-900 tracking-tighter leading-none uppercase">
              75 Golden <br className="md:hidden" /> Years
            </h3>

            <div className="space-y-10 text-slate-600 leading-relaxed font-medium">
              <div className="bg-slate-50 py-12 px-6 md:px-12 rounded-[2rem] text-2xl md:text-4xl text-slate-800 font-bold tracking-tight border border-slate-100 shadow-sm italic">
                "Yogaḥ Karmasu Kauśalam — Excellence in action is Yoga."
              </div>
              <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
                Celebrating three quarters of a century since the foundation of India's technical education. IIT Kharagpur marks its Platinum Jubilee by architecting the future mobility ecosystems for a sustainable world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Grid */}
      <section id="themes" className="py-20 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[10px] md:text-[12px] font-black text-blue-600 tracking-[0.5em] uppercase mb-4">Tracks</h2>
            <h3 className="text-3xl md:text-6xl font-bold text-slate-900 tracking-tight uppercase">Conference Themes</h3>
            <div className="w-16 md:w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 text-[15px]">
            {themes.map((theme, idx) => (
              <div key={idx} className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 transition-all hover:shadow-2xl hover:-translate-y-3 flex flex-col h-full overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors duration-700"></div>
                <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-md transition-all group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white duration-500 ${getColorClasses(theme.color)}`}>
                  {React.cloneElement(theme.icon, { className: "w-7 h-7" })}
                </div>
                <h4 className="relative z-10 text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-900 transition-colors tracking-tight uppercase">
                  {theme.title}
                </h4>
                <p className="relative z-10 text-slate-500 leading-relaxed font-medium">
                  {theme.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Flyer Section */}
      <section id="flyer" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-20">
            <h2 className="text-[10px] md:text-[11px] font-black text-blue-600 tracking-[0.5em] uppercase mb-4">Paper Submission</h2>
            <h3 className="text-3xl md:text-7xl font-bold text-slate-900 tracking-tight leading-none uppercase">Official Announcement</h3>
          </div>
          <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.3)] border-8 border-slate-50 transition-transform duration-700 hover:scale-[1.01]">
             <img src={imgPath.flyer} alt="Submission Flyer" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Infographic Timeline Section */}
      <section id="dates" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] md:text-[11px] font-black text-blue-600 tracking-[0.5em] uppercase mb-4">Important Key Dates</h2>
            <h3 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-16 uppercase">Key Dates</h3>
          </div>

          <div className="relative">
            <div className="absolute top-20 left-0 w-full h-1 bg-slate-200 hidden lg:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
              {dates.map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center group">
                  <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-2xl mb-8 transform transition-all hover:scale-110 duration-500 group-hover:rotate-6`}>
                    {item.icon}
                  </div>
                  
                  <div className="text-center space-y-4 w-full">
                    <h4 className="font-bold text-slate-900 text-lg leading-tight px-2 min-h-[3.5rem] flex items-center justify-center tracking-tight uppercase">{item.label}</h4>
                    <p className="font-black text-blue-600 text-xl tracking-tighter bg-white px-6 py-2 rounded-xl border border-slate-200 shadow-sm">{item.date}</p>
                    
                    {item.status === "Active Now" ? (
                      <div className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-xl">
                        <Timer className="w-3 h-3" />
                        Live Now
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Upcoming
                      </div>
                    )}
                  </div>

                  {idx !== dates.length - 1 && (
                    <div className="w-1 h-12 bg-slate-100 my-6 lg:hidden"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-[3rem] md:rounded-[5rem] overflow-hidden flex flex-col lg:flex-row shadow-3xl text-white border border-slate-800">
            <div className="lg:w-1/2 p-10 md:p-24 flex flex-col justify-center space-y-12 bg-slate-950">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 bg-blue-600/20 text-blue-400 px-5 py-1.5 rounded-full font-bold uppercase text-[11px] tracking-widest">
                  <MapPin className="w-4 h-4" />
                  Kolkata, WB, India
                </div>
                <h2 className="text-5xl md:text-8xl font-bold leading-none tracking-tighter uppercase drop-shadow-2xl">
                  Research <br />
                  <span className="text-blue-500 font-serif">Park</span>
                </h2>
              </div>
              <div className="text-xl md:text-3xl font-bold leading-relaxed border-l-8 border-blue-600 pl-8 space-y-3 text-left">
                <p className="text-white uppercase font-black tracking-tight">Rajarhat, Newtown</p>
                <p className="uppercase tracking-[0.2em] text-[13px] md:text-sm font-black opacity-60">West Bengal 700 135</p>
              </div>
              <div className="pt-6 text-center lg:text-left">
                <a 
                  href="https://maps.app.goo.gl/JmFBsApsZ6si41WSA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 bg-white text-slate-950 px-14 py-6 rounded-3xl font-black text-xl hover:bg-blue-50 transition-all shadow-3xl uppercase tracking-widest group"
                >
                  Directions
                  <MapNavigation className="w-6 h-6 text-blue-600 group-hover:rotate-45 transition-transform duration-500" />
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 h-[500px] lg:h-auto overflow-hidden relative group">
               <img src={imgPath.venue} alt="IIT KGP Newtown" className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000" />
               <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors"></div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="py-24 md:py-48 bg-slate-950 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-10">
           <img src={imgPath.architecture} alt="Architecture Design Grid" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 shadow-3xl overflow-hidden group">
             <h2 className="text-[11px] font-black text-blue-400 tracking-[0.8em] uppercase mb-12">Integrated System Framework</h2>
             <img src={imgPath.architecture} alt="Technical Architecture" className="w-full h-auto rounded-3xl mix-blend-lighten transition-transform duration-1000 group-hover:scale-[1.03]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-32 pb-16 text-white border-t border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24 items-start">
            
            {/* Identity Column */}
            <div className="lg:col-span-5 space-y-12">
              <div className="flex items-center gap-8">
                 <div className="bg-white p-4 rounded-3xl shadow-3xl transition-transform hover:-rotate-3">
                   <img src={imgPath.logo} alt="IIT KGP Logo" className="h-20 w-auto object-contain" />
                 </div>
                 <div>
                   <h3 className="font-black text-4xl tracking-tighter uppercase leading-none mb-3">ICFMS 2027</h3>
                   <div className="text-[11px] text-blue-400 tracking-[0.6em] font-black uppercase leading-tight">75 Golden Years</div>
                 </div>
              </div>
              
              <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-sm">
                IIT Kharagpur marks 75 years of leadership, convening global pioneers to architect the futuristic mobility stack.
              </p>

              <div className="flex gap-4">
                {[
                  { icon: <Facebook />, link: "https://www.facebook.com/IITKgp" },
                  { icon: <Twitter />, link: "https://twitter.com/IITKgp" },
                  { icon: <Linkedin />, link: "https://www.linkedin.com/school/indian-institute-of-technology-kharagpur" },
                  { icon: <Instagram />, link: "https://www.instagram.com/iit.kgp" },
                  { icon: <Youtube />, link: "https://www.youtube.com/channel/UCQCLWAILNrEVemERg4ybAYQ" }
                ].map((social, i) => (
                  <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 group shadow-xl">
                    <div className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3">
              <h5 className="font-black text-[12px] tracking-[0.5em] uppercase text-blue-400 mb-10 border-b-2 border-blue-900 pb-4 inline-block tracking-widest">Institutions</h5>
              <ul className="space-y-6 text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">
                <li><a href="https://www.iitkgp.ac.in" target="_blank" rel="noreferrer" className="hover:text-white transition-all flex items-center gap-3"><Globe className="w-4 h-4 text-blue-600" /> IIT Kharagpur</a></li>
                <li><a href="https://www.mustlab.in" target="_blank" rel="noreferrer" className="hover:text-white transition-all flex items-center gap-3"><Zap className="w-4 h-4 text-blue-600" /> MUST Laboratory</a></li>
                <li><a href="https://www.iitkgp.ac.in/pj" target="_blank" rel="noreferrer" className="hover:text-white transition-all flex items-center gap-3"><Award className="w-4 h-4 text-blue-600" /> Platinum Jubilee</a></li>
              </ul>
            </div>

            {/* Correspondence Column */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[3.5rem] md:rounded-[4.5rem] p-10 shadow-3xl">
              <h5 className="font-black text-[11px] tracking-[0.6em] uppercase text-blue-400 mb-10 border-b border-blue-900 pb-5 inline-block">Correspondence</h5>
              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-2xl font-black tracking-tighter leading-none mb-3 uppercase">Prof Arkopal K. Goswami, PhD</p>
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <p className="text-blue-400 text-[11px] font-black uppercase tracking-[0.2em]">Associate Professor, RCGSIDM</p>
                      <p className="text-slate-100 text-[10px] font-bold uppercase tracking-[0.15em] opacity-80 leading-snug">Associate Dean, International Relations</p>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] pt-1">IIT Kharagpur</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-6 group overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-all">
                      <Mail className="w-5 h-5 text-blue-400 group-hover:text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[8px] md:text-[9px] uppercase font-black text-blue-400 tracking-[0.4em] mb-1 opacity-80 leading-none">Official Email</span>
                      <a href="mailto:icfms.iitkgp@gmail.com" className="text-[15px] font-black text-white hover:text-blue-400 transition-colors tracking-tighter truncate block leading-none">icfms.iitkgp@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-all">
                      <Globe className="w-5 h-5 text-blue-400 group-hover:text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[8px] md:text-[9px] uppercase font-black text-blue-400 tracking-[0.4em] mb-1 opacity-80 leading-none">Research Site</span>
                      <a href="https://www.mustlab.in/" target="_blank" rel="noopener noreferrer" className="text-[15px] font-black text-white hover:text-blue-400 transition-colors tracking-tighter truncate block leading-none uppercase">mustlab.in</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-80">
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left leading-relaxed max-w-2xl">
              &copy; 2027 ICFMS | Indian Institute of Technology Kharagpur <br />
              <span className="text-[8px] md:text-[9px] opacity-40 font-black tracking-[0.4em] mt-2 block leading-none tracking-widest uppercase">Yogaḥ Karmasu Kauśalam — Excellence in Action is Yoga</span>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="text-blue-600 text-[11px] font-black uppercase tracking-[0.5em] animate-pulse">
                75 Years of Technical Excellence
              </div>
              <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                Made with love <Heart className="w-3 h-3 text-red-500 fill-current" /> by <a href="https://kapil2020.github.io/website" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white underline underline-offset-4 transition-colors font-bold">Kapil</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
