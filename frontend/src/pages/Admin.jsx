import { useState } from 'react'
import { Badge, Field, Layout, Modal } from '../components.jsx'

const maintenant = () => new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }).replace(',', '')

/* ---------- EPIC-08 · Notifications (centre de notifications du personnel) ---------- */
const TON = { 'À valider': 'warn', 'Échec d’envoi': 'err', 'Remise en attente': 'info', 'Validé': 'ok', 'En cours': 'info' }
export function Notifications() {
  const [list, setList] = useState([
    { id: 1, type: 'À valider', msg: '6 résultats sont en attente de validation.', date: '11/11/2026 08:30', lu: false },
    { id: 2, type: 'Échec d’envoi', msg: 'La notification de DEM-2026-001251 n’a pas pu être envoyée.', date: '11/11/2026 08:02', lu: false, echec: true },
    { id: 3, type: 'Échec d’envoi', msg: 'La notification de DEM-2026-001102 n’a pas pu être envoyée.', date: '10/11/2026 16:48', lu: false, echec: true },
    { id: 4, type: 'Remise en attente', msg: '9 comptes rendus attendent leur remise.', date: '10/11/2026 15:10', lu: true },
    { id: 5, type: 'Validé', msg: 'DEM-2026-001252 a été validée.', date: '10/11/2026 11:25', lu: true },
  ])
  const [tab, setTab] = useState('Toutes')
  const rows = list.filter((n) => tab === 'Toutes' || !n.lu)
  const lire = (id) => setList(list.map((n) => (n.id === id ? { ...n, lu: true } : n)))
  const renvoyer = (id) => setList(list.map((n) => (n.id === id ? { ...n, type: 'En cours', echec: false, lu: true, msg: n.msg.replace('n’a pas pu être envoyée', 'est en cours de renvoi') } : n)))
  const nonLues = list.filter((n) => !n.lu).length
  return (
    <Layout title="Notifications" sub="Événements du workflow à traiter · aucune donnée médicale n’y figure"
      actions={<button className="btn sec" onClick={() => setList(list.map((n) => ({ ...n, lu: true })))} disabled={!nonLues}>Tout marquer comme lu</button>}>
      <div className="tabs">{[['Toutes'], ['Non lues', nonLues]].map(([t, c]) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}{c ? ` (${c})` : ''}</button>)}</div>
      <div className="card"><table><thead><tr><th>Type</th><th>Message</th><th>Date</th><th>État</th><th /></tr></thead>
        <tbody>{rows.map((n) => <tr key={n.id} style={{ fontWeight: n.lu ? 400 : 600 }}>
          <td><Badge t={TON[n.type]}>{n.type}</Badge></td><td>{n.msg}</td><td>{n.date}</td><td>{n.lu ? 'Lue' : 'Non lue'}</td>
          <td>{n.echec && <button className="badge info" onClick={() => renvoyer(n.id)}>Renvoyer</button>} {!n.lu && <button className="switch" onClick={() => lire(n.id)}>Marquer comme lue</button>}</td></tr>)}
          {!rows.length && <tr><td colSpan="5" className="sub">Aucune notification non lue.</td></tr>}</tbody></table></div>
    </Layout>
  )
}

