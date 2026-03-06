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
  Clock,
  X,
  Mic,
  FileText,
  Share2,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Text,
  Environment,
  PresentationControls,
  ContactShadows,
  useGLTF
} from '@react-three/drei';
import * as THREE from 'three';

// --- Configuration & Data ---

const APPS = [
  {
    id: 'scandent',
    name: 'SCANDENT',
    tagline: 'Visión Artificial de Vanguardia',
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
    tagline: 'Evaluación Predictiva con IA',
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
    tagline: 'Belleza Contextual y Armonía',
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
    tagline: 'Asistente Clínico Inteligente',
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
    tagline: 'Prevención Basada en Datos',
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
    tagline: 'Estética Facial Avanzada',
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
  useEffect(() => {
    // Safety timeout: if video doesn't end or load, continue after 10s
    const timer = setTimeout(onComplete, 10000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center overflow-hidden"
    >
      <video 
        autoPlay 
        muted 
        playsInline 
        onEnded={onComplete}
        onError={onComplete}
        className="w-full h-full object-cover md:object-contain"
      >
        <source src="https://storage.googleapis.com/aistudio-assets/humana-splash-v2.mp4" type="video/mp4" />
      </video>
      
      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-[10px] font-black tracking-[0.4em] text-white/40 uppercase hover:text-white transition-colors z-[110] bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
      >
        Saltar Intro
      </motion.button>
    </motion.div>
  );
};

const HeroExplorer = ({ onLaunch }: { onLaunch: (app: any) => void }) => {
  const [activeStage, setActiveStage] = useState(0);
  
  const stages = [
    {
      id: 'scandent',
      name: 'Objetividad',
      sub: 'El fin de la duda',
      color: '#5B8DEF',
      glow: 'rgba(91,141,239,0.4)',
      icon: <Scan className="w-full h-full" />,
      title: 'Diagnóstico basado en datos, no en opiniones.',
      desc: 'La variabilidad diagnóstica es el mayor reto de la odontología. Scandent utiliza redes neuronales para identificar patologías con una precisión matemática, eliminando la duda del proceso inicial.',
      features: [
        'Identificación de patologías asintomáticas',
        'Estandarización del criterio clínico',
        'Evidencia visual irrefutable para el paciente'
      ],
      modelType: 'knot'
    },
    {
      id: 'odonto',
      name: 'Eficiencia',
      sub: 'Atención sin fricción',
      color: '#C9A86C',
      glow: 'rgba(201,168,108,0.4)',
      icon: <Mic className="w-full h-full" />,
      title: 'Manos libres, mente en el paciente.',
      desc: 'El registro clínico no debería ser un obstáculo. Nuestra interfaz de voz permite al odontólogo mantener el foco donde importa: en el paciente y en la exploración, no en el teclado.',
      features: [
        'Registro en tiempo real sin contaminación cruzada',
        'Vocabulario clínico especializado en español',
        'Ahorro del 60% en tiempo de documentación'
      ],
      modelType: 'sphere'
    },
    {
      id: 'explica',
      name: 'Empatía',
      sub: 'El puente visual',
      color: '#E8524A',
      glow: 'rgba(232,82,74,0.35)',
      icon: <Layers className="w-full h-full" />,
      title: 'El fin de la "caja negra" clínica.',
      desc: 'Un paciente que no entiende, no acepta el tratamiento. Explica traduce la complejidad técnica en una narrativa visual sobre la propia anatomía del paciente.',
      features: [
        'Realidad aumentada sobre radiografías reales',
        'Visualización del progreso de la enfermedad',
        'Empoderamiento del paciente en su salud'
      ],
      modelType: 'torus'
    },
    {
      id: 'clarity',
      name: 'Transparencia',
      sub: 'Decisiones seguras',
      color: '#3EBD7A',
      glow: 'rgba(62,189,122,0.35)',
      icon: <FileText className="w-full h-full" />,
      title: 'Transparencia que genera lealtad.',
      desc: 'La incertidumbre financiera es la principal barrera de abandono. Clarity entrega un plan de acción claro, desglosado y garantizado desde el minuto uno.',
      features: [
        'Presupuestos dinámicos y transparentes',
        'Opciones de financiamiento integradas',
        'Compromiso de calidad y garantías'
      ],
      modelType: 'box'
    },
    {
      id: 'share',
      name: 'Conexión',
      sub: 'Salud compartida',
      color: '#25D366',
      glow: 'rgba(37,211,102,0.35)',
      icon: <Share2 className="w-full h-full" />,
      title: 'La consulta no termina en el box.',
      desc: 'Llevamos la información al entorno del paciente. Al compartir el diagnóstico por WhatsApp, permitimos que la decisión sea familiar, informada y reflexiva.',
      features: [
        'Acceso instantáneo sin aplicaciones externas',
        'Trazabilidad del interés del paciente',
        'Fomento de la educación dental familiar'
      ],
      modelType: 'octa'
    }
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#020202] flex items-center justify-center">
      {/* Real 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Hero3DScene activeStage={activeStage} stages={stages} />
          </PresentationControls>
          
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Technical Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-12 left-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-3 h-3 bg-indigo-velvet-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">System Online</span>
          </div>
          <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
            {`[CORE_ENGINE] > STATUS_OK > LATENCY_12MS`}
          </div>
        </div>

        <div className="absolute bottom-12 left-12">
          <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">Navigation</div>
          <div className="flex flex-col gap-2">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`pointer-events-auto group flex items-center gap-4 transition-all duration-500 ${activeStage === idx ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
              >
                <div className="w-1 h-8 bg-white/10 relative overflow-hidden">
                  {activeStage === idx && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute inset-0"
                      style={{ backgroundColor: stage.color }}
                    />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-white text-[10px] font-black uppercase tracking-widest">{stage.name}</div>
                  <div className="text-[8px] text-white/40 font-bold uppercase tracking-widest">{stage.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Panel (Right) */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-[380px] z-30 hidden lg:block pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStage}
            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto bg-black/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl"
          >
            <div className="text-[10px] font-black tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
              <span style={{ color: stages[activeStage].color }}>{String(activeStage + 1).padStart(2, '0')}</span>
              <span className="w-8 h-[1px] bg-white/10" />
              <span className="text-white/40">{stages[activeStage].sub}</span>
            </div>
            
            <h1 className="text-4xl font-light text-white leading-tight mb-8">
              {stages[activeStage].title}
            </h1>
            
            <p className="text-sm text-white/40 font-medium leading-relaxed mb-10">
              {stages[activeStage].desc}
            </p>
            
            <div className="space-y-4 mb-10">
              {stages[activeStage].features.map((feat, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-transform group-hover:scale-150" style={{ backgroundColor: stages[activeStage].color }} />
                  <span className="text-xs text-white/60 leading-relaxed font-medium">{feat}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                const app = APPS.find(a => a.id === stages[activeStage].id) || APPS[0];
                onLaunch(app);
              }}
              className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 group overflow-hidden relative"
              style={{ backgroundColor: stages[activeStage].color, color: '#000' }}
            >
              <span className="relative z-10">Launch {stages[activeStage].name}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
              <motion.div 
                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Title */}
      <div className="absolute top-24 left-6 right-6 lg:hidden text-center z-20">
        <h2 className="text-4xl font-black tracking-tighter uppercase text-white mb-2">
          {stages[activeStage].name}
        </h2>
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">
          {stages[activeStage].sub}
        </p>
      </div>
    </section>
  );
};

const Hero3DScene = ({ activeStage, stages }: { activeStage: number; stages: any[] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const stage = stages[activeStage];

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
        <mesh ref={meshRef} castShadow receiveShadow>
          {stage.modelType === 'knot' && <torusKnotGeometry args={[1, 0.3, 128, 32]} />}
          {stage.modelType === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
          {stage.modelType === 'torus' && <torusGeometry args={[1, 0.4, 32, 100]} />}
          {stage.modelType === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
          {stage.modelType === 'octa' && <octahedronGeometry args={[1.5, 0]} />}
          
          <MeshDistortMaterial
            color={stage.color}
            speed={2}
            distort={0.3}
            radius={1}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      {/* Outer Wireframe Shell */}
      <mesh rotation={[0, 0, 0]}>
        {stage.modelType === 'knot' && <torusKnotGeometry args={[1.1, 0.31, 128, 32]} />}
        {stage.modelType === 'sphere' && <sphereGeometry args={[1.3, 32, 32]} />}
        {stage.modelType === 'torus' && <torusGeometry args={[1.1, 0.41, 32, 100]} />}
        {stage.modelType === 'box' && <boxGeometry args={[1.6, 1.6, 1.6]} />}
        {stage.modelType === 'octa' && <octahedronGeometry args={[1.6, 0]} />}
        <meshStandardMaterial 
          color={stage.color} 
          wireframe 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

const DeepScanReveal = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative h-[600px] bg-white/5 rounded-[60px] border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
            
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <PresentationControls
                global
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
              >
                <RevealObject />
              </PresentationControls>
              
              <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
              <Environment preset="city" />
            </Canvas>

            <div className="absolute top-8 left-8 z-20">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-indigo-velvet-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Deep Scan Active</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
              <div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Object ID</div>
                <div className="text-white font-mono text-xs">HMN-SCAN-0924</div>
              </div>
              <div className="text-right">
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Precision</div>
                <div className="text-indigo-velvet-400 font-mono text-xs">99.98%</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-indigo-velvet-400 text-[10px] font-black uppercase tracking-[0.6em] mb-8">Tecnología de Revelado</div>
            <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-12 leading-tight">
              Mira lo que <br />
              <span className="text-white/30 italic">otros no ven.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-xl">
              Nuestra IA no solo analiza la superficie. Utiliza algoritmos de revelado volumétrico para identificar patologías ocultas, fracturas internas y variaciones de densidad ósea que pasan desapercibidas en un examen convencional.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 rounded-[32px] border border-white/10">
                <Cpu className="w-8 h-8 text-indigo-velvet-400 mb-6" />
                <div className="text-white font-bold mb-2">Revelado Volumétrico</div>
                <div className="text-white/40 text-xs leading-relaxed">Análisis capa por capa de la estructura dental interna.</div>
              </div>
              <div className="p-8 bg-white/5 rounded-[32px] border border-white/10">
                <Eye className="w-8 h-8 text-indigo-velvet-400 mb-6" />
                <div className="text-white font-bold mb-2">Visión Predictiva</div>
                <div className="text-white/40 text-xs leading-relaxed">Identificación de riesgos antes de que se conviertan en problemas.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RevealObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8;
      meshRef.current.rotation.y = Math.sin(t / 4) / 8;
      meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
      
      // Reveal effect using clipping planes
      const planeConstant = Math.sin(t) * 2;
      const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), planeConstant);
      
      if (Array.isArray(meshRef.current.material)) {
        meshRef.current.material.forEach(m => {
          m.clippingPlanes = [plane];
          m.clipShadows = true;
        });
      } else {
        meshRef.current.material.clippingPlanes = [plane];
        meshRef.current.material.clipShadows = true;
      }
    }
  });

  const { gl } = useThree();
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  return (
    <group>
      {/* Outer Shell */}
      <mesh ref={meshRef} castShadow receiveShadow onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#7533cc" : "#ffffff"} 
          roughness={0.1} 
          metalness={0.8}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Inner Core (Always visible or revealed differently) */}
      <mesh rotation={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.28, 128, 32]} />
        <meshStandardMaterial 
          color="#7533cc" 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color="#7533cc"
            speed={5}
            distort={0.4}
            radius={1}
          />
        </mesh>
      </Float>
    </group>
  );
};

const FlowDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      num: '01',
      title: 'Odontograma',
      subtitle: 'Dictado por voz',
      desc: 'El Dr. Montoya dicta el estado de cada pieza sin tocar la pantalla.',
      video: 'https://storage.googleapis.com/aistudio-assets/copilot-demo.mp4',
      icon: <Mic className="w-6 h-6" />
    },
    {
      num: '02',
      title: 'Explica',
      subtitle: 'Panorámica Aumentada',
      desc: 'El paciente ve SUS problemas sobre SU radiografía.',
      video: 'https://storage.googleapis.com/aistudio-assets/simetria-demo.mp4',
      icon: <Layers className="w-6 h-6" />
    },
    {
      num: '03',
      title: 'Clarity',
      subtitle: 'El documento del paciente',
      desc: 'Presupuesto, financiamiento y garantías. Se lo lleva a casa.',
      video: 'https://storage.googleapis.com/aistudio-assets/copilot-demo.mp4',
      icon: <FileText className="w-6 h-6" />
    },
    {
      num: '04',
      title: 'Compartir',
      subtitle: 'WhatsApp Directo',
      desc: 'Sin login. Sin app. Solo un link que genera confianza familiar.',
      video: 'https://storage.googleapis.com/aistudio-assets/simetria-demo.mp4',
      icon: <Share2 className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-indigo-velvet-400 text-[10px] font-black uppercase tracking-[0.6em] mb-8">Demo del Flujo</div>
            <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-12 leading-tight">
              Del diagnóstico <br />
              <span className="text-white/30 italic">al tratamiento aceptado.</span>
            </h2>
            
            <div className="space-y-8">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`w-full text-left p-8 rounded-[32px] transition-all duration-500 border ${currentStep === i ? 'bg-white/5 border-white/10 shadow-2xl' : 'border-transparent opacity-40 hover:opacity-60'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="text-4xl font-light text-white/10">{step.num}</div>
                    <div>
                      <div className="text-xl font-bold text-white mb-1">{step.title}</div>
                      <div className="text-xs font-black uppercase tracking-widest text-indigo-velvet-400">{step.subtitle}</div>
                    </div>
                    {currentStep === i && <motion.div layoutId="active-step" className="ml-auto w-2 h-2 bg-indigo-velvet-500 rounded-full shadow-[0_0_15px_var(--color-indigo-velvet-500)]" />}
                  </div>
                  {currentStep === i && (
                    <motion.p 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-6 text-white/40 text-sm leading-relaxed"
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-[9/16] max-w-[400px] mx-auto lg:ml-auto w-full">
            {/* Phone Frame */}
            <div className="absolute inset-0 border-[8px] border-[#1A1A1A] rounded-[60px] shadow-2xl overflow-hidden z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full bg-black"
                >
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                    src={steps[currentStep].video}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-velvet-500/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ChallengeSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#020202] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-indigo-velvet-400 text-[10px] font-black uppercase tracking-[0.6em] mb-8">El Desafío</div>
            <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-12 leading-tight">
              La brecha de <br />
              <span className="text-white/30 italic">la incertidumbre.</span>
            </h2>
            <div className="space-y-8 text-white/40 text-lg leading-relaxed">
              <p>
                En la odontología tradicional, el diagnóstico suele ser una "caja negra" para el paciente. La variabilidad entre profesionales y la dificultad para visualizar problemas internos generan desconfianza y abandono de tratamientos.
              </p>
              <p className="text-white/60 font-medium">
                El 40% de los pacientes no inicia su tratamiento porque no entiende la gravedad de su situación o no confía plenamente en el diagnóstico subjetivo.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { title: 'Subjetividad', desc: 'Diferentes doctores, diferentes diagnósticos sobre la misma imagen.', icon: <Users className="w-6 h-6" /> },
              { title: 'Invisibilidad', desc: 'Patologías ocultas que el ojo humano puede pasar por alto.', icon: <Eye className="w-6 h-6" /> },
              { title: 'Desconexión', desc: 'Información técnica que no llega al entorno familiar del paciente.', icon: <Share2 className="w-6 h-6" /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-8 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-velvet-500/10 flex items-center justify-center text-indigo-velvet-400">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl mb-1">{item.title}</div>
                    <div className="text-white/40 text-sm">{item.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ManifestoSection = () => {
  return (
    <section className="py-40 px-6 md:px-12 bg-indigo-velvet-950/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,var(--color-indigo-velvet-500)_0%,transparent_50%)]" />
      </div>
      
      <div className="max-w-[1000px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-indigo-velvet-400 text-[10px] font-black uppercase tracking-[0.8em] mb-12">Nuestro Manifiesto</div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight mb-16">
            No estamos reemplazando al odontólogo. <br />
            Estamos <span className="italic text-indigo-velvet-400">aumentando su capacidad</span> de cuidar.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <div className="text-white font-bold text-2xl mb-4">Objetividad</div>
              <p className="text-white/40 leading-relaxed">Datos, no opiniones. La IA entrega una base sólida y científica para cada decisión clínica.</p>
            </div>
            <div>
              <div className="text-white font-bold text-2xl mb-4">Empatía</div>
              <p className="text-white/40 leading-relaxed">Al liberar al doctor de la carga administrativa, le devolvemos el tiempo para conectar con el paciente.</p>
            </div>
            <div>
              <div className="text-white font-bold text-2xl mb-4">Acceso</div>
              <p className="text-white/40 leading-relaxed">Democratizamos el diagnóstico de alta precisión, llevándolo a cada rincón del ecosistema dental.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatementSection = () => (
  <section className="py-40 flex flex-col justify-center items-center px-6 relative z-20">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
      className="p-8 md:p-16 border border-blue-500/30 rounded-2xl relative group max-w-4xl bg-blue-500/5 backdrop-blur-sm"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#020202] px-4 text-[8px] font-black tracking-[0.4em] text-blue-500/50 uppercase">
        Core Statement
      </div>
      <p className="text-xl md:text-3xl text-white/80 font-light italic font-display leading-relaxed text-center">
        Cuando un paciente recibe un diagnóstico claro, lo entiende.<br />
        Cuando entiende, confía.<br />
        Cuando confía, se atiende.<br />
        <span className="text-white font-bold not-italic block mt-8">Eso es HUMANA.AI. Claridad clínica que genera confianza.</span>
      </p>
      
      <div className="mt-12 flex flex-col items-center md:items-end w-full">
        <div className="h-[1px] w-12 bg-blue-500/30 mb-4" />
        <div className="text-[12px] font-black tracking-[0.2em] text-white/90 uppercase">
          Dr. Carlos Montoya
        </div>
        <div className="text-[10px] font-medium text-white/40 tracking-wider mt-1">
          Director Clínica Miró y Desarrollador de Humana.AI
        </div>
      </div>
    </motion.div>

    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-20">
      {['Social', 'Comercial', 'Educativa'].map((label, i) => (
        <motion.button 
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + (i * 0.1) }}
          className="px-8 md:px-12 py-3 md:py-4 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          {label}
        </motion.button>
      ))}
    </div>
  </section>
);

const AppLaunchSplash = ({ app, onClose }: { app: any; onClose: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onClose, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 blur-[100px] rounded-full"
          style={{ background: `radial-gradient(circle, ${app.color} 0%, transparent 70%)` }}
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-white/20 rotate-[-12deg]" />
          <div className="absolute bottom-[30%] left-[-10%] w-[120%] h-[1px] bg-white/20 rotate-[8deg]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo Container */}
        <div className="relative w-48 h-48 mb-12">
          {/* Orbital Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] border border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] border border-white/10 rounded-full border-dashed"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-5px] border-2 rounded-full"
            style={{ borderColor: app.color }}
          />

          {/* Icon Background */}
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
            className="absolute inset-6 rounded-full shadow-2xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(145deg, ${app.color}, #000)`,
              boxShadow: `0 0 40px ${app.color}44`
            }}
          >
            <div className="text-white scale-[1.5]">
              {app.icon}
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-2">Clínica Miró</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-2 text-white">
            {app.name.split(' ')[0]}<span style={{ color: app.color }}>{app.name.split(' ')[1] || ''}</span>
          </h1>
          <p className="text-lg text-white/60 font-medium tracking-widest mb-1">{app.tagline}</p>
          <p className="text-xs italic text-white/20">"Iniciando protocolos de IA..."</p>
        </motion.div>

        {/* Loader */}
        <div className="mt-16 w-48">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full"
              style={{ 
                width: `${progress}%`,
                backgroundColor: app.color,
                boxShadow: `0 0 10px ${app.color}`
              }}
            />
          </div>
          <div className="mt-4 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
            {progress < 40 ? 'Sincronizando modelos...' : progress < 80 ? 'Cargando visión clínica...' : 'Finalizando análisis...'}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
          Powered by <strong className="text-white/40">HUMANA.AI</strong>
        </p>
      </div>
    </motion.div>
  );
};

