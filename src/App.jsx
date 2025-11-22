import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Code, Cpu, Globe, Layout, Database, ArrowRight, 
  Github, Linkedin, Mail, Send, Award, Briefcase, Smartphone, 
  Layers, ExternalLink, Star, Sparkles, MapPin, Music, Zap, Hexagon, Crown,
  Menu, X, Wrench, Server, Cloud
} from 'lucide-react';
import banMain from './assets/bananasis1.jpg';
import banMobile from './assets/bananasis2.jpg';
import banDash from './assets/bananasis3.jpg';
import profile from './assets/profile.png';
import scorify1 from './assets/scorify1.png';
import scorify2 from './assets/scorify2.png';
import scorify3 from './assets/scorify3.png';

// --- 1. 3D TILT CARD ---
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 2.5;
    const mouseY = (e.clientY - rect.top) * 2.5;
    const rX = (mouseY / height - 0.5) * -20;
    const rY = (mouseX / width - 0.5) * 20;
    setRotate({ x: rX, y: rY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-100 ease-out ${className}`}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` }}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent z-50 rounded-3xl" style={{ opacity, transition: 'opacity 0.3s ease' }} />
    </div>
  );
};

// --- 2. TIMELINE ITEM ---
const TimelineItem = ({ year, title, subtitle, details, active }) => (
  <div className="relative pl-8 pb-12 border-l border-slate-800 last:pb-0 last:border-none">
    <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ${active ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'bg-slate-700'}`} />
    <span className="text-xs font-mono text-teal-400 mb-1 block">{year}</span>
    <h4 className="text-white font-bold text-lg">{title}</h4>
    <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
    {details && (
      <ul className="mt-3 space-y-1">
        {details.map((detail, i) => (
          <li key={i} className="text-slate-500 text-xs flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-teal-500/50"/> {detail}</li>
        ))}
      </ul>
    )}
  </div>
);

// --- 3. PROJECT SHOWCASE (Slideshow) ---
const ProjectShowcase = ({ title, subtitle, description, tags, color, icon: Icon, images }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const validImages = images && images.length > 0 ? images.filter(img => img) : []; 

  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % validImages.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [validImages.length]);

  return (
    <div className="mb-32 relative group">
      <div className={`absolute -inset-4 bg-gradient-to-r ${color} to-transparent opacity-5 blur-3xl rounded-[3rem] group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative bg-[#0A0F1C]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Content Side */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className={`inline-flex self-start p-3 rounded-xl bg-white/5 border border-white/10 text-white mb-6`}>
              <Icon size={32} />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 font-display">{title}</h3>
            <p className="text-teal-400 font-mono text-sm mb-6">{subtitle}</p>
            <p className="text-slate-400 leading-relaxed mb-8">{description}</p>
            <div className="flex flex-wrap gap-2">
               {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-slate-300 bg-white/5 border border-white/5 rounded-md">{tag}</span>
              ))}
            </div>
          </div>

          {/* Slideshow Gallery Side */}
          <div className="lg:w-2/3">
             <div className="relative aspect-video rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl group/slider">
                {validImages.length > 0 ? (
                  validImages.map((src, idx) => (
                    <div 
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentImg ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      <img src={src} alt={`${title} screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/80 via-transparent to-transparent opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                     <span className="flex items-center gap-2 font-mono text-sm"><Layout size={16}/> Add images to /public</span>
                  </div>
                )}

                {/* Progress Indicators */}
                {validImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {validImages.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentImg(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImg ? 'w-8 bg-teal-400' : 'bg-white/30 hover:bg-white/60'}`}
                      />
                    ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 4. HOBBY CARD ---
const HobbyCard = ({ title, icon: Icon, theme, description, visual }) => (
  <TiltCard className={`h-72 rounded-3xl p-8 flex flex-col justify-between overflow-hidden group relative ${theme} transition-all hover:shadow-2xl`}>
    <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2">{visual}</div>
    <div className="relative z-10 flex flex-col h-full justify-between">
       <div>
         <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform"><Icon size={28} /></div>
         <h4 className="text-3xl font-bold text-white mb-3 font-display">{title}</h4>
       </div>
       <div>
         <div className="h-0.5 w-12 bg-white/50 mb-4 group-hover:w-full transition-all duration-500" />
         <p className="text-white/80 text-sm font-medium leading-relaxed">{description}</p>
       </div>
    </div>
  </TiltCard>
)

// --- 5. SKILLS CATEGORY CARD ---
const SkillCategory = ({ title, skills, icon: Icon, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:border-teal-500/30 group">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>
      <h4 className="text-lg font-bold text-white">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span key={i} className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-black/20 rounded-md border border-white/5 hover:text-teal-300 hover:border-teal-500/30 transition-colors cursor-default">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---
const Portfolio = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [emailForm, setEmailForm] = useState({ email: '', subject: '', message: '' });

  const handleInputChange = (e) => setEmailForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSendEmail = () => {
    if (!emailForm.subject || !emailForm.message) return alert("Please fill in the subject and message.");
    window.location.href = `mailto:tanjeecheng1016@gmail.com?subject=${encodeURIComponent(emailForm.subject)}&body=${encodeURIComponent(`From: ${emailForm.email}\n\n${emailForm.message}`)}`;
  };

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

    // Data for Skills Section
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      color: "text-blue-400",
      skills: ["JavaScript", "TypeScript", "Java", "Python", "SQL", "C", "PHP", "HTML", "CSS", "Assembly"]
    },
    {
      title: "Frameworks",
      icon: Layers,
      color: "text-cyan-400",
      skills: ["React.js", "Spring Boot", "Flutter", "jQuery", "JSP", "Tailwind"]
    },
    {
      title: "AI & Data",
      icon: Cpu,
      color: "text-purple-400",
      skills: ["Artificial Intelligence", "Data Science", "NLP", "LLaMA (LLM)", "Image Processing"]
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      color: "text-yellow-400",
      skills: ["Google Cloud (GCP)", "Figma", "Google Maps API", "Microsoft Project", "Git/GitHub"]
    },
    {
      title: "Core Concepts",
      icon: Server,
      color: "text-green-400",
      skills: ["Software Engineering", "Data Structures", "Cloud Computing", "Networking", "QA & Testing", "Requirements Eng."]
    }
  ];

  return (
    <div className="min-h-screen text-slate-300 selection:bg-teal-500/30 selection:text-white overflow-hidden bg-[#030712]">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] transition-transform duration-75 will-change-transform" style={{ transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] bg-[#030712] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center h-16">
          <div className="font-display font-bold text-xl text-white tracking-tighter flex items-center gap-2 z-50">
            <span className="text-teal-400">{`{`}</span> TJC <span className="text-teal-400">{`}`}</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium items-center">
            {['Work', 'Journey', 'Life'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-teal-400 transition-colors relative group py-2">
                {item} <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"/>
              </a>
            ))}
            <a href="#contact" className="px-4 py-2 bg-white text-black rounded-lg font-bold text-xs hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">Contact</a>
          </div>

          {/* Mobile Menu Button (Highest Z-index to always be clickable) */}
          <button className="md:hidden z-[100] text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation Drawer (Solid Background) */}
        {isMobileMenuOpen && (
          <div className="fixed top-16 left-0 right-0 bottom-0 z-[90] bg-[#030712] pt-8 px-6 flex flex-col gap-6 md:hidden animate-fadeIn">
            {['Work', 'Journey', 'Life'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white border-b border-white/10 pb-4">{item}</a>
            ))}
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-teal-400 pb-4">Contact Me</a>
          </div>
        )}
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* HERO SECTION */}
        <section className="text-center mb-32 relative pt-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/20 blur-[100px] -z-10 rounded-full" />
          
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-teal-500/20 shadow-[0_0_40px_rgba(45,212,191,0.3)] animate-fadeIn">
             <img 
                src={profile}
                onError={(e) => {e.target.src = 'https://github.com/shadcn.png'}} 
                alt="Tan Jee Cheng" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
             />
          </div>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-950/30 text-teal-300 text-xs font-mono backdrop-blur-sm animate-fadeIn" style={{animationDelay: '100ms'}}>
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
            Final Year Software Engineering Student
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[1.1] animate-fadeIn" style={{animationDelay: '200ms'}}>
            <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-text bg-300%">
              Tan Jee Cheng
            </span>
            <span className="text-teal-400">.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light animate-fadeIn" style={{animationDelay: '300ms'}}>
            Bridging the gap between <span className="text-white font-medium">complex algorithms</span> and <span className="text-white font-medium">beautiful interfaces</span>. 
            Specializing in Full Stack Development & AI Integration.
          </p>
          
          <div className="flex justify-center gap-4 animate-fadeIn" style={{animationDelay: '400ms'}}>
            <a href="#work" className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-xl flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]">
              View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all backdrop-blur-sm flex items-center gap-2">
              <Mail size={18} /> Connect
            </a>
          </div>
        </section>

        {/* WORK SECTION (Slideshow Activated) */}
        <section id="work" className="mb-32 pt-10">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white font-display">Feature Projects</h2>
              <p className="text-slate-400 mt-2">Highlighting my best academic and creative work.</p>
            </div>
          </div>

          {/* Project 1: SCORIFY */}
          <ProjectShowcase 
            title="Scorify"
            subtitle="Final Year Project / Smart Study Companion"
            description="A comprehensive web system designed to help students manage their academic life. Features a Performance & Support Module that enables detailed CGPA tracking."
            tags={["React", "Spring Boot", "Python", "MySQL"]}
            color="from-indigo-500"
            icon={Layout}
            images={[scorify1, scorify2, scorify3]} 
          />

          {/* Project 2: BANANASIS */}
          <ProjectShowcase 
            title="Bananasis"
            subtitle="Online Grocery System / Award-Winning UI"
            description="A full-stack e-commerce solution integrated with Google Maps & Stripe. Recognized for best UI design in the cohort."
            tags={["PHP", "MySQL", "Stripe API", "Google Maps API"]}
            color="from-yellow-500"
            icon={Smartphone}
            images={[banMain, banMobile, banDash]} 
          />

          {/* Professional Experience */}
          <div className="mt-24">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Briefcase className="text-teal-400" /> Professional Experience
            </h3>
            
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/10 p-8 md:p-10 hover:border-teal-500/30 transition-colors group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                   <div>
                     <h4 className="text-2xl font-bold text-white">Frontend Developer Intern</h4>
                     <p className="text-teal-400 font-mono text-sm mt-1">OS HRS Sdn Bhd • Nov 2023 - Jan 2024</p>
                   </div>
                   <div className="flex gap-2 mt-4 md:mt-0">
                     {['React', 'Figma', 'Mobile Response'].map(tech => (<span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">{tech}</span>))}
                   </div>
                </div>
                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
                  <p>Rebuilt the company’s legacy <strong>Employee Self-Service (ESS)</strong> system using React and Figma, enhancing user experience.</p>
                  <p>Improved UI/UX and functionality across core modules, including <strong>employee profiles, payslips, leave, and overtime.</strong></p>
                  <p>Mentored a fellow intern on task execution and React fundamentals.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="mb-32 pt-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-white font-display">Skills & Expertise</h2>
             <p className="text-slate-400 mt-2">A comprehensive toolkit for building modern digital solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <SkillCategory 
                key={idx}
                title={category.title}
                icon={category.icon}
                color={category.color}
                skills={category.skills}
              />
            ))}
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section id="journey" className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 pt-10">
          <div>
            <h3 className="text-2xl text-white font-bold mb-8 flex items-center gap-3"><Award className="text-teal-400" /> Education Journey</h3>
            <div className="ml-2">
              <TimelineItem year="Jun 2024 — Jun 2026 (Expected)" title="Bachelor of Software Engineering" subtitle="Tunku Abdul Rahman University of Management and Technology" details={["CGPA: 3.8824", "50% Merit Scholarship Holder", "2x President List Awardee", "2x Dean List Awardee"]} active={true} />
              <TimelineItem year="Jun 2022 — Jun 2024" title="Diploma in Information Technology" subtitle="Tunku Abdul Rahman University of Management and Technology" details={["CGPA: 3.8065", "Graduate with Distinction"]} active={false} />
            </div>
          </div>
        </section>

        {/* HOBBIES SECTION */}
        <section id="life" className="mb-32 pt-10">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white font-display">Beyond the Code</h2>
              <p className="text-slate-400 mt-2">A blend of strategy, agility, and harmony.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <HobbyCard title="Badminton" icon={Zap} description="The pursuit of agility and reflex. Every smash requires precision; every rally tests endurance." theme="bg-gradient-to-br from-[#0c4a6e] to-[#020617] border-cyan-500/20 hover:border-cyan-400/50" visual={<div className="w-full h-full relative"><div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" /></div>} />
             <HobbyCard title="Chinese Chess" icon={Crown} description="A battlefield of intellect. Strategic foresight and patience are key to controlling the board." theme="bg-gradient-to-br from-[#451a03] to-[#020617] border-amber-600/20 hover:border-amber-500/50" visual={<div className="w-full h-full relative flex items-center justify-center"><div className="w-[120%] h-[120%] border border-amber-500/10 relative rotate-12"></div></div>} />
             <HobbyCard title="Piano" icon={Music} description="Finding rhythm in chaos. Translating emotion into structured harmony through black and white keys." theme="bg-gradient-to-br from-[#1e293b] to-[#000000] border-white/10 hover:border-white/40" visual={<div className="w-full h-full flex flex-col justify-end pb-4 px-4 opacity-30"><div className="flex h-24 w-full justify-center gap-1">{[...Array(7)].map((_, i) => (<div key={i} className="relative w-8 h-full bg-white rounded-b-md">{i !== 2 && i !== 6 && (<div className="absolute top-0 right-[-4px] w-5 h-14 bg-black z-10 rounded-b-sm" />)}</div>))}</div></div>} />
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-20 pt-10">
          <h3 className="text-2xl text-white font-bold mb-8 flex items-center gap-3 justify-center"><Terminal className="text-teal-400" /> Initialize Connection</h3>
          
          <div className="w-full bg-[#0F172A] rounded-xl border border-slate-700 overflow-hidden shadow-2xl font-mono text-sm group hover:border-teal-500/30 transition-colors max-w-3xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border-b border-slate-700 text-slate-400">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" /></div>
              <span className="ml-4 text-xs flex items-center gap-2"><Mail size={12}/> email.tsx</span>
            </div>
            <div className="p-6 text-slate-300">
              <div className="flex gap-4 mb-4"><span className="text-slate-600 select-none">1</span><span><span className="text-pink-400">const</span> <span className="text-blue-400">sendEmail</span> = <span className="text-yellow-300">async</span> () <span className="text-yellow-300">{`=> {`}</span></span></div>
              {['from', 'subject'].map((field, i) => (
                <div key={field} className="flex gap-4 mb-2 items-center"><span className="text-slate-600 select-none">{i + 2}</span><span className="pl-4 text-indigo-300 w-20">{field}:</span><input type="text" name={field === 'from' ? 'email' : 'subject'} value={emailForm[field === 'from' ? 'email' : 'subject']} onChange={handleInputChange} placeholder={field === 'from' ? '"recruiter@company.com"' : '"Job Opportunity"'} className="bg-transparent border-none focus:ring-0 text-green-400 placeholder-slate-600 p-0 flex-1 focus:outline-none" /></div>
              ))}
              <div className="flex gap-4 mb-2"><span className="text-slate-600 select-none">4</span><span className="pl-4 text-indigo-300 w-20">message:</span></div>
              <div className="flex gap-4 mb-2"><span className="text-slate-600 select-none">5</span><textarea rows="3" name="message" value={emailForm.message} onChange={handleInputChange} placeholder='"Hi Jee Cheng, I saw your portfolio..."' className="w-full bg-slate-800/50 rounded p-2 text-green-400 placeholder-slate-600 border-none focus:ring-1 focus:ring-teal-500/50 ml-4 resize-none focus:outline-none"></textarea></div>
              <div className="flex gap-4"><span className="text-slate-600 select-none">6</span><span><span className="text-yellow-300">{`}`}</span>;</span></div>
              <button onClick={handleSendEmail} className="mt-6 ml-12 px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded flex items-center gap-2 transition-all hover:scale-105"><Send size={14} /> Execute Function</button>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-slate-400">
             <a href="mailto:tanjeecheng1016@gmail.com" className="group flex items-center justify-center gap-3 hover:text-white transition-colors px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 w-full">
               <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform"><Mail size={16}/></div>
               <span className="truncate">tanjeecheng1016@gmail.com</span>
             </a>
             
             <a href="https://www.linkedin.com/in/tan-jee-cheng-791292291/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 hover:text-white transition-colors px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 w-full">
               <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform"><Linkedin size={16}/></div>
               <span>LinkedIn Profile</span>
             </a>

             <span className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/5 cursor-default w-full">
               <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Smartphone size={16}/></div>
               <span>+(60) 11 6398 5186</span>
             </span>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#020617] py-8 text-center text-slate-600 text-sm font-mono"><p>Designed & Built by Tan Jee Cheng © 2025</p></footer>
    </div>
  );
};

export default Portfolio;