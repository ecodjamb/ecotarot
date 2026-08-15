import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#090817',color:'#f2ecdf',padding:'24px',textAlign:'center'}}>
      <section>
        <div style={{color:'#d8b36a',letterSpacing:'.2em',fontSize:12}}>ECOTAROT</div>
        <h1 style={{fontSize:'clamp(48px,9vw,92px)',margin:'16px 0'}}>404</h1>
        <p style={{maxWidth:520,lineHeight:1.7,color:'#b8b1c7'}}>Esta ruta no forma parte de tu mapa. Vuelve al inicio para continuar tu lectura.</p>
        <Link href="/" style={{display:'inline-block',marginTop:20,padding:'13px 22px',borderRadius:999,background:'#d8b36a',color:'#171121',fontWeight:800}}>Volver a EcoTarot</Link>
      </section>
    </main>
  );
}
