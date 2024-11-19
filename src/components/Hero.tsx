import React, { useState, useCallback } from 'react';
import { Upload, Search, Sparkles, User, Fingerprint, MapPin, Stamp, Calendar, Camera, Star, Loader2, X } from 'lucide-react';
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

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Upload to temporary storage and get URL
      const response = await fetch('https://appraisals-web-services-backend-856401495068.us-central1.run.app/upload-temp', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const { tempUrl, sessionId } = await response.json();

      // Redirect to screener with the session ID
      window.location.href = `https://screener.appraisily.com/analyze/${sessionId}`;
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden pt-24">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        
        {/* Animated gradient blobs */}
        <div className="absolute top-0 -left-4 w-3/4 h-3/4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.12] animate-blob" />
        <div className="absolute -bottom-8 right-0 w-3/4 h-3/4 bg-gradient-to-l from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.12] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 -left-4 w-3/4 h-3/4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.12] animate-blob animation-delay-4000" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Container */}
        <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-blue-500/5 border border-white/20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium mb-6 shadow-lg shadow-blue-600/10">
              <Sparkles className="w-4 h-4 mr-2" />
              Free Instant Analysis • No Registration Required
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-text animate-gradient">
              Discover Your Art's True Value
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Upload a photo of your artwork or antique and get instant AI-powered insights. No account needed, completely free.
            </p>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md border border-white/40 w-full sm:w-auto">
                <img
                  src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg"
                  alt="Trustpilot"
                  className="h-6 sm:h-7"
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-[#00b67a]" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">4.9/5 (100+ reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md border border-white/40 w-full sm:w-auto">
                <img
                  src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png"
                  alt="Google"
                  className="h-6"
                  style={{ aspectRatio: '1/1' }}
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-[#fbbc05]" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">4.8/5 (100+ reviews)</span>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className="max-w-md mx-auto mb-16">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-blue-400/10 rounded-2xl opacity-90 blur-md"></div>
                <div className="absolute -inset-4 border-2 border-white/40 rounded-2xl"></div>
                <form
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                  className="relative"
                >
                  <div
                    className={`h-40 rounded-xl transition-all duration-200 ${
                      dragActive ? 'bg-blue-50 border-blue-400 scale-105' : 'bg-white/80 border-white/60'
                    } border-2 border-dashed shadow-lg hover:border-blue-400 hover:shadow-xl hover:scale-105 backdrop-blur-sm`}
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
                          className="max-h-24 mb-4 rounded"
                        />
                        <button
                          onClick={handleRemoveFile}
                          className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleAnalyze}
                          disabled={isUploading}
                          className="px-8 py-2 bg-blue-600 text-white rounded-full text-base hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            'Analyze Now'
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center p-4">
                        <div className="p-3 rounded-full bg-blue-50 mb-3">
                          <Camera className="h-8 w-8 text-blue-600" />
                        </div>
                        <p className="text-base font-medium text-gray-900 mb-2 text-center">
                          Upload a Clear Photo
                        </p>
                        <p className="text-sm text-gray-600 text-center max-w-[280px]">
                          Take a well-lit photo of your art or antique from the front
                        </p>
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
              </div>
            </div>
          </div>

          {/* Service Panels */}
          <div className="relative max-w-[1200px] mx-auto">
            <ServicePanels />
          </div>
        </div>
      </div>
    </div>
  );
}