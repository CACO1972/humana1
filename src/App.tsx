/**
 * HUMANA.AI — humanaia.cl
 * Sistema: Dark #080808 · Blanco · Violeta #9D95FF
 * Tipografía: Anton · Space Mono · DM Sans
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity, Brain, Eye, Layers, Scan,
  ShieldCheck, Sparkles, Zap, ArrowUpRight,
  Target, Cpu, Users,
  TrendingUp, X, FileText, Share2,
  CheckCircle2, Heart
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PresentationControls, ContactShadows, Float,
  MeshDistortMaterial, Environment
} from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────
const T = {
  base:        '#080808',
  surface:     '#0E0C1A',
  surface2:    '#1A1826',
  border:      'rgba(255,255,255,0.08)',
  primary:     '#FFFFFF',
  accent:      '#9D95FF',
  accentSoft:  '#C4BFFF',
  muted:       'rgba(255,255,255,0.35)',
  green:       '#0AE448',
  red:         '#E63946',
  orange:      '#FF8709',
} as const;

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const APPS = [
  {
    id: 'scandent', name: 'SCANDENT', tagline: 'Visión Artificial de Vanguardia',
    icon: <Scan className="w-8 h-8" />, status: 'LIVE',
    desc: 'Orientación visual dental desde fotografía. Detección temprana sin reemplazar al profesional — potenciándolo.',
    url: 'https://scandent-humana.vercel.app',
    tags: ['Deep Learning', 'YOLOv7', 'Orientación Visual'],
    color: T.green, wowType: 'radar',
  },
  {
    id: 'simetria', name: 'SIMETRÍA', tagline: 'Belleza Contextual · Índice Miró',
    icon: <Sparkles className="w-8 h-8" />, status: 'LIVE 90%',
    desc: 'Simulación facial en tiempo real. IM = M × E × C. El futuro de tu sonrisa visible en segundos.',
    url: 'https://reage-phi.vercel.app',
    tags: ['Contextual Beauty', 'Facial AI', 'Índice Miró'],
    color: T.accentSoft, wowType: 'mirror',
  },
  {
    id: 'implantx', name: 'IMPLANTX', tagline: 'Riesgo Implantológico Causal',
    icon: <Activity className="w-8 h-8" />, status: 'LIVE · IP PROTECTED',
    desc: 'Structural Causal Models. ROC-AUC 0.894. Validado con 4.126 casos. El algoritmo que cambió el estándar.',
    url: 'https://implantx-humana.vercel.app',
    tags: ['CausalML', 'SCM', 'AUC 0.894'],
    color: T.accent, wowType: 'particles',
  },
  {
    id: 'zerocaries', name: 'ZEROCARIES', tagline: 'Prevención Basada en Datos',
    icon: <ShieldCheck className="w-8 h-8" />, status: '85%',
    desc: 'Mapa de riesgo cariogénico y protocolos preventivos. El futuro de la odontología preventiva.',
    url: 'https://zerocaries-humana.vercel.app',
    tags: ['Prevention', 'Risk Map', 'Predictive'],
    color: T.orange, wowType: 'glitch',
  },
  {
    id: 'armonia', name: 'ARMONÍA', tagline: 'Estética Facial Avanzada',
    icon: <Sparkles className="w-8 h-8" />, status: 'DEV',
    desc: 'SCUT-FBP5500. 5.500 rostros. La belleza como función de edad, cultura y género. No el número áureo.',
    url: 'https://armonia-humana.vercel.app',
    tags: ['Beauty AI', 'Contextual', 'FaceXFormer'],
    color: T.accentSoft, wowType: 'waves',
  },
  {
    id: 'copilot', name: 'COPILOT', tagline: 'Asistente Clínico Inteligente',
    icon: <Brain className="w-8 h-8" />, status: 'LIVE',
    desc: 'IA conversacional para el flujo clínico diario. Integrado con Dentalink. El copiloto que todo dentista necesitaba.',
    url: 'https://copilot-humana.vercel.app',
    tags: ['LLM', 'Clinical Assistant', 'Dentalink'],
    color: T.primary, wowType: 'terminal',
  },
  {
    id: 'sentia', name: 'SENTIA', tagline: 'Predicción de Abandono',
    icon: <Heart className="w-8 h-8" />, status: 'EN DESARROLLO 20%',
    desc: 'Machine learning para retención de pacientes. Integración con aseguradoras. El paciente que no vuelve, ya no se pierde.',
    url: '#',
    tags: ['Retention ML', 'Insurance', 'Prediction'],
    color: T.red, wowType: 'heartbeat',
  },
];

// ─────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────
const CustomCursor = () => {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (inner.current) {
        inner.current.style.left = e.clientX + 'px';
        inner.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);
    let raf: number;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;
      if (outer.current) {
        outer.current.style.left = pos.current.x + 'px';
        outer.current.style.top = pos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={inner} style={{ position:'fixed', pointerEvents:'none', zIndex:9999, width:6, height:6, background:T.accent, transform:'translate(-50%,-50%)', mixBlendMode:'difference' as any }} />
      <div ref={outer} style={{ position:'fixed', pointerEvents:'none', zIndex:9998, width:hovered?60:36, height:hovered?60:36, border:`2px solid ${T.accent}`, transform:'translate(-50%,-50%)', transition:'width 0.2s, height 0.2s', mixBlendMode:'difference' as any }} />
    </>
  );
};

// ─────────────────────────────────────────
// SCROLL PROGRESS
// ─────────────────────────────────────────
const ScrollBar = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => setW(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div style={{ position:'fixed', top:0, left:0, zIndex:9990, height:3, width:w+'%', background:T.accent, boxShadow:`0 0 10px ${T.accent}` }} />;
};

// ─────────────────────────────────────────
// NOISE
// ─────────────────────────────────────────
const Noise = () => (
  <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:1000, opacity:.025,
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize:'256px 256px' }} />
);

// ─────────────────────────────────────────
// SPLASH
// ─────────────────────────────────────────
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(onComplete, 4200);
    const interval = setInterval(() => setCount(p => Math.min(p + Math.floor(Math.random()*8)+3, 100)), 40);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <motion.div exit={{ opacity:0, scale:1.05 }} transition={{ duration:0.8 }}
      style={{ position:'fixed', inset:0, zIndex:10000, background:T.base, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <Noise />
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }} style={{ textAlign:'center' }}>
        <div style={{ fontFamily:'Anton', fontSize:'clamp(52px,10vw,100px)', letterSpacing:'0.06em', color:T.primary, lineHeight:1 }}>HUMANA.AI</div>
        <div style={{ fontFamily:'Space Mono', fontSize:10, letterSpacing:'0.5em', color:T.accent, marginTop:12, textTransform:'uppercase' }}>Inteligencia Clínica</div>
      </motion.div>
      <div style={{ position:'absolute', bottom:64, left:0, right:0, padding:'0 48px' }}>
        <div style={{ fontFamily:'Space Mono', fontSize:8, color:T.muted, letterSpacing:'0.3em', marginBottom:8, textAlign:'right', textTransform:'uppercase' }}>{count}%</div>
        <div style={{ height:2, background:'rgba(255,255,255,0.06)' }}>
          <div style={{ height:'100%', background:T.accent, width:count+'%', boxShadow:`0 0 10px ${T.accent}`, transition:'width 0.08s' }} />
        </div>
        <div style={{ fontFamily:'Space Mono', fontSize:8, color:'rgba(255,255,255,0.18)', letterSpacing:'0.2em', marginTop:8, textTransform:'uppercase' }}>
          {count<30?'INICIANDO MODELOS...':count<70?'CARGANDO ECOSISTEMA...':count<95?'CALIBRANDO IA...':'LISTO'}
        </div>
      </div>
      <button onClick={onComplete} style={{ position:'absolute', bottom:60, right:48, fontFamily:'Space Mono', fontSize:8, letterSpacing:'0.3em', color:'rgba(255,255,255,0.2)', background:'none', border:'none', cursor:'none', textTransform:'uppercase' }}>
        SALTAR →
      </button>
    </motion.div>
  );
};

// ─────────────────────────────────────────
// HUD
// ─────────────────────────────────────────
const HUDOverlay = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('es-CL'));
  const [nodes, setNodes] = useState(142);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('es-CL')), 1000);
    const n = setInterval(() => setNodes(p => p + (Math.random()>.7?1:0)), 5000);
    return () => { clearInterval(t); clearInterval(n); };
  }, []);
  const mono: React.CSSProperties = { fontFamily:'Space Mono', fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase' };
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:50, padding:'20px 24px', display:'flex', flexDirection:'column', justifyContent:'space-between', color:'rgba(255,255,255,0.12)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ ...mono, display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:T.green, boxShadow:`0 0 8px ${T.green}`, animation:'pulse 2s infinite' }} />
            <span style={{ color:T.green }}>HUMANA_LIVE</span>
          </div>
          <div style={mono}>NODES: <span style={{ color:'rgba(255,255,255,0.25)' }}>{nodes}</span></div>
          <div style={{ ...mono, color:`${T.accent}55` }}>SANTIAGO_HUB_PRIMARY</div>
        </div>
        <div style={{ ...mono, display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ color:`${T.accent}55` }}>AES_256</span>
          <span>{time}</span>
        </div>
      </div>
      <div style={{ ...mono, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <span>LAUNCH_PHASE_01 // 2026</span>
        <div style={{ display:'flex', gap:2, alignItems:'flex-end', height:12 }}>
          {[0.4,0.7,0.3,0.9,0.5,0.6,0.8,0.2].map((h,i) => (
            <div key={i} style={{ width:2, height:`${h*100}%`, background: i>5?`${T.accent}55`:'rgba(255,255,255,0.12)' }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );
};

// ─────────────────────────────────────────
// NAV
// ─────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav style={{ position:'fixed', top:0, width:'100%', zIndex:60, background: scrolled?'rgba(8,8,8,0.92)':'transparent', backdropFilter: scrolled?'blur(20px)':'none', borderBottom: scrolled?`1px solid ${T.border}`:'none', transition:'all 0.3s' }}>
      <div style={{ maxWidth:1800, margin:'0 auto', padding:'0 48px', height:80, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontFamily:'Anton', fontSize:24, color:T.primary, letterSpacing:'0.05em' }}>HUMANA.AI</div>
        <div style={{ display:'flex', alignItems:'center', border:`1px solid ${T.border}` }}>
          {['Apps','Ciencia','Visión','Clínica Miró'].map((item,i) => (
            <a key={item} href={i===3?'https://clinicamiro.cl':'#'+item.toLowerCase()}
              style={{ padding:'8px 18px', fontFamily:'Space Mono', fontSize:8, letterSpacing:'0.15em', color:'rgba(255,255,255,0.45)', textDecoration:'none', textTransform:'uppercase', borderLeft:i>0?`1px solid ${T.border}`:'none' }}
              onMouseEnter={e=>(e.currentTarget.style.color=T.primary)}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.45)')}
            >{item}</a>
          ))}
          <a href="#apps" style={{ padding:'8px 18px', fontFamily:'Space Mono', fontSize:8, letterSpacing:'0.15em', color:T.base, background:T.accent, textDecoration:'none', textTransform:'uppercase', borderLeft:`1px solid ${T.border}` }}>
            Probar →
          </a>
        </div>
        <div style={{ fontFamily:'Space Mono', fontSize:8, color:T.green, letterSpacing:'0.25em', display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:T.green, boxShadow:`0 0 10px ${T.green}`, animation:'pulse 2s infinite' }} />
          7 ONLINE
        </div>
      </div>
    </nav>
  );
};

// ─────────────────────────────────────────
// HERO 3D
// ─────────────────────────────────────────
const Mesh3D = ({ modelType, color }: { modelType: string; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow>
          {modelType==='knot'   && <torusKnotGeometry args={[1,0.3,128,32]} />}
          {modelType==='sphere' && <sphereGeometry args={[1.2,64,64]} />}
          {modelType==='torus'  && <torusGeometry args={[1,0.4,32,100]} />}
          {modelType==='box'    && <boxGeometry args={[1.5,1.5,1.5]} />}
          {modelType==='octa'   && <octahedronGeometry args={[1.5,0]} />}
          <MeshDistortMaterial color={color} speed={2} distort={0.3} radius={1} roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
};

const heroStages = [
  { id:'scandent', name:'Objetividad', sub:'El fin de la duda', color:T.accent, modelType:'knot',
    title:'Orientación visual basada en datos, no en opiniones.',
    desc:'SCANDENT usa redes neuronales para identificar patologías con precisión matemática y reducir la variabilidad entre profesionales.',
    features:['Identificación de patologías asintomáticas','Estandarización del criterio clínico','Orientación visual irrefutable'] },
  { id:'copilot', name:'Eficiencia', sub:'Manos libres', color:T.primary, modelType:'sphere',
    title:'Manos libres, mente en el paciente.',
    desc:'Copilot permite al odontólogo mantener el foco donde importa: el paciente. No en el registro.',
    features:['Registro en tiempo real','Vocabulario clínico especializado','Ahorro del 60% en tiempo de documentación'] },
  { id:'simetria', name:'Empatía', sub:'El puente visual', color:T.accentSoft, modelType:'torus',
    title:'El fin de la caja negra clínica.',
    desc:'Un paciente que no entiende, no acepta. Simetría traduce la complejidad técnica en visualización directa.',
    features:['Simulación facial en tiempo real','Índice Miró IM = M × E × C','Empoderamiento del paciente'] },
  { id:'implantx', name:'Precisión', sub:'Causalidad · no correlación', color:T.accent, modelType:'box',
    title:'SCM. AUC 0.894. 4.126 casos validados.',
    desc:'ImplantX usa Structural Causal Models para predecir fracaso implantario con precisión verificada.',
    features:['Sinergia fumar + diabetes modelada causalmente','IP registrada SafeCreative #2510073245348','Inferencia ósea D1-D4 sin CBCT'] },
  { id:'sentia', name:'Retención', sub:'Predice el abandono', color:T.red, modelType:'octa',
    title:'El paciente que no vuelve ya no se pierde.',
    desc:'Sentia predice abandono 30 días antes de que ocurra. Machine learning para retención clínica.',
    features:['Predicción 30 días antes del abandono','Integración con aseguradoras','Pipeline de reactivación automática'] },
];

const HeroExplorer = ({ onLaunch }: { onLaunch: (app:any)=>void }) => {
  const [active, setActive] = useState(0);
  const stage = heroStages[active];

  return (
    <section style={{ position:'relative', height:'100vh', overflow:'hidden', background:T.base, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* 3D */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <Canvas shadows camera={{ position:[0,0,5], fov:45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10,10,10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10,-10,-10]} intensity={0.5} />
          <PresentationControls global polar={[-Math.PI/4,Math.PI/4]} azimuth={[-Math.PI/4,Math.PI/4]}>
            <AnimatePresence>
              <Mesh3D key={active} modelType={stage.modelType} color={stage.color} />
            </AnimatePresence>
          </PresentationControls>
          <ContactShadows position={[0,-2,0]} opacity={0.3} scale={10} blur={2} far={4.5} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Stage nav */}
      <div style={{ position:'absolute', left:48, bottom:80, zIndex:20 }}>
        <div style={{ fontFamily:'Space Mono', fontSize:8, color:'rgba(255,255,255,0.18)', letterSpacing:'0.4em', textTransform:'uppercase', marginBottom:20 }}>Navigate</div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {heroStages.map((s,i) => (
            <button key={s.id} onClick={()=>setActive(i)} style={{ background:'none', border:'none', cursor:'none', display:'flex', alignItems:'center', gap:14, opacity:active===i?1:0.2, transition:'opacity 0.3s' }}>
              <div style={{ width:2, height:28, background:active===i?T.accent:'rgba(255,255,255,0.08)', transition:'background 0.3s' }} />
              <div style={{ textAlign:'left' }}>
                <div style={{ fontFamily:'Space Mono', fontSize:8, color:T.primary, letterSpacing:'0.15em', textTransform:'uppercase' }}>{s.name}</div>
                <div style={{ fontFamily:'Space Mono', fontSize:7, color:T.accent, letterSpacing:'0.1em', textTransform:'uppercase' }}>{s.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ position:'absolute', right:48, top:'50%', transform:'translateY(-50%)', width:340, zIndex:20 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity:0, x:30, filter:'blur(8px)' }}
            animate={{ opacity:1, x:0, filter:'blur(0)' }}
            exit={{ opacity:0, x:-30, filter:'blur(8px)' }}
            transition={{ duration:0.5 }}
            style={{ background:'rgba(8,8,8,0.65)', backdropFilter:'blur(20px)', border:`1px solid ${T.border}`, padding:32 }}>
            <div style={{ fontFamily:'Space Mono', fontSize:8, color:T.accent, letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
              {String(active+1).padStart(2,'0')}
              <span style={{ width:24, height:1, background:T.border, display:'inline-block' }} />
              <span style={{ color:'rgba(255,255,255,0.25)' }}>{stage.sub}</span>
            </div>
            <h2 style={{ fontFamily:'DM Sans', fontSize:26, fontWeight:300, color:T.primary, lineHeight:1.3, marginBottom:16 }}>{stage.title}</h2>
            <p style={{ fontFamily:'DM Sans', fontSize:12, color:T.muted, lineHeight:1.8, marginBottom:24 }}>{stage.desc}</p>
            <div style={{ marginBottom:28 }}>
              {stage.features.map((f,i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:8 }}>
                  <div style={{ width:4, height:4, background:T.accent, marginTop:6, flexShrink:0 }} />
                  <span style={{ fontFamily:'DM Sans', fontSize:11, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>onLaunch(APPS.find(a=>a.id===stage.id)||APPS[0])}
              style={{ width:'100%', padding:'14px 0', fontFamily:'Anton', fontSize:13, letterSpacing:'0.1em', textTransform:'uppercase', background:T.accent, color:T.base, border:'none', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              LANZAR {stage.name.toUpperCase()} <ArrowUpRight size={16} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────
const Marquee = ({ reverse=false }) => {
  const items = ['30+ AÑOS EXPERIENCIA','·','11.000+ IMPLANTES','·','2 PATENTES ACEPTADAS','·','16+ REGISTROS IP','·','7 APPS DE IA DENTAL','·','ÍNDICE MIRÓ: IM = M × E × C','·','UNIVERSIDAD MAYOR 20 AÑOS','·'];
  const doubled = [...items,...items];
  return (
    <div style={{ background:T.primary, padding:'12px 0', overflow:'hidden', borderTop:`3px solid ${T.base}`, borderBottom:`3px solid ${T.base}` }}>
      <div style={{ display:'inline-block', animation:`marquee${reverse?'R':''} 28s linear infinite`, whiteSpace:'nowrap' }}>
        {doubled.map((item,i)=>(
          <span key={i} style={{ fontFamily:'Anton', fontSize:14, color:T.base, letterSpacing:'0.05em', marginRight:48 }}>{item}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes marqueeR{from{transform:translateX(-50%)}to{transform:translateX(0)}}
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────
// WOW EFFECTS
// ─────────────────────────────────────────
const RadarEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let angle = 0, raf: number;
    const dots = Array.from({length:5},()=>({a:Math.random()*Math.PI*2,r:60+Math.random()*90,birth:Math.random()*360}));
    const draw = () => {
      const W = canvas.width=canvas.offsetWidth, H = canvas.height=canvas.offsetHeight;
      const cx=W/2, cy=H/2, R=Math.min(W,H)/2-20;
      ctx.fillStyle='rgba(8,8,8,0.18)'; ctx.fillRect(0,0,W,H);
      [0.25,0.5,0.75,1].forEach(f=>{ctx.beginPath();ctx.arc(cx,cy,R*f,0,Math.PI*2);ctx.strokeStyle='rgba(10,228,72,0.12)';ctx.lineWidth=1;ctx.stroke();});
      ctx.strokeStyle='rgba(10,228,72,0.08)'; ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(cx-R,cy);ctx.lineTo(cx+R,cy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-R);ctx.lineTo(cx,cy+R);ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(angle);
      ctx.strokeStyle='rgba(10,228,72,0.9)'; ctx.lineWidth=2; ctx.shadowBlur=15; ctx.shadowColor=T.green;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(R,0);ctx.stroke(); ctx.shadowBlur=0;
      for(let da=0;da<Math.PI/2;da+=0.05){ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,angle-da,angle-da+0.06);ctx.fillStyle=`rgba(10,228,72,${0.03*(1-da/(Math.PI/2))})`;ctx.fill();}
      ctx.restore();
      dots.forEach(d=>{
        const diff=(angle-d.birth+Math.PI*4)%(Math.PI*2);
        const alpha=diff<0.2?1:Math.max(0,1-diff/(Math.PI*2)*3);
        if(alpha>0){const x=cx+Math.cos(d.a)*d.r,y=cy+Math.sin(d.a)*d.r;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle=`rgba(10,228,72,${alpha})`;ctx.shadowBlur=12;ctx.shadowColor=T.green;ctx.fill();ctx.shadowBlur=0;}
      });
      angle=(angle+0.02)%(Math.PI*2); raf=requestAnimationFrame(draw);
    };
    draw(); return ()=>cancelAnimationFrame(raf);
  },[]);
  return (
    <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at center, #0d2a0d 0%, ${T.base} 70%)`}}>
      <canvas ref={canvasRef} style={{width:'100%',height:'100%'}} />
      <div style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',fontFamily:'Space Mono',fontSize:9,color:T.green,letterSpacing:'0.3em',textTransform:'uppercase',whiteSpace:'nowrap',animation:'flicker 2s steps(1) infinite'}}>
        ESCANEANDO · ANÁLISIS ACTIVO
        <style>{`@keyframes flicker{0%,100%{opacity:1}45%{opacity:.6}50%{opacity:0}55%{opacity:.8}}`}</style>
      </div>
    </div>
  );
};

const ParticlesEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({x:400,y:300});
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext('2d')!;
    const COLORS=[T.accent,T.accentSoft,T.primary,T.green];
    const particles=Array.from({length:100},()=>({x:Math.random()*800,y:Math.random()*600,vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8,r:Math.random()*2.5+1,color:COLORS[Math.floor(Math.random()*COLORS.length)],alpha:Math.random()*.6+.3}));
    let raf: number;
    const onMove=(e: MouseEvent)=>{const r=canvas.getBoundingClientRect();mouse.current={x:e.clientX-r.left,y:e.clientY-r.top};};
    canvas.addEventListener('mousemove',onMove);
    const draw=()=>{
      const W=canvas.width=canvas.offsetWidth,H=canvas.height=canvas.offsetHeight;
      ctx.fillStyle='rgba(8,8,8,0.15)';ctx.fillRect(0,0,W,H);
      particles.forEach((p,i)=>{
        const dx=mouse.current.x-p.x,dy=mouse.current.y-p.y,dist=Math.hypot(dx,dy);
        if(dist<150){p.vx+=dx/dist*.04;p.vy+=dy/dist*.04;}
        p.vx*=.98;p.vy*=.98;p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
        particles.slice(i+1).forEach(p2=>{const d=Math.hypot(p.x-p2.x,p.y-p2.y);if(d<80){ctx.strokeStyle=`rgba(157,149,255,${0.25*(1-d/80)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();}});
        ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;ctx.shadowBlur=8;ctx.shadowColor=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.shadowBlur=0;
      });
      raf=requestAnimationFrame(draw);
    };
    draw(); return()=>{cancelAnimationFrame(raf);canvas.removeEventListener('mousemove',onMove);};
  },[]);
  return <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 50% 50%, #0d0f2e 0%, ${T.base} 70%)`}}><canvas ref={canvasRef} style={{width:'100%',height:'100%'}}/></div>;
};

const WavesEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext('2d')!;
    let t=0,raf: number;
    const waves=[{c:`rgba(157,149,255,`,freq:.008,amp:40,speed:.015,off:0},{c:`rgba(196,191,255,`,freq:.011,amp:30,speed:.020,off:0.8},{c:`rgba(255,255,255,`,freq:.006,amp:50,speed:.010,off:1.6},{c:`rgba(157,149,255,`,freq:.014,amp:20,speed:.025,off:2.4}];
    const draw=()=>{
      const W=canvas.width=canvas.offsetWidth,H=canvas.height=canvas.offsetHeight;
      ctx.fillStyle=T.base;ctx.fillRect(0,0,W,H);
      waves.forEach((w,wi)=>{
        const yBase=H/2+(wi-1.5)*55;
        ctx.beginPath();ctx.moveTo(0,H);
        for(let x=0;x<=W;x+=3){const y=yBase+Math.sin(x*w.freq+t*w.speed+w.off)*w.amp+Math.cos(x*w.freq*.7+t*w.speed*.6)*w.amp*.3;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
        ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=w.c+`0.07)`;ctx.fill();
        ctx.beginPath();
        for(let x=0;x<=W;x+=3){const y=yBase+Math.sin(x*w.freq+t*w.speed+w.off)*w.amp+Math.cos(x*w.freq*.7+t*w.speed*.6)*w.amp*.3;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
        ctx.strokeStyle=w.c+`0.5)`;ctx.lineWidth=1.5;ctx.stroke();
      });
      t++;raf=requestAnimationFrame(draw);
    };
    draw(); return()=>cancelAnimationFrame(raf);
  },[]);
  return <div style={{position:'absolute',inset:0}}><canvas ref={canvasRef} style={{width:'100%',height:'100%'}}/></div>;
};

const HeartbeatEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext('2d')!;
    let t=0,beats: {x:number,y:number,r:number,alpha:number}[]=[],raf: number;
    const hbY=(x: number,cx: number,phase: number)=>{
      const d=((x-cx+phase*2)%200+200)%200;
      if(d<20) return -(d/20)*60;
      if(d<40) return -60+(d-20)/20*90;
      if(d<50) return 30-(d-40)/10*30;
      if(d<60) return -(d-50)/10*100;
      if(d<70) return -100+(d-60)/10*130;
      if(d<90) return 30-(d-70)/20*30;
      return 0;
    };
    const draw=()=>{
      const W=canvas.width=canvas.offsetWidth,H=canvas.height=canvas.offsetHeight;
      ctx.fillStyle='rgba(8,8,8,0.2)';ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(230,57,70,0.05)';ctx.lineWidth=.5;
      for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      ctx.beginPath();ctx.strokeStyle=T.red;ctx.lineWidth=2.5;ctx.shadowBlur=15;ctx.shadowColor=T.red;
      for(let x=0;x<=W;x+=2){const y=H/2+hbY(x,W/2,t*.5);x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
      ctx.stroke();ctx.shadowBlur=0;
      if(t%120===0)beats.push({x:W/2+30,y:H/2-100,r:0,alpha:.8});
      beats=beats.filter(b=>b.alpha>0).map(b=>({...b,r:b.r+3,alpha:b.alpha-.02}));
      beats.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.strokeStyle=`rgba(230,57,70,${b.alpha})`;ctx.lineWidth=1;ctx.stroke();});
      const cy=H/2+hbY(W/2,W/2,t*.5);ctx.beginPath();ctx.arc(W/2,cy,5,0,Math.PI*2);ctx.fillStyle=T.red;ctx.shadowBlur=20;ctx.shadowColor=T.red;ctx.fill();ctx.shadowBlur=0;
      t++;raf=requestAnimationFrame(draw);
    };
    draw(); return()=>cancelAnimationFrame(raf);
  },[]);
  return <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at center, #1a0010 0%, ${T.base} 70%)`}}><canvas ref={canvasRef} style={{width:'100%',height:'100%'}}/></div>;
};

const GlitchEffect = () => (
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:`radial-gradient(circle at center, #1a0d00 0%, ${T.base} 70%)`,overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,opacity:.04,backgroundImage:`linear-gradient(${T.orange} 1px, transparent 1px), linear-gradient(90deg, ${T.orange} 1px, transparent 1px)`,backgroundSize:'30px 30px'}}/>
    <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`rgba(255,135,9,0.4)`,animation:'scanD 3s linear infinite'}}/>
    <div style={{textAlign:'center',position:'relative',zIndex:2}}>
      {['ZERO','CARIES'].map((word,wi)=>(
        <div key={word} style={{fontFamily:'Anton',fontSize:'clamp(40px,5vw,80px)',color:wi===1?T.orange:T.primary,animation:`glitchM 4s ${wi*.1}s infinite`}}>{word}</div>
      ))}
      <div style={{fontFamily:'Space Mono',fontSize:9,color:'rgba(255,255,255,0.2)',letterSpacing:'0.3em',marginTop:16,textTransform:'uppercase'}}>DETECCIÓN TEMPRANA</div>
    </div>
    <style>{`@keyframes glitchM{0%,100%{transform:translate(0)}92%{transform:translate(0)}93%{transform:translate(-2px,1px)}94%{transform:translate(2px,-1px)}95%{transform:translate(0)}}@keyframes scanD{from{top:-2px}to{top:100%}}`}</style>
  </div>
);

const MirrorEffect = () => (
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:`radial-gradient(circle at center, #12082a 0%, ${T.base} 70%)`,overflow:'hidden'}}>
    {[0,1,2].map(i=>(
      <div key={i} style={{position:'absolute',borderRadius:'50%',border:`1px solid rgba(157,149,255,0.2)`,animation:`ringE 4s ${i*1.3}s ease-out infinite`}}/>
    ))}
    <svg width="220" height="280" viewBox="0 0 220 280" style={{position:'relative',zIndex:2}}>
      <defs>
        <linearGradient id="vg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="50%" stopColor={T.accent}/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="120" rx="70" ry="90" fill="none" stroke={T.accent} strokeWidth="1" opacity=".4"/>
      <ellipse cx="80" cy="105" rx="12" ry="7" fill="none" stroke={T.accentSoft} strokeWidth="1.5"/>
      <ellipse cx="140" cy="105" rx="12" ry="7" fill="none" stroke={T.accentSoft} strokeWidth="1.5"/>
      <circle cx="80" cy="105" r="4" fill={T.accent} opacity=".7"/>
      <circle cx="140" cy="105" r="4" fill={T.accent} opacity=".7"/>
      <path d="M95 160 Q110 178 125 160" fill="none" stroke={T.accent} strokeWidth="2"/>
      <line x1="110" y1="30" x2="110" y2="250" stroke="url(#vg)" strokeWidth="1.5" opacity=".6" style={{animation:`mirrorP 2s ease-in-out infinite`}}/>
    </svg>
    <style>{`@keyframes ringE{from{width:0;height:0;opacity:.8}to{width:500px;height:500px;opacity:0}}@keyframes mirrorP{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
  </div>
);

const TerminalEffect = () => {
  const [typingText,setTypingText]=useState('');
  const cmds=['generar_informe --paciente 4821','buscar_protocolo --caso implante-36','notificar_whatsapp --aceptado','calcular_riesgo --scm causal'];
  const ci=useRef(0),ci2=useRef(0),del=useRef(false);
  useEffect(()=>{
    const t=setInterval(()=>{
      const cmd=cmds[ci.current];
      if(!del.current){if(ci2.current<cmd.length){setTypingText(cmd.slice(0,++ci2.current));}else{setTimeout(()=>{del.current=true;},1600);}}
      else{if(ci2.current>0){setTypingText(cmd.slice(0,--ci2.current));}else{del.current=false;ci.current=(ci.current+1)%cmds.length;}}
    },60);
    return()=>clearInterval(t);
  },[]);
  const lines=[{type:'prompt',text:'iniciar_sesion --clinica "Miró"'},{type:'ok',text:'✓ 8 profesionales online'},{type:'ok',text:'✓ 47 pacientes en agenda'},{type:'space',text:''},{type:'prompt',text:'analizar_paciente --id 4821'},{type:'warn',text:'⚠ Riesgo moderado: Sector 36'},{type:'ok',text:'✓ Protocolo: ImplantX v3'},{type:'space',text:''}];
  const c: Record<string,string>={prompt:T.accent,ok:T.green,warn:'#FFE500',space:''};
  return (
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',padding:24,background:T.base}}>
      <div style={{width:'100%',maxWidth:420,border:`2px solid ${T.accent}`,boxShadow:`6px 6px 0 ${T.accent}22`}}>
        <div style={{background:T.accent,padding:'10px 16px',display:'flex',alignItems:'center',gap:8}}>
          {[0,1,2].map(i=><div key={i} style={{width:10,height:10,background:T.base,borderRadius:'50%'}}/>)}
          <span style={{fontFamily:'Space Mono',fontSize:8,color:T.base,letterSpacing:'.1em',marginLeft:8}}>COPILOT.HUMANA.AI — v2.1</span>
        </div>
        <div style={{padding:20,fontFamily:'Space Mono',fontSize:11,minHeight:280,overflow:'hidden'}}>
          {lines.map((l,i)=>(
            <div key={i} style={{marginBottom:6,lineHeight:1.6}}>
              {l.type==='prompt'&&<><span style={{color:T.accent}}>▶ </span><span style={{color:T.primary}}>{l.text}</span></>}
              {l.type!=='prompt'&&l.type!=='space'&&<span style={{color:c[l.type]}}>{l.text}</span>}
            </div>
          ))}
          <div style={{marginBottom:6}}>
            <span style={{color:T.accent}}>▶ </span>
            <span style={{color:T.primary}}>{typingText}</span>
            <span style={{display:'inline-block',width:8,height:14,background:T.accent,verticalAlign:'middle',animation:'cursorB 1s step-end infinite'}}/>
          </div>
        </div>
      </div>
      <style>{`@keyframes cursorB{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
};

const wowMap: Record<string,React.ReactNode> = {
  radar:<RadarEffect/>, particles:<ParticlesEffect/>, waves:<WavesEffect/>,
  heartbeat:<HeartbeatEffect/>, glitch:<GlitchEffect/>, mirror:<MirrorEffect/>, terminal:<TerminalEffect/>,
};

// ─────────────────────────────────────────
// APP BLOCK
// ─────────────────────────────────────────
const AppBlock = ({ app, index, onLaunch }: { app: typeof APPS[0]; index: number; onLaunch:(a:any)=>void }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} transition={{duration:.7}} viewport={{once:true,margin:'-100px'}}
      style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'100vh',borderBottom:`2px solid ${T.accent}15`,direction:isEven?'ltr':'rtl'}}>
      <div style={{padding:'80px 60px',display:'flex',flexDirection:'column',justifyContent:'center',direction:'ltr',position:'relative',zIndex:2}}>
        <div style={{fontFamily:'Space Mono',fontSize:8,color:T.accent,letterSpacing:'0.3em',textTransform:'uppercase',marginBottom:16}}>
          {String(index+1).padStart(2,'0')} / 07
        </div>
        <div style={{display:'inline-block',border:`1px solid ${T.border}`,color:'rgba(255,255,255,0.35)',fontFamily:'Space Mono',fontSize:7,letterSpacing:'0.2em',padding:'4px 12px',textTransform:'uppercase',marginBottom:24,alignSelf:'flex-start'}}>
          {app.status}
        </div>
        <h2 style={{fontFamily:'Anton',fontSize:'clamp(48px,6vw,88px)',lineHeight:.9,letterSpacing:'-0.01em',color:app.color,marginBottom:20,textTransform:'uppercase'}}>
          {app.name}
        </h2>
        <p style={{fontFamily:'Playfair Display',fontStyle:'italic',fontSize:18,color:T.accent,marginBottom:20}}>{app.tagline}</p>
        <p style={{fontFamily:'DM Sans',fontSize:14,color:T.muted,lineHeight:1.8,maxWidth:380,marginBottom:32}}>{app.desc}</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          {app.tags.map(tag=>(
            <span key={tag} style={{border:`1px solid ${T.border}`,color:'rgba(255,255,255,0.3)',fontFamily:'Space Mono',fontSize:7,letterSpacing:'0.15em',padding:'3px 10px',textTransform:'uppercase'}}>{tag}</span>
          ))}
        </div>
        {app.id!=='sentia'&&(
          <button onClick={()=>onLaunch(app)} style={{alignSelf:'flex-start',padding:'14px 28px',fontFamily:'Anton',fontSize:13,letterSpacing:'0.1em',textTransform:'uppercase',background:app.color,color:T.base,border:'none',cursor:'none',display:'flex',alignItems:'center',gap:8}}>
            ABRIR {app.name} <ArrowUpRight size={16}/>
          </button>
        )}
      </div>
      <div style={{position:'relative',minHeight:600,direction:'ltr',borderLeft:isEven?`2px solid ${T.accent}15`:'none',borderRight:!isEven?`2px solid ${T.accent}15`:'none'}}>
        {wowMap[app.wowType]}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────
// APP LAUNCH SPLASH
// ─────────────────────────────────────────
const AppLaunchSplash = ({ app, onClose }: { app:any; onClose:()=>void }) => {
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    const t=setInterval(()=>setProgress(p=>{if(p>=100){clearInterval(t);setTimeout(()=>{window.open(app.url,'_blank');onClose();},400);return 100;}return p+2;}),35);
    return()=>clearInterval(t);
  },[]);
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9999,background:T.base,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <Noise/>
      <div style={{textAlign:'center',position:'relative',zIndex:2}}>
        <div style={{width:80,height:80,border:`3px solid ${app.color}`,margin:'0 auto 32px',display:'flex',alignItems:'center',justifyContent:'center',animation:'spinSlow 6s linear infinite',color:app.color}}>
          {app.icon}
        </div>
        <div style={{fontFamily:'Space Mono',fontSize:8,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5em',textTransform:'uppercase',marginBottom:8}}>Clínica Miró</div>
        <h1 style={{fontFamily:'Anton',fontSize:'clamp(40px,8vw,72px)',color:T.primary,letterSpacing:'-0.02em',textTransform:'uppercase',marginBottom:8}}>{app.name}</h1>
        <p style={{fontFamily:'Space Mono',fontSize:9,color:T.muted,letterSpacing:'0.2em',marginBottom:40}}>{app.tagline}</p>
        <div style={{width:200,height:2,background:'rgba(255,255,255,0.06)',margin:'0 auto'}}>
          <div style={{height:'100%',background:app.color,width:progress+'%',boxShadow:`0 0 10px ${app.color}`,transition:'width 0.05s'}}/>
        </div>
        <div style={{fontFamily:'Space Mono',fontSize:8,color:'rgba(255,255,255,0.18)',letterSpacing:'0.3em',textTransform:'uppercase',marginTop:8}}>
          {progress<40?'Sincronizando modelos...':progress<80?'Cargando visión clínica...':'Iniciando aplicación...'}
        </div>
      </div>
      <div style={{position:'absolute',bottom:32,fontFamily:'Space Mono',fontSize:8,color:'rgba(255,255,255,0.12)',letterSpacing:'0.3em',textTransform:'uppercase'}}>
        POWERED BY <strong style={{color:'rgba(255,255,255,0.25)'}}>HUMANA.AI</strong>
      </div>
      <style>{`@keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </motion.div>
  );
};

// ─────────────────────────────────────────
// STATIC SECTIONS
// ─────────────────────────────────────────
const ManifestoSection = () => (
  <section style={{padding:'120px 48px',background:T.surface}}>
    <div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
      <div style={{fontFamily:'Space Mono',fontSize:8,color:T.accent,letterSpacing:'0.6em',textTransform:'uppercase',marginBottom:40}}>Nuestro Manifiesto</div>
      <h2 style={{fontFamily:'DM Sans',fontSize:'clamp(24px,4vw,48px)',fontWeight:300,color:T.primary,lineHeight:1.4,marginBottom:56}}>
        No estamos reemplazando al odontólogo.<br/>
        Estamos <em style={{color:T.accent}}>aumentando su capacidad de cuidar.</em>
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:2}}>
        {[
          {title:'Objetividad',body:'Datos, no opiniones. La IA entrega una base sólida y científica para cada decisión clínica.'},
          {title:'Empatía',body:'Al liberar al doctor de la carga administrativa, le devolvemos el tiempo para conectar con el paciente.'},
          {title:'Acceso',body:'Democratizamos la orientación visual de alta precisión a cada rincón del ecosistema dental.'},
        ].map((item,i)=>(
          <div key={i} style={{padding:32,background:T.base,borderTop:`3px solid ${i===1?T.accent:T.border}`}}>
            <div style={{fontFamily:'Anton',fontSize:22,color:T.primary,letterSpacing:'0.02em',marginBottom:12}}>{item.title}</div>
            <p style={{fontFamily:'DM Sans',fontSize:13,color:T.muted,lineHeight:1.8}}>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ScienceSection = () => (
  <section style={{padding:'120px 48px',background:T.primary,color:T.base}}>
    <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
      <div>
        <div style={{fontFamily:'Space Mono',fontSize:8,color:T.accent,letterSpacing:'0.5em',textTransform:'uppercase',marginBottom:24}}>Evidencia y Datos</div>
        <h2 style={{fontFamily:'Anton',fontSize:'clamp(56px,8vw,112px)',color:T.base,lineHeight:.88,letterSpacing:'-0.02em',textTransform:'uppercase',marginBottom:32}}>
          CIENCIA<br/>Y<br/><span style={{color:T.accent}}>DATOS.</span>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:40}}>
          {[{n:'17k+',l:'Implantes en Meta-análisis'},{n:'0.894',l:'AUC ImplantX'},{n:'4.126',l:'Casos Validados'},{n:'92.4%',l:'Precisión SCANDENT'}].map(s=>(
            <div key={s.n} style={{padding:24,background:`${T.base}06`,border:`1px solid ${T.base}10`}}>
              <div style={{fontFamily:'Anton',fontSize:40,color:T.base,letterSpacing:'-0.02em',lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:'Space Mono',fontSize:7,color:`${T.base}50`,letterSpacing:'0.15em',textTransform:'uppercase',marginTop:6}}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Índice Miró */}
        <div style={{padding:32,background:T.accent,textAlign:'center'}}>
          <div style={{fontFamily:'Space Mono',fontSize:8,color:T.base,letterSpacing:'0.3em',textTransform:'uppercase',marginBottom:12}}>Fórmula de Belleza Contextual</div>
          <div style={{fontFamily:'Anton',fontSize:48,color:T.base,letterSpacing:'0.05em',marginBottom:8}}>IM = M × E × C</div>
          <div style={{fontFamily:'DM Sans',fontStyle:'italic',fontSize:13,color:`${T.base}80`}}>"Tu belleza no es un número universal — es una orquestación de datos."</div>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {[
          {title:'Sinergia 1+1 > 2',desc:'Nuestro algoritmo modela cómo factores como tabaquismo y diabetes se potencian exponencialmente, no solo se suman.'},
          {title:'IP Protegida',desc:'Algoritmo registrado SafeCreative #2510073245348 para predecir el éxito quirúrgico con precisión del 89.4%.'},
          {title:'Inferencia Ósea',desc:'Determinamos la densidad ósea (D1-D4) mediante variables clínicas, reduciendo la necesidad de radiación CBCT.'},
        ].map((item,i)=>(
          <div key={i} style={{padding:32,background:`${T.base}04`,border:`1px solid ${T.base}08`,transition:'all 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.paddingLeft='48px')}
            onMouseLeave={e=>(e.currentTarget.style.paddingLeft='32px')}>
            <h4 style={{fontFamily:'Anton',fontSize:22,color:T.base,textTransform:'uppercase',letterSpacing:'0.02em',marginBottom:8}}>{item.title}</h4>
            <p style={{fontFamily:'DM Sans',fontSize:13,color:`${T.base}60`,lineHeight:1.7}}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ClosingSection = () => (
  <section style={{minHeight:'60vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',padding:'120px 48px',background:T.surface}}>
    <motion.div initial={{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}} transition={{duration:.8}} style={{maxWidth:800}}>
      <p style={{fontFamily:'DM Sans',fontSize:'clamp(20px,3vw,36px)',fontWeight:300,color:'rgba(255,255,255,0.55)',lineHeight:1.6,marginBottom:40}}>
        Claridad clínica <strong style={{fontWeight:700,color:T.primary}}>que genera confianza.</strong><br/>
        Para cada paciente, según sus condiciones,<br/>con la mejor ciencia disponible hoy.
      </p>
      <div style={{width:40,height:2,background:T.accent,margin:'0 auto 32px'}}/>
      <div style={{fontFamily:'Anton',fontSize:32,color:T.primary,letterSpacing:'0.05em',textTransform:'uppercase'}}>HUMANA.AI</div>
      <div style={{fontFamily:'Space Mono',fontSize:8,color:T.accent,letterSpacing:'0.5em',textTransform:'uppercase',marginTop:8}}>Inteligencia Clínica</div>
    </motion.div>
    <div style={{maxWidth:700,marginTop:80,fontFamily:'Space Mono',fontSize:8,color:'rgba(255,255,255,0.1)',lineHeight:2.2,textAlign:'center',letterSpacing:'0.05em'}}>
      HUMANA.AI es una herramienta de orientación visual clínica. Los resultados generados por inteligencia artificial no constituyen orientación definitiva ni garantía de resultado. Toda decisión clínica debe ser validada por un profesional de salud calificado. DFL 725 Art. 113 · Ley 20.584 · Ley 21.719.
    </div>
  </section>
);

const Footer = () => (
  <footer style={{padding:'80px 48px 48px',borderTop:`3px solid ${T.accent}20`,background:T.base}}>
    <div style={{maxWidth:1400,margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:60,marginBottom:60}}>
      <div>
        <div style={{fontFamily:'Anton',fontSize:32,color:T.primary,letterSpacing:'0.05em',marginBottom:16}}>HUMANA.AI</div>
        <p style={{fontFamily:'Playfair Display',fontStyle:'italic',fontSize:16,color:'rgba(255,255,255,0.3)',lineHeight:1.8,maxWidth:320}}>
          "El caos no me destruyó.<br/>Me mostró lo que tenía que construir."<br/>
          <span style={{color:T.accent}}>— Dr. Carlos Montoya</span>
        </p>
        <div style={{marginTop:24,display:'flex',gap:12}}>
          {['clinicamiro.cl','drcarlosmontoya.cl'].map(url=>(
            <a key={url} href={`https://${url}`} style={{fontFamily:'Space Mono',fontSize:7,color:T.accent,letterSpacing:'0.1em',textDecoration:'none',border:`1px solid ${T.accent}40`,padding:'4px 10px'}}>{url}</a>
          ))}
        </div>
      </div>
      {[
        {title:'Aplicaciones',links:['SCANDENT','Simetría','ImplantX','ZeroCaries','Armonía','Copilot','Sentia']},
        {title:'Ecosistema',links:['Clínica Miró','Dr. Carlos Montoya','Licenciar','Curso IA Odontología']},
        {title:'Contacto',links:['Av. Nueva Providencia 2214','Oficina 189, Providencia','Santiago, Chile']},
      ].map(col=>(
        <div key={col.title}>
          <div style={{fontFamily:'Space Mono',fontSize:8,color:T.accent,letterSpacing:'0.3em',textTransform:'uppercase',marginBottom:20}}>{col.title}</div>
          {col.links.map(l=>(
            <div key={l} style={{fontFamily:'DM Sans',fontSize:13,color:'rgba(255,255,255,0.3)',marginBottom:10,transition:'color 0.15s'}}
              onMouseEnter={e=>(e.currentTarget.style.color=T.primary)}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.3)')}>{l}</div>
          ))}
        </div>
      ))}
    </div>
    <div style={{borderTop:`1px solid ${T.border}`,paddingTop:24,display:'flex',justifyContent:'space-between',fontFamily:'Space Mono',fontSize:7,color:'rgba(255,255,255,0.18)',letterSpacing:'0.1em',flexWrap:'wrap',gap:12}}>
      <span>© 2026 HUMANA.AI · 2 PATENTES · 16+ REGISTROS IP SAFECREATIVE</span>
      <span>NO REEMPLAZA EVALUACIÓN PRESENCIAL DE CIRUJANO-DENTISTA HABILITADO</span>
    </div>
  </footer>
);

