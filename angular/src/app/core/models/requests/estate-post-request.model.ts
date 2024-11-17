export interface Estate_Post_Request {
  street: string;
  city: string;
  zip: string;
  rent?: number | null;
  charges?: number | null;
  owner?: string | null;
  lodger?: string | null;
}
