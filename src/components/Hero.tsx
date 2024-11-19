import React, { useState, useCallback } from 'react';
import { Upload, Search, User, Fingerprint, MapPin, Stamp, Calendar, Camera, Star } from 'lucide-react';
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
    <div className="relative min-h-screen overflow-hidden pt-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Blobs */}
        <div className="absolute inset-0">
          <div className="absolute -top-48 right-0 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-48 left-0 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MEgwVjBoNjB2NjBoLS41ek01OSAxSDFWNTloNThWMXoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
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

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
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

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Discover Your Treasures' Worth
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Upload a photo of your artwork or antique and get instant AI-powered insights. No account needed, completely free.
          </p>

          {/* Upload Section */}
          <div className="max-w-md mx-auto mb-16">
            <form
              onDragEnter={handleDrag}
              onSubmit={(e) => e.preventDefault()}
              className="relative"
            >
              <div
                className={`h-32 rounded-xl transition-all duration-200 ${
                  dragActive ? 'bg-blue-50 border-blue-400 scale-105' : 'bg-white border-blue-200'
                } border-2 border-dashed shadow-lg hover:border-blue-400 hover:shadow-xl hover:scale-105`}
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
                      className="max-h-16 mb-2 rounded"
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
                      className="px-6 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
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
                    <p className="text-sm font-medium text-gray-900 mb-1 text-center">
                      Upload a Clear Photo
                    </p>
                    <p className="text-xs text-gray-600 text-center max-w-[200px]">
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

          {/* Service Panels */}
          <ServicePanels />
        </div>
      </div>
    </div>
  );
}