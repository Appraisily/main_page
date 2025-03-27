import React from 'react';
import { Upload, Search, TrendingUp, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export default function Process() {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Photos',
      description: 'Upload clear photos of your item along with any relevant details or documentation.',
      timing: 'Immediate'
    },
    {
      icon: Search,
      title: 'Expert Analysis',
      description: 'Our certified appraisers analyze your item using advanced AI tools and market data.',
      timing: '12-24 Hours'
    },
    {
      icon: TrendingUp,
      title: 'Market Valuation',
      description: 'We determine current market value based on recent sales and market trends.',
      timing: '24-36 Hours'
    },
    {
      icon: FileText,
      title: 'Detailed Report',
      description: 'Receive a comprehensive appraisal report with full documentation and certification.',
      timing: '36-48 Hours'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Large decorative circle in background */}
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] opacity-[0.03] -translate-x-1/2 translate-y-1/4">
        <div className="absolute inset-0 bg-blue-600 rounded-full" />
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="px-4 py-1.5 text-sm border-blue-200 bg-blue-50 text-blue-700 mb-6">
            How It Works
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Our Appraisal Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, efficient, and professional valuation in four easy steps
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting line between steps */}
          <div className="absolute top-12 left-12 w-[calc(100%-96px)] h-0.5 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 hidden lg:block" />
          
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-4 lg:gap-x-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isLast = index === steps.length - 1;
              
              return (
                <motion.div 
                  key={step.title} 
                  className="relative"
                  variants={itemVariants}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Icon with number badge */}
                    <div className="relative mb-6">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 border-2 border-blue-100 shadow-md relative z-10">
                        <IconComponent className="h-10 w-10 text-blue-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Arrow between steps (except last) */}
                    {!isLast && (
                      <div className="absolute top-12 -right-3 transform rotate-0 lg:block hidden">
                        <ArrowRight className="h-6 w-6 text-blue-300" />
                      </div>
                    )}
                    
                    {/* Step timing badge */}
                    <Badge className="bg-blue-50 hover:bg-blue-50 text-blue-700 border-blue-200 mb-4">
                      {step.timing}
                    </Badge>
                    
                    {/* Step title and description */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}