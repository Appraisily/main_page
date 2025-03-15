import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Search, Camera, Star, Shield, Users, Award } from 'lucide-react';
import { useImageAnalysis } from '@/hooks/useImageAnalysis';
import ServicePanels from './ServicePanels';
import TrustIndicators from './TrustIndicators';

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

  return (
    <section className="relative overflow-hidden will-change-transform">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 will-change-transform">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        
        {/* Animated gradient blobs */}
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob will-change-transform" />
        <div className="absolute -bottom-48 left-48 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute top-48 -right-48 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 will-change-transform" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden will-change-transform">
        {/* Trust Indicators */}
        <TrustIndicators className="mb-16" />

        <div className="text-center mb-12">
          {/* Main Title with gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900">
            Discover Your Art's True Value
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Upload a photo of your artwork or antique and get instant AI-powered insights
          </p>

          {/* Upload Section */}
          <div className="relative max-w-md mx-auto mb-16 px-4 sm:px-0">
            {/* Free Analysis Label */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <span className="inline-block bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium shadow-sm border border-gray-200">
                Free Instant Analysis
              </span>
            </div>

            {/* Upload Panel */}
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 w-full will-change-transform">
              <div className="p-6">
                <form
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onSubmit={(e) => e.preventDefault()}
                  className="relative"
                >
                  <div
                    className={`relative h-32 rounded-lg transition-all duration-200 ${
                      dragActive 
                        ? 'bg-blue-50 border-blue-400 scale-[1.02]' 
                        : 'bg-gray-50 border-gray-300'
                    } border-2 border-dashed hover:border-blue-400 hover:bg-blue-50/50`}
                  >
                    {selectedFile ? (
                      <div className="h-full flex flex-col items-center justify-center p-4">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          className="max-h-16 mb-2 rounded"
                          loading="eager"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleAnalyze}
                          disabled={isUploading}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                        >
                          {isUploading ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                              Analyzing...
                            </>
                          ) : (
                            'Analyze Now'
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center p-4">
                        <div className="p-2 rounded-full bg-blue-50 mb-2">
                          <Camera className="h-6 w-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Drop your photo here
                        </p>
                        <button 
                          type="button"
                          className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm"
                        >
                          Browse Files
                        </button>
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

                {/* Trust Indicators */}
                <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Search className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">Instant Analysis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">100% Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Panels */}
        <ServicePanels />
      </div>
    </section>
  );
}