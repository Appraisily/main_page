import React, { useEffect, useRef } from 'react';
import { Users, Camera, FileCheck, LockKeyhole, Star, Award, Globe2 } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '10,000+ Clients Served',
    description:
      'Our certified appraisers have worked with a broad range of clients, offering insights and valuations that are both trusted and respected in the art world.',
  },
  {
    icon: Camera,
    title: 'AI-Powered Analysis',
    description:
      'Utilizing Google Vision technology for precise image analysis and market comparison.',
  },
  {
    icon: FileCheck,
    title: 'USPAP Standards',
    description:
      'All appraisals adhere to Uniform Standards of Professional Appraisal Practice.',
  },
  {
    icon: LockKeyhole,
    title: 'Confidential & Impartial',
    description:
      'Your privacy is paramount. All valuations are conducted with complete confidentiality.',
  },
];

const credentials = [
  { icon: Award, text: 'Certified Art Appraiser' },
  { icon: Star, text: '15+ Years Experience' },
  { icon: Globe2, text: 'International Recognition' },
];

export default function WhyChooseUs() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Trust Our Appraisals?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With our specialized knowledge and modern technology, we provide accurate and reliable art and antique appraisals. Our team is dedicated to helping collectors understand the true value of their pieces with detailed, professional reports.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-start">
              <div className="rounded-lg bg-white p-6 ring-1 ring-gray-200 w-full h-full">
                <feature.icon className="h-8 w-8 text-[#007bff]" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="px-6 py-12 sm:px-12 lg:py-16">
              <div className="mx-auto max-w-2xl">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                  Professional Market Analysis
                </h3>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our team combines traditional expertise with modern technology to provide the most accurate appraisals. Each piece undergoes thorough market analysis and research, ensuring you receive a precise and reliable valuation based on current market conditions.
                </p>
                <div className="mt-8">
                  <a
                    href="https://services.appraisily.com/"
                    className="inline-flex items-center rounded-md bg-[#007bff] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
                  >
                    Start Your Appraisal
                  </a>
                </div>
              </div>
            </div>

            <div className="relative lg:h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#007bff]/10 rounded-full blur-3xl transform -translate-y-4"></div>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                    <img
                      src="https://ik.imagekit.io/appraisily/Appraisers/andres.png?updatedAt=1730554573181"
                      alt="Lead Appraiser"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-900">Andrés Gómez</h4>
                  <p className="text-[#007bff] font-medium">Lead Art Appraiser</p>
                </div>

                <div className="mt-8 space-y-4">
                  {credentials.map((credential, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm"
                    >
                      <credential.icon className="h-5 w-5 text-[#007bff]" />
                      <span className="text-sm font-medium text-gray-700">{credential.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[
                      'https://ik.imagekit.io/appraisily/Appraisers/charlotte.png?updatedAt=1730554659564',
                      'https://ik.imagekit.io/appraisily/Appraisers/adrian.png?updatedAt=1730554626176',
                      'https://ik.imagekit.io/appraisily/Appraisers/andres.png?updatedAt=1730554573181'
                    ].map((profile, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img
                          src={profile}
                          alt={`Team member ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    Part of our expert team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}