import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export function Logo({ size = 'md' }) {
  const [ko, setKo] = useState(false)
  if (ko) return <div className={`logo-fallback ${size}`}>CENTRE MEDICAL<br />ANNE - MATHIAS</div>
  return <img className={`logo ${size}`} src="/logo.png" alt="Centre Médical Anne-Mathias" onError={() => setKo(true)} />
}
export const Badge = ({ t = 'info', children }) => <span className={`badge ${t}`}>{children}</span>

export function Modal({ title, sub, children, actions, narrow }) {
  return (
    <div className="overlay">
      <div className={`modal ${narrow ? 'narrow' : ''}`} role="dialog" aria-modal="true">
        <div className="modal-head"><h3>{title}</h3>{sub && <p className="sub">{sub}</p>}</div>
        <div className="modal-body">{children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  )
}
export const Field = ({ label, children }) => <label className="field"><span>{label}</span>{children}</label>

const NAV = [
  ['/dashboard', 'Tableau de bord'], ['/patients', 'Patients'], ['/demandes', 'Demandes d’examens'],
  ['/comptes-rendus', 'Comptes rendus'], ['/notifications', 'Notifications'],
  ['/utilisateurs', 'Utilisateurs et sécurité'], ['/parametres', 'Paramètres'],
]
export function Layout({ title, sub, actions, children, overlay }) {
  const nav = useNavigate()
  const [out, setOut] = useState(false)
  return (
    <div className="shell">
      <aside className="side">
        <Logo />
        <nav>{NAV.map(([to, l]) => <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>{l}</NavLink>)}</nav>
        <button className="logout" onClick={() => setOut(true)}>Se déconnecter</button>
      </aside>
      <main className="main">
        <header className="top">
          <div><h1>{title}</h1>{sub && <p className="sub">{sub}</p>}</div>
          <div className="top-actions">{actions}<span className="avatar">AK</span></div>
        </header>
        {children}
      </main>
      {overlay}
      {out && (
        <Modal narrow title="Se déconnecter ?" sub="Les saisies non enregistrées seront perdues."
          actions={<><button className="btn sec" onClick={() => setOut(false)}>Rester connecté</button>
            <button className="btn" onClick={() => nav('/login')}>Se déconnecter</button></>} />
      )}
    </div>
  )
}
