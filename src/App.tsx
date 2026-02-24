/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { 
  Activity, 
  Brain, 
  ChevronRight, 
  Dna, 
  Eye, 
  Layers, 
  Microscope, 
  Scan, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Zap,
  ArrowUpRight,
  Target,
  Cpu,
  Globe,
  Database,
  Terminal,
  Activity as Pulse,
  Lock,
  Wifi,
  Users,
  TrendingUp,
  Battery,
  Clock
} from 'lucide-react';

// --- Configuration & Data ---

const APPS = [
  {
    id: 'scandent',
    name: 'SCANDENT',
    icon: <Scan className="w-8 h-8" />,
    status: 'LIVE',
    desc: 'Pre-diagnóstico dental desde fotografía. Detección de caries y gingivitis con YOLOv7.',
    url: 'https://scandent-humana.vercel.app',
    tags: ['YOLOv7', 'Deep Learning'],
    color: '#10b981',
    size: 'large',
    videoSrc: '' // Placeholder for SCANDENT video
  },
  {
    id: 'implantx',
    name: 'ImplantX',
    icon: <Activity className="w-8 h-8" />,
    status: 'LIVE | IP PROTECTED',
    desc: 'Algoritmo sinérgico (Safe Creative #2510073245348) que predice el fracaso implantario con un AUC de 0.891.',
    url: 'https://implantx-humana.vercel.app',
    tags: ['CausalML', 'Synergy Engine', 'Patent Pending'],
    color: '#C9A86C',
    size: 'small',
    videoSrc: '' // Placeholder for ImplantX video
  },
  {
    id: 'simetria',
    name: 'ÍNDICE MIRÓ',
    icon: <Sparkles className="w-8 h-8" />,
    status: 'LIVE 90%',
    desc: 'Belleza contextual: IM = M × E × C. Matemática, Estética IA y Contexto.',
    url: 'https://reage-phi.vercel.app',
    tags: ['Contextual Beauty', 'Facial AI'],
    color: '#3b82f6',
    size: 'small',
    videoSrc: 'https://storage.googleapis.com/aistudio-assets/simetria-demo.mp4' // Updated with real demo video
  },
  {
    id: 'copilot',
    name: 'Copilot C3',
    icon: <Brain className="w-8 h-8" />,
    status: 'LIVE',
    desc: 'Asistente clínico inteligente integrado con Dentalink.',
    url: 'https://copilot-humana.vercel.app',
    tags: ['LLM', 'Clinical Assistant'],
    color: '#8b5cf6',
    size: 'medium',
    videoSrc: 'https://storage.googleapis.com/aistudio-assets/copilot-demo.mp4' // Added demo video for Copilot C3
  },
  {
    id: 'zerocaries',
    name: 'ZeroCaries',
    icon: <ShieldCheck className="w-8 h-8" />,
    status: '85%',
    desc: 'Mapa de riesgo cariogénico y protocolos preventivos.',
    url: 'https://zerocaries-humana.vercel.app',
    tags: ['Prevention', 'Risk Map'],
    color: '#06b6d4',
    size: 'small',
    videoSrc: '' // Placeholder for ZeroCaries video
  },
  {
    id: 'armonia',
    name: 'ARMONÍA',
    icon: <Sparkles className="w-8 h-8" />,
    status: 'DEV',
    desc: 'Índice Miró: belleza contextual y armonía facial.',
    url: 'https://armonia-humana.vercel.app',
    tags: ['Beauty AI', 'Contextual'],
    color: '#f43f5e',
    size: 'medium',
    videoSrc: '' // Placeholder for Armonia video
  }
];

const STATS = [
  { label: 'Apps IA', value: '7' },
  { label: 'En Producción', value: '6' },
  { label: 'Landmarks', value: '147+' },
  { label: 'Fuentes', value: '90+' },
  { label: 'Líneas IA', value: '556' },
  { label: 'Verticales', value: '8' }
];

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Stars/Video Simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(117,51,204,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random()
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6">
            <HumanaLogo className="w-20 h-20 md:w-24 md:h-24" />
            <div className="flex flex-col">
              <span className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Humana.AI</span>
              <span className="text-[10px] md:text-[12px] text-indigo-velvet-400 font-black tracking-[0.8em] uppercase mt-2">Inteligencia Clínica</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute inset-y-0 left-0 bg-indigo-velvet-500 shadow-[0_0_15px_rgba(117,51,204,0.8)]"
          />
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="text-[9px] font-mono text-white/20 tracking-[0.4em] uppercase">
            Initializing_Ecosystem_v2.4
          </div>
          <div className="text-[10px] font-mono text-indigo-velvet-400 font-bold">
            {progress}%
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-12 text-[11px] font-medium text-white/30 italic tracking-widest text-center px-6"
      >
        Ecosistema dental inteligente · Claridad clínica que genera confianza
      </motion.div>
    </motion.div>
  );
};

