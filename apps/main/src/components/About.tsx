import React, { useState } from 'react';
import { 
  History, 
  Shield, 
  Award, 
  Globe, 
  BookOpen, 
  Users, 
  Target, 
  Sparkles,
  Building2,
  GraduationCap,
  Handshake,
  Medal,
  Scale,
  Heart,
  MapPin,
  Clock,
  Coffee
} from 'lucide-react';

export default function About() {
  const [activeYear, setActiveYear] = useState('2023');

  const stats = [
    { label: 'Years of Experience', value: '20+' },
    { label: 'Certified Experts', value: '15' },
    { label: 'Countries Served', value: '30+' },
    { label: 'Successful Appraisals', value: '50K+' }
  ];

  const milestones = [
    {
      year: '2003',
      title: 'Foundation',
      description: 'Established as a specialized art and antique appraisal firm',
      image: 'https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'Started with a team of 3 certified appraisers'
    },
    {
      year: '2008',
      title: 'International Expansion',
      description: 'Extended services to European and Asian markets',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'Opened offices in London and Tokyo'
    },
    {
      year: '2015',
      title: 'Digital Innovation',
      description: 'Launched online appraisal services and digital reporting',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'First in industry to offer virtual appraisals'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Introduced advanced AI tools to enhance appraisal accuracy',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=400',
      achievement: 'Developed proprietary AI valuation algorithms'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Unbiased, honest valuations backed by extensive research and market analysis. We maintain the highest ethical standards in every appraisal.'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: 'Our team consists of certified professionals with specialized knowledge across various art and antique categories.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International network of experts and market insights, serving clients across continents with local expertise.'
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'Commitment to sharing knowledge and empowering clients through detailed reports and consultations.'
    }
  ];

  const certifications = [
    {
      icon: Medal,
      title: 'USPAP Certified',
      description: 'Compliant with Uniform Standards of Professional Appraisal Practice'
    },
    {
      icon: Scale,
      title: 'IRS Qualified',
      description: 'Approved for tax-related valuations and charitable contributions'
    },
    {
      icon: Shield,
      title: 'ISA Member',
      description: 'International Society of Appraisers certified professionals'
    }
  ];

  const culture = [
    {
      icon: Heart,
      title: 'Client-Centric',
      description: "Every decision we make puts our clients' needs first"
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Our team works together to leverage collective expertise'
    },
    {
      icon: Sparkles,
      title: 'Innovative',
      description: 'Constantly evolving our methods with new technology'
    }
  ];

  const officeFeatures = [
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Centrally located in the heart of the city, easily accessible to clients'
    },
    {
      icon: Clock,
      title: 'Modern Facilities',
      description: 'State-of-the-art examination rooms and photography studio'
    },
    {
      icon: Coffee,
      title: 'Welcoming Space',
      description: 'Comfortable consultation areas for client meetings'
    }
  ];

  const activeMilestone = milestones.find(m => m.year === activeYear);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                About Appraisily
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Founded in 2003, Appraisily has grown to become one of the most trusted names in art and antique appraisals. Our commitment to accuracy, integrity, and professional excellence has earned us the trust of major institutions, private collectors, and galleries worldwide.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We combine traditional appraisal expertise with modern technology to deliver accurate, comprehensive valuations that meet the highest industry standards.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://ik.imagekit.io/appraisily/WebPage/18th_c_expert_vase.png?updatedAt=1730576225627"
                alt="Expert appraiser examining an antique vase"
                className="w-full h-[500px] object-cover"
                loading="eager"
                width="800"
                height="500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium">Our expert examining a rare 18th-century porcelain vase</p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Office Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://ik.imagekit.io/appraisily/WebPage/office.png?updatedAt=1730576242711"
                  alt="Appraisily's modern office space"
                  className="w-full h-[600px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Workspace</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our modern facility is designed to provide the optimal environment for detailed examination and valuation of fine art and antiques. With state-of-the-art equipment and purpose-built examination rooms, we ensure the highest standard of professional appraisal services.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {officeFeatures.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="mt-1 text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide accurate, professional, and comprehensive appraisal services that help our clients make informed decisions about their valuable items. We strive to combine traditional expertise with cutting-edge technology to deliver the most reliable valuations in the industry.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the world's most trusted and innovative art and antique appraisal service, setting the standard for accuracy, professionalism, and client satisfaction in the industry. We aim to make expert appraisals accessible to everyone while maintaining the highest standards of quality.
              </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="bg-gray-50 p-6 rounded-xl">
                  <IconComponent className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-16">
            Our Journey
          </h2>
          
          <div className="relative">
            <div className="flex justify-between mb-8">
              {milestones.map((milestone) => (
                <button
                  key={milestone.year}
                  onClick={() => setActiveYear(milestone.year)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    activeYear === milestone.year
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {milestone.year}
                </button>
              ))}
            </div>

            {activeMilestone && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={activeMilestone.image}
                      alt={activeMilestone.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      width="800"
                      height="400"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {activeMilestone.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {activeMilestone.description}
                    </p>
                    <div className="flex items-center">
                      <History className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-600">
                        {activeMilestone.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Professional Certifications</h2>
            <p className="mt-4 text-lg text-gray-600">Recognized by leading industry organizations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => {
              const IconComponent = cert.icon;
              return (
                <div key={cert.title} className="bg-gray-50 p-8 rounded-xl text-center">
                  <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-gray-600">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Culture</h2>
            <p className="mt-4 text-lg text-gray-600">What makes Appraisily unique</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {culture.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.title} className="bg-white p-8 rounded-xl text-center">
                  <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}