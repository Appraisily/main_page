import React, { useState } from 'react';
import { Camera, FileCheck, Scale, Shield, Search, DollarSign, History, FileText, Landmark, Receipt, FileSpreadsheet, Award, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

function VideoModal({ isOpen, onClose, videoId, title }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl bg-black border-none p-0">
        <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-gray-900 shadow-md hover:bg-gray-100 transition-colors">
          <X className="h-6 w-6" />
        </DialogClose>
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Services() {
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoId: string;
    title: string;
  }>({
    isOpen: false,
    videoId: '',
    title: ''
  });

  const services = [
    {
      title: 'Regular Appraisal',
      description: 'Comprehensive evaluation of your art or antique pieces with detailed market analysis.',
      icon: Scale,
      features: [
        { text: 'Expert Analysis', icon: Search },
        { text: 'Market Valuation', icon: DollarSign },
        { text: 'Historical Research', icon: History },
        { text: 'Documentation', icon: FileText }
      ],
      action: {
        type: 'video',
        videoId: 'mHxD5DzRKM8',
        title: 'Regular Appraisal Process'
      }
    },
    {
      title: 'Insurance Appraisal',
      description: 'Detailed reports specifically designed for insurance purposes and coverage.',
      icon: Shield,
      features: [
        { text: 'Replacement Value', icon: Receipt },
        { text: 'Risk Assessment', icon: FileSpreadsheet },
        { text: 'Digital Documentation', icon: FileCheck },
        { text: 'Insurance Standards', icon: Award }
      ],
      action: {
        type: 'video',
        videoId: 'OM_zTNac890',
        title: 'Insurance Appraisal Process'
      }
    },
    {
      title: 'Tax Deduction Appraisal',
      description: 'IRS-compliant appraisals for charitable donations and tax purposes.',
      icon: FileCheck,
      features: [
        { text: 'IRS Compliance', icon: Landmark },
        { text: 'Fair Market Value', icon: DollarSign },
        { text: 'Detailed Documentation', icon: FileText },
        { text: 'Expert Testimony', icon: Award }
      ],
      action: {
        type: 'video',
        videoId: 'polLX9YL6uo',
        title: 'Tax Deduction Appraisal Process'
      }
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-[600px] h-[600px] opacity-[0.03]">
          <div className="absolute inset-0 bg-blue-600 rounded-full transform scale-100" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="px-4 py-1.5 text-sm border-blue-200 bg-blue-50 text-blue-700 mb-6">
            Professional Services
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Choose Your Appraisal Service
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Select the service that best suits your needs. Each appraisal is conducted by certified experts using advanced analysis tools.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={service.title} 
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="shadow-lg border-t-4 border-t-blue-500 h-full overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="mb-4 w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ul className="space-y-3">
                      {service.features.map((feature) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <li key={feature.text} className="flex items-center gap-3">
                            <div className="flex-shrink-0 rounded-full bg-blue-50 p-1.5">
                              <FeatureIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-gray-700">{feature.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full gap-2 shadow-md"
                      onClick={() => setVideoModal({
                        isOpen: true,
                        videoId: service.action.videoId,
                        title: service.action.title
                      })}
                    >
                      <Play className="h-4 w-4" />
                      Watch Service Overview
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        videoId={videoModal.videoId}
        title={videoModal.title}
      />
    </div>
  );
}