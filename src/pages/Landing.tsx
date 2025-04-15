import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Process from '../components/Process';
import Team from '../components/Team';
import Expertise from '../components/Expertise';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import ProcessSteps from '../components/ProcessSteps';
import SuccessStories from '../components/SuccessStories';
import RecentAppraisals from '../components/RecentAppraisals';
import MarketAnalysis from '../components/MarketAnalysis';
import { Link, useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import SEO from '../components/SEO';

export default function Landing() {
  const isDev = import.meta.env.DEV;
  const navigate = useNavigate();

  // Common FAQs for the homepage
  const homeFaqs = [
    {
      question: "What types of items can you appraise?",
      answer: "We appraise a wide range of art and antiques including paintings, sculptures, furniture, decorative arts, jewelry, watches, collectibles, rare books, manuscripts, and more."
    },
    {
      question: "How does the online appraisal process work?",
      answer: "Our online appraisal process is simple: upload clear photos of your item along with any documentation, describe its condition and history, submit payment, and receive your professional appraisal within 48 hours."
    },
    {
      question: "Are your appraisals accepted by insurance companies?",
      answer: "Yes, our appraisals are accepted by all major insurance companies for coverage purposes. Our reports include comprehensive details and meet industry standards for insurance documentation."
    },
    {
      question: "How much does an appraisal cost?",
      answer: "Our appraisal fees vary based on the type of item, complexity, and purpose of the appraisal. Single item appraisals start at $75, with detailed quotes provided before proceeding."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Art & Antique Appraisals Online | Expert Valuations | Appraisily"
        description="Get accurate art and antique appraisals from certified experts within 48 hours. Professional valuations for insurance, tax, estate planning, and donations. Start your appraisal today!"
        ratings={{
          ratingValue: 4.9,
          ratingCount: 1028,
          reviewCount: 954
        }}
        type="LocalBusiness"
        breadcrumbs={[
          { name: "Home", url: "https://appraisily.com/" }
        ]}
        faqs={homeFaqs}
        datePublished="2021-05-12"
        dateModified="2023-10-18"
      />
      
      {/* Debug Link - Only visible in development */}
      {isDev && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={() => navigate('/bulk-appraisal/upload')}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 text-sm flex items-center gap-2 mb-2"
          >
            <Package className="h-4 w-4" />
            Debug: Upload Items
          </button>
          <Link
            to="/success-payment?session_id=cs_live_a1pi2YjX8Nr6lH53ACyeqX6bIx6REfRLBGrJ1ThzXj6C6UEJytdKOyiMxf"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 text-sm"
          >
            Debug: Success Payment
          </Link>
          {' '}
         <Link
           to="/success-payment?session_id=cs_live_b1lDTlUrm70sYbfdDJGgvkh6hPjdJXdEi9w0FBgS2F33pw63KCXs4IV6vO"
           className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 text-sm block mb-2"
         >
           Debug: Bulk Success
         </Link>
          <Link
            to="/login"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 text-sm"
          >
            Debug: Dashboard
          </Link>
        </div>
      )}
      <Hero />
      <Features />
      <Services />
      <Process />
      <Team />
      <ProcessSteps />
      <MarketAnalysis />
      <RecentAppraisals />
      <SuccessStories />
      <Testimonials />
    </div>
  );
}