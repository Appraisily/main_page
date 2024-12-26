export interface StripeSession {
  customer_details: {
    name: string;
    email: string;
  };
  customer: {
    email: string;
  };
  amount_total: number;
  currency: string;
  payment_status: string;
}