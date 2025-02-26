import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "How accurate are online appraisals?",
      answer: "Our online appraisals are highly accurate, provided by certified appraisers with decades of experience. We use detailed photos, documentation, and extensive market research to ensure accurate valuations."
    },
    {
      question: "What information do I need to provide?",
      answer: "You'll need to provide clear photos of your item from multiple angles, any available documentation (provenance, certificates, etc.), and basic information about the item's condition and history."
    },
    {
      question: "How long does the appraisal process take?",
      answer: "Most appraisals are completed within 48 hours of submission. Rush service is available for urgent requests at an additional fee."
    },
    {
      question: "Are your appraisers certified?",
      answer: "Yes, all our appraisers are certified professionals with relevant credentials and extensive experience in their specific areas of expertise."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between py-4 text-left text-gray-900"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-blue-600" />
                ) : (
                  <Plus className="h-5 w-5 text-blue-600" />
                )}
              </button>
              {openIndex === index && (
                <p className="pb-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}