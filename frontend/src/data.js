// Données simulées (étape 3 : aucune API réelle)
export const patients = [
  { id: 'DOS-2026-00418', nom: 'Kouassi Aya', naiss: '12/03/1994', sexe: 'Féminin', tel: '07 00 00 00 45', ville: 'Grand-Bassam', last: 'DEM-2026-001253' },
  { id: 'DOS-2026-00391', nom: 'Traoré Ibrahim', naiss: '05/11/1988', sexe: 'Masculin', tel: '05 00 00 00 12', ville: 'Grand-Bassam', last: 'DEM-2026-001252' },
  { id: 'DOS-2026-00377', nom: 'N’Guessan Marie', naiss: '23/07/2001', sexe: 'Féminin', tel: '01 00 00 00 78', ville: 'Abidjan', last: 'DEM-2026-001251' },
]
export const demandes = [
  { ref: 'DEM-2026-001253', patient: 'Kouassi Aya', date: '22/10/2026', exams: 'NFS, Glycémie', statut: 'En cours', remise: 'Numérique' },
  { ref: 'DEM-2026-001252', patient: 'Traoré Ibrahim', date: '22/10/2026', exams: 'Goutte épaisse', statut: 'Validé', remise: 'Physique' },
  { ref: 'DEM-2026-001251', patient: 'N’Guessan Marie', date: '21/10/2026', exams: 'CRP, Créatinine', statut: 'À valider', remise: 'Numérique' },
]
export const historique = [
  { ref: 'DEM-2026-001253', date: '22/10/2026', exams: 'NFS, Glycémie', statut: 'En cours d’analyse', t: 'info' },
  { ref: 'DEM-2026-001102', date: '14/09/2026', exams: 'Groupe sanguin', statut: 'Résultats remis', t: 'ok' },
  { ref: 'DEM-2026-000987', date: '03/08/2026', exams: 'CRP', statut: 'Résultats remis', t: 'ok' },
]
export const statutTon = { 'En cours': 'info', 'Validé': 'ok', 'À valider': 'warn' }
export const CODE_OTP_SIMULE = '123456'
