import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge, Field, Layout, Logo, Modal } from '../components.jsx'
import { demandes, historique, patients, statutTon } from '../data.js'

export function Login() {
  const nav = useNavigate()
  const [id, setId] = useState(''), [pw, setPw] = useState(''), [err, setErr] = useState(false), [forgot, setForgot] = useState(false)
  const [sent, setSent] = useState(false)
  const submit = (e) => { e.preventDefault(); if (id && pw) nav('/dashboard'); else setErr(true) }
  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={submit}>
        <div className="center"><Logo size="lg" /></div>
        <p className="eyebrow">Espace du personnel</p><h1>Connexion</h1>
        <Field label="Identifiant"><input value={id} onChange={(e) => setId(e.target.value)} placeholder="Votre identifiant" /></Field>
        <Field label="Mot de passe"><input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" /></Field>
        <div className="row between"><label className="check"><input type="checkbox" /> Rester connecté</label>
          <button type="button" className="link" onClick={() => setForgot(true)}>Mot de passe oublié ?</button></div>
        <button className="btn" type="submit">Se connecter</button>
        {err && <div className="alert err">Identifiant ou mot de passe incorrect.</div>}
        <p className="note">Accès réservé au personnel autorisé. Les connexions sont enregistrées.</p>
        <p className="note"><Link to="/portail" className="link">Accéder au portail patient (maquette mobile)</Link></p>
      </form>
      {forgot && (
        <Modal narrow title="Mot de passe oublié" sub="Une demande sera transmise pour réinitialiser votre accès."
          actions={<><button className="btn sec" onClick={() => { setForgot(false); setSent(false) }}>Annuler</button>
            <button className="btn" onClick={() => setSent(true)}>Envoyer la demande</button></>}>
          <Field label="Adresse e-mail ou identifiant"><input placeholder="a.koffi@" /></Field>
          {sent && <div className="alert ok">Si le compte existe, une demande de réinitialisation est enregistrée.</div>}
        </Modal>
      )}
    </div>
  )
}

const Stat = ({ l, v }) => <div className="card stat"><span className="sub">{l}</span><b>{v}</b></div>

export function Dashboard() {
  const nav = useNavigate()
  return (
    <Layout title="Tableau de bord" sub="Vue d’ensemble de l’activité du laboratoire">
      <div className="grid4"><Stat l="Demandes du jour" v="24" /><Stat l="En cours" v="11" /><Stat l="À valider" v="6" /><Stat l="À remettre" v="9" /></div>
      <div className="grid-main">
        <div className="card"><h3>Demandes récentes</h3>
          <table><thead><tr><th>Référence</th><th>Patient</th><th>Examens</th><th>Remise</th><th>Statut</th></tr></thead>
            <tbody>{demandes.map((d) => <tr key={d.ref}><td>{d.ref}</td><td>{d.patient}</td><td>{d.exams}</td>
              <td><Badge>{d.remise}</Badge></td><td><Badge t={statutTon[d.statut]}>{d.statut}</Badge></td></tr>)}</tbody></table></div>
        <div className="card"><h3>À traiter</h3>
          <p>Résultats à valider <Badge t="warn">6</Badge></p><p>Échecs de notification <Badge t="err">2</Badge></p><p>Remises en attente <Badge>9</Badge></p>
          <button className="btn block" onClick={() => nav('/patients')}>Nouveau patient</button>
          <button className="btn sec block" onClick={() => nav('/demandes/nouvelle')}>Nouvelle demande</button></div>
      </div>
    </Layout>
  )
}

