import React from 'react';
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
import { IMAGES } from '../lib/images';

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
      description: 'Unbiased, honest valuations backed by extensive research and market analysis.'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: 'Our team consists of certified professionals with specialized knowledge.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International network of experts and market insights.'
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'Commitment to sharing knowledge through detailed reports.'
    }
  ];

  const activeMilestone = milestones.find(m => m.year === activeYear);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                About Appraisily
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Founded in 2003, Appraisily has grown to become one of the most trusted names in art and antique appraisals. Our commitment to accuracy, integrity, and professional excellence has earned us the trust of collectors worldwide.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={IMAGES.gallery.gallery1}
                alt="Expert appraiser examining an antique"
                className="w-full h-[500px] object-cover"
              />
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

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="bg-white p-6 rounded-xl">
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
      <section className="py-24 bg-white">
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
    </div>
  );
}