const VisionPillar = ({ num, tag, word, headline, body, actors, colorClass }: any) => (
  <section className="py-16 md:py-20 px-6 md:px-12 border-b border-white/5">
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
          <div className={(actors[0] && typeof actors[0] === 'object') ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "flex flex-wrap gap-2 md:gap-3"}>
            {actors.map((actor: any, i: number) => {
              if (actor && typeof actor === 'object' && 'who' in actor) {
                return (
                  <div key={actor.who || i} className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 hover:bg-white/[0.07] transition-colors group">
                    <div className={`text-[10px] font-black uppercase tracking-widest mb-6 ${actor.color || ''}`}>{actor.who}</div>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: actor.text || '' }} />
                  </div>
                );
              }
              return (
                <span key={typeof actor === 'string' ? actor : i} className="px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-blue-500/10 bg-blue-500/5 text-[8px] md:text-[10px] font-medium text-blue-400/60 uppercase tracking-wider">
                  {String(actor)}
                </span>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  </section>
);

const AppCard = ({ app, onLaunch }: { app: any; onLaunch: (app: any) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.2)' }}
      className={`lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[40px] md:rounded-[60px] p-8 md:p-12 flex flex-col justify-between transition-all group cursor-pointer shadow-xl relative overflow-hidden min-h-[300px] lg:min-h-0 ${isExpanded ? 'lg:col-span-4 lg:row-span-2' : ''}`}
    >
      {app.id === 'implantx' && <ImplantXOverlay videoSrc={app.videoSrc} />}
      {app.id === 'simetria' && <MiroOverlay videoSrc={app.videoSrc} />}
      {app.id === 'copilot' && <CopilotOverlay videoSrc={app.videoSrc} />}
      {app.id === 'zerocaries' && <ZeroCariesOverlay videoSrc={app.videoSrc} />}
      {app.id === 'armonia' && <ArmoniaOverlay videoSrc={app.videoSrc} />}
      
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
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onLaunch(app);
          }}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-indigo-velvet-400 hover:bg-white/10 transition-all"
        >
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2 md:mb-4">{app.name}</h3>
        <p className="text-xs md:text-sm text-white/30 font-medium leading-relaxed mb-6">{app.desc}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="text-[10px] font-black text-indigo-velvet-400 uppercase tracking-widest">Key Features</div>
                <div className="grid grid-cols-1 gap-3">
                  {app.tags.map((tag: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-white/60">
                      <div className="w-1 h-1 rounded-full bg-indigo-velvet-500" />
                      {tag}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onLaunch(app);
                  }}
                  className="w-full py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-velvet-500 hover:text-white transition-all"
                >
                  Launch Application
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors mt-4"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
          <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
};

const WinWinSection = () => (
  <section className="py-12 md:py-16 px-12 border-b border-white/5">
    <div className="max-w-[1200px] mx-auto text-center">
      <div className="text-[10px] font-black tracking-[0.6em] text-indigo-velvet-400 uppercase mb-12">Quién gana</div>
      <h2 className="text-6xl md:text-7xl font-light tracking-tighter mb-16 text-white/90">
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-12">
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
  const [nodes, setNodes] = useState(142);
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    const nodeTimer = setInterval(() => setNodes(prev => prev + (Math.random() > 0.7 ? 1 : 0)), 5000);
    return () => {
      clearInterval(timer);
      clearInterval(nodeTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-6 flex flex-col justify-between text-[8px] md:text-[10px] font-mono text-white/20 uppercase tracking-widest">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-emerald-500 font-bold">HUMANA_LIVE_NETWORK</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/40">ACTIVE_NODES:</span>
            <span className="text-white/60 font-bold">{nodes}</span>
          </div>
          <div className="hidden sm:block text-indigo-velvet-400/40">SANTIAGO_HUB_PRIMARY</div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <Wifi className="w-3 h-3 text-emerald-500" />
            <span className="text-emerald-500/60">SIGNAL_STABLE</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-indigo-velvet-400/60">
            <Lock className="w-3 h-3" />
            <span className="hidden xs:block">AES_256_ENCRYPTION_ACTIVE</span>
          </div>
          <div className="text-[7px] md:text-[10px] opacity-40">LAUNCH_PHASE_01 // GLOBAL_DEPLOYMENT</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[7px] mb-1 opacity-30">CORE_LOAD</span>
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    height: [4, Math.random() * 15 + 5, 4],
                    backgroundColor: i > 5 ? 'rgba(117, 51, 204, 0.5)' : 'rgba(255, 255, 255, 0.2)'
                  }}
                  transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                  className="w-[2px] rounded-full"
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
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md group/stat hover:border-emerald-500/30 transition-all duration-500">
        <div className="relative">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm animate-ping opacity-50" />
        </div>
        <div>
          <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Caries Detected</div>
          <div className="text-2xl font-black tracking-tighter text-emerald-400">98.4%</div>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md group/stat hover:border-indigo-velvet-500/30 transition-all duration-500">
        <div className="relative">
          <div className="w-2 h-2 bg-indigo-velvet-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-indigo-velvet-500 rounded-full blur-sm animate-ping opacity-50" />
        </div>
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
  const [launchingApp, setLaunchingApp] = useState<any>(null);
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

      <AnimatePresence>
        {launchingApp && (
          <AppLaunchSplash 
            app={launchingApp} 
            onClose={() => setLaunchingApp(null)} 
          />
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
        <div className="max-w-[1800px] mx-auto px-4 md:px-12 h-20 grid grid-cols-3 items-center">
          {/* Left Side */}
          <div className="flex items-center gap-4 md:gap-8 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>System_Online</span>
            </div>
            <span className="hidden md:block">Loc: Santiago_Chile</span>
          </div>

          {/* Center - Brand */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 md:gap-4">
              <HumanaLogo className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-2xl font-black tracking-tighter uppercase leading-none">Humana.AI</span>
            </div>
            <span className="text-[6px] md:text-[8px] text-indigo-velvet-400 font-black tracking-[0.4em] md:tracking-[0.6em] uppercase mt-1 text-center">Inteligencia Clínica</span>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center justify-end gap-4 md:gap-8 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30">
            <div className="hidden lg:flex items-center gap-2">
              <Wifi className="w-3 h-3 text-indigo-velvet-400" />
              <span>Encrypted_Link</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Clock className="w-3 h-3 text-indigo-velvet-400" />
              <span>11:08:46 A. M.</span>
            </div>
            <button className="w-8 h-8 md:w-10 md:h-10 bg-indigo-velvet-600/20 text-indigo-velvet-400 rounded-lg border border-indigo-velvet-500/20 flex items-center justify-center hover:bg-indigo-velvet-600 hover:text-white transition-all">
              <Terminal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        <HeroExplorer onLaunch={setLaunchingApp} />

        <ChallengeSection />

        <FlowDemo />

        <DeepScanReveal />

        <ManifestoSection />

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
          actors={[
            { who: 'Estudiantes', text: 'Aprenden con herramientas de vanguardia, preparándose para una odontología digital y basada en datos.', color: 'text-indigo-velvet-400' },
            { who: 'Academia', text: 'Estandariza criterios de evaluación y diagnóstico, elevando el nivel de la enseñanza clínica.', color: 'text-white/40' }
          ]}
        />

        <StatementSection />

        <WinWinSection />

        {/* Bento Ecosystem - Overjet Style */}
        <section id="ecosistema" className="pt-0 pb-12 md:pb-24 px-6 md:px-12">
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
                    <button 
                      onClick={() => setLaunchingApp(APPS.find(a => a.id === 'scandent'))}
                      className="px-8 md:px-12 py-4 md:py-6 bg-white text-black font-black rounded-2xl text-[10px] md:text-sm tracking-[0.2em] uppercase hover:bg-indigo-velvet-500 hover:text-white transition-all glow-indigo"
                    >
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
              {APPS.filter(a => a.id === 'implantx' || a.id === 'simetria' || a.id === 'copilot' || a.id === 'zerocaries' || a.id === 'armonia').map((app, i) => (
                <AppCard key={app.id} app={app} onLaunch={setLaunchingApp} />
              ))}
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
