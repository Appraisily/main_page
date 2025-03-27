import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Search, Camera, Shield, Upload as UploadIcon } from 'lucide-react';
import { useImageAnalysis } from '@/hooks/useImageAnalysis';
import ServicePanels from './ServicePanels';
import TrustIndicators from './TrustIndicators';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();
  const { uploadImage } = useImageAnalysis();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      const result = await uploadImage(selectedFile);
      navigate(`/screener?sessionId=${result.sessionId}`);
    } catch (error) {
      console.error('Error analyzing file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        stiffness: 260,
        damping: 20
      } 
    }
  };

  return (
    <section className="relative overflow-hidden will-change-transform">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 will-change-transform">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        
        {/* Abstract Shapes with subtle animation */}
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.07]"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <div className="absolute inset-0 bg-blue-600 rounded-full transform translate-x-1/3 -translate-y-1/4" />
        </motion.div>
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-[0.05]"
          animate={{ 
            y: [0, 10, 0],
            x: [0, -5, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="absolute inset-0 bg-blue-600 rounded-full transform -translate-x-1/3 translate-y-1/4" />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] opacity-[0.07]"
          animate={{ 
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="absolute inset-0 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        
        {/* Enhanced Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-hidden will-change-transform">
        {/* Trust Indicators */}
        <TrustIndicators className="mb-16" />

        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title with better typography */}
          <motion.h1 
            className="text-5xl font-bold tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
            variants={itemVariants}
          >
            Discover Your Art's True Value
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-16"
            variants={itemVariants}
          >
            Upload a photo of your artwork or antique and get instant AI-powered insights
          </motion.p>

          {/* Upload Section - Card redesign */}
          <motion.div 
            className="relative max-w-xl mx-auto mb-16"
            variants={itemVariants}
          >
            {/* Free Analysis Label */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <span className="inline-block bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium shadow-sm border border-gray-200">
                Free Instant Analysis
              </span>
            </div>

            {/* Upload Panel using ShadCN Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className={`w-full mx-auto overflow-hidden border ${dragActive ? 'border-blue-500' : 'border-dashed'} shadow-md hover:shadow-lg transition-all`}>
                <CardContent className="p-8">
                  <form
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onSubmit={(e) => e.preventDefault()}
                    className="relative"
                  >
                    <div
                      className={`relative rounded-lg transition-all duration-200 ${
                        dragActive 
                          ? 'bg-blue-50/50' 
                          : 'bg-muted/50'
                      }`}
                    >
                      {selectedFile ? (
                        <div className="flex flex-col items-center justify-center p-6">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="h-24 mb-4 rounded-md object-contain"
                            loading="eager"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                          >
                            <Upload className="h-4 w-4" />
                          </button>
                          <Button
                            onClick={handleAnalyze}
                            disabled={isUploading}
                            className="px-6 shadow-lg"
                          >
                            {isUploading ? (
                              <>
                                <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                                Analyzing...
                              </>
                            ) : (
                              'Analyze Now'
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8">
                          <div className="p-3 rounded-full bg-blue-50 mb-4">
                            <Camera className="h-10 w-10 text-blue-600" />
                          </div>
                          <p className="text-lg font-medium text-gray-900 mb-4">
                            Drop your photo here
                          </p>
                          <Button variant="default" className="px-6 shadow-lg flex items-center gap-2">
                            <UploadIcon className="h-4 w-4" />
                            Browse Files
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleChange}
                            aria-label="Upload artwork photo"
                          />
                        </div>
                      )}
                    </div>
                  </form>

                  {/* Trust Indicators with Badge */}
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Badge variant="outline" className="px-3 py-1.5 text-xs flex items-center gap-1.5">
                      <Search className="h-3.5 w-3.5 text-blue-600" />
                      <span>Instant Analysis</span>
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1.5 text-xs flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-blue-600" />
                      <span>100% Free</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Service Panels */}
        <ServicePanels />
      </div>
    </section>
  );
}