// ─────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [launching, setLaunching] = useState<any>(null);

  return (
    <div style={{minHeight:'100vh',background:T.base,color:T.primary,overflowX:'hidden'}}>
      <CustomCursor/>
      <ScrollBar/>
      <Noise/>

      <AnimatePresence>
        {!loaded && <SplashScreen onComplete={()=>setLoaded(true)}/>}
      </AnimatePresence>

      <AnimatePresence>
        {launching && <AppLaunchSplash app={launching} onClose={()=>setLaunching(null)}/>}
      </AnimatePresence>

      <HUDOverlay/>
      <Nav/>

      <main>
        <HeroExplorer onLaunch={setLaunching}/>
        <Marquee/>

        <section id="apps">
          <div style={{padding:'60px 48px 0',borderBottom:`1px solid ${T.border}`}}>
            <div style={{maxWidth:1400,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:24}}>
              <div style={{fontFamily:'Anton',fontSize:'clamp(40px,6vw,80px)',color:T.primary,letterSpacing:'-0.02em',textTransform:'uppercase',lineHeight:.9}}>
                7 APPS.<br/><span style={{color:T.accent}}>1 ECOSISTEMA.</span>
              </div>
              <div style={{fontFamily:'Space Mono',fontSize:8,color:'rgba(255,255,255,0.2)',letterSpacing:'0.2em',textTransform:'uppercase',textAlign:'right',maxWidth:240,lineHeight:2.2}}>
                Orientación visual · No reemplaza evaluación presencial de cirujano-dentista habilitado.
              </div>
            </div>
          </div>
          {APPS.map((app,i)=><AppBlock key={app.id} app={app} index={i} onLaunch={setLaunching}/>)}
        </section>

        <Marquee reverse/>
        <ManifestoSection/>
        <ScienceSection/>
        <ClosingSection/>
      </main>

      <Footer/>
    </div>
  );
}
