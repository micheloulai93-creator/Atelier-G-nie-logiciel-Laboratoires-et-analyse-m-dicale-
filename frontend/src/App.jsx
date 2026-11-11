import { Navigate, Route, Routes } from 'react-router-dom'
import { Login, Dashboard, Patients, PatientDetail, Demandes, ComptesRendus } from './pages/Staff.jsx'
import { Notifications, Utilisateurs, Parametres } from './pages/Admin.jsx'
import Portail from './pages/Portail.jsx'
import NouvelleDemande from './pages/NouvelleDemande.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/:id" element={<PatientDetail />} />
      <Route path="/demandes" element={<Demandes />} />
      <Route path="/demandes/nouvelle" element={<NouvelleDemande />} />
      <Route path="/comptes-rendus" element={<ComptesRendus />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/utilisateurs" element={<Utilisateurs />} />
      <Route path="/parametres" element={<Parametres />} />
      <Route path="/portail" element={<Portail />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}