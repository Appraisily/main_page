import React from 'react';
import { Mail, Award, Star, Shield, Users, BookOpen, Globe } from 'lucide-react';
import { IMAGES } from '../lib/images';

const team = [
  {
    name: 'Andrés Gómez',
    role: 'Lead Art Appraiser',
    image: IMAGES.team.andres,
    credentials: ['BSc, MSc', 'Certified Art Appraiser'],
    specialties: ['Fine Art', 'Modern Art', 'Sculptures'],
    quote: 'Every piece tells a unique story through its history, craftsmanship, and cultural significance.',
    stats: [
      { label: 'Years Experience', value: '15+' },
      { label: 'Appraisals', value: '10K+' },
      { label: 'Specialties', value: '8' }
    ]
  },
  {
    name: 'Charlotte Williams',
    role: 'Senior Antique Specialist',
    image: IMAGES.team.charlotte,
    credentials: ['MA Art History', 'ISA Member'],
    specialties: ['Antique Furniture', 'Decorative Arts', 'Porcelain'],
    quote: 'Understanding the historical context is crucial for accurate valuations.',
    stats: [
      { label: 'Years Experience', value: '12+' },
      { label: 'Appraisals', value: '8K+' },
      { label: 'Specialties', value: '6' }
    ]
  },
  {
    name: 'Adrian Chen',
    role: 'Fine Art Expert',
    image: IMAGES.team.adrian,
    credentials: ['PhD Art History', 'USPAP Certified'],
    specialties: ['Contemporary Art', 'Asian Art', 'Photography'],
    quote: 'Combining traditional expertise with modern technology for precise valuations.',
    stats: [
      { label: 'Years Experience', value: '10+' },
      { label: 'Appraisals', value: '7K+' },
      { label: 'Specialties', value: '5' }
    ]
  }
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in every appraisal we conduct.'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Our valuations are always honest, unbiased, and thoroughly researched.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work together, sharing expertise to provide the most accurate appraisals.'
  },
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Continuous learning keeps us at the forefront of the industry.'
  }
];

const certifications = [
  {
    title: 'USPAP Certified',
    description: 'Compliant with Uniform Standards of Professional Appraisal Practice'
  },
  {
    title: 'ISA Members',
    description: 'International Society of Appraisers certified professionals'
  },
  {
    title: 'Global Network',
    description: 'Connected with leading institutions and experts worldwide'
  }
];

export default function Team() {
  return (
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Meet Our Expert Team
            </h1>
            <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Our certified appraisers bring decades of combined experience and specialized expertise to every valuation.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900/75 via-gray-900/0" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-gray-200">{member.role}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.credentials.map((credential) => (
                      <span
                        key={credential}
                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>

                  <blockquote className="text-gray-600 italic mb-6">
                    "{member.quote}"
                  </blockquote>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-auto">
                    {member.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
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

      {/* Certifications */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Professional Certifications</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our team maintains the highest level of professional certification and training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="bg-gray-50 rounded-xl p-8 text-center"
              >
                <Globe className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Work with Our Expert Team
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get professional appraisals from our certified experts. We're here to help you understand the true value of your items.
          </p>
          <a
            href="https://services.appraisily.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Mail className="mr-2 h-5 w-5" />
            Start Appraisal
          </a>
        </div>
      </section>
    </div>
  );
}