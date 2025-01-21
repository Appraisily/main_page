export interface StripeSessionResponse {
  event: 'conversion';
  transactionTotal: number;
  transactionId: string;
  transactionCurrency: string;
  userEmail: string;
  userPhone?: string;
  userFirstName: string;
  userLastName: string;
  customer_details?: {
    email: string;
    phone?: string;
    name?: string;
  };
}

export interface StripeSession {
  id: string;
  customer_details: {
    email: string;
    phone?: string;
    name?: string;
  };
}