export function Patients() {
  const [open, setOpen] = useState(false), [q, setQ] = useState('')
  const [nom, setNom] = useState(''), [prenom, setPrenom] = useState('')
  const list = patients.filter((p) => [p.id, p.nom, p.tel].join(' ').toLowerCase().includes(q.toLowerCase()))
  const dup = patients.find((p) => nom && prenom && p.nom.toLowerCase() === `${nom} ${prenom}`.trim().toLowerCase())
  const close = () => { setOpen(false); setNom(''); setPrenom('') }
  return (
    <Layout title="Patients" sub="Recherchez un patient avant de créer un dossier"
      actions={<button className="btn" onClick={() => setOpen(true)}>Ajouter un patient</button>}
      overlay={open && (
        <Modal title="Ajouter un patient" sub="Les champs marqués * sont obligatoires"
          actions={<><button className="btn sec" onClick={close}>Annuler</button>
            {dup && <Link className="btn sec" to={`/patients/${dup.id}`}>Consulter le dossier existant</Link>}
            <button className="btn" onClick={close}>Enregistrer</button></>}>
          <div className="form2">
            <Field label="Nom *"><input value={nom} onChange={(e) => setNom(e.target.value)} /></Field>
            <Field label="Prénom *"><input value={prenom} onChange={(e) => setPrenom(e.target.value)} /></Field>
            <Field label="Sexe *"><input placeholder="Féminin / Masculin" /></Field>
            <Field label="Date de naissance *"><input placeholder="JJ/MM/AAAA" /></Field>
            <Field label="Téléphone *"><input placeholder="07 00 00 00 00" /></Field>
            <Field label="E-mail (facultatif)"><input placeholder="adresse@mail.com" /></Field>
            <Field label="Adresse (facultatif)"><input /></Field>
            <Field label="Identifiant de dossier"><input disabled placeholder="Généré : DOS-2026-00419" /></Field>
          </div>
          {dup && <div className="alert warn"><b>Doublon potentiel :</b> {dup.nom} ({dup.id}, née le {dup.naiss}) ressemble à ce patient. Consultez ce dossier avant de continuer.</div>}
        </Modal>)}>
      <div className="toolbar"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="N° de dossier, nom ou téléphone…" /><button className="btn sec">Filtres</button></div>
      <div className="card"><table><thead><tr><th>N° dossier</th><th>Patient</th><th>Naissance</th><th>Téléphone</th><th>Dernière demande</th><th /></tr></thead>
        <tbody>{list.map((p) => <tr key={p.id}><td>{p.id}</td><td>{p.nom}</td><td>{p.naiss}</td><td>{p.tel}</td><td>{p.last}</td>
          <td><Link className="badge info" to={`/patients/${p.id}`}>Ouvrir</Link></td></tr>)}</tbody></table></div>
    </Layout>
  )
}

export function PatientDetail() {
  const { id } = useParams(); const nav = useNavigate()
  const p = patients.find((x) => x.id === id) || patients[0]
  return (
    <Layout title="Fiche patient" sub={p.id} actions={<button className="btn sec" onClick={() => nav('/comptes-rendus')}>Comptes rendus</button>}>
      <div className="grid-detail">
        <div className="card"><h2>{p.nom}</h2><Badge t="ok">Dossier actif</Badge>
          <p className="sub">Dossier <b>{p.id}</b></p><p className="sub">Naissance <b>{p.naiss} · {p.sexe}</b></p>
          <p className="sub">Téléphone <b>{p.tel}</b></p><p className="sub">Ville <b>{p.ville}</b></p>
          <button className="btn sec block">Modifier le patient</button><button className="btn block" onClick={() => nav('/demandes/nouvelle?patient=' + p.id)}>Nouvelle demande</button></div>
        <div className="card"><h3>Historique des demandes</h3>
          <table><thead><tr><th>Référence</th><th>Date</th><th>Examens</th><th>Statut</th></tr></thead>
            <tbody>{historique.map((h) => <tr key={h.ref}><td>{h.ref}</td><td>{h.date}</td><td>{h.exams}</td><td><Badge t={h.t}>{h.statut}</Badge></td></tr>)}</tbody></table></div>
      </div>
    </Layout>
  )
}

