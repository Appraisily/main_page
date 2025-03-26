import { 
  Camera, 
  FileCheck, 
  Scale, 
  Shield, 
  Search, 
  DollarSign, 
  History, 
  FileText, 
  Landmark, 
  Receipt, 
  FileSpreadsheet, 
  Award, 
  Database, 
  Zap, 
  BarChart3, 
  Globe, 
  Bot, 
  LineChart
} from 'lucide-react';

const IMAGEKIT_URL = 'https://ik.imagekit.io/appraisily/WebPage';

export const services = [
  {
    title: 'Regular Appraisal',
    description: 'Comprehensive evaluation of your art or antique pieces with detailed market analysis.',
    icon: Scale,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-64,h-64`,
    features: [
      { text: 'Expert Analysis', icon: Search },
      { text: 'Market Valuation', icon: DollarSign },
      { text: 'Historical Research', icon: History },
      { text: 'Documentation', icon: FileText }
    ],
    action: {
      type: 'video' as const,
      videoId: 'mHxD5DzRKM8',
      title: 'Regular Appraisal Process'
    },
    details: {
      included: [
        'Detailed condition assessment and documentation',
        'Current market value analysis',
        'Historical research and provenance verification',
        'High-resolution photo analysis',
        'Complete digital appraisal report',
        'Digital certificate of appraisal',
        'Market comparables analysis',
        'Conservation recommendations'
      ],
      process: [
        'Submit photos and description of your item through our secure platform',
        'Our experts identify the item and conduct initial research using our comprehensive database',
        'You receive a preliminary assessment with initial findings and market research',
        'Final formal appraisal report is prepared with complete market analysis and documentation'
      ],
      benefits: [
        'Most comprehensive evaluation',
        'Perfect for insurance documentation',
        'Includes market analysis',
        'Detailed condition report',
        'Professional valuation',
        'Complete digital documentation',
        'Conservation recommendations',
        'Follow-up consultation included'
      ]
    }
  },
  {
    title: 'Insurance Appraisal',
    description: 'Detailed reports specifically designed for insurance purposes and coverage.',
    icon: Shield,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-64,h-64`,
    features: [
      { text: 'Replacement Value', icon: Receipt },
      { text: 'Risk Assessment', icon: FileSpreadsheet },
      { text: 'Digital Documentation', icon: FileCheck },
      { text: 'Insurance Standards', icon: Award }
    ],
    action: {
      type: 'video' as const,
      videoId: 'OM_zTNac890',
      title: 'Insurance Appraisal Process'
    },
    details: {
      included: [
        'Insurance-specific valuation report',
        'Replacement value assessment',
        'Risk analysis documentation',
        'Digital certification',
        'Insurance company coordination',
        'Coverage recommendations',
        'Detailed item specifications',
        'Security recommendations'
      ],
      process: [
        'Submit photos and description of your item through our secure platform, including any existing insurance information',
        'Our experts analyze the item focusing on replacement value and insurance-specific requirements',
        'You receive a preliminary assessment including suggested coverage levels and risk factors',
        'Final insurance-ready appraisal report is prepared with complete replacement value analysis and documentation'
      ],
      benefits: [
        'Insurance company accepted',
        'Includes replacement value',
        'Risk assessment included',
        'Digital certification',
        'Coverage recommendations',
        'Security analysis',
        'Insurance company liaison',
        'Regular updates available'
      ]
    }
  },
  {
    title: 'Tax Deduction Appraisal',
    description: 'IRS-compliant appraisals for charitable donations and tax purposes.',
    icon: FileCheck,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-64,h-64`,
    features: [
      { text: 'IRS Compliance', icon: Landmark },
      { text: 'Fair Market Value', icon: DollarSign },
      { text: 'Detailed Documentation', icon: FileText },
      { text: 'Expert Testimony', icon: Award }
    ],
    action: {
      type: 'video' as const,
      videoId: 'polLX9YL6uo',
      title: 'Tax Deduction Appraisal Process'
    },
    details: {
      included: [
        'IRS-compliant appraisal report',
        'Fair market value assessment',
        'Complete digital documentation package',
        'Expert testimony availability',
        'Tax form assistance',
        'Digital certification',
        'Supporting documentation',
        'Consultation services'
      ],
      process: [
        'Submit photos and description of your item through our secure platform',
        'Our experts identify the item and conduct initial research using our comprehensive database',
        'You receive a preliminary assessment with initial findings and market research',
        'Final formal appraisal report is prepared with complete market analysis and documentation'
      ],
      benefits: [
        'IRS-compliant documentation',
        'Expert testimony available',
        'Tax form assistance',
        'Digital certification',
        'Complete documentation',
        'Regular updates available',
        'Consultation included',
        'Priority processing'
      ]
    }
  },
  {
    title: 'IRS Appraisal',
    description: 'Professional IRS-compliant appraisals conducted by qualified appraisers for tax documentation and charitable contributions.',
    icon: Landmark,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-64,h-64`,
    features: [
      { text: 'Qualified Appraiser Certification', icon: Award },
      { text: 'IRS Form 8283 Support', icon: FileText },
      { text: 'Fair Market Value Determination', icon: DollarSign },
      { text: 'Complete Legal Documentation', icon: FileCheck }
    ],
    action: {
      type: 'video' as const,
      videoId: 'polLX9YL6uo',
      title: 'IRS Appraisal Process'
    },
    details: {
      included: [
        'Complete IRS-compliant qualified appraisal',
        'Formal appraisal report signed by a qualified appraiser',
        'Form 8283 preparation assistance',
        'Fair market value determination',
        'Detailed item analysis and documentation',
        'Digital copies for your records',
        'Expert witness availability if needed',
        'IRS submission guidance'
      ],
      process: [
        'Submit detailed photos and information about the item you wish to donate',
        'Our qualified appraisers conduct thorough research and market analysis',
        'You receive a draft appraisal for review',
        'Final qualified appraisal is prepared according to strict IRS guidelines',
        'Supporting documentation for Form 8283 is provided for your tax filing'
      ],
      benefits: [
        'Meets all IRS requirements',
        'Conducted by qualified appraisers',
        'Minimizes audit risk',
        'Maximizes eligible deduction',
        'Complete documentation',
        'Expert witness support if needed',
        'Digital and printed copies',
        'Priority processing available'
      ]
    }
  },
  {
    title: 'Automatic Appraisals',
    description: 'Instant AI-driven preliminary appraisals for quick value estimates of art and collectibles.',
    icon: Bot,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-64,h-64`,
    features: [
      { text: 'Instant Results', icon: Zap },
      { text: 'AI Image Analysis', icon: Camera },
      { text: 'Market Data Integration', icon: BarChart3 },
      { text: 'Preliminary Estimate', icon: DollarSign }
    ],
    action: {
      type: 'video' as const,
      videoId: 'mHxD5DzRKM8',
      title: 'Automatic Appraisal Process'
    },
    details: {
      included: [
        'AI-powered image recognition and analysis',
        'Preliminary value estimation',
        'Similar item market comparisons',
        'Basic item identification',
        'Recent auction result highlights',
        'Option to upgrade to expert appraisal',
        'Digital summary report',
        'Market trend indicators'
      ],
      process: [
        'Upload photos of your item to our secure platform',
        'Our AI system instantly analyzes the images and identifies key characteristics',
        'The system compares your item to our database of recent sales and auction results',
        'You receive an immediate preliminary value estimation and basic information about your item',
        'Option to proceed with a human expert appraisal for more accurate and detailed results'
      ],
      benefits: [
        'Immediate results',
        'No waiting period',
        'Affordable pricing',
        'Basic market insights',
        'Helps determine if expert appraisal is needed',
        'Available 24/7',
        'Easy to use interface',
        'Multiple items can be processed simultaneously'
      ]
    }
  },
  {
    title: 'Auction Database Access',
    description: 'Comprehensive access to our proprietary database of global auction results for art and antiques market research.',
    icon: Database,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-64,h-64`,
    features: [
      { text: 'Global Auction Data', icon: Globe },
      { text: 'Historical Price Tracking', icon: LineChart },
      { text: 'Artist/Maker Performance', icon: BarChart3 },
      { text: 'Advanced Market Analytics', icon: Search }
    ],
    action: {
      type: 'video' as const,
      videoId: 'OM_zTNac890',
      title: 'Auction Database Overview'
    },
    details: {
      included: [
        'Access to over 10 million auction records',
        'Coverage of major and specialized auction houses worldwide',
        'Historical sales data spanning decades',
        'Advanced search and filtering capabilities',
        'Price trend analysis tools',
        'Artist and maker market performance tracking',
        'Comparable sales identification',
        'Export and report generation features'
      ],
      process: [
        'Sign up for database access with your preferred subscription plan',
        'Receive immediate access to our comprehensive auction records database',
        'Search by artist, maker, medium, date range, auction house, and more',
        'View detailed sale results including hammer prices, estimates, and images',
        'Generate custom reports and analytics for your research needs'
      ],
      benefits: [
        'Make informed purchasing decisions',
        'Research market trends for collecting or investing',
        'Track specific artist or maker performance',
        'Identify the best time to buy or sell',
        'Access data from auction houses worldwide',
        'Historical context for current market',
        'Professional-grade research tools',
        'Regular database updates with new sales data'
      ]
    }
  }
];