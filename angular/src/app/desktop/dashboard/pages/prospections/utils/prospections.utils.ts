import { Prospection } from "src/app/core/models/prospection.model";

interface ProspectionColumn {
  title: string;
  compare: (a: Prospection, b: Prospection) => number;
  priority: number;
  sort?: boolean
}

export const PROSPECTION_COLUMNS: ProspectionColumn[] = [
  { sort: true, title: 'ville', compare: (a: Prospection, b: Prospection) => a.city?.localeCompare(b.city??''), priority: 1 },
  { sort: true, title: 'CP', compare: (a: Prospection, b: Prospection) => a.zip?.localeCompare(b.zip??''), priority: 2 },
  { sort: true, title: 'adresse', compare: (a: Prospection, b: Prospection) => a.address?.localeCompare(b.address??''), priority: 3 },
  { sort: true, title: 'lien', compare: (a: Prospection, b: Prospection) => a.link?.localeCompare(b.link??''), priority: 4 },
  { sort: true, title: 'vendeur', compare: (a: Prospection, b: Prospection) => a.seller?.name?.localeCompare(b.seller?.name??''), priority: 5 },
  { sort: true, title: 'prix', compare: (a: Prospection, b: Prospection) => (a.price??0) - (b.price??0), priority: 6 },
  { title: 'parution', compare: (a, b) => 0, priority: 7 },
  { title: 'offre', compare: (a, b) => 0, priority: 8 },
  { sort: true,title: 'status', compare: (a: Prospection, b: Prospection) => a.status?.localeCompare(b.status??''), priority: 1 },
  { title: 'actions', compare: (a, b) => 0, priority: 10 }
]
