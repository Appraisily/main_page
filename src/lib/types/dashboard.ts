export interface AppraisalPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  status: string;
  acf: {
    main: string;
    signature_artwork?: string;
    back_artwork?: string;
    customer_email: string;
    value?: string;
    description?: string;
  };
}

export interface DashboardFilters {
  status?: string;
  sortBy?: 'date' | 'value';
  sortOrder?: 'asc' | 'desc';
}