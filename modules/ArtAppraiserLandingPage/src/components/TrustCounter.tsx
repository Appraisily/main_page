import React, { useState, useEffect } from 'react';
import { Award, Star, Clock, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  item: string;
  value: string;
  timeAgo: string;
}

const recentTestimonials: Testimonial[] = [
  { name: "Sarah M.", location: "New York", item: "Oil Painting", value: "$2,500", timeAgo: "2 minutes" },
  { name: "James R.", location: "London", item: "Antique Portrait", value: "$8,500", timeAgo: "5 minutes" },
  { name: "Emily K.", location: "Paris", item: "Modern Art", value: "$3,200", timeAgo: "8 minutes" },
  { name: "Michael P.", location: "Toronto", item: "Landscape", value: "$4,800", timeAgo: "12 minutes" },
  { name: "Lisa T.", location: "Sydney", item: "Abstract", value: "$6,200", timeAgo: "15 minutes" }
];

export default function TrustCounter() {
  const [count, setCount] = useState(15782);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Increment counter randomly every 5-15 seconds
    const counterInterval = setInterval(() => {
      setCount(prev => prev + 1);
    }, Math.random() * 10000 + 5000);

    // Rotate testimonials every 5 seconds with fade effect
    const testimonialInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTestimonial(prev => (prev + 1) % recentTestimonials.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div className="mt-auto bg-white/95 backdrop-blur-sm border-t border-gray-200 py-2">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Counter */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-gray-900">
                  {count.toLocaleString()}
                </div>
                <div className="text-xs font-medium text-gray-500">
                  Artworks Appraised
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 ml-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
              ))}
            </div>
          </div>

          {/* Live Testimonial */}
          <div className={`flex items-center justify-center transition-opacity duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-primary/10 p-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-900">
                    {recentTestimonials[currentTestimonial].name}
                  </span>
                  <span className="text-xs text-gray-500">
                    from {recentTestimonials[currentTestimonial].location}
                  </span>
                </div>
                <div className="text-xs font-medium text-gray-500">
                  Just appraised a {recentTestimonials[currentTestimonial].item} 
                  <span className="text-primary font-semibold"> {recentTestimonials[currentTestimonial].value}</span>
                  <span className="text-gray-500 font-medium"> • {recentTestimonials[currentTestimonial].timeAgo} ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}