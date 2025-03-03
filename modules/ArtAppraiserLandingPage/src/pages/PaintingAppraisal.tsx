import React, { useEffect } from 'react';
import { Camera, Sparkles, FileText, ArrowRight, Star, Shield, Clock, Award, Fingerprint, MapPin, Scan, Search, History, Database, CheckCircle } from 'lucide-react';
import HeroSplitScreen from '../components/HeroSplitScreen';
import TrustFooter from '../components/TrustFooter';
import ExpertProfile from '../components/ExpertProfile';

const reviews = [
  {
    id: 1,
    image: 'https://ik.imagekit.io/appraisily/WebPage/review1.jpg?tr=w-800,h-600,q-100',
    author: 'Sarah M.',
    rating: 5,
    text: 'The AI analysis was spot on! The professional appraisal confirmed the initial value range. Incredibly helpful service.',
    initialValue: '$800-1,200',
    finalValue: '$1,500',
    itemType: 'Modern Abstract Painting'
  },
  {
    id: 2,
    image: 'https://ik.imagekit.io/appraisily/WebPage/review2.jpg?tr=w-800,h-600,q-100',
    author: 'James R.',
    rating: 5,
    text: 'Found out my family heirloom was worth significantly more than expected. The detailed analysis helped me get proper insurance coverage.',
    initialValue: '$2,000-3,000',
    finalValue: '$5,500',
    itemType: 'Antique Oil Painting'
  },
  {
    id: 3,
    image: 'https://ik.imagekit.io/appraisily/WebPage/review3.jpg?tr=w-800,h-600,q-100',
    author: 'Emily K.',
    rating: 5,
    text: 'Quick and professional service. The AI prescreener gave me confidence to proceed with a full appraisal. Excellent experience!',
    initialValue: '$1,500-2,500',
    finalValue: '$3,200',
    itemType: 'Contemporary Artwork'
  }
];

const analysisTools = [
  {
    icon: Fingerprint,
    image: 'https://ik.imagekit.io/appraisily/WebPage/maker.png',
    title: 'Maker Analysis',
    description: 'Advanced AI-powered tool that helps identify potential creators, artists, or manufacturers of your piece by analyzing signatures, styles, and distinctive characteristics.'
  },
  {
    icon: Scan,
    image: 'https://ik.imagekit.io/appraisily/WebPage/signature.png',
    title: 'Signature Check',
    description: 'Specialized analysis of signatures, marks, and monograms to verify authenticity and attribute works to specific artists or makers.'
  },
  {
    icon: MapPin,
    image: 'https://ik.imagekit.io/appraisily/WebPage/origin.png',
    title: 'Origin Analysis',
    description: 'Determines the likely geographical origin and period of your item by examining stylistic elements, materials, and construction techniques.'
  },
  {
    icon: Search,
    image: 'https://ik.imagekit.io/appraisily/WebPage/marks.png',
    title: 'Marks Recognition',
    description: 'Identifies and interprets maker\'s marks, hallmarks, stamps, and other identifying symbols commonly found on antiques and artworks.'
  },
  {
    icon: History,
    image: 'https://ik.imagekit.io/appraisily/WebPage/age.png',
    title: 'Age Analysis',
    description: 'Estimates the creation period of your item by analyzing materials, techniques, style, and other period-specific characteristics.'
  },
  {
    icon: Database,
    image: 'https://ik.imagekit.io/appraisily/WebPage/visual.png',
    title: 'Visual Search',
    description: 'Compares your item with our extensive database of auction results and museum collections to find similar pieces and establish market value ranges.'
  }
];

const features = [
  {
    icon: Camera,
    title: 'Photo Documentation',
    description: 'Upload high-quality photos of your painting, including close-ups of signatures, frame, and any condition issues'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Our AI instantly analyzes your painting\'s style, artist signatures, and matches with similar artworks'
  },
  {
    icon: FileText,
    title: 'Expert Painting Analysis',
    description: 'Professional art appraisers evaluate technique, authenticity, provenance, and current market value'
  },
  {
    icon: Clock,
    title: 'Quick Results',
    description: 'Get AI painting analysis in minutes, professional valuation in 24-48h'
  }
];

const trustIndicators = [
  {
    icon: Star,
    text: 'Expert Analysis',
    subtext: 'Certified Appraisers'
  },
  {
    icon: Shield,
    text: 'USPAP Compliant',
    subtext: 'Industry Standard'
  },
  {
    icon: Award,
    text: 'Market Data',
    subtext: 'Current Values'
  },
  {
    icon: Clock,
    text: '24-48h Turnaround',
    subtext: 'Fast Service'
  }
];

const PaintingAppraisal = () => {
  useEffect(() => {
    // Push page view to GTM
    window.dataLayer?.push({
      event: 'pageview',
      page: {
        title: 'Instant Painting Value Check',
        path: '/painting-value'
      }
    });
  }, []);

  return (
    <div className="bg-white">
      <HeroSplitScreen />
      <TrustFooter />
      <ExpertProfile />

      {/* How It Works */}
      <div id="how-it-works" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Two-Step Value Assessment Process
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Instant AI analysis followed by detailed professional appraisal
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="grid grid-cols-1 gap-8">
                  {features.map((feature, index) => (
                    <div key={feature.title} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                        <p className="mt-2 text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <div className="aspect-[4/3]">
                  <img
                    src="https://ik.imagekit.io/appraisily/WebPage/image_screener.JPG?tr=w-800,h-600,q-70"
                    alt="AI Analysis Demo"
                    className="h-full w-full object-cover rounded-lg"
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Expert Valuation Process
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Our certified appraisers analyze your painting's style, technique, condition, and provenance. We research comparable sales and current market trends to determine accurate value. Each appraisal includes detailed documentation suitable for insurance, tax, or sale purposes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                      href="https://screener.appraisily.com/"
                      id="start-appraisal-nav"
                      className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 ring-1 ring-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Get Free Instant Value <Sparkles className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Tools */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Professional Evaluation Tools
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our experts use specialized tools and techniques to thoroughly evaluate your painting
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {analysisTools.map((tool) => (
              <div
                key={tool.title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-[16/9] sm:aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900">{tool.title}</h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="https://screener.appraisily.com/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
            >
              Try Free Instant Analysis
              <Sparkles className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recent Success Stories
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See how our professional appraisals have helped clients discover their paintings' true value
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative">
                  <img
                    src={review.image}
                    alt={`Appraised ${review.itemType}`}
                    className="aspect-4/3 w-full object-cover"
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white/80">Initial: {review.initialValue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">Final: {review.finalValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 line-clamp-3">{review.text}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.author}</p>
                      <p className="text-sm text-gray-500">{review.itemType}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="https://screener.appraisily.com/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
            >
              Get Your Free Analysis
              <Sparkles className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-3xl bg-gray-900 px-8 py-16 text-center shadow-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to Get Your Painting Appraised?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Start with our free AI analysis, then get a professional appraisal from our certified experts.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://screener.appraisily.com/"
                className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
              >
                Try Free AI Analysis
              </a>
              <a
                href="https://appraisily.com/start"
                className="text-sm font-semibold leading-6 text-white"
              >
                Get Professional Appraisal <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingAppraisal;