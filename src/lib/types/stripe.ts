export interface StripeSession {
  customer_details: {
    name: string;
    email: string;
  };
  amount_total: number;
  currency: string;
  payment_status: string;
}