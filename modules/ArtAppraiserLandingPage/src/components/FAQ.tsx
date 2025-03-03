import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How accurate are online appraisals?",
    answer: "Our online appraisals are highly accurate, conducted by certified experts using detailed photos and documentation. We follow USPAP standards and provide comprehensive market analysis for precise valuations."
  },
  {
    question: "What information do I need to provide?",
    answer: "You'll need to provide clear photos of your item from multiple angles, any available documentation (certificates, receipts, etc.), and basic information about its history and condition."
  },
  {
    question: "Are your appraisals accepted by insurance companies?",
    answer: "Yes, our appraisals are accepted by all major insurance companies. They meet USPAP standards and provide the detailed documentation required for insurance coverage."
  },
  {
    question: "How long does the appraisal process take?",
    answer: "Most appraisals are completed within 24-48 hours after receiving your information. Rush service is available for urgent needs."
  },
  {
    question: "What if I'm not satisfied with the appraisal?",
    answer: "We offer a 100% satisfaction guarantee. If you're not completely satisfied, we'll revise the appraisal or provide a full refund."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get answers to common questions about our appraisal service
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-all duration-200"
              >
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;