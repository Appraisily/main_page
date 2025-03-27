import React from 'react';
import { Users, Camera, FileCheck, Shield, Clock, Globe, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Certified Experts',
      description: 'USPAP-certified professional appraisers with extensive experience in art and antiques.'
    },
    {
      icon: Clock,
      title: 'Fast & Efficient',
      description: '48-hour turnaround on most appraisals, ensuring you get your valuation quickly.'
    },
    {
      icon: Globe,
      title: 'Worldwide Service',
      description: 'Remote appraisals available worldwide, no matter where you are located.'
    },
    {
      icon: TrendingUp,
      title: 'Boost Your Profit',
      description: 'Never undersell again. Our detailed reports ensure you get the best price for your items.'
    },
    {
      icon: DollarSign,
      title: 'Know True Worth',
      description: 'Get accurate market valuations backed by extensive research and data.'
    },
    {
      icon: Users,
      title: 'Attract More Buyers',
      description: "Professional reports validate your items' authenticity and value to collectors."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative">
        <motion.div 
          className="mx-auto max-w-2xl text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            Our Advantages
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Why Choose Our Appraisals?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            With our specialized knowledge and modern technology, we provide accurate and reliable art and antique appraisals.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="rounded-lg bg-blue-50 p-3 mb-6 w-16 h-16 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground flex-grow">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}