/* ---------- EPIC-09 · Utilisateurs et sécurité ---------- */
const ROLES = ['Administrateur', 'Accueil / personnel autorisé', 'Personnel de laboratoire', 'Validateur habilité']
export function Utilisateurs() {
  const [users, setUsers] = useState([
    { id: 1, nom: 'A. Koffi', login: 'a.koffi', role: ROLES[0], actif: true, last: '11/11/2026 08:12' },
    { id: 2, nom: 'M. Yao', login: 'm.yao', role: ROLES[3], actif: true, last: '10/11/2026 17:45' },
    { id: 3, nom: 'S. Traoré', login: 's.traore', role: ROLES[2], actif: true, last: '10/11/2026 09:30' },
    { id: 4, nom: 'K. Bamba', login: 'k.bamba', role: ROLES[1], actif: false, last: '02/10/2026 12:03' },
  ])
  const [audit, setAudit] = useState([
    { d: '11/11/2026 08:12', u: 'a.koffi', a: 'Connexion réussie', o: '—' },
    { d: '10/11/2026 17:50', u: 'm.yao', a: 'Validation des résultats', o: 'DEM-2026-001252' },
    { d: '10/11/2026 09:28', u: 's.traore', a: 'Connexion refusée', o: '—' },
    { d: '10/11/2026 09:10', u: 'a.koffi', a: 'Changement de rôle', o: 'k.bamba' },
  ])
  const [open, setOpen] = useState(false), [f, setF] = useState({ nom: '', login: '', role: ROLES[1] }), [err, setErr] = useState('')
  const log = (a, o) => setAudit((l) => [{ d: maintenant(), u: 'a.koffi', a, o }, ...l])
  const changerRole = (u, role) => { setUsers(users.map((x) => (x.id === u.id ? { ...x, role } : x))); log('Changement de rôle', u.login) }
  const bascule = (u) => { setUsers(users.map((x) => (x.id === u.id ? { ...x, actif: !x.actif } : x))); log(u.actif ? 'Désactivation du compte' : 'Réactivation du compte', u.login) }
  const ajouter = () => {
    const login = f.login.trim().toLowerCase()
    if (!f.nom.trim() || !login) return setErr('Le nom et l’identifiant sont obligatoires.')
    if (users.some((u) => u.login === login)) return setErr('Cet identifiant existe déjà.')
    setUsers([...users, { id: Date.now(), nom: f.nom.trim(), login, role: f.role, actif: true, last: 'Jamais' }]); log('Création de compte', login)
    setOpen(false); setErr(''); setF({ nom: '', login: '', role: ROLES[1] })
  }
  return (
    <Layout title="Utilisateurs et sécurité" sub="Comptes du personnel, rôles et journal d’audit"
      actions={<button className="btn" onClick={() => setOpen(true)}>Ajouter un utilisateur</button>}
      overlay={open && (
        <Modal narrow title="Ajouter un utilisateur" sub="Les champs marqués * sont obligatoires"
          actions={<><button className="btn sec" onClick={() => { setOpen(false); setErr('') }}>Annuler</button><button className="btn" onClick={ajouter}>Enregistrer</button></>}>
          <Field label="Nom complet *"><input value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} /></Field>
          <Field label="Identifiant *"><input className={err.includes('existe') ? 'invalid' : ''} value={f.login} onChange={(e) => setF({ ...f, login: e.target.value })} /></Field>
          <Field label="Rôle *"><select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
          {err && <div className="alert err">{err}</div>}
        </Modal>)}>
      <div className="stack">
        <div className="card"><h3>Comptes</h3><table><thead><tr><th>Nom</th><th>Identifiant</th><th>Rôle</th><th>Dernière connexion</th><th>Statut</th><th /></tr></thead>
          <tbody>{users.map((u) => <tr key={u.id}><td>{u.nom}</td><td>{u.login}</td>
            <td><select value={u.role} onChange={(e) => changerRole(u, e.target.value)} disabled={u.login === 'a.koffi'}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></td>
            <td>{u.last}</td><td><Badge t={u.actif ? 'ok' : 'warn'}>{u.actif ? 'Actif' : 'Désactivé'}</Badge></td>
            <td>{u.login === 'a.koffi' ? <span className="sub">Votre compte</span> : <button className="switch" onClick={() => bascule(u)}>{u.actif ? 'Désactiver' : 'Réactiver'}</button>}</td></tr>)}</tbody></table>
          <p className="muted-row">Les intitulés et permissions des rôles restent à confirmer par le centre (backlog, §1.2).</p></div>
        <div className="card"><h3>Journal d’audit</h3><table><thead><tr><th>Date</th><th>Utilisateur</th><th>Action</th><th>Objet</th></tr></thead>
          <tbody>{audit.map((a, i) => <tr key={i}><td>{a.d}</td><td>{a.u}</td><td>{a.a}</td><td>{a.o}</td></tr>)}</tbody></table></div>
      </div>
    </Layout>
  )
}

