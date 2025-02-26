import { Camera, FileCheck, Scale, Shield, Search, DollarSign, History, FileText, Landmark, Receipt, FileSpreadsheet, Award } from 'lucide-react';

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
  }
];