export interface StripeSessionResponse {
  event: 'conversion';
  customer_details?: {
    email: string;
  };
  transactionTotal: number;
  transactionId: string;
  transactionCurrency: string;
  userEmail: string;
  userPhone?: string;
  userFirstName: string;
  userLastName: string;
  client_reference_id?: string;
}