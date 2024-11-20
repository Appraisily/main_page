import React, { useState, useCallback } from 'react';
import { Upload, Search, Camera, Star, Shield } from 'lucide-react';
import ServicePanels from './ServicePanels';

export default function Hero() {
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

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('https://appraisals-web-services-backend-856401495068.us-central1.run.app/upload-temp', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const { tempUrl, sessionId } = await response.json();
      window.location.href = `https://screener.appraisily.com/analyze/${sessionId}`;
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-blue-600/[0.03]" />
      
      {/* Radial gradient accent */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Social Proof - Floating Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-blue-100 mb-6">
            <img
              src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg"
              alt="Trustpilot"
              className="h-4"
              loading="eager"
              width="64"
              height="16"
            />
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current text-[#00b67a]" />
              ))}
              <span className="ml-1.5 text-xs font-medium text-gray-600">4.9/5</span>
            </div>
          </div>

          <div className="relative mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 mb-4 animate-gradient">
              Discover Your Art's True Value
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Upload a photo of your artwork or antique and get instant AI-powered insights
            </p>
          </div>

          {/* Upload Panel */}
          <div className="relative max-w-md mx-auto mb-16">
            {/* Free Analysis Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-white px-3 py-0.5 rounded-full text-sm font-medium text-gray-600 border border-blue-100 shadow-sm">
                Free Instant Analysis
              </div>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg border border-gray-900/10 transform transition-all duration-300 hover:shadow-xl">
              {/* Blue accent glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-20 blur group-hover:opacity-30 transition duration-300" />
              
              {/* Inner Content */}
              <div className="relative p-5 pt-6 bg-white rounded-xl">
                <form
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                  className="relative"
                >
                  <div
                    className={`relative h-28 rounded-lg transition-all duration-200 ${
                      dragActive 
                        ? 'bg-blue-50 border-blue-400 scale-[1.02]' 
                        : 'bg-white border-gray-900/10'
                    } border-2 border-dashed hover:border-blue-400 hover:bg-blue-50/50`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {selectedFile ? (
                      <div className="h-full flex flex-col items-center justify-center p-4">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          className="max-h-12 mb-2 rounded"
                          loading="eager"
                        />
                        <button
                          onClick={handleRemoveFile}
                          className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleAnalyze}
                          disabled={isUploading}
                          className="px-5 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-sm"
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
                      <div className="h-full flex flex-col items-center justify-center p-3">
                        <div className="p-2 rounded-full bg-blue-50 mb-2">
                          <Camera className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1 text-center">
                          Drop your photo here
                        </p>
                        <button className="px-4 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg text-sm font-medium hover:from-gray-900 hover:to-black transition-all duration-300 shadow-sm">
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

                {/* Trust indicators */}
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">Instant Analysis</span>
                  </div>
                  <div className="w-px h-3 bg-gray-200" />
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">100% Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Panels */}
        <div className="mt-4">
          <ServicePanels />
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0">
          <div className="absolute -top-48 right-0 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-48 left-0 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </div>
    </div>
  );
}