import React, { useState, useEffect } from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '../components/SEO';

export default function Terms() {
  const [termsContent, setTermsContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Fetch the TOS.md file when component mounts
    fetch('/TOS.md')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch Terms of Service');
        }
        return response.text();
      })
      .then(data => {
        setTermsContent(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Terms of Service:', error);
        setIsLoading(false);
      });
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white pt-16 relative">
      <SEO 
        title="Terms of Service | Appraisily"
        description="Read about Appraisily's Terms of Service for art and antique appraisal services."
      />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date('2025-03-15').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse">Loading Terms of Service...</div>
          </div>
        ) : termsContent ? (
          <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-700 prose-strong:text-gray-900 prose-hr:my-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{termsContent}</ReactMarkdown>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>1.1 This document (together with any documents referred to in it) outlines the terms and conditions ("Conditions") upon which we will supply services ("Services") to you. Please read these Conditions carefully before ordering any Services. You may print a copy for future reference.</p>
            <p>1.2 By ordering any of the Services, you agree to be legally bound by these Conditions. If you do not accept these terms and conditions, you will not be able to proceed with your transaction.</p>

            <h2>2. About Us</h2>
            <p>2.1 This website is owned and operated by Appraisily SL, a limited company registered in Spain (trading as appraisily.com).</p>
            <p>2.2 Our contact email is info@appraisily.com.</p>

            <h2>3. Price</h2>
            <p>3.1 The prices of the Services are quoted on the request for valuation page.</p>
            <p>3.2 Unless otherwise stated, the prices quoted include VAT.</p>

            <h2>4. Payment</h2>
            <p>4.1 Payment can be made by any major prepaid, credit, or debit card, or via PayPal.</p>
            <p>4.2 By placing an order, you consent to payment being charged to your payment method as provided on the order form.</p>
            <p>4.3 You must pay 100% of the price of the Services in advance.</p>

            <h2>5. Interest</h2>
            <p>5.1 Unless clause 5.2 applies, if you fail to make any payment due to us by the due date, we may charge interest on the overdue amount at the rate of 6% per annum above the base lending rate of our bank. Interest shall accrue daily from the due date until the date of actual payment, whether before or after judgment.</p>
            <p>5.2 We will not charge you interest:</p>
            <ul>
              <li>5.2.1 For the period during which you dispute an invoice in good faith, provided you have notified us within a reasonable time of receiving it, stating that you dispute it and your reasons for disputing it.</li>
              <li>5.2.2 Until after we have re-performed the Services if we are obliged to do so.</li>
            </ul>

            <h2>6. Order Process and Formation of Contract</h2>
            <p>6.1 All orders are subject to acceptance and availability. If we are unable to supply you with the Services due to unavailability of key staff, an event outside our control, or because of an error in the description or price of the Services, we will inform you and will not process your order. If you have already paid, we will refund you the full amount.</p>
            <p>6.2 Your order constitutes an offer to purchase Services from us.</p>
            <p>6.3 A confirmation email ("Confirmation Notice") from us indicates our acceptance of your offer and forms a contract ("Contract") between you and us, incorporating these Conditions.</p>
            <p>6.4 If you believe there is an error in the Confirmation Notice or wish to make changes, please contact us promptly to discuss.</p>
            <p>6.5 We may make changes to these Conditions due to changes in relevant laws, payment methods, or VAT rates. We will notify you in writing of any significant changes, and you may cancel the Contract if the changes are significantly to your disadvantage.</p>

            <h2>16. Valuations</h2>
            <h3>16.1 Valuation Services</h3>
            <p>16.1.1 Under the Agreement, we provide a valuation service regarding the photograph of an object submitted by you. This service consists of giving an electronic estimate of the value of the object (high and low estimate) which, in our opinion, could be achieved if the object were to be sold on the open market at an international auction with a reputable auctioneer.</p>
            <p>16.1.2 The valuation does not consider sale expenses, commissions, taxes, or duties.</p>
            <p>16.1.3 The valuation is based on a preliminary inspection of the photographs and information provided, without physical inspection, cleaning, restoration, detailed inspection, or disassembly, and without research into the object's background or further tests and analysis. It is a statement of opinion, not fact.</p>
            <p>16.1.4 We aim to provide the valuation within [2] business days after receiving all relevant details and information.</p>

            <h2>17. Other Important Terms</h2>
            <p>17.1 We may update or change these Conditions, the website domain, prices, specifications, and availability at any time.</p>
            <p>17.2 If any provision of these Conditions is found invalid or unenforceable, the remaining provisions will remain in effect.</p>
            <p>17.3 The Contract is concluded in English.</p>
            <p>17.4 No failure or delay by us in exercising any right or remedy provided under the Contract shall constitute a waiver of that or any other right or remedy.</p>

            <h2>18. Governing Law</h2>
            <p>These Conditions and the Contract are governed by the laws of Spain. However, if you live outside Spain but within the EU, you are entitled to any mandatory consumer protections applicable in your country of residence.</p>

            <h2>19. Governing Jurisdiction</h2>
            <p>You and we agree that the courts of Spain will have exclusive jurisdiction to settle any disputes arising out of or in connection with the Services.</p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you have any questions about these Terms of Service, please <a href="mailto:info@appraisily.com" className="text-blue-600 hover:underline">contact us</a>.
          </p>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}