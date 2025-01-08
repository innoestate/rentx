export interface Prospection_Dto {
  id?: string;
  user_id: string;
  city?: string;
  address?: string;
  link?: string;
  seller_id?: string;
  status?: PropertyStatus;
  price?: number;
  counter_proposal?: number;
  emission_date?: Date;
  offer_id?: string;
  construction_cost?: number;
  rents?: any;
  resume?: string;
  comment?: string;
}

export type PropertyStatus =
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
  key: string;
  label: string;
  color: string;
}

export const PROSPECTION_STATUS: ProspectionStatus[] = [
  { key: "Unresponsive", label: "Sans réponse", color: "var(--rentx-prospection-color-unresponsive)" },
  { key: "Contacted", label: "Contacté", color: "var(--rentx-prospection-color-contacted)" },
  { key: "Scheduled", label: "Visite planifiée", color: "var(--rentx-prospection-color-scheduled)" },
  { key: "Visited", label: "Visite effectuée", color: "var(--rentx-prospection-color-visited)" },
  { key: "Abandoned", label: "Bient abandonné", color: "var(--rentx-prospection-color-abandoned)" },
  { key: "Pending", label: "Offre en attente", color: "var(--rentx-prospection-color-pending)" },
  { key: "Declined", label: "Offre refusée", color: "var(--rentx-prospection-color-declined)" },
  { key: "Countered", label: "Contre proposition", color: "var(--rentx-prospection-color-countered)" },
  { key: "Accepted", label: "Offre acceptée", color: "var(--rentx-prospection-color-accepted)" },
  { key: "Validated", label: "Date de compromis validée", color: "var(--rentx-prospection-color-validated)" },
  { key: "Signed", label: "Compromis de vente signé", color: "var(--rentx-prospection-color-signed)" },
  { key: "Completed", label: "Acquisition terminée", color: "var(--rentx-prospection-color-completed)" },
  { key: "UnderContract", label: "Bien sous compromis", color: "var(--rentx-prospection-color-undercontract)" },
  { key: "Sold", label: "Bien vendu", color: "var(--rentx-prospection-color-sold)" }
]
