export interface ProspectionDto {
    user_id: string;
    city?: string;
    address?: string;
    zip?: string;
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
    storage_folder_id?: string
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

export const PropertyStatusTranslation: { [key in PropertyStatus]: string } = {
    "Unresponsive": "Sans réponse",
    "Contacted": "Contacté",
    "Scheduled": "Visite planifiée",
    "Visited": "Visite effectuée",
    "Abandoned": "Bien abandonné",
    "Pending": "Offre envoyée",
    "Declined": "Offre refusée",
    "Countered": "Contre proposition faite",
    "Accepted": "Offre acceptée",
    "Validated": "Date de compromis de vente validée",
    "Signed": "Compromis de vente signé",
    "Completed": "Acquisition terminée",
    "UnderContract": "Bien sous compromis",
    "Sold": "Bien vendu",
};

