export interface AppraisalPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  status: string;
  link: string;
  main_image_url?: string;
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
      width: number;
      height: number;
      type: string;
    }>;
  };
  acf: {
    main: string;
    main_url?: string;
    signature_artwork?: string;
    back_artwork?: string;
    customer_email: string;
    value?: string;
    description?: string;
    condition?: string;
    age_text?: string;
    style?: string;
    conclusion1?: string;
    conclusion2?: string;
    pdflink?: string;
  };
}

export interface DashboardFilters {
  status?: string;
  sortBy?: 'date' | 'value';
  sortOrder?: 'asc' | 'desc';
  category?: string;
  search?: string;
}