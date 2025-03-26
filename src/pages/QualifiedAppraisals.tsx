import React from 'react';
import { 
  Scale, 
  GraduationCap, 
  Building2, 
  FileText, 
  Landmark, 
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  BadgeDollarSign,
  BriefcaseBusiness,
  BookOpen
} from 'lucide-react';
import { IMAGES } from '../lib/images';
import SEO from '../components/SEO';

export default function QualifiedAppraisals() {
  const reasons = [
    {
      icon: Scale,
      title: "IRS Compliance",
      description: "The IRS requires qualified appraisals prepared by qualified appraisers for tax deductions on donated items valued over $5,000. Non-compliant appraisals can result in denied deductions and potential penalties."
    },
    {
      icon: Landmark,
      title: "Legal Protection",
      description: "Qualified appraisals provide crucial documentation for legal matters such as estate settlements, divorces, insurance claims, and damage disputes. They stand up to scrutiny in court proceedings."
    },
    {
      icon: BadgeDollarSign,
      title: "Accurate Valuation",
      description: "Qualified appraisers follow established methodologies and standards, ensuring your items receive accurate, defensible valuations based on current market data and professional expertise."
    },
    {
      icon: ShieldCheck,
      title: "Insurance Coverage",
      description: "Insurance companies often require qualified appraisals for high-value items. Without proper documentation, your precious assets may be underinsured or claims may be disputed."
    },
    {
      icon: BriefcaseBusiness,
      title: "Estate Planning",
      description: "Proper estate planning requires accurate asset valuation. Qualified appraisals help prevent family disputes and ensure equitable distribution of assets according to your wishes."
    },
    {
      icon: BookOpen,
      title: "Historical Documentation",
      description: "Qualified appraisals include detailed research about provenance, condition, and authenticity, providing valuable historical documentation that enhances the item's legacy."
    }
  ];

  const complianceItems = [
    {
      title: "IRS Requirements",
      points: [
        "Must be conducted by a qualified appraiser who meets specific education and experience requirements",
        "Must include detailed description, condition assessment, and valuation methodology",
        "Must be completed no earlier than 60 days before the date of contribution and no later than the due date for the tax return",
        "Must include appraiser qualifications and a statement that the appraisal was prepared for income tax purposes"
      ]
    },
    {
      title: "USPAP Standards",
      points: [
        "Follows the Uniform Standards of Professional Appraisal Practice",
        "Requires thorough market analysis and proper application of valuation approaches",
        "Includes clear identification of the type and definition of value",
        "Mandates disclosure of assumptions, limiting conditions, and scope of work"
      ]
    },
    {
      title: "Legal Requirements",
      points: [
        "Must meet strict evidentiary standards for court admissibility",
        "Requires impartiality and absence of conflicts of interest",
        "Needs comprehensive documentation of methodology and sources",
        "May require specific credentials depending on jurisdiction and purpose"
      ]
    }
  ];

  const comparisonItems = [
    {
      title: "Non-Qualified Appraisal",
      risks: [
        "May be rejected by the IRS for tax deductions",
        "Can be challenged in court proceedings",
        "Often uses limited market data or outdated information",
        "May not meet insurance company requirements",
        "Typically lacks comprehensive research and documentation",
        "Usually performed by individuals without recognized credentials"
      ]
    },
    {
      title: "Qualified Appraisal",
      benefits: [
        "Accepted by the IRS for tax deduction purposes",
        "Stands up to scrutiny in legal proceedings",
        "Utilizes comprehensive market data and current sales records",
        "Meets insurance company standards for coverage",
        "Includes thorough research and detailed documentation",
        "Conducted by credentialed professionals with verified expertise"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <SEO 
        title="Qualified Appraisals | Appraisily"
        description="Learn why qualified appraisals are essential for tax compliance, legal protection, insurance coverage, and accurate valuation of your valuable assets."
      />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                The Importance of <span className="text-blue-600">Qualified Appraisals</span>
              </h1>
              <p className="text-lg leading-8 text-gray-600 mb-6">
                A qualified appraisal isn't just a document—it's essential protection for your valuable assets, tax compliance, and peace of mind. Learn why professional, credentialed appraisals matter.
              </p>
              <div className="mt-8 bg-blue-50 rounded-xl p-8 border border-blue-100 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Makes an Appraisal "Qualified"?</h2>
                <p className="text-gray-700">
                  A qualified appraisal meets stringent professional standards and is performed by a qualified appraiser with verified credentials, education, and experience. It follows established methodologies, includes comprehensive research, and provides thorough documentation that satisfies IRS requirements, legal standards, and insurance company policies.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={IMAGES.gallery.appraiser}
                alt="Professional appraiser examining artwork"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">Expert Analysis</span>
                  <h3 className="text-white text-2xl font-bold mt-3">Professional Documentation</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Qualified Appraisals Matter */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Qualified Appraisals <span className="text-blue-600">Matter</span></h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Protecting your interests requires proper documentation and professional expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason) => {
              const IconComponent = reason.icon;
              return (
                <div key={reason.title} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{reason.title}</h3>
                  </div>
                  <p className="text-gray-700">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Requirements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Compliance <span className="text-blue-600">Requirements</span></h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Standards that qualified appraisals must meet for different purposes
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {complianceItems.map((item) => (
              <div key={item.title} className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{item.title}</h3>
                <ul className="space-y-4">
                  {item.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              <span className="text-red-500">Non-Qualified</span> vs <span className="text-blue-600">Qualified</span> Appraisals
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding the critical differences and potential consequences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comparisonItems.map((item, index) => {
              const isRisks = item.title.includes("Non-Qualified");
              return (
                <div key={item.title} className={`p-8 rounded-xl shadow-md ${isRisks ? 'bg-red-50 border border-red-100' : 'bg-blue-50 border border-blue-100'}`}>
                  <h3 className={`text-2xl font-semibold mb-6 ${isRisks ? 'text-red-700' : 'text-blue-700'}`}>
                    {item.title}
                  </h3>
                  <ul className="space-y-4">
                    {(isRisks ? item.risks : item.benefits).map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {isRisks ? (
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        )}
                        <span className={`${isRisks ? 'text-red-700' : 'text-blue-700'}`}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Need a Qualified Appraisal?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-3xl mx-auto">
            Our team of credentialed, experienced appraisers provides IRS-compliant, legally-defensible qualified appraisals for all purposes. Get the documentation you need from experts you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href="/start" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-blue-700 bg-white hover:bg-blue-50 shadow-lg transform transition-transform hover:-translate-y-1"
            >
              Request an Appraisal
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-full text-white hover:bg-blue-800 shadow-lg transform transition-transform hover:-translate-y-1"
            >
              Contact Our Experts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}