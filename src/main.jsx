import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Sparkles, MoonStar, Hash, CalendarDays, WandSparkles, UserRound, History, LogOut, ChevronRight } from 'lucide-react';
import './styles.css';

const cards = [
  ['El Sol','Claridad, vitalidad y confianza'],['La Estrella','Esperanza, inspiración y apertura'],['El Mago','Iniciativa, recursos y acción'],['La Sacerdotisa','Intuición, pausa y observación'],['El Mundo','Cierre, integración y avance'],['La Fuerza','Autocontrol, coraje y constancia'],['La Emperatriz','Creatividad, expansión y cuidado'],['El Ermitaño','Introspección, criterio y prudencia']
];

function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return Math.abs(h)}
function reduceNumber(n){while(n>9 && ![11,22,33].includes(n)) n=String(n).split('').reduce((a,b)=>a+Number(b),0);return n}
function lifePath(date){return reduceNumber(date.replace(/\D/g,'').split('').reduce((a,b)=>a+Number(b),0))}
function personalDay(date,birth){const d=new Date(date+'T12:00:00'); const year=reduceNumber(d.getFullYear()); const month=reduceNumber(d.getMonth()+1); const day=reduceNumber(d.getDate()); const b=birth?lifePath(birth):7; return reduceNumber(b+year+month+day)}
function getDailyCard(profile,date){const seed=hashString(`${profile?.name||'EcoTarot'}-${profile?.birthDate||''}-${date}`);return cards[seed%cards.length]}
function weekBounds(offset=0){const now=new Date(); const day=(now.getDay()+6)%7; const monday=new Date(now); monday.setDate(now.getDate()-day+offset*7); const sunday=new Date(monday); sunday.setDate(monday.getDate()+6); return [monday,sunday]}
const fmt=d=>d.toLocaleDateString('es-CL',{day:'numeric',month:'short'});

