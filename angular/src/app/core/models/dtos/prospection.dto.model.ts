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
  color: string;
  colorLight?: string
}


export const PROSPECTION_STATUS: ProspectionStatus[] = [
  { key: "Unresponsive", label: "Sans réponse", color: "var(--rentx-prospection-color-unresponsive)", colorLight: "var(--rentx-prospection-color-unresponsive-active)" },
  { key: "Contacted", label: "Contacté", color: "var(--rentx-prospection-color-contacted)", colorLight: "var(--rentx-prospection-color-contacted-active)" },
  { key: "Scheduled", label: "Visite planifiée", color: "var(--rentx-prospection-color-scheduled)", colorLight: "var(--rentx-prospection-color-scheduled-active)" },
  { key: "Visited", label: "Visite effectuée", color: "var(--rentx-prospection-color-visited)", colorLight: "var(--rentx-prospection-color-visited-active)" },
  { key: "Abandoned", label: "Bient abandonné", color: "var(--rentx-prospection-color-abandoned)", colorLight: "var(--rentx-prospection-color-abandoned-active)" },
  { key: "Pending", label: "Offre en attente", color: "var(--rentx-prospection-color-pending)", colorLight: "var(--rentx-prospection-color-pending-active)" },
  { key: "Declined", label: "Offre refusée", color: "var(--rentx-prospection-color-declined)", colorLight: "var(--rentx-prospection-color-declined-active)" },
  { key: "Countered", label: "Contre proposition", color: "var(--rentx-prospection-color-countered)", colorLight: "var(--rentx-prospection-color-countered-active)" },
  { key: "Accepted", label: "Offre acceptée", color: "var(--rentx-prospection-color-accepted)", colorLight: "var(--rentx-prospection-color-accepted-active)" },
  { key: "Validated", label: "Date de compromis validée", color: "var(--rentx-prospection-color-validated)", colorLight: "var(--rentx-prospection-color-validated-active)" },
  { key: "Signed", label: "Compromis de vente signé", color: "var(--rentx-prospection-color-signed)", colorLight: "var(--rentx-prospection-color-signed-active)" },
  { key: "Completed", label: "Acquisition terminée", color: "var(--rentx-prospection-color-completed)", colorLight: "var(--rentx-prospection-color-completed-active)" },
  { key: "UnderContract", label: "Bien sous compromis", color: "var(--rentx-prospection-color-undercontract)", colorLight: "var(--rentx-prospection-color-undercontract-active)" },
  { key: "Sold", label: "Bien vendu", color: "var(--rentx-prospection-color-sold)", colorLight: "var(--rentx-prospection-color-sold-active)" }
]
