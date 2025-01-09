export interface Prospection_Dto {
  id?: string;
  user_id: string;
  city?: string;
  address?: string;
  link?: string;
  seller_id?: string;
  status?: PropertyStatusTypes;
  statusObject?: ProspectionStatus;
  price?: number;
  counter_proposal?: number;
  emission_date?: Date;
  offer_id?: string;
  construction_cost?: number;
  rents?: any;
  resume?: string;
  comment?: string;
}

export type PropertyStatusTypes =
  | "Unresponsive"     // contact en cours mais pas de réponse
  | "Contacted"        // contact en cours mais pas de visite planifiée
  | "Scheduled"        // visite planifiée
  | "Visited"          // visite effectuée
  | "Abandoned"        // bien abandonné pas de souhait d’acquisition
  | "Pending"          // offre envoyée à l’agent ou au particulier en attente de réponse
  | "Declined"         // offre refusée
  | "Countered"        // contre proposition faite
  | "Accepted"         // offre acceptée
  | "Validated"        // date de compromis de vente validée
  | "Signed"           // compromis de vente signé
  | "Completed"        // acquisition terminée
  | "UnderContract"    // bien sous compromis (d’une tierce personne)
  | "Sold";            // bien vendu (par une tierce personne)


export interface ProspectionStatus {
  key: PropertyStatusTypes;
  label: string;
  shortLabel: string;
  color: string;
  colorLight?: string
  icon: string
  iconTheme: "fill" | "outline";
}

const PropertyStatusIcons = {
  Unresponsive: "question-circle", // Icône pour signaler une incertitude
  Contacted: "message",           // Icône pour indiquer un contact
  Scheduled: "calendar",          // Icône pour représenter une planification
  Visited: "eye",                 // Icône pour signifier une visite effectuée
  Abandoned: "stop",              // Icône pour indiquer un abandon
  Pending: "hourglass",           // Icône pour signaler une attente
  Declined: "close-circle",       // Icône pour un refus
  Countered: "swap-left",         // Icône pour une contre-proposition
  Accepted: "check-circle",       // Icône pour une offre acceptée
  CompromiseDate: "date",             // Icône pour une validation
  Signed: "file-done",            // Icône pour signaler une signature
  Completed: "trophy",            // Icône pour une acquisition finalisée
  UnderContract: "form",          // Icône pour un bien sous contrat
  Sold: "lock",                 // Icône pour un bien vendu
};




export const PROSPECTION_STATUS: ProspectionStatus[] = [
  { key: "Unresponsive", label: "Sans réponse", shortLabel: "attente", color: "var(--rentx-prospection-color-unresponsive)", colorLight: "var(--rentx-prospection-color-unresponsive-active)", icon: PropertyStatusIcons.Unresponsive, iconTheme: "fill" },
  { key: "Contacted", label: "Contacté", shortLabel: "contact", color: "var(--rentx-prospection-color-contacted)", colorLight: "var(--rentx-prospection-color-contacted-active)", icon: PropertyStatusIcons.Contacted, iconTheme: "fill" },
  { key: "Scheduled", label: "Visite planifiée", shortLabel: "visite", color: "var(--rentx-prospection-color-scheduled)", colorLight: "var(--rentx-prospection-color-scheduled-active)", icon: PropertyStatusIcons.Scheduled, iconTheme: "fill" },
  { key: "Visited", label: "Visite effectuée", shortLabel: "visite", color: "var(--rentx-prospection-color-visited)", colorLight: "var(--rentx-prospection-color-visited-active)", icon: PropertyStatusIcons.Visited, iconTheme: "fill" },
  { key: "Abandoned", label: "Bien abandonné", shortLabel: "abandonné", color: "var(--rentx-prospection-color-abandoned)", colorLight: "var(--rentx-prospection-color-abandoned-active)", icon: PropertyStatusIcons.Abandoned, iconTheme: "fill" },
  { key: "Pending", label: "Offre envoyée", shortLabel: "envoyé", color: "var(--rentx-prospection-color-pending)", colorLight: "var(--rentx-prospection-color-pending-active)", icon: PropertyStatusIcons.Pending, iconTheme: "fill" },
  { key: "Declined", label: "Offre refusée", shortLabel: "refusée", color: "var(--rentx-prospection-color-declined)", colorLight: "var(--rentx-prospection-color-declined-active)", icon: PropertyStatusIcons.Declined, iconTheme: "fill" },
  { key: "Countered", label: "Contre proposition", shortLabel: "contré", color: "var(--rentx-prospection-color-countered)", colorLight: "var(--rentx-prospection-color-countered-active)", icon: PropertyStatusIcons.Countered, iconTheme: "outline" },
  { key: "Accepted", label: "Offre acceptée", shortLabel: "accepté", color: "var(--rentx-prospection-color-accepted)", colorLight: "var(--rentx-prospection-color-accepted-active)", icon: PropertyStatusIcons.Accepted, iconTheme: "fill" },
  { key: "Validated", label: "Date de compromis de vente validée", shortLabel: "compromis", color: "var(--rentx-prospection-color-validated)", colorLight: "var(--rentx-prospection-color-validated-active)", icon: PropertyStatusIcons.Scheduled, iconTheme: "fill" },
  { key: "Signed", label: "Compromis de vente signé", shortLabel: "compromis", color: "var(--rentx-prospection-color-signed)", colorLight: "var(--rentx-prospection-color-signed-active)", icon: PropertyStatusIcons.Signed, iconTheme: "outline" },
  { key: "Completed", label: "Acquisition terminée", shortLabel: "acquis", color: "var(--rentx-prospection-color-completed)", colorLight: "var(--rentx-prospection-color-completed-active)", icon: PropertyStatusIcons.Completed, iconTheme: "fill" },
  { key: "UnderContract", label: "Bien sous compromis de vente", shortLabel: "perdu", color: "var(--rentx-prospection-color-undercontract", colorLight: "var(--rentx-prospection-color-undercontract-active)", icon: PropertyStatusIcons.UnderContract, iconTheme: "outline" },
  { key: "Sold", label: "Bien vendu", shortLabel: "perdu", color: "var(--rentx-prospection-color-sold)", colorLight: "var(--rentx-prospection-color-sold-active)", icon: PropertyStatusIcons.Sold, iconTheme: "fill" },
]