/* ---------- EPIC-10 · Paramètres ---------- */
const ONGLETS = ['Établissement', 'Compte rendu', 'Sécurité', 'Préférences']
export function Parametres() {
  const [tab, setTab] = useState(ONGLETS[0]), [msg, setMsg] = useState(null)
  const [v, setV] = useState({ nom: 'Centre Médical Anne-Mathias', adresse: 'Grand-Bassam, Carrefour Bon-Goût', tel: '', pied: 'Document confidentiel – remis au patient ou à son représentant.', adr: true,
    code: '5', essais: '3', portail: '15', session: '30', lignes: '10', compact: false })
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }); setMsg(null) }
  const save = () => {
    if (!v.nom.trim() || !v.adresse.trim()) return setMsg({ t: 'err', m: 'Le nom et l’adresse du centre sont obligatoires.' })
    if (['code', 'essais', 'portail', 'session'].some((k) => !(Number(v[k]) >= 1))) return setMsg({ t: 'err', m: 'Les durées et limites doivent être supérieures ou égales à 1.' })
    setMsg({ t: 'ok', m: 'Paramètres enregistrés (simulation).' })
  }
  return (
    <Layout title="Paramètres" sub="Établissement, compte rendu, sécurité et préférences" actions={<button className="btn" onClick={save}>Enregistrer</button>}>
      {msg && <div className={`alert ${msg.t}`}>{msg.m}</div>}
      <div className="tabs">{ONGLETS.map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      {tab === 'Établissement' && <div className="card"><h3>Informations utilisées dans les documents</h3>
        <Field label="Nom du centre *"><input value={v.nom} onChange={set('nom')} /></Field>
        <Field label="Adresse *"><input value={v.adresse} onChange={set('adresse')} /></Field>
        <Field label="Téléphone"><input value={v.tel} onChange={set('tel')} placeholder="07 00 00 00 00" /></Field></div>}
      {tab === 'Compte rendu' && <div className="grid2"><div className="card"><h3>Modèle de compte rendu</h3>
        <label className="check"><input type="checkbox" checked disabled /> Mention de validation (obligatoire)</label>
        <label className="check" style={{ marginTop: 10 }}><input type="checkbox" checked={v.adr} onChange={set('adr')} /> Afficher l’adresse dans l’en-tête</label>
        <Field label="Pied de page"><input value={v.pied} onChange={set('pied')} /></Field></div>
        <div className="card"><h3>Aperçu</h3><p><b>{v.nom}</b></p>{v.adr && <p className="sub">{v.adresse}</p>}<p className="sub">Compte rendu d’analyses</p>
          <p className="okt">Résultats validés le 22/10/2026 par une personne habilitée.</p><p className="note">{v.pied}</p></div></div>}
      {tab === 'Sécurité' && <div className="card"><h3>Options de sécurité</h3><div className="form2">
        <Field label="Validité du code patient (minutes)"><input type="number" min="1" value={v.code} onChange={set('code')} /></Field>
        <Field label="Tentatives de code autorisées"><input type="number" min="1" value={v.essais} onChange={set('essais')} /></Field>
        <Field label="Inactivité maximale – portail patient (minutes)"><input type="number" min="1" value={v.portail} onChange={set('portail')} /></Field>
        <Field label="Inactivité maximale – personnel (minutes)"><input type="number" min="1" value={v.session} onChange={set('session')} /></Field></div>
        <p className="muted-row">Réservé aux administrateurs. Ces valeurs sont à valider avec la clinique.</p></div>}
      {tab === 'Préférences' && <div className="card"><h3>Préférences d’interface</h3>
        <Field label="Lignes par page"><select value={v.lignes} onChange={set('lignes')}><option>10</option><option>25</option><option>50</option></select></Field>
        <label className="check"><input type="checkbox" checked={v.compact} onChange={set('compact')} /> Affichage compact</label>
        <p className="muted-row">Ces préférences ne modifient ni les règles métier ni les permissions.</p></div>}
    </Layout>
  )
}
