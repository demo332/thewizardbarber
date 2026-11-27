// The Wizard Barber — réglages du salon (modifie ici, le site et l'agenda se mettent à jour)

// ⚠️ À COMPLÉTER : les prestations ci-dessous sont des EXEMPLES, remplace-les par celles de The Wizard.
// Pour chaque prestation : nom, durée en minutes, prix affiché, prix en € (pour le chiffre estimé de l'agenda) et couleur dans l'agenda.
// Une prestation de plus de 30 min occupe plusieurs créneaux (ex. 40 min = 2 créneaux de 30 min).
export const SERVICES = [
  { n: 'Coupe homme',               dur: 30, p: 'à partir de 20 €', prix: 20, color: '#3b82f6' },
  { n: 'Coupe + barbe',             dur: 30, p: 'à partir de 30 €', prix: 30, color: '#f59e0b' },
  { n: 'Taille de barbe',           dur: 15, p: 'à partir de 15 €', prix: 15, color: '#14b8a6' },
  { n: 'Coupe enfant',              dur: 30, p: 'à partir de 15 €', prix: 15, color: '#ec4899' }
  // Pour en ajouter une : copie une ligne, mets une virgule entre les lignes et choisis une autre couleur,
  // par exemple '#8b5cf6' (violet), '#ef4444' (rouge), '#a16207' (marron), '#22c55e' (vert).
];

// Le salon (un seul). Son compte admin = cet e-mail + le mot de passe créé dans Firebase > Authentication.
// ⚠️ À COMPLÉTER : l'adresse (laisse '' pour cacher la section « Nous trouver ») et l'e-mail du compte salon.
export const SHOPS = [
  { id: 's1', name: 'The Wizard Barber', addr: '', email: 'bgcoucou25@gmail.com' }
];

// Téléphone du salon affiché sur le site (laisse '' pour ne rien afficher)
export const PHONE = '';

// Compte « gestion » (Firebase > Authentication) : son mot de passe est demandé pour ajouter, modifier ou supprimer un coiffeur.
// ⚠️ Utilise une VRAIE adresse e-mail (sinon impossible de changer le mot de passe plus tard).
export const MANAGER_EMAIL = 'bgcoucou001@gmail.com';

export const OPEN_HOUR = 9;      // ouverture : 9h00   ⚠️ à vérifier
export const CLOSE_HOUR = 19;    // fermeture : 19h00 (dernier créneau 18h30)   ⚠️ à vérifier
export const CLOSED_DAYS = [0];  // jours fermés : 0 = dimanche, 1 = lundi, ... 6 = samedi   ⚠️ à vérifier

// Un coiffeur travaille-t-il ce jour-là ? (d = Date) — tient compte des jours de repos et des congés
export const works = (barber, d) => {
  if (CLOSED_DAYS.includes(d.getDay())) return false;
  if (!barber) return true;
  if ((barber.off || []).includes(d.getDay())) return false;            // jour de repos chaque semaine
  const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  return !(barber.leave || []).some(r => r && k >= r.from && k <= r.to); // congés (du … au …)
};

// Nombre de créneaux de 30 min qu'occupe une prestation
export const slotsFor = s => Math.max(1, Math.ceil(((s && s.dur) || 30) / 30));
