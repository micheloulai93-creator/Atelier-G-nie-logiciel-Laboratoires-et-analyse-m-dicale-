import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Badge, Field, Layout, Logo } from '../components.jsx'
import { demandes, patients } from '../data.js'

const CATALOGUE = ['NFS', 'Glycémie', 'CRP', 'Créatinine', 'Goutte épaisse', 'Groupe sanguin', 'Hémoglobine']

export default function NouvelleDemande() {
  const nav = useNavigate()
  const [sp] = useSearchParams()
  const init = patients.find((p) => p.id === sp.get('patient'))
  const [patient, setPatient] = useState(init || null), [q, setQ] = useState('')
  const [exams, setExams] = useState([]), [mode, setMode] = useState(''), [tel, setTel] = useState(init?.tel || ''), [email, setEmail] = useState('')
  const [errs, setErrs] = useState({}), [fiche, setFiche] = useState(null)

  const matches = q.trim() ? patients.filter((p) => [p.id, p.nom, p.tel].join(' ').toLowerCase().includes(q.toLowerCase())) : []
  const choisir = (p) => { setPatient(p); setTel(p.tel); setQ(''); setErrs({ ...errs, patient: '' }) }
  const toggle = (e) => { setExams(exams.includes(e) ? exams.filter((x) => x !== e) : [...exams, e]); setErrs({ ...errs, exams: '' }) }

  const enregistrer = () => {
    const er = {}
    if (!patient) er.patient = 'Sélectionnez un patient. Créez son dossier s’il n’existe pas.'
    if (!exams.length) er.exams = 'Sélectionnez au moins un examen.'
    if (!mode) er.mode = 'Choisissez le mode de réception des résultats.'
    if (mode === 'Numérique' && !tel.trim()) er.tel = 'Le téléphone est obligatoire pour une remise numérique.'
    setErrs(er)
    if (Object.keys(er).length) return
    const num = Math.max(...demandes.map((d) => Number(d.ref.slice(-6)))) + 1
    const d = { ref: `DEM-2026-${String(num).padStart(6, '0')}`, patient: patient.nom, date: new Date().toLocaleDateString('fr-FR'), exams: exams.join(', '), statut: 'En cours', remise: mode }
    demandes.unshift(d)
    setFiche({ ...d, dossier: patient.id, liste: exams })
  }

  if (fiche) return (
    <Layout title="Fiche de laboratoire" sub="Demande enregistrée · à remettre au patient pour le laborantin"
      actions={<><button className="btn sec" onClick={() => window.print()}>Imprimer la fiche</button><Link className="btn" to="/demandes">Voir les demandes</Link></>}>
      <div className="a4">
        <div className="a4-head"><Logo /><p className="sub right">Grand-Bassam, Carrefour Bon-Goût<br />Fiche de laboratoire</p></div>
        <p><b>N° de dossier :</b> {fiche.dossier}</p>
        <p><b>Référence de la demande :</b> {fiche.ref}</p>
        <p><b>Patient :</b> {fiche.patient} · <b>Date :</b> {fiche.date}</p>
        <p><b>Mode de réception :</b> <Badge>{fiche.remise}</Badge></p>
        <table><thead><tr><th>Examen demandé</th><th>Résultat (à compléter)</th></tr></thead>
          <tbody>{fiche.liste.map((e) => <tr key={e}><td>{e}</td><td /></tr>)}</tbody></table>
      </div>
    </Layout>
  )

  return (
    <Layout title="Nouvelle demande" sub="Enregistrez les examens du bulletin présenté par le patient"
      actions={<Link className="btn sec" to="/demandes">Annuler</Link>}>
      <div className="grid2">
        <div className="stack">
          <div className="card"><h3>Patient *</h3>
            {patient ? <div className="row between"><div><b>{patient.nom}</b><p className="sub">{patient.id} · {patient.naiss}</p></div>
              <button className="switch" onClick={() => { setPatient(null); setTel('') }}>Changer</button></div>
              : <><input className={errs.patient ? 'invalid' : ''} value={q} onChange={(e) => setQ(e.target.value)} placeholder="N° de dossier, nom ou téléphone…" />
                {matches.map((p) => <p key={p.id}><button className="link" onClick={() => choisir(p)}>{p.nom} · {p.id}</button></p>)}
                {q.trim() && !matches.length && <p className="sub">Aucun patient trouvé. <Link to="/patients" className="link">Créer un dossier</Link></p>}</>}
            {errs.patient && <p className="errt">{errs.patient}</p>}</div>
          <div className="card"><h3>Examens demandés *</h3>
            <div className="form2">{CATALOGUE.map((e) => <label key={e} className="check" style={{ margin: '6px 0' }}><input type="checkbox" checked={exams.includes(e)} onChange={() => toggle(e)} /> {e}</label>)}</div>
            {errs.exams && <p className="errt">{errs.exams}</p>}</div>
        </div>
        <div className="card"><h3>Remise des résultats</h3>
          <Field label="Mode de réception *"><select className={errs.mode ? 'invalid' : ''} value={mode} onChange={(e) => { setMode(e.target.value); setErrs({ ...errs, mode: '' }) }}>
            <option value="">Choisir…</option><option>Physique</option><option>Numérique</option></select></Field>
          {errs.mode && <p className="errt">{errs.mode}</p>}
          <Field label={`Téléphone${mode === 'Numérique' ? ' *' : ''}`}><input className={errs.tel ? 'invalid' : ''} value={tel} onChange={(e) => setTel(e.target.value)} placeholder="07 00 00 00 00" /></Field>
          {errs.tel && <p className="errt">{errs.tel}</p>}
          <Field label="E-mail (facultatif)"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adresse@mail.com" /></Field>
          <div className="alert info">Aucun résultat n’est envoyé par SMS ou e-mail : le patient reçoit seulement une notification.</div>
          <button className="btn block" onClick={enregistrer}>Enregistrer la demande</button></div>
      </div>
    </Layout>
  )
}