const VisionHeader = () => (
  <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 mb-12"
    >
      <div className="text-[10px] font-black tracking-[0.6em] text-blue-500 uppercase">
        El Problema
      </div>
      <div className="h-[1px] w-12 bg-blue-500/30" />
      <div className="text-[11px] font-medium text-white/40 italic tracking-wider">
        Desarrollado por Clínica Miró
      </div>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-[8vw] md:text-[5vw] font-light leading-tight tracking-tighter max-w-5xl text-white/90"
    >
      La odontología diagnostica tarde, <br />
      <strong className="font-black text-white">trata caro y previene poco.</strong>
    </motion.h2>
    
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-16 p-12 border border-blue-500/30 rounded-lg relative group"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#020202] px-4 text-[8px] font-black tracking-[0.4em] text-blue-500/50 uppercase">
        Core Statement
      </div>
      <p className="text-xl md:text-2xl text-white/60 font-light italic font-display leading-relaxed max-w-3xl">
        Cuando un paciente recibe un diagnóstico claro, lo entiende.<br />
        Cuando entiende, confía.<br />
        Cuando confía, se atiende.<br />
        <span className="text-white font-bold not-italic">Eso es HUMANA.AI. Claridad clínica que genera confianza.</span>
      </p>
      <div className="mt-8 flex flex-col items-center md:items-end w-full max-w-3xl">
        <div className="h-[1px] w-12 bg-blue-500/30 mb-4" />
        <div className="text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">
          Dr. Carlos Montoya
        </div>
        <div className="text-[9px] font-medium text-white/40 tracking-wider mt-1">
          Director Clínica Miró y Desarrollador de Humana.AI
        </div>
      </div>
    </motion.div>

    <div className="flex gap-6 mt-16">
      {['Social', 'Comercial', 'Educativa'].map((label, i) => (
        <motion.button 
          key={label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + (i * 0.1) }}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', scale: 1.05 }}
          className="px-10 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] text-white/60 transition-all"
        >
          {label}
        </motion.button>
      ))}
    </div>
    
    <motion.div 
      animate={{ height: [0, 48, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-12 left-1/2 w-[1px] bg-indigo-velvet-500/50" 
    />
  </section>
);

const VisionPillar = ({ num, tag, word, headline, body, actors, colorClass }: any) => (
  <section className="min-h-screen flex items-center py-20 md:py-40 px-6 md:px-12 border-b border-white/5">
    <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 md:gap-24 items-start">
      <div className="lg:sticky lg:top-40">
        <div className="text-[10px] font-black text-white/10 tracking-[0.4em] mb-4 md:mb-8">{num}</div>
        <div className={`w-2 h-2 rounded-full mb-4 md:mb-6 ${colorClass === 'ps' ? 'bg-indigo-velvet-500 shadow-[0_0_20px_var(--color-indigo-velvet-500)]' : colorClass === 'pc' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]'}`} />
        <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 ${colorClass === 'ps' ? 'text-indigo-velvet-400' : colorClass === 'pc' ? 'text-blue-400' : 'text-emerald-400'}`}>{tag}</div>
        <div className="text-2xl md:text-4xl font-light text-white/10 tracking-widest uppercase">{word}</div>
      </div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h3 className="text-4xl md:text-6xl font-light leading-tight tracking-tighter mb-8 md:mb-12 text-white/90">
          {headline.split('<em>').map((part: string, i: number) => i === 1 ? <em key={i} className="not-italic text-white/30 font-light">{part.replace('</em>', '')}</em> : part)}
        </h3>
        <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed mb-8 md:mb-12" dangerouslySetInnerHTML={{ __html: body }} />
        {actors && (
          <div className="flex flex-wrap gap-2 md:gap-3">
            {actors.map((actor: string) => (
              <span key={actor} className="px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-blue-500/10 bg-blue-500/5 text-[8px] md:text-[10px] font-medium text-blue-400/60 uppercase tracking-wider">
                {actor}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  </section>
);

const WinWinSection = () => (
  <section className="py-60 px-12 border-b border-white/5">
    <div className="max-w-[1200px] mx-auto text-center">
      <div className="text-[10px] font-black tracking-[0.6em] text-indigo-velvet-400 uppercase mb-12">Quién gana</div>
      <h2 className="text-6xl md:text-7xl font-light tracking-tighter mb-32 text-white/90">
        Cuando la información mejora, <br />
        <strong className="font-black text-white">ganan todos.</strong>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {[
          { who: 'El paciente', text: 'Sabe que su plan de tratamiento fue construido sobre <strong>la mejor evidencia disponible</strong>, aplicada específicamente a sus condiciones particulares.', color: 'text-indigo-velvet-400' },
          { who: 'El profesional', text: 'Diagnostica con <strong>mayor respaldo científico</strong>, reduce variabilidad entre colegas, y puede comunicar hallazgos de forma visual y objetiva.', color: 'text-blue-400' },
          { who: 'El ecosistema', text: 'Aseguradoras validan con datos, universidades enseñan con estándar, fabricantes optimizan productos. <strong>Los mismos datos conectan a todos.</strong>', color: 'text-emerald-400' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="pt-12 border-t border-white/5"
          >
            <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 ${item.color}`}>{item.who}</div>
            <p className="text-lg text-white/30 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const VisionDiagram = () => (
  <section className="py-60 px-12 text-center border-b border-white/5">
    <div className="flex justify-center items-center max-w-lg mx-auto mb-12">
      <div className="w-48 h-48 rounded-full border border-indigo-velvet-500/10 bg-[radial-gradient(circle,var(--color-indigo-velvet-500)_0%,transparent_70%)] opacity-20 flex flex-col items-center justify-center">
        <span className="text-[10px] font-black text-indigo-velvet-400 uppercase tracking-widest">Social</span>
        <span className="text-xs text-white/40 mt-1">Equidad</span>
      </div>
      <div className="w-48 h-48 rounded-full border border-blue-500/10 bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] opacity-20 -mx-12 flex flex-col items-center justify-center relative z-10">
        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Comercial</span>
        <span className="text-xs text-white/40 mt-1">Escala</span>
      </div>
      <div className="w-48 h-48 rounded-full border border-emerald-500/10 bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,transparent_70%)] opacity-20 flex flex-col items-center justify-center">
        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Educativa</span>
        <span className="text-xs text-white/40 mt-1">Legado</span>
      </div>
    </div>
    <div className="text-[10px] font-black tracking-[0.4em] text-white/10 uppercase">La intersección es claridad clínica</div>
  </section>
);

const ClosingSection = () => (
  <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-12 py-40">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="max-w-2xl"
    >
      <p className="text-3xl md:text-4xl font-light text-white/40 leading-relaxed mb-12">
        Claridad clínica <strong className="font-black text-white/80">que genera confianza.</strong><br />
        Para cada paciente, según sus condiciones,<br />
        con la mejor ciencia disponible hoy.
      </p>
      <div className="w-12 h-[1px] bg-indigo-velvet-500/30 mx-auto mb-12" />
      <div className="text-xl font-black tracking-tighter uppercase text-white/10">Humana.AI</div>
      <div className="text-[10px] font-black tracking-[0.6em] text-indigo-velvet-500/40 uppercase mt-4">Inteligencia Clínica</div>
    </motion.div>
    
    <div className="max-w-2xl mx-auto mt-40 text-[11px] text-white/10 font-medium leading-relaxed text-center">
      HUMANA.AI es una herramienta de apoyo al diagnóstico clínico. Los resultados generados por inteligencia artificial no constituyen diagnóstico definitivo ni garantía de resultado. Toda decisión clínica debe ser validada por un profesional de salud calificado. El rendimiento de los modelos puede variar según la calidad de los datos de entrada y las condiciones específicas de cada paciente.
    </div>
  </section>
);

const HumanaLogo = ({ className = "w-14 h-14" }: { className?: string }) => (
  <div className={`${className} overflow-hidden rounded-2xl bg-black flex items-center justify-center shadow-2xl border border-white/5`}>
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="w-full h-full object-cover scale-110"
    >
      <source src="https://storage.googleapis.com/aistudio-assets/humana-anim.mp4" type="video/mp4" />
    </video>
  </div>
);

const SymmetryVideoFeature = () => {
  return (
    <div className="relative w-full aspect-video rounded-[60px] overflow-hidden border border-black/10 shadow-2xl group">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover"
      >
        <source src="https://storage.googleapis.com/aistudio-assets/simetria-demo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12">
        <div className="text-[10px] font-black tracking-[0.4em] text-indigo-velvet-400 uppercase mb-4">Caso de Estudio</div>
        <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Simetría Facial IA</h3>
        <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
          Análisis automático de 147+ landmarks faciales para determinar la proporción áurea y armonía estética en tiempo real.
        </p>
      </div>
      <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-3">
        <div className="w-2 h-2 bg-indigo-velvet-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Analysis</span>
      </div>
    </div>
  );
};

const AudiencePortals = () => {
  const portals = [
    {
      id: 'patient',
      label: 'Soy Paciente',
      title: 'Confianza Total',
      desc: 'Accede a diagnósticos precisos y entiende tu salud dental sin dudas.',
      icon: <Users className="w-5 h-5" />,
      color: 'border-emerald-500/20 text-emerald-400',
      hover: 'hover:border-emerald-500/40'
    },
    {
      id: 'dentist',
      label: 'Soy Dentista',
      title: 'Criterio Aumentado',
      desc: 'Reduce la variabilidad y escala tu práctica con herramientas de precisión IA.',
      icon: <Activity className="w-5 h-5" />,
      color: 'border-indigo-velvet-500/20 text-indigo-velvet-400',
      hover: 'hover:border-indigo-velvet-500/40'
    },
    {
      id: 'investor',
      label: 'Soy Inversor',
      title: 'Impacto Escalable',
      desc: 'Invierte en el ecosistema que está redefiniendo la economía de la salud.',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'border-rose-500/20 text-rose-400',
      hover: 'hover:border-rose-500/40'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-24">
      {portals.map((portal) => (
        <motion.div
          key={portal.id}
          whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.05)' }}
          className={`p-10 bg-black/40 backdrop-blur-xl border ${portal.color} ${portal.hover} rounded-[40px] text-left group cursor-pointer transition-all duration-500`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
              {portal.icon}
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-3 group-hover:opacity-60 transition-opacity">{portal.label}</div>
          <h4 className="text-2xl font-black tracking-tighter uppercase mb-4 leading-none">{portal.title}</h4>
          <p className="text-sm text-white/30 font-medium leading-relaxed group-hover:text-white/50 transition-colors">{portal.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

const SynergyVisualization = () => {
  return (
    <div className="relative h-64 w-full flex items-center justify-center overflow-hidden rounded-[40px] bg-black/20 border border-white/5 mt-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-indigo-velvet-500)_0%,transparent_70%)] opacity-10" />
      <div className="relative z-10 flex items-center gap-8 text-6xl font-black tracking-tighter">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-white/20 text-sm uppercase tracking-widest mb-2">Fumar</span>
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-velvet-400">1</div>
        </motion.div>
        <span className="text-white/20">+</span>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <span className="text-white/20 text-sm uppercase tracking-widest mb-2">Diabetes</span>
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-velvet-400">1</div>
        </motion.div>
        <span className="text-indigo-velvet-500">{'>'}</span>
        <motion.div 
          initial={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <span className="text-indigo-velvet-400 text-sm uppercase tracking-widest mb-2 font-black">Sinergia</span>
          <div className="w-24 h-24 rounded-3xl bg-indigo-velvet-600 text-white flex items-center justify-center glow-indigo shadow-2xl">2</div>
        </motion.div>
      </div>
    </div>
  );
};

const IndiceMiroFormula = () => {
  return (
    <div className="p-12 bg-indigo-velvet-900/20 border border-indigo-velvet-500/20 rounded-[60px] text-center relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles className="w-32 h-32" />
      </div>
      <h3 className="text-sm font-black tracking-[0.5em] uppercase text-indigo-velvet-400 mb-8">Fórmula de Belleza Contextual</h3>
      <div className="flex flex-wrap justify-center items-center gap-6 text-5xl md:text-7xl font-black tracking-tighter mb-8">
        <span className="text-white">IM</span>
        <span className="text-indigo-velvet-500">=</span>
        <div className="flex flex-col items-center">
          <span className="text-white">M</span>
          <span className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Matemática</span>
        </div>
        <span className="text-white/20">×</span>
        <div className="flex flex-col items-center">
          <span className="text-white">E</span>
          <span className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Estética IA</span>
        </div>
        <span className="text-white/20">×</span>
        <div className="flex flex-col items-center">
          <span className="text-white">C</span>
          <span className="text-[10px] uppercase tracking-widest text-white/30 mt-2">Contexto</span>
        </div>
      </div>
      <p className="text-white/40 italic font-display text-xl">"Tu belleza no es un número universal, es una orquestación de datos."</p>
    </div>
  );
};

const HUDOverlay = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-6 flex flex-col justify-between text-[8px] md:text-[10px] font-mono text-white/20 uppercase tracking-widest">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500/50">SYSTEM_ONLINE</span>
          </div>
          <div className="hidden xs:block">HUMANA_CORE_V2.4.0</div>
          <div className="hidden sm:block">LOC: SANTIAGO_CHILE</div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <Wifi className="w-3 h-3" />
            <span>ENCRYPTED_LINK</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3" />
            <span className="hidden xs:block">SECURE_PROTOCOL_ACTIVE</span>
          </div>
          <div className="text-[7px] md:text-[10px]">© 2026 HUMANA.AI_ECOSYSTEM</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="hidden sm:block">DATA_STREAM</span>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [2, 8, 2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-[1.5px] md:w-[2px] bg-white/20"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiagnosticDetails = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-12">
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md group/stat hover:border-emerald-500/30 transition-colors">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <div>
          <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Caries Detected</div>
          <div className="text-2xl font-black tracking-tighter text-emerald-400">98.4%</div>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md group/stat hover:border-indigo-velvet-500/30 transition-colors">
        <div className="w-2 h-2 bg-indigo-velvet-500 rounded-full animate-pulse" />
        <div>
          <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Gingivitis Score</div>
          <div className="text-2xl font-black tracking-tighter text-indigo-velvet-400">72.1%</div>
        </div>
      </div>
    </div>
  );
};

const AIScannerOverlay = ({ videoSrc }: { videoSrc?: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40px]">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <>
          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-velvet-500 to-transparent z-20 shadow-[0_0_20px_var(--color-indigo-velvet-500)]"
          />
          
          {/* Detection Boxes */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute top-[25%] left-[20%] w-32 h-32 border-2 border-emerald-500/40 bg-emerald-500/5 rounded-lg hud-border text-emerald-500"
          >
            <div className="absolute -top-6 left-0 text-[9px] font-mono bg-black/80 px-2 py-0.5 rounded border border-emerald-500/20">
              DET_CARIES_98.4%
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-[55%] left-[55%] w-40 h-24 border-2 border-indigo-velvet-400/40 bg-indigo-velvet-400/5 rounded-lg hud-border text-indigo-velvet-400"
          >
            <div className="absolute -top-6 left-0 text-[9px] font-mono bg-black/80 px-2 py-0.5 rounded border border-indigo-velvet-400/20">
              DET_BONE_LOSS_84.2%
            </div>
          </motion.div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        </>
      )}
    </div>
  );
};

const ImplantXOverlay = ({ videoSrc }: { videoSrc?: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden group-hover:opacity-100 transition-opacity duration-700">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.05, 0.2, 0.05],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  delay: i * 2,
                  ease: "linear"
                }}
                className="absolute w-[400px] h-[400px] border border-dashed border-indigo-velvet-500/20 rounded-full"
              />
            ))}
            {/* Causal Nodes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`node-${i}`}
                animate={{ 
                  x: [Math.cos(i) * 100, Math.cos(i + 1) * 150, Math.cos(i) * 100],
                  y: [Math.sin(i) * 100, Math.sin(i + 1) * 150, Math.sin(i) * 100],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-1.5 h-1.5 bg-indigo-velvet-400 rounded-full shadow-[0_0_10px_var(--color-indigo-velvet-400)]"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,168,108,0.05)_0%,transparent_70%)]" />
        </>
      )}
    </div>
  );
};

const MiroOverlay = ({ videoSrc }: { videoSrc?: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden group-hover:opacity-100 transition-opacity duration-700">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <>
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 p-4 opacity-20">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 4,
                  ease: "easeInOut"
                }}
                className="w-0.5 h-0.5 bg-blue-400 rounded-full"
                style={{ 
                  gridColumn: Math.floor(Math.random() * 8) + 1,
                  gridRow: Math.floor(Math.random() * 8) + 1
                }}
              />
            ))}
          </div>
          {/* Scanning Bar */}
          <motion.div 
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(59,130,246,0.03)_50%,transparent_100%)]" />
        </>
      )}
    </div>
  );
};

