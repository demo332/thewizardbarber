// The Wizard Barber — réglages du salon (modifie ici, le site et l'agenda se mettent à jour)

// Le salon (un seul). Son compte admin = cet e-mail + le mot de passe créé dans Firebase > Authentication.
// Adresse (laisse '' pour cacher la section « Nous trouver ») et e-mail du compte salon.
export const SHOPS = [
  { id: 's1', name: 'The Wizard Barber', addr: '1 Av. des Falaises, 27100 Val-de-Reuil', email: 'bgcoucou25@gmail.com' }
];

// Téléphone du salon affiché sur le site (laisse '' pour ne rien afficher)
export const PHONE = '';

// Compte « gestion » (Firebase > Authentication) : son mot de passe est demandé pour ajouter, modifier ou supprimer un coiffeur.
// ⚠️ Utilise une VRAIE adresse e-mail (sinon impossible de changer le mot de passe plus tard).
export const MANAGER_EMAIL = 'bgcoucou001@gmail.com';

export const OPEN_HOUR = 9;      // ouverture : 9h00   ⚠️ à vérifier
export const CLOSE_HOUR = 19;    // fermeture : 19h00 (les prestations doivent finir avant)   ⚠️ à vérifier
export const CLOSED_DAYS = [0];  // jours fermés : 0 = dimanche, 1 = lundi, ... 6 = samedi   ⚠️ à vérifier

// Un coiffeur travaille-t-il ce jour-là ? (d = Date) — tient compte des jours de repos et des congés
export const works = (barber, d) => {
  if (CLOSED_DAYS.includes(d.getDay())) return false;
  if (!barber) return true;
  if ((barber.off || []).includes(d.getDay())) return false;            // jour de repos chaque semaine
  const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  return !(barber.leave || []).some(r => r && k >= r.from && k <= r.to); // congés (du … au …)
};

// Les créneaux font STEP minutes (5 = précision de 5 min). Une prestation occupe autant de créneaux que nécessaire.
export const STEP = 5;
export const SLOTS = [];
for (let m = OPEN_HOUR * 60; m < CLOSE_HOUR * 60; m += STEP) SLOTS.push(String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'));
// Nombre de créneaux qu'occupe une prestation de « dur » minutes
export const slotsFor = dur => Math.max(1, Math.ceil((Number(dur) || 30) / STEP));

// Couleur d'une prestation dans l'agenda (toujours la même pour un même nom)
const PALETTE = ['#3b82f6', '#f59e0b', '#14b8a6', '#ec4899', '#8b5cf6', '#ef4444', '#22c55e', '#a16207', '#0ea5e9', '#d946ef'];
export const serviceColor = name => { let h = 0; for (const c of String(name || '')) h = (h * 31 + c.charCodeAt(0)) >>> 0; return PALETTE[h % PALETTE.length]; };

// Équipe de départ : importée une seule fois depuis l'admin (bouton « Importer l'équipe »).
// Ensuite, tout se gère dans l'admin : coiffeurs, prestations, repos et congés.
const P = 'Paiement en espèces préférable.';
export const DEFAULT_TEAM = [
  { id: 'yoris', name: 'Yoris', services: [
    { n: 'Coupe', dur: 30, price: 20 },
    { n: 'Coupe + Barbe', dur: 30, price: 25 },
    { n: 'Coupe + Barbe + Shampoing + Coiffage', dur: 35, price: 30 },
    { n: 'Coupe Enfant (-12 ans)', dur: 20, price: 13 },
    { n: 'Coupe Enfant de 12 ans à 16 ans', dur: 25, price: 15 },
    { n: 'Barbe en Dégradé', dur: 15, price: 15 },
    { n: "Barbe à l'ancienne + rasage + Serviette chaude", dur: 15, price: 17 },
    { n: 'Coupe + Rituel de Barbe (Serviette Chaude)', dur: 45, price: 30 }
  ] },
  { id: 'sado', name: 'Sado', services: [
    { n: 'Coupe', dur: 30, price: 20 },
    { n: 'Coupe + Barbe', dur: 30, price: 25 },
    { n: 'Coupe + Barbe + Shampoing + Coiffage', dur: 35, price: 30 },
    { n: 'Coupe Enfant (-12 ans)', dur: 20, price: 13 },
    { n: 'Coupe Enfant de 12 ans à 16 ans', dur: 25, price: 15 },
    { n: 'Barbe en Dégradé', dur: 15, price: 15 },
    { n: "Barbe à l'ancienne + Rasage + Serviette chaude", dur: 15, price: 17 }
  ] },
  { id: 'mathieu', name: 'Mathieu', services: [
    { n: 'Coupe + shampooing', dur: 35, price: 23 },
    { n: 'Coupe', d: P, dur: 35, price: 20 },
    { n: 'Coupe + shampooing de 12 à 18 ans', dur: 35, price: 18 },
    { n: 'Coupe de 12 à 18 ans', d: P, dur: 35, price: 15 },
    { n: 'Coupe + Barbe', d: P, dur: 35, price: 25 },
    { n: 'Coupe -12 ans', d: P, dur: 35, price: 15 },
    { n: 'Coupe Transformation', d: P, dur: 60, price: 30 },
    { n: 'Barbe', d: P, dur: 15, price: 10 }
  ] },
  { id: 'momo', name: 'Momo', services: [
    { n: 'Coupe', dur: 35, price: 20 },
    { n: 'Coupe + Barbe', dur: 35, price: 25 },
    { n: 'Coupe Enfant de 12 ans à 16 ans', dur: 30, price: 15 },
    { n: 'Coupe Enfant (-12 ans)', dur: 25, price: 13 }
  ] }
];
