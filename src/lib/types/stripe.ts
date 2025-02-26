export interface StripeSessionResponse {
  customer_details?: {
    name: string;
    email: string;
  };
  amount_total: number;
  currency: string;
  payment_status: string;
  client_reference_id?: string;
  metadata?: {
    appraisal_type?: string;
    items_count?: string;
  };
}