import React from 'react';
import { 
  History, 
  Shield, 
  Award, 
  Globe, 
  BookOpen, 
  Users, 
  Sparkles,
  Building2,
  GraduationCap,
  Handshake,
  Medal,
  Scale,
  Heart,
  MapPin,
  Clock,
  Coffee,
  CheckCircle2,
  Star,
  Zap,
  Lightbulb,
  Search,
  FileText,
  Database,
  Monitor,
  UserCheck
} from 'lucide-react';
import { IMAGES } from '../lib/images';
import SEO from '../components/SEO';

export default function About() {
  const [activeYear, setActiveYear] = React.useState('2023');

  const stats = [
    { label: 'Years of Experience', value: '20+' },
    { label: 'Certified Experts', value: '15' },
    { label: 'Countries Served', value: '30+' },
    { label: 'Successful Appraisals', value: '50K+' }
  ];

  const milestones = [
    {
      year: '2003',
      title: 'Appraisily Founded',
      description: 'Started as a local appraisal service specializing in American and European antiques.',
      image: 'https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'Established foundation with specialized experts'
    },
    {
      year: '2008',
      title: 'Growing Reputation',
      description: 'Expanded our team to include experts in Asian art, tribal artifacts, and modern collectibles.',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'Broadened expertise across diverse categories'
    },
    {
      year: '2015',
      title: 'Global Expansion',
      description: 'Established an international network of appraisers, serving clients across 30+ countries.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'Created worldwide appraiser network'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Introduced our AI-driven valuation algorithms and launched the proprietary Auction Records Database.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'Revolutionized how we research and determine market values'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We commit to unbiased, honest valuations and uphold strict ethical standards in every interaction.'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: 'Our team comprises certified professionals with decades of combined experience in fine art, decorative arts, antiques, collectibles, and specialized niches.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: "By integrating advanced AI tools with our specialists' knowledge, we push the boundaries of traditional appraisal methods to deliver fast and accurate results."
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'With clients in over 30 countries and multilingual appraisers, we approach appraisals through an international lens, considering market nuances worldwide.'
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'We believe in empowering you with knowledge—detailed reports, thorough explanations, and a robust knowledge base help you make informed decisions about your valuable possessions.'
    }
  ];

  const services = [
    {
      icon: FileText,
      title: "Online Art & Antique Appraisals",
      features: [
        "Convenient and Fast: Submit photos and details of your item from anywhere in the world.",
        "Certified Experts: Our network of certified appraisers provides a personalized report.",
        "Trusted Results: Each valuation is backed by thorough research and current market data."
      ]
    },
    {
      icon: UserCheck,
      title: "Appraiser Directory",
      features: [
        "Find Specialists: Browse profiles of accredited professionals with expertise in different categories.",
        "Credentials & Experience: Each expert's background, certifications, and notable past projects are listed for transparency.",
        "Direct Consultation: Contact appraisers directly for specialized or extended services."
      ]
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      features: [
        "Educational Articles: Stay informed about trends in art and antique markets.",
        "Guides & Tutorials: Step-by-step instructions on how to care for your artwork.",
        "Video & Webinar Series: Our experts share tips, case studies, and insights."
      ]
    },
    {
      icon: Monitor,
      title: "AI Assistant",
      features: [
        "Instant Pre-Valuations: Upload photos or enter basic details to get a quick, AI-driven estimate.",
        "Machine Learning Algorithms: Our proprietary technology analyzes images and suggests a ballpark value.",
        "Seamless Human Follow-Up: Our human experts review AI findings, verify data, and refine the valuation."
      ]
    },
    {
      icon: Database,
      title: "Auction Records Database",
      features: [
        "Historical Pricing: Gain exclusive access to past auction results across dozens of major auction houses worldwide.",
        "Comparable Sales: Compare your item to similar lots sold in the past.",
        "Up-to-Date Insights: Our database is frequently updated, reflecting the latest shifts in global markets."
      ]
    }
  ];

  const reasons = [
    {
      icon: History,
      title: "Two Decades of Trust",
      description: "Over 50K successful appraisals and a reputation built on accuracy, ethical practice, and professional excellence."
    },
    {
      icon: Star,
      title: "All-in-One Platform",
      description: "From initial estimates to certified appraisals, from finding an expert to leveraging AI—every tool you need is right here."
    },
    {
      icon: FileText,
      title: "Tailored Reports",
      description: "We customize each appraisal to fit your purpose—insurance, tax-deductible donation, estate planning, or sales."
    },
    {
      icon: Handshake,
      title: "Ongoing Support",
      description: "Our relationship doesn't end once you receive your appraisal. We're here to help you navigate next steps."
    }
  ];

  const activeMilestone = milestones.find(m => m.year === activeYear);

  return (
    <div className="min-h-screen bg-white pt-16">
      <SEO 
        title="About Appraisily | Our Story and Mission"
        description="Learn about Appraisily's 20+ year journey becoming a global leader in art and antique appraisals. Discover our mission, values, and comprehensive services."
      />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
              About <span className="text-blue-600">Appraisily</span>
            </h1>
            <p className="text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              {"Founded in 2003, Appraisily has grown from a single-office startup to a global leader in art and antique appraisal services."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02] duration-300">
              <img
                src={IMAGES.gallery.appraiser}
                alt="Expert appraiser examining an antique in a gallery"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">20+ Years of Excellence</span>
                  <h3 className="text-white text-2xl font-bold mt-3">Expert Appraisers at Work</h3>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-lg leading-8 text-gray-600 mb-6">
                {"Over the past 20+ years, we've helped thousands of collectors, institutions, and enthusiasts discover the true value of their treasures through our blend of traditional expertise and cutting-edge technology."}
              </p>
              <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700">
                  We strive to make professional art and antique appraisals accessible to everyone. By merging centuries-old connoisseurship with modern AI algorithms, we deliver accurate, reliable, and transparent valuations for a wide range of objects—from rare paintings and collectibles to furniture and fine jewelry.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Timeline Section */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
            <p className="mt-4 text-lg text-gray-600">Our comprehensive appraisal journey</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>
            
            <div className="space-y-24">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={service.title} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center z-10 hidden md:flex">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    
                    <div className={`md:flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Image side */}
                      <div className={`md:w-5/12 mb-8 md:mb-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="bg-white p-4 rounded-xl shadow-lg overflow-hidden">
                          <img 
                            src={index === 0 ? IMAGES.gallery.appraiser : (index === 2 ? IMAGES.gallery.laboratory : `https://images.unsplash.com/photo-${1550000000000 + index * 10000000}?auto=format&fit=crop&q=80&w=800&h=600`)} 
                            alt={service.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                      
                      {/* Content side */}
                      <div className="md:w-7/12">
                        <div className={`bg-white rounded-xl shadow-lg p-8 ${isEven ? 'md:ml-12' : 'md:mr-12'}`}>
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
                          </div>
                          <ul className="space-y-3">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="bg-gray-50 p-8 rounded-xl">
                  <IconComponent className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-8">
            Our <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
            From our humble beginnings to becoming a global leader in art and antique appraisals
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="relative z-10">
                <div className="flex justify-between mb-12 bg-white rounded-xl shadow-md p-4">
                  {milestones.map((milestone) => (
                    <button
                      key={milestone.year}
                      onClick={() => setActiveYear(milestone.year)}
                      className={`relative px-5 py-3 rounded-lg transition-all duration-300 ${
                        activeYear === milestone.year
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-50 text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      {milestone.year}
                    </button>
                  ))}
                </div>

                {activeMilestone && (
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 border border-gray-100">
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {activeMilestone.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {activeMilestone.description}
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-center">
                          <History className="h-6 w-6 text-blue-600 mr-3" />
                          <span className="text-md font-medium text-blue-800">
                            {activeMilestone.achievement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[450px]">
                <img
                  src={activeYear === '2023' ? IMAGES.gallery.laboratory : activeMilestone?.image}
                  alt={activeMilestone?.title || "Timeline Image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-8">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {activeYear}
                    </span>
                    <h3 className="text-white text-2xl font-bold mt-3">
                      {activeMilestone?.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              {/* Timeline decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-70 z-0"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-50 z-0"></div>
            </div>
          </div>
          
          {/* Timeline icons - small screens only */}
          <div className="flex justify-around md:hidden mb-8 mt-12">
            {milestones.map((milestone, index) => (
              <div 
                key={`mobile-${milestone.year}`} 
                className={`flex flex-col items-center ${activeYear === milestone.year ? 'opacity-100' : 'opacity-50'}`}
                onClick={() => setActiveYear(milestone.year)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeYear === milestone.year ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className="text-white font-medium">{milestone.year.substring(2)}</span>
                </div>
                <div className="h-1 w-full bg-gray-200 my-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose <span className="text-blue-600">Appraisily</span></h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">What sets us apart from other appraisal services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <div 
                  key={reason.title} 
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
                >
                  <div className="flex items-center gap-5 mb-5">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-100">
                      <IconComponent className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{reason.title}</h3>
                  </div>
                  <p className="text-gray-700 pl-[4.75rem]">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to discover the true value of your piece?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-3xl mx-auto">
            Join the thousands of collectors, museums, and enthusiasts worldwide who trust Appraisily for accurate, transparent, and professional art and antique appraisals.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href="mailto:info@appraisily.com" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-blue-700 bg-white hover:bg-blue-50 shadow-lg transform transition-transform hover:-translate-y-1"
            >
              Email Us
            </a>
            <a 
              href="/start" 
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-full text-white hover:bg-blue-800 shadow-lg transform transition-transform hover:-translate-y-1"
            >
              Start An Appraisal
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}