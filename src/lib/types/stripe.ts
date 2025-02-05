export interface StripeSessionResponse {
  event: 'conversion';
  transactionTotal: number;
  transactionId: string;
  transactionCurrency: string;
  userEmail: string;
  userPhone?: string;
  userFirstName: string;
  userLastName: string;
}