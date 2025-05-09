export interface InvestorProfileField {
  id: string;
  user_id: string;
  field: string;
  field_fr: string;
  value: string;
  create_ad: string;
  update_at: string;
}

export interface InvestorProfileResponse {
  status: string;
  data: InvestorProfileField[];
  data_fr: InvestorProfileField[];
}
