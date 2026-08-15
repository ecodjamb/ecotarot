'use client';
import Image from 'next/image';
import {FormEvent, useEffect, useMemo, useState} from 'react';

type Profile={name:string;email:string;birth:string;time:string;city:string};
const cards=[
  {name:'La Estrella',symbol:'✦',key:'Confianza',text:'Recuperas claridad. Lo que parecía lejano comienza a mostrar una ruta posible.'},
  {name:'El Sol',symbol:'☼',key:'Expansión',text:'Tu energía atrae respuestas. Haz visible aquello que vienes preparando en silencio.'},
  {name:'La Sacerdotisa',symbol:'☾',key:'Intuición',text:'No fuerces una definición. La información que falta aparecerá cuando hagas espacio.'},
  {name:'El Mago',symbol:'✧',key:'Iniciativa',text:'Ya cuentas con los recursos esenciales. El primer movimiento depende de ti.'},
  {name:'La Fuerza',symbol:'♌',key:'Templanza',text:'La suavidad será más eficaz que la presión. Conduce tu energía con intención.'},
  {name:'La Rueda',symbol:'◉',key:'Cambio',text:'Una coincidencia abre una alternativa. Muévete con el giro sin perder tu centro.'},
  {name:'El Mundo',symbol:'⊕',key:'Cierre',text:'Una etapa se integra. Reconoce lo aprendido antes de cruzar el próximo umbral.'},
];
const phases=['Semilla','Impulso','Expansión','Cosecha','Renovación'];
function hash(v:string){return [...v].reduce((a,c)=>((a*31+c.charCodeAt(0))>>>0),2166136261)}
function lifePath(date:string){let n=date.replace(/\D/g,'').split('').reduce((a,b)=>a+Number(b),0);while(n>9&&![11,22,33].includes(n))n=String(n).split('').reduce((a,b)=>a+Number(b),0);return n||7}
function zodiac(date:string){if(!date)return '—';const [,m,d]=date.split('-').map(Number);const ends=[19,18,20,19,20,20,22,22,22,22,21,21];const signs=['Capricornio','Acuario','Piscis','Aries','Tauro','Géminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario'];return d<=ends[m-1]?signs[m-1]:signs[m%12]}