const TABS = ['Toutes', 'En cours', 'À valider', 'Validées', 'À remettre']
export function Demandes() {
  const [tab, setTab] = useState('Toutes'), [sel, setSel] = useState(null)
  const [hb, setHb] = useState(''), [gly] = useState('0,92'), [msg, setMsg] = useState('')
  const filt = { 'En cours': 'En cours', 'À valider': 'À valider', Validées: 'Validé' }
  const rows = demandes.filter((d) => tab === 'Toutes' || tab === 'À remettre' ? tab === 'Toutes' || d.remise === 'Numérique' : d.statut === filt[tab])
  const close = () => { setSel(null); setHb(''); setMsg('') }
  const submit = () => (hb ? close() : setMsg('Un résultat est manquant : envoi en validation impossible.'))
  return (
    <Layout title="Demandes d’examens" sub="Suivi complet : saisie, validation et remise depuis le détail"
      actions={<Link className="btn" to="/demandes/nouvelle">Nouvelle demande</Link>}
      overlay={sel && (
        <Modal title="Saisie des résultats" sub={`${sel.ref} · ${sel.patient} · Non définitif tant que non validé`}
          actions={<><button className="btn sec" onClick={close}>Fermer</button><button className="btn sec" onClick={close}>Enregistrer le brouillon</button>
            <button className="btn" onClick={submit}>Soumettre à validation</button></>}>
          <table><thead><tr><th>Paramètre</th><th>Résultat</th><th>Unité</th><th>Référence</th><th>Statut</th></tr></thead><tbody>
            <tr><td>Glycémie</td><td>{gly}</td><td>g/L</td><td>0,70 – 1,10</td><td><Badge t="ok">Saisi</Badge></td></tr>
            <tr><td>Hémoglobine</td><td><input className={`mini ${!hb ? 'invalid' : ''}`} value={hb} onChange={(e) => { setHb(e.target.value); setMsg('') }} /></td>
              <td>g/dL</td><td>12 – 16</td><td>{hb ? <Badge t="ok">Saisi</Badge> : <Badge t="err">À compléter</Badge>}</td></tr></tbody></table>
          {(msg || !hb) && <div className="alert warn">Un résultat est manquant : envoi en validation impossible.</div>}
        </Modal>)}>
      <div className="tabs">{TABS.map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      <div className="card"><table><thead><tr><th>Référence</th><th>Patient</th><th>Date</th><th>Examens</th><th>Statut</th><th /></tr></thead>
        <tbody>{rows.map((d) => <tr key={d.ref}><td>{d.ref}</td><td>{d.patient}</td><td>{d.date}</td><td>{d.exams}</td>
          <td><Badge t={statutTon[d.statut]}>{d.statut}</Badge></td><td><button className="badge info" onClick={() => setSel(d)}>Ouvrir</button></td></tr>)}</tbody></table></div>
    </Layout>
  )
}

export function ComptesRendus() {
  return (
    <Layout title="Comptes rendus" sub="Prévisualisation A4 · disponible après validation"
      actions={<><button className="btn sec" onClick={() => window.print()}>Imprimer</button><button className="btn">Télécharger le PDF</button></>}>
      <div className="a4">
        <div className="a4-head"><Logo /><p className="sub right">Grand-Bassam, Carrefour Bon-Goût<br />Compte rendu d’analyses</p></div>
        <p><b>Patient :</b> Kouassi Aya · DOS-2026-00418 · DEM-2026-001253 · 22/10/2026</p>
        <table><thead><tr><th>Examen</th><th>Résultat</th><th>Unité</th><th>Référence</th></tr></thead><tbody>
          <tr><td>Glycémie</td><td>0,92</td><td>g/L</td><td>0,70 – 1,10</td></tr><tr><td>Hémoglobine</td><td>13,4</td><td>g/dL</td><td>12 – 16</td></tr></tbody></table>
        <p className="okt">Résultats validés le 22/10/2026 par une personne habilitée.</p>
      </div>
    </Layout>
  )
}

export const Placeholder = ({ title }) => (
  <Layout title={title} sub="Pas de maquette fournie pour cet écran"><div className="card"><p className="sub">Écran à venir.</p></div></Layout>
)