function App(){
  const [view,setView]=useState(localStorage.getItem('ecotarot_user')?'home':'login');
  const [email,setEmail]=useState(localStorage.getItem('ecotarot_user')||'');
  const [profile,setProfile]=useState(()=>JSON.parse(localStorage.getItem('ecotarot_profile')||'null'));
  const today=new Date().toISOString().slice(0,10);
  const card=useMemo(()=>getDailyCard(profile,today),[profile,today]);
  const number=personalDay(today,profile?.birthDate);
  const [q,setQ]=useState('');
  const [reading,setReading]=useState(null);
  const nav=[['home','Hoy',Sparkles],['week','Semana',CalendarDays],['month','Mes',MoonStar],['tarot','Tarot',WandSparkles],['profile','Perfil',UserRound],['history','Historial',History]];

  function login(e){e.preventDefault(); if(!email)return; localStorage.setItem('ecotarot_user',email); setView(profile?'home':'onboarding')}
  function saveProfile(e){e.preventDefault(); const f=new FormData(e.currentTarget); const p={name:f.get('name'),birthDate:f.get('birthDate'),birthTime:f.get('birthTime'),birthPlace:f.get('birthPlace')}; localStorage.setItem('ecotarot_profile',JSON.stringify(p)); setProfile(p); setView('home')}
  function consult(){if(!q.trim())return; const c1=cards[hashString(q+today)%cards.length]; const c2=cards[hashString(q+today+'2')%cards.length]; const c3=cards[hashString(q+today+'3')%cards.length]; const r={date:new Date().toLocaleString('es-CL'),question:q,cards:[c1,c2,c3]}; const hist=JSON.parse(localStorage.getItem('ecotarot_history')||'[]'); localStorage.setItem('ecotarot_history',JSON.stringify([r,...hist].slice(0,20))); setReading(r)}
  function logout(){localStorage.removeItem('ecotarot_user');setView('login')}

  if(view==='login') return <div className="auth"><div className="brandmark">✦</div><h1>EcoTarot</h1><p>Numerología, carta astral y tarot en una sola lectura.</p><form onSubmit={login}><input type="email" placeholder="tu@email.com" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Clave" required/><button>Entrar</button></form><small>Lecturas simbólicas y orientativas, no deterministas.</small></div>
  if(view==='onboarding') return <div className="auth wide"><div className="brandmark">✦</div><h1>Crea tu perfil</h1><p>Usaremos estos datos para personalizar numerología, astrología y tarot.</p><form onSubmit={saveProfile}><input name="name" placeholder="Nombre completo" required/><input name="birthDate" type="date" required/><input name="birthTime" type="time"/><input name="birthPlace" placeholder="Lugar de nacimiento" required/><button>Crear mi perfil</button></form></div>

  const [m0,m1]=weekBounds(0),[n0,n1]=weekBounds(1);
  const history=JSON.parse(localStorage.getItem('ecotarot_history')||'[]');
  return <div className="app">
    <aside><div className="logo">✦ <span>EcoTarot</span></div><nav>{nav.map(([id,label,Icon])=><button key={id} className={view===id?'active':''} onClick={()=>setView(id)}><Icon size={18}/>{label}</button>)}</nav><button className="logout" onClick={logout}><LogOut size={18}/>Salir</button></aside>
    <main>
      {view==='home' && <><header><div><span className="eyebrow">LECTURA DE HOY</span><h1>Hola, {profile?.name?.split(' ')[0]||'bienvenido'}</h1><p>{new Date().toLocaleDateString('es-CL',{weekday:'long',day:'numeric',month:'long'})}</p></div></header><section className="hero"><div><span className="pill">Energía integrada</span><h2>Hoy favorece avanzar con calma y criterio.</h2><p>Tu numerología del día y tu carta guía apuntan a ordenar prioridades, escuchar la intuición y mover lo importante sin precipitar decisiones.</p><button onClick={()=>setView('tarot')}>Preguntar al Tarot <ChevronRight size={16}/></button></div><div className="bigcard"><span>Tu carta</span><strong>{card[0]}</strong><em>{card[1]}</em></div></section><section className="grid3"><Metric icon={<Hash/>} title="Número del día" value={number} text="Vibración personal calculada desde tu fecha."/><Metric icon={<MoonStar/>} title="Astrología" value="Tránsito clave" text="Módulo preparado para cálculo astronómico real."/><Metric icon={<WandSparkles/>} title="Tarot" value={card[0]} text={card[1]}/></section><section className="scores"><h3>Áreas del día</h3><div className="scoregrid">{[['Amor',4],['Trabajo',5],['Dinero',3],['Bienestar',4]].map(([a,s])=><div key={a}><span>{a}</span><b>{'●'.repeat(s)}{'○'.repeat(5-s)}</b></div>)}</div></section></>}
      {view==='week' && <><PageTitle title="Predicción semanal" sub={`${fmt(m0)} — ${fmt(m1)} · y próxima semana ${fmt(n0)} — ${fmt(n1)}`}/><section className="panel"><h2>Semana actual</h2><p>La semana favorece decisiones graduales, conversaciones claras y foco en una prioridad principal.</p><div className="days">{['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map((d,i)=><div key={d}><b>{d}</b><span>{['Ordenar','Avanzar','Conversar','Revisar','Resolver','Descansar','Integrar'][i]}</span></div>)}</div></section><section className="panel"><h2>Próxima semana</h2><p>Se abre una energía más expansiva. Conviene llegar con asuntos pendientes resueltos para aprovechar mejor las oportunidades.</p></section></>}
      {view==='month' && <><PageTitle title="Predicción mensual" sub="Mes actual y mes siguiente"/><section className="twocol"><div className="panel"><span className="eyebrow">MES ACTUAL</span><h2>Claridad y depuración</h2><p>Buen período para simplificar compromisos y dar forma concreta a ideas que venían postergadas.</p></div><div className="panel"><span className="eyebrow">PRÓXIMO MES</span><h2>Movimiento y expansión</h2><p>La tendencia cambia hacia más iniciativa, contactos y oportunidades de crecimiento.</p></div></section></>}
      {view==='tarot' && <><PageTitle title="Pregúntale a EcoTarot" sub="Tarot del momento integrado con tu perfil"/><section className="panel"><textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="¿Qué quieres consultar?"/><button onClick={consult}>Hacer tirada de 3 cartas</button>{reading&&<div className="reading"><h3>{reading.question}</h3><div className="cards">{reading.cards.map((c,i)=><div key={i} className="tarotcard"><small>{['Situación','Influencia','Tendencia'][i]}</small><strong>{c[0]}</strong><span>{c[1]}</span></div>)}</div><p>La lectura sugiere observar estas señales como tendencias simbólicas y usarlas como apoyo para reflexionar, no como certezas inevitables.</p></div>}</section></>}
      {view==='profile' && <><PageTitle title="Mi perfil" sub="Datos base de tu lectura personal"/><section className="panel profile"><div><span>Nombre</span><b>{profile?.name}</b></div><div><span>Nacimiento</span><b>{profile?.birthDate} {profile?.birthTime}</b></div><div><span>Lugar</span><b>{profile?.birthPlace}</b></div><div><span>Camino de vida</span><b>{lifePath(profile?.birthDate||'2000-01-01')}</b></div><button onClick={()=>setView('onboarding')}>Editar perfil</button></section></>}
      {view==='history' && <><PageTitle title="Historial" sub="Tus últimas consultas"/><section className="panel">{history.length===0?<p>Aún no hay consultas guardadas.</p>:history.map((h,i)=><div className="historyitem" key={i}><b>{h.question}</b><span>{h.date}</span><small>{h.cards.map(c=>c[0]).join(' · ')}</small></div>)}</section></>}
    </main>
  </div>
}

function Metric({icon,title,value,text}){return <div className="metric"><i>{icon}</i><span>{title}</span><strong>{value}</strong><p>{text}</p></div>}
function PageTitle({title,sub}){return <header><span className="eyebrow">ECOTAROT</span><h1>{title}</h1><p>{sub}</p></header>}

createRoot(document.getElementById('root')).render(<App/>);
