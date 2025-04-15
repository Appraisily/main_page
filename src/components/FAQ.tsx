import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQProps {
  customFaqs?: FAQItem[];
  title?: string;
  className?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ customFaqs, title = "Frequently Asked Questions", className = "" }: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0); // Start with first question open

  const defaultFaqs = [
    {
      question: "How accurate are online appraisals?",
      answer: "Our online appraisals are highly accurate, provided by certified appraisers with decades of experience. We use detailed photos, documentation, and extensive market research to ensure accurate valuations. For most items, our online appraisals provide the same level of accuracy as in-person appraisals."
    },
    {
      question: "What information do I need to provide?",
      answer: "You'll need to provide clear photos of your item from multiple angles, any available documentation (provenance, certificates, receipts, etc.), measurements, and basic information about the item's condition, history, and any identifying marks or signatures. The more information you provide, the more accurate and detailed your appraisal will be."
    },
    {
      question: "How long does the appraisal process take?",
      answer: "Most appraisals are completed within 48 hours of submission. Rush service is available for urgent requests at an additional fee, with delivery as quick as 24 hours. Complex items or collections may require additional time, which we'll communicate clearly during the process."
    },
    {
      question: "Are your appraisers certified?",
      answer: "Yes, all our appraisers are certified professionals with relevant credentials from recognized appraisal organizations such as the International Society of Appraisers (ISA), American Society of Appraisers (ASA), or equivalent international bodies. They have extensive experience in their specific areas of expertise and stay current with market trends."
    },
    {
      question: "What types of items can you appraise?",
      answer: "We appraise a wide range of art and antiques including fine art (paintings, prints, sculptures), decorative arts, furniture, jewelry, watches, coins, stamps, collectibles, memorabilia, rare books, manuscripts, musical instruments, and more. If you're unsure about your item, please contact us for confirmation."
    },
    {
      question: "Can I use your appraisal for insurance purposes?",
      answer: "Yes, our appraisals meet the requirements of major insurance companies for coverage of valuable items. We provide detailed documentation including condition reports, photographs, and market comparables that support insurance claims and coverage applications."
    },
    {
      question: "Do you provide appraisals for tax purposes?",
      answer: "Yes, our qualified appraisals meet IRS requirements for tax-related valuations including charitable donations, estate settlements, and gift tax purposes. Our appraisers adhere to USPAP (Uniform Standards of Professional Appraisal Practice) standards required for IRS-compliant appraisals."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Payment is required before the appraisal process begins, and we offer secure payment processing through our website."
    }
  ];

  const faqs = customFaqs || defaultFaqs;

  return (
    <section className={`py-24 bg-white ${className}`} id="faq">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Find answers to common questions about our appraisal services
        </p>

        <div className="space-y-4 mt-8">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md"
              itemScope 
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left text-gray-900 bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-lg" itemProp="name">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  ) : (
                    <Plus className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  )}
                </span>
              </button>
              <div 
                id={`faq-answer-${index}`}
                className={`${openIndex === index ? 'block' : 'hidden'}`}
                itemScope 
                itemProp="acceptedAnswer" 
                itemType="https://schema.org/Answer"
              >
                <div className="p-5 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700" itemProp="text">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Don't see your question here? <a href="mailto:info@appraisily.com" className="text-blue-600 hover:underline">Contact us</a> for more information.
          </p>
        </div>
      </div>
    </section>
  );
}