const CopilotOverlay = ({ videoSrc }: { videoSrc?: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden group-hover:opacity-100 transition-opacity duration-700">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-1 p-6 font-mono text-[7px] text-indigo-velvet-400/30">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: [0, 1, 0.5], x: 0 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  delay: i * 0.15 
                }}
              >
                {`[CLINICAL_ENGINE] > PROC_DATA_POINT_${Math.random().toString(36).substring(7).toUpperCase()}`}
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-[-20%] right-[-10%] opacity-20">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Cpu className="w-64 h-64 text-indigo-velvet-500" />
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

const ZeroCariesOverlay = ({ videoSrc }: { videoSrc?: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 group-hover:opacity-30 transition-opacity duration-700">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border border-dashed border-emerald-500/30 rounded-full"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
    </div>
  );
};

const ArmoniaOverlay = ({ videoSrc }: { videoSrc?: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 group-hover:opacity-30 transition-opacity duration-700">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-48 h-48 text-rose-500/20" />
          </motion.div>
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(244,63,94,0.05)_50%,transparent_75%)] bg-[size:200%_200%] animate-pulse" />
    </div>
  );
};

const HeroVideoBackground = ({ src }: { src?: string }) => {
  if (!src) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover opacity-40 scale-105"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
    </motion.div>
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 0.9]);
  const heroY = useTransform(smoothProgress, [0, 0.1], [0, -50]);

  const scandentRef = useRef(null);
  const { scrollYProgress: scandentScroll } = useScroll({
    target: scandentRef,
    offset: ["start end", "end start"]
  });
  const scandentScale = useTransform(scandentScroll, [0, 0.5, 1], [1.1, 1, 0.9]);
  const scandentRotate = useTransform(scandentScroll, [0, 0.5, 1], [2, 0, -2]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020202] text-[#F5F2ED] font-sans selection:bg-indigo-velvet-500 selection:text-white overflow-x-hidden">
      
      <AnimatePresence>
        {!isLoaded && (
          <SplashScreen onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      <HUDOverlay />

      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[1200px] h-[1200px] bg-indigo-velvet-900/10 blur-[200px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[1400px] h-[1400px] bg-indigo-velvet-800/10 blur-[200px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.05]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[60] bg-[#020202]/40 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>System_Online</span>
            </div>
            <span className="hidden md:block">Loc: Santiago_Chile</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <HumanaLogo className="w-8 h-8" />
              <span className="text-2xl font-black tracking-tighter uppercase leading-none">Humana.AI</span>
            </div>
            <span className="text-[8px] text-indigo-velvet-400 font-black tracking-[0.6em] uppercase mt-1">Inteligencia Clínica</span>
          </div>
          
          <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
            <div className="hidden lg:flex items-center gap-2">
              <Wifi className="w-3 h-3 text-indigo-velvet-400" />
              <span>Encrypted_Link</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Clock className="w-3 h-3 text-indigo-velvet-400" />
              <span>11:08:46 A. M.</span>
            </div>
            <button className="w-10 h-10 bg-indigo-velvet-600/20 text-indigo-velvet-400 rounded-lg border border-indigo-velvet-500/20 flex items-center justify-center hover:bg-indigo-velvet-600 hover:text-white transition-all">
              <Terminal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        <VisionHeader />

        <VisionPillar 
          num="01 — 03"
          tag="Social"
          word="Equidad"
          headline="Que el acceso a un diagnóstico riguroso <em>no dependa de dónde vives.</em>"
          body="La variabilidad diagnóstica en odontología está documentada: misma radiografía, conclusiones distintas. Nuestra IA no reemplaza al profesional — <strong>le entrega herramientas para reducir esa brecha</strong>, independientemente de la ubicación geográfica del paciente."
          colorClass="ps"
        />

        <VisionPillar 
          num="02 — 03"
          tag="Comercial"
          word="Escala"
          headline="Un ecosistema donde <em>cada actor gana cuando el paciente toma una mejor decisión.</em>"
          body="8 verticales conectadas por los mismos datos y la misma metodología. <strong>El impacto social y la sostenibilidad comercial no son opuestos</strong> — cuando el paciente accede a mejor información, todo el sistema se beneficia."
          actors={['Pacientes', 'Clínicas', 'Aseguradoras', 'MINSAL', 'Fabricantes', 'Universidades', 'Fintech', 'Odontólogos']}
          colorClass="pc"
        />

        <VisionPillar 
          num="03 — 03"
          tag="Educativa"
          word="Legado"
          headline="Formar profesionales <em>que integren datos y criterio clínico.</em>"
          body="Curso de IA en Odontología. Pipeline de talento donde los mejores alumnos acceden al ecosistema. <strong>El objetivo no es reemplazar la experiencia clínica</strong> — es potenciarla con herramientas que antes no existían."
          colorClass="pe"
        />

        <WinWinSection />

        {/* Hero Section - Segmented Entry */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 overflow-hidden">
          <HeroVideoBackground src="https://storage.googleapis.com/aistudio-assets/hero-dentists.mp4" />
          
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-10 text-center flex flex-col items-center"
          >
            {/* Brand Signature */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.4em]">
                HUMANA.AI
              </div>
              <div className="w-1 h-1 bg-indigo-velvet-500 rounded-full" />
              <div className="text-[11px] font-medium text-indigo-velvet-400 italic tracking-wider">
                Desarrollado por Clínica Miró
              </div>
            </motion.div>

            <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-12 text-balance">
              <motion.span 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "circOut" }}
                className="block text-white"
              >
                Inteligencia Clínica
              </motion.span>
              <motion.span 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                className="block text-indigo-velvet-500 italic font-display"
              >
                para Humanos.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-white/40 font-medium max-w-3xl mb-16 leading-relaxed"
            >
              Donde la <span className="text-white/80">ética clínica</span> y la <span className="text-white/80">rentabilidad</span> convergen para democratizar el acceso a diagnósticos de élite.
            </motion.p>

            <AudiencePortals />

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-24 flex flex-col items-center gap-4"
            >
              <div className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">Explore Ecosystem</div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-[1px] h-12 bg-gradient-to-b from-indigo-velvet-500 to-transparent"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Bento Ecosystem - Overjet Style */}
        <section id="ecosistema" className="py-20 md:py-60 px-6 md:px-12">
          <div className="max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:auto-rows-[450px]">
              
              {/* Main Feature Card - The "Wow" Card */}
              <motion.div 
                ref={scandentRef}
                style={{ scale: scandentScale, rotateX: scandentRotate }}
                className="lg:col-span-8 lg:row-span-2 bg-[#050505] border border-white/5 rounded-[40px] md:rounded-[80px] p-8 md:p-20 relative overflow-hidden group shadow-2xl min-h-[500px] lg:min-h-0"
                whileHover={{ borderColor: 'var(--color-indigo-velvet-500)', boxShadow: '0 0 60px rgba(117, 51, 204, 0.15)' }}
              >
                <AIScannerOverlay videoSrc={APPS.find(a => a.id === 'scandent')?.videoSrc} />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-4 px-4 md:px-6 py-2 md:py-3 bg-white/5 rounded-2xl border border-white/10 mb-8 md:mb-12">
                      <Scan className="w-4 h-4 md:w-5 md:h-5 text-indigo-velvet-400" />
                      <span className="text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase">Visión Artificial</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8 md:mb-12">
                      SCANDENT <br />
                      <span className="text-white/10">PRE-DIAG</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-white/40 max-w-xl font-medium leading-relaxed">
                      Detección automatizada de patologías mediante redes neuronales convolucionales entrenadas en +11k casos clínicos.
                    </p>
                    <DiagnosticDetails />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8">
                    <button className="px-8 md:px-12 py-4 md:py-6 bg-white text-black font-black rounded-2xl text-[10px] md:text-sm tracking-[0.2em] uppercase hover:bg-indigo-velvet-500 hover:text-white transition-all glow-indigo">
                      LAUNCH_DEMO_ENV
                    </button>
                    <button className="px-8 md:px-12 py-4 md:py-6 border border-white/10 text-white font-black rounded-2xl text-[10px] md:text-sm tracking-[0.2em] uppercase hover:bg-white/5 transition-all">
                      VIEW_DOCS
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Stats Card */}
              <div className="lg:col-span-4 bg-gradient-to-br from-indigo-velvet-600 to-indigo-velvet-800 rounded-[40px] md:rounded-[80px] p-10 md:p-16 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[350px] lg:min-h-0">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10">
                  <Activity className="w-24 h-24 md:w-40 md:h-40" />
                </div>
                <div className="relative z-10">
                  <div className="text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase opacity-60 mb-8 md:mb-12">Network Performance</div>
                  <div className="text-7xl md:text-9xl font-black tracking-tighter mb-4 md:mb-6">92.4<span className="text-2xl md:text-3xl">%</span></div>
                  <p className="font-bold text-lg md:text-xl leading-tight opacity-80 max-w-[200px]">
                    Precisión validada en detección de caries interproximales.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-4 mt-8">
                  <Pulse className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                  <span className="text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase">Real-time processing active</span>
                </div>
              </div>

              {/* App Grid */}
              {APPS.filter(a => a.id === 'implantx' || a.id === 'simetria').map((app, i) => (
                <motion.div 
                  key={app.id} 
                  whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.2)' }}
                  className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[40px] md:rounded-[60px] p-8 md:p-12 flex flex-col justify-between transition-all group cursor-pointer shadow-xl relative overflow-hidden min-h-[300px] lg:min-h-0"
                >
                  {app.id === 'implantx' && <ImplantXOverlay videoSrc={app.videoSrc} />}
                  {app.id === 'simetria' && <MiroOverlay videoSrc={app.videoSrc} />}
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-velvet-400 group-hover:scale-110 transition-transform duration-500">
                        {app.icon}
                      </div>
                      {app.status.includes('IP') && (
                        <div className="flex items-center gap-1.5">
                          <Lock className="w-2 h-2 text-indigo-velvet-400" />
                          <span className="text-[7px] font-black text-indigo-velvet-400 uppercase tracking-[0.2em]">IP Protected</span>
                        </div>
                      )}
                    </div>
                    <ArrowUpRight className="text-white/10 group-hover:text-indigo-velvet-400 transition-colors" />
                  </div>
                  <div className="relative z-10 mt-8">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2 md:mb-4">{app.name}</h3>
                    <p className="text-xs md:text-sm text-white/30 font-medium leading-relaxed">{app.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Wide Card - Copilot */}
              <motion.div 
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-[40px] md:rounded-[60px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 group cursor-pointer shadow-xl transition-all relative overflow-hidden min-h-[300px] lg:min-h-0"
              >
                <CopilotOverlay videoSrc={APPS.find(a => a.id === 'copilot')?.videoSrc} />
                <div className="relative z-10 shrink-0 w-20 h-20 md:w-28 md:h-28 bg-indigo-velvet-900/20 rounded-[24px] md:rounded-[32px] flex items-center justify-center text-indigo-velvet-400 group-hover:rotate-12 transition-transform duration-500">
                  <Brain className="w-10 h-10 md:w-14 md:h-14" />
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-velvet-500/10 border border-indigo-velvet-500/20 rounded-full mb-4">
                    <div className="w-1.5 h-1.5 bg-indigo-velvet-400 rounded-full animate-pulse" />
                    <span className="text-[8px] font-black text-indigo-velvet-400 uppercase tracking-widest">Dentalink Integrated</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2 md:mb-4">COPILOT C3</h3>
                  <p className="text-sm md:text-base text-white/30 font-medium leading-relaxed">
                    Toma de decisiones asistida por LLMs entrenados en protocolos clínicos avanzados.
                  </p>
                </div>
              </motion.div>

              {/* ZeroCaries Card */}
              <motion.div 
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-[40px] md:rounded-[60px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 group cursor-pointer shadow-xl transition-all relative overflow-hidden min-h-[300px] lg:min-h-0"
              >
                <ZeroCariesOverlay videoSrc={APPS.find(a => a.id === 'zerocaries')?.videoSrc} />
                <div className="relative z-10 shrink-0 w-20 h-20 md:w-28 md:h-28 bg-emerald-900/20 rounded-[24px] md:rounded-[32px] flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-10 h-10 md:w-14 md:h-14" />
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2 md:mb-4">ZEROCARIES</h3>
                  <p className="text-sm md:text-base text-white/30 font-medium leading-relaxed">
                    Mapa de riesgo cariogénico y protocolos preventivos personalizados.
                  </p>
                </div>
              </motion.div>

              {/* Armonía Card */}
              <motion.div 
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-[40px] md:rounded-[60px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 group cursor-pointer shadow-xl transition-all relative overflow-hidden min-h-[300px] lg:min-h-0"
              >
                <ArmoniaOverlay videoSrc={APPS.find(a => a.id === 'armonia')?.videoSrc} />
                <div className="relative z-10 shrink-0 w-20 h-20 md:w-28 md:h-28 bg-rose-900/20 rounded-[24px] md:rounded-[32px] flex items-center justify-center text-rose-400 group-hover:rotate-6 transition-transform duration-500">
                  <Sparkles className="w-10 h-10 md:w-14 md:h-14" />
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2 md:mb-4">ARMONÍA</h3>
                  <p className="text-sm md:text-base text-white/30 font-medium leading-relaxed">
                    Belleza contextual y armonía facial mediante análisis de 147+ landmarks.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Science - Technical Dashboard Style */}
        <section id="ciencia" className="py-60 px-12 bg-white text-black rounded-[100px] relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <div className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
              <div>
                <div className="text-[11px] font-black tracking-[0.6em] text-indigo-velvet-600 mb-12 uppercase">Evidencia y Datos</div>
                <h2 className="text-9xl font-black tracking-tighter leading-[0.8] uppercase mb-16">
                  CIENCIA <br />
                  Y <br />
                  <span className="text-indigo-velvet-600">DATOS.</span>
                </h2>
                <p className="text-2xl font-medium leading-relaxed text-black/50 mb-16 max-w-lg">
                  Nuestros modelos no solo predicen; explican. Utilizamos inferencia causal para proporcionar 
                  al clínico el "por qué" detrás de cada recomendación algorítmica.
                </p>
                
                <div className="grid grid-cols-2 gap-16 mb-20">
                  <div className="p-10 bg-black/5 rounded-[40px] border border-black/5">
                    <div className="text-7xl font-black tracking-tighter mb-4">17k+</div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30">Implantes en Meta-análisis</div>
                  </div>
                  <div className="p-10 bg-black/5 rounded-[40px] border border-black/5">
                    <div className="text-7xl font-black tracking-tighter mb-4">$3.8k</div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30">Costo de Fracaso (USD)</div>
                  </div>
                </div>
                
                <SymmetryVideoFeature />
              </div>

              <div className="space-y-8">
                {[
                  { title: 'Sinergia 1+1 > 2', desc: 'Nuestro algoritmo modela cómo factores como tabaquismo y diabetes se potencian exponencialmente, no solo se suman.' },
                  { title: 'IP Protegida', desc: 'Algoritmo registrado (Safe Creative #2510073245348) diseñado para predecir el éxito quirúrgico con precisión del 89.1%.' },
                  { title: 'Inferencia Ósea', desc: 'Determinamos la densidad ósea (D1-D4) mediante variables clínicas, reduciendo la necesidad de radiación CBCT.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 20, backgroundColor: 'rgba(0,0,0,0.05)' }}
                    className="p-12 bg-black/5 rounded-[50px] border border-black/5 transition-all cursor-default"
                  >
                    <h4 className="text-3xl font-black mb-6 tracking-tight uppercase">{item.title}</h4>
                    <p className="text-black/40 text-lg font-medium leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <VisionDiagram />
        <ClosingSection />

        {/* Footer - Tech Luxury */}
        <footer className="py-60 border-t border-white/5 px-12 bg-[#020202]">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-40 mb-60">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-6 mb-16">
                  <HumanaLogo className="w-16 h-16" />
                  <span className="text-5xl font-black tracking-tighter uppercase">Humana.AI</span>
                </div>
                <p className="text-3xl text-white/20 font-medium max-w-lg leading-relaxed">
                  Transformando la odontología mediante inteligencia artificial y datos de grado clínico.
                </p>
              </div>
              
              <div className="space-y-16">
                <h5 className="text-[12px] font-black uppercase tracking-[0.6em] text-indigo-velvet-500">Ecosistema</h5>
                <ul className="space-y-8 text-2xl font-bold text-white/30">
                  <li><a href="#" className="hover:text-white transition-all hover:pl-4">SCANDENT</a></li>
                  <li><a href="#" className="hover:text-white transition-all hover:pl-4">ImplantX</a></li>
                  <li><a href="#" className="hover:text-white transition-all hover:pl-4">SIMETRÍA</a></li>
                  <li><a href="#" className="hover:text-white transition-all hover:pl-4">Copilot C3</a></li>
                </ul>
              </div>

              <div className="space-y-16">
                <h5 className="text-[12px] font-black uppercase tracking-[0.6em] text-indigo-velvet-500">Ubicación</h5>
                <div className="text-2xl font-bold text-white/30 leading-relaxed">
                  Av. Nueva Providencia 2214 <br />
                  Oficina 189, Providencia <br />
                  Santiago, Chile
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-24 border-t border-white/5 relative">
              <div className="absolute left-0 bottom-0 p-8 flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
                <Lock className="w-3 h-3" />
                <span>© 2026 HUMANA.AI_ECOSYSTEM</span>
              </div>
              
              <div className="absolute left-1/2 bottom-8 -translate-x-1/2 w-[1px] h-4 bg-indigo-velvet-500/30" />

              <div className="absolute right-0 bottom-0 p-8 flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
                <span>Data_Stream</span>
                <div className="flex gap-0.5 items-end h-3">
                  {[0.4, 0.7, 0.3, 0.9].map((h, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-0.5 bg-indigo-velvet-500/50"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full items-center">
                <div className="text-[11px] font-black text-white/10 uppercase tracking-[0.6em]">
                  PROPIEDAD INTELECTUAL PROTEGIDA · SANTIAGO DE CHILE
                </div>
                <div className="text-[9px] font-bold text-white/5 uppercase tracking-[0.4em]">
                  Registro Safe Creative #2510073245348 · Todos los derechos reservados
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        @media (max-width: 768px) {
          .text-9xl { font-size: 5rem; }
          .text-8xl { font-size: 4rem; }
          .text-7xl { font-size: 3.5rem; }
        }
      `}</style>
    </div>
  );
}