export default function EcoTarotApp(){
 const [profile,setProfile]=useState<Profile|null>(null); const [open,setOpen]=useState(false); const [draw,setDraw]=useState<number|null>(null); const [tab,setTab]=useState<'hoy'|'semana'|'mes'>('hoy');
 useEffect(()=>{try{const p=localStorage.getItem('ecotarot-profile');if(p)setProfile(JSON.parse(p))}catch{}},[]);
 const today=new Intl.DateTimeFormat('es-CL',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
 const seed=hash((profile?.birth||'universo')+new Date().toISOString().slice(0,10)); const card=cards[draw??seed%cards.length];
 const cycle=profile?lifePath(profile.birth):7; const sign=profile?zodiac(profile.birth):'Tu signo';
 const greeting=profile?`Hola, ${profile.name.split(' ')[0]}`:'Tu futuro también se construye';
 function save(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);const p={name:String(f.get('name')),email:String(f.get('email')),birth:String(f.get('birth')),time:String(f.get('time')),city:String(f.get('city'))};localStorage.setItem('ecotarot-profile',JSON.stringify(p));setProfile(p);setOpen(false)}
 function shuffle(){let n;do{n=Math.floor(Math.random()*cards.length)}while(n===draw);setDraw(n)}
 return <main>
  <nav><a className="brand" href="#inicio"><span>◐</span> ECOTAROT</a><div className="navlinks"><a href="#lectura">Lectura</a><a href="#oraculo">Oráculo</a><a href="#mapa">Mi mapa</a></div><button className="profile" onClick={()=>setOpen(true)}>{profile?'Mi perfil':'Crear mi mapa'} <span>→</span></button></nav>
  <section id="inicio" className="hero"><Image src="/ecotarot-hero.webp" alt="Tres cartas bajo un cielo estrellado" fill priority sizes="100vw"/><div className="veil"/><div className="heroCopy"><div className="eyebrow">✦ TAROT · ASTROLOGÍA · NUMEROLOGÍA</div><h1>{greeting}.<br/><em>Escucha tu mapa interior.</em></h1><p>Una lectura integrada para comprender el presente, reconocer tus ciclos y avanzar con intención.</p><div className="actions"><button className="primary" onClick={()=>document.querySelector('#oraculo')?.scrollIntoView({behavior:'smooth'})}>Revelar mi carta <span>✦</span></button><button className="ghost" onClick={()=>setOpen(true)}>{profile?'Editar mis datos':'Crear perfil gratuito'}</button></div><small>Lecturas para reflexión y autoconocimiento</small></div><div className="scroll">DESCUBRE TU MENSAJE <i>↓</i></div></section>
  <section id="lectura" className="reading wrap"><div className="sectionHead"><div><span className="kicker">TU CIELO AHORA</span><h2>La energía que te acompaña</h2></div><p>{today.charAt(0).toUpperCase()+today.slice(1)} · Santiago de Chile</p></div>
   <div className="insightGrid"><article className="mainInsight"><div className="orbit">☾<i>✦</i></div><div><span className="kicker">CLIMA INTERIOR</span><h3>{phases[seed%phases.length]} consciente</h3><p>Hoy conviene observar antes de decidir. Una conversación honesta puede ordenar lo que tu mente ha intentado resolver sola.</p><div className="chips"><b>Claridad <span>82%</span></b><b>Intuición <span>91%</span></b><b>Acción <span>64%</span></b></div></div></article>
   <article className="mini"><span className="icon">♈</span><small>SOL NATAL</small><h3>{sign}</h3><p>Tu esencia busca expresarse sin abandonar su centro.</p></article><article className="mini"><span className="icon">№</span><small>CAMINO DE VIDA</small><h3>Número {cycle}</h3><p>{cycle===7?'Profundidad, análisis y sabiduría interior.':'Un ciclo que te invita a confiar en tus talentos.'}</p></article></div>
  </section>
  <section id="oraculo" className="oracle"><div className="wrap"><div className="sectionHead light"><div><span className="kicker">EL ORÁCULO DEL DÍA</span><h2>Elige una carta. Recibe una dirección.</h2></div><p>Respira, piensa en aquello que hoy necesita claridad y permite que la intuición elija.</p></div>
   <div className="oracleStage"><button className="tarotCard left" onClick={shuffle}><span>✦</span></button><button className="tarotCard chosen" onClick={shuffle}><span className="num">XVII</span><strong>{card.symbol}</strong><i>{card.name}</i></button><button className="tarotCard right" onClick={shuffle}><span>☾</span></button><article className="message"><span className="kicker">TU MENSAJE · {card.key.toUpperCase()}</span><h3>{card.name}</h3><p>“{card.text}”</p><button className="outline" onClick={shuffle}>Barajar nuevamente ↻</button></article></div></div>
  </section>
  <section id="mapa" className="forecast wrap"><div className="sectionHead"><div><span className="kicker">TU BRÚJULA PERSONAL</span><h2>Una mirada al tiempo que viene</h2></div><div className="tabs"><button className={tab==='hoy'?'active':''} onClick={()=>setTab('hoy')}>Hoy</button><button className={tab==='semana'?'active':''} onClick={()=>setTab('semana')}>Esta semana</button><button className={tab==='mes'?'active':''} onClick={()=>setTab('mes')}>Este mes</button></div></div>
   <div className="forecastGrid">{['Amor y vínculos','Propósito y trabajo','Energía personal'].map((x,i)=><article key={x}><span>{['♡','✦','☼'][i]}</span><small>{x.toUpperCase()}</small><h3>{tab==='hoy'?['Habla desde la calma','Prioriza lo esencial','Cuida tu ritmo'][i]:tab==='semana'?['Un vínculo se redefine','Una puerta pide decisión','Recuperas equilibrio'][i]:['Profundidad compartida','Cosecha y reconocimiento','Renovación consciente'][i]}</h3><p>{['La escucha sincera será tu mayor forma de cercanía.','Una acción pequeña y sostenida vale más que un gran impulso.','Reserva espacio para volver a ti antes de responder.'][i]}</p><b>Explorar mensaje →</b></article>)}</div>
  </section>
  <footer><a className="brand" href="#inicio"><span>◐</span> ECOTAROT</a><p>Una brújula para tu mundo interior.</p><p>© 2026 EcoTarot · Las lecturas son orientativas.</p></footer>
  {open&&<div className="modal" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><form onSubmit={save}><button type="button" className="close" onClick={()=>setOpen(false)}>×</button><span className="kicker">TU MAPA PERSONAL</span><h2>Conecta con tus ciclos</h2><p>Estos datos permiten integrar numerología y astrología en tus lecturas.</p><label>Nombre completo<input required name="name" defaultValue={profile?.name}/></label><label>Correo<input required type="email" name="email" defaultValue={profile?.email}/></label><div className="row"><label>Fecha de nacimiento<input required type="date" name="birth" defaultValue={profile?.birth}/></label><label>Hora<input required type="time" name="time" defaultValue={profile?.time}/></label></div><label>Ciudad de nacimiento<input required name="city" placeholder="Santiago, Chile" defaultValue={profile?.city}/></label><button className="primary" type="submit">Crear mi mapa <span>✦</span></button><small>Tus datos permanecen en este dispositivo.</small></form></div>}
 </main>
}
