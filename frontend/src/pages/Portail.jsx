import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Field, Logo } from '../components.jsx'
import { CODE_OTP_SIMULE } from '../data.js'

const EMPTY = Array(6).fill('')
const BACK = { id: 'home', code: 'id', list: 'home', report: 'list' }
export default function Portail() {
  const [step, setStep] = useState('home'), [digits, setDigits] = useState(EMPTY)
  const [tries, setTries] = useState(3), [msg, setMsg] = useState(''), [left, setLeft] = useState(300)
  useEffect(() => { if (step !== 'code') return; const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(t) }, [step])
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0')
  const focus = (i) => document.getElementById(`otp${i}`)?.focus()
  const setD = (i, v) => {
    const c = v.replace(/\D/g, ''); setMsg('')
    if (c.length > 1) { setDigits(EMPTY.map((_, k) => c[k] || '')); focus(Math.min(c.length, 5)); return }
    const d = [...digits]; d[i] = c; setDigits(d); if (c && i < 5) focus(i + 1)
  }
  const onKey = (i, e) => { if (e.key === 'Backspace' && !digits[i] && i > 0) focus(i - 1); if (e.key === 'Enter') valider() }
  const valider = () => {
    const code = digits.join('')
    if (left === 0) return setMsg('Code expiré. Renvoyez un code.')
    if (tries === 0) return setMsg('Nombre de tentatives dépassé. Renvoyez un code.')
    if (code.length < 6) return setMsg('Saisissez les 6 chiffres du code.')
    if (code === CODE_OTP_SIMULE) return setStep('list')
    const t = tries - 1; setTries(t); setDigits(EMPTY); focus(0)
    setMsg(t > 0 ? `Code incorrect. Il vous reste ${t} tentative${t > 1 ? 's' : ''}.` : 'Nombre de tentatives dépassé. Renvoyez un code.')
  }
  const renvoyer = () => { setLeft(300); setDigits(EMPTY); setTries(3); setMsg(''); focus(0) }
  return (
    <div className="phone">
      <div className="phone-head"><Logo size="sm" /><b>Portail patient</b></div>
      <div className="phone-body">
        {BACK[step] && <button className="back" onClick={() => setStep(BACK[step])}>← Retour</button>}
        {step === 'home' && <><h1 className="big">Consultez vos résultats en toute sécurité</h1><p className="sub lead">Accédez à vos comptes rendus validés depuis votre téléphone.</p>
          <p>① Vérifiez votre identité</p><p>② Saisissez le code reçu</p><p>③ Consultez ou téléchargez</p>
          <button className="btn" onClick={() => setStep('id')}>Consulter mes résultats</button>
          <p className="note"><Link to="/login" className="link">Retour espace personnel</Link></p></>}
        {step === 'id' && <><h1 className="big">Vérifier mon identité</h1><p className="sub lead">Saisissez les informations de votre dossier.</p>
          <Field label="N° de dossier"><input placeholder="DOS-2026-…" /></Field><Field label="Nom"><input /></Field>
          <Field label="Date de naissance"><input placeholder="JJ/MM/AAAA" /></Field>
          <button className="btn" onClick={() => { renvoyer(); setStep('code') }}>Continuer</button>
          <div className="alert info">Aucun résultat n’est envoyé par SMS ou e-mail.</div></>}
        {step === 'code' && <><h1 className="big">Entrez le code reçu</h1><p className="sub lead">Code envoyé au 07 ** ** ** 45</p>
          <div className="otp">{digits.map((d, i) => <input key={i} id={`otp${i}`} inputMode="numeric" autoComplete="one-time-code" autoFocus={i === 0}
            className={msg ? 'invalid' : ''} value={d} onChange={(e) => setD(i, e.target.value)} onKeyDown={(e) => onKey(i, e)} />)}</div>
          {msg && <p className="errt">{msg}</p>}
          <p><Badge t="warn">{left ? `Expire dans ${mm}:${ss}` : 'Code expiré'}</Badge></p>
          <button className="btn" onClick={valider}>Valider</button>
          <button className="btn sec" onClick={renvoyer}>Renvoyer un code</button>
          <p className="note">Démo : le code simulé est {CODE_OTP_SIMULE}.</p></>}
        {step === 'list' && <><h1 className="big">Mes résultats</h1><p className="sub lead">Kouassi Aya · DOS-2026-00418</p>
          {[['DEM-2026-001253', '22/10/2026 · NFS, Glycémie'], ['DEM-2026-001102', '14/09/2026 · Groupe sanguin']].map(([r, s]) =>
            <div className="card" key={r}><div className="row between"><b>{r}</b><Badge t="ok">Validé</Badge></div><p className="sub">{s}</p>
              <button className="btn sec" onClick={() => setStep('report')}>Consulter</button></div>)}</>}
        {step === 'report' && <><h1 className="big">Compte rendu</h1>
          <div className="card"><b>DEM-2026-001253</b><p className="sub">Kouassi Aya · 22/10/2026</p><hr />
            <p>Glycémie · 0,92 g/L · 0,70–1,10</p><p>Hémoglobine · 13,4 g/dL · 12–16</p><Badge t="ok">Validé le 22/10/2026</Badge></div>
          <button className="btn">Télécharger le PDF</button></>}
      </div>
    </div>
  )
}