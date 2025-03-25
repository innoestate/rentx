export interface Estate_Post_Request {
  street: string;
  city: string;
  zip: string;
  plot?: string | null;
  rent?: number | null;
  charges?: number | null;
  owner_id?: string | null;
  lodger_id?: string | null;
}
