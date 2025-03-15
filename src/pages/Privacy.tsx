import React, { useEffect, useState } from 'react';
import { ArrowUp, Shield, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '../components/SEO';

export default function Privacy() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [privacyContent, setPrivacyContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch privacy content
    fetch('/Privacy.md')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch Privacy Policy');
        }
        return response.text();
      })
      .then(data => {
        setPrivacyContent(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Privacy Policy:', error);
        // Fallback to hardcoded content if fetch fails
        setPrivacyContent(`
# 1. Introduction
This Privacy Policy explains how Appraisily ("we," "us," or "our") collects, uses, and shares your personal data, including images you submit for appraisal services. By accessing or using our services, you agree to the terms of this Privacy Policy.

# 2. Information We Collect
## Personal Information

Contact Details: Your name, email address, and any other details you voluntarily provide when creating an account or placing an order.
Payment Information: If applicable, when you pay for our services (processed through secure third-party payment gateways).
Other Voluntary Information: Information you may provide while contacting us (e.g., messages, feedback).
## Images of Items for Appraisal ("Submitted Images")

We collect and store any images or accompanying data you submit for the purpose of appraising art or antiques.
These images may include metadata (such as geolocation tags if your device includes them), unless you remove such metadata before upload.
# 3. How We Use Your Information
## To Provide and Improve Our Services

We use your personal data to process appraisal requests, communicate about your appraisal, and enhance our offerings.
## Use of Submitted Images

Appraisal Process: We use the images and any accompanying information to accurately research and value the items you submit.
Promotional, Educational, and Marketing Purposes: By submitting images, you grant us a non-exclusive, worldwide, royalty-free license to reproduce, adapt, publish, and display those images (in whole or in part) on our website, social media channels, marketing materials, and knowledge base. This includes, for example, showing "before and after" appraisals, highlighting interesting antiques or artworks, or illustrating case studies in our blog or articles.
Removing Personally Identifiable Details: Where reasonable, we will remove or obscure any personally identifiable information that might appear in these images (e.g., addresses, phone numbers, or personal faces) before using them publicly.
Credit/Attribution: We may or may not provide credit to you (e.g., "Courtesy of [First Name]," or remain anonymous) depending on your stated preference.
## Legal and Compliance

We may use or disclose your information to comply with our legal obligations, respond to legal process, or enforce our terms and policies.
# 4. Your Rights and Choices
## Opt-Out of Image Use

If you prefer that we do not display your images on our website or in marketing materials, please let us know at any time by emailing info@appraisily.com. We will remove or refrain from using the relevant images wherever feasible.
Note that once certain images have been shared publicly (e.g., on social media or an online article), they may be cached or referenced by third parties. While we will remove them from our direct control, we cannot guarantee removal from external sites or platforms.
## Access, Correction, Deletion

You have the right to request access to or correction of the personal information we hold about you. You may also request the deletion of personal data where legally required or if it is no longer needed for the purpose collected.
To exercise these rights, contact us at info@appraisily.com.
## Withdrawal of Consent

Where our processing of your personal data (including images) relies on your consent, you have the right to withdraw that consent at any time. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.
# 5. Legal Basis for Processing
We process your data (including images) under one or more of the following legal bases:

Performance of a Contract: Processing is necessary to fulfill our obligations to provide appraisal services.
Legitimate Interests: We use submitted images and other data to improve our services, display examples of our work, and promote our business, in a way that does not override your rights and freedoms.
Consent: Where required by law, we will obtain your explicit consent for specific uses (e.g., using your images in certain marketing materials, if mandated in your jurisdiction).
# 6. Data Retention
We retain personal data and submitted images for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce agreements. In general:

Submitted Images: Retained for historical appraisal reference, potential future updates of valuation, and potential reuse in educational/promotional materials. If you request removal, we will delete or anonymize them (unless there is a legal or compliance reason to keep them).
# 7. Data Sharing and Transfers
## Third-Party Service Providers

We may share limited personal data (and images, if needed) with trusted third parties (e.g., hosting services, IT providers) who assist us in operating our platform. These providers process data only on our behalf and must comply with strict data protection requirements.
## International Transfers

If you are located outside of the server's host country, your data (including images) may be transferred internationally. We take steps to ensure an adequate level of protection for data transferred outside your jurisdiction, in compliance with applicable data protection laws.
# 8. Security Measures
We use various security measures (such as encryption, access controls, and secure data centers) to protect the confidentiality and integrity of your personal data and images. While we strive to protect your information, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.

# 9. Cookies and Tracking
We may use cookies or similar tracking technologies on our website to gather usage information and improve user experience. For more details, please see our Cookie Policy.

# 10. Children's Privacy
Our services are not intended for individuals under the age of 18. If you are a parent or guardian and believe your child has submitted personal data or images to us, please contact us at info@appraisily.com. We will take prompt steps to remove such data if found.

# 11. Updates to This Privacy Policy
We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on our website with a new "Last Updated" date. Where required by law, we will notify you or obtain your consent for material changes that affect how we use your data.

# 12. Contact Us
If you have questions about this Privacy Policy, wish to exercise your rights, or have any concerns about how your images or personal data are handled, please contact us at info@appraisily.com.
        `);
        setIsLoading(false);
      });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const privacyHighlights = [
    {
      title: "Data Protection",
      description: "We use industry-standard security measures to protect your data",
      icon: Shield
    },
    {
      title: "Transparency",
      description: "Clear information about how we use your data",
      icon: CheckCircle2
    },
    {
      title: "Your Control",
      description: "You can request access, correction, or deletion of your data",
      icon: CheckCircle2
    }
  ];

  return (
    <div className="bg-white pt-16 relative">
      <SEO 
        title="Privacy Policy | Appraisily"
        description="Read about Appraisily's privacy practices and how we protect your data when using our art and antique appraisal services."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to protecting your privacy and being transparent about how we use your data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {privacyHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-sm text-gray-500 text-center">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-pulse">Loading Privacy Policy...</div>
            </div>
          ) : (
            <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-700 prose-strong:text-gray-900 prose-hr:my-6 prose-p:my-3 prose-headings:mt-8 prose-headings:mb-4 prose-h2:text-2xl prose-h3:text-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {privacyContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Have Questions About Our Privacy Practices?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about this Privacy Policy or our data handling practices, please don't hesitate to contact us.
          </p>
          <a 
            href="mailto:info@appraisily.com" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Contact Us
          </a>
        </div>
      </section>
      
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