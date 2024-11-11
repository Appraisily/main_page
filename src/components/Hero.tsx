import React, { useState, useCallback } from 'react';
import { Upload, X, Sparkles, User, Fingerprint, MapPin, Stamp, Calendar, Search, Camera, Star, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useImageAnalysis } from '../hooks/useImageAnalysis';

const IMAGEKIT_URL = 'https://ik.imagekit.io/appraisily/WebPage';

export default function Hero() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadImage, loading, error } = useImageAnalysis();
  const navigate = useNavigate();

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
      const result = await uploadImage(selectedFile);
      navigate(`/report/${result.sessionId}`);
    } catch (err) {
      console.error('Error analyzing image:', err);
    }
  };

  const services = [
    {
      id: 'maker',
      name: 'Maker Analysis',
      description: 'Identify potential creator',
      icon: User,
      image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_fc752f0c-9845-4187-892b-41cb30e447e1.png?tr=w-200,h-200`,
      position: { x: 350, y: -100 }
    },
    {
      id: 'signature',
      name: 'Signature Check',
      description: 'Analyze signatures',
      icon: Fingerprint,
      image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_937ed6cc-0969-479b-aec9-a9a371d8cc8b.png?tr=w-200,h-200`,
      position: { x: 350, y: 100 }
    },
    {
      id: 'origin',
      name: 'Origin Analysis',
      description: 'Determine likely origin',
      icon: MapPin,
      image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-200,h-200`,
      position: { x: -350, y: -100 }
    },
    {
      id: 'marks',
      name: 'Marks Recognition',
      description: 'Identify maker marks',
      icon: Stamp,
      image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_8561145d-60b4-468e-9094-c0cdea16e440.png?tr=w-200,h-200`,
      position: { x: -350, y: 100 }
    },
    {
      id: 'age',
      name: 'Age Analysis',
      description: 'Estimate creation period',
      icon: Calendar,
      image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_90c3d603-4bed-4911-987d-7579f27bfc6b.png?tr=w-200,h-200`,
      position: { x: 0, y: -150 }
    },
    {
      id: 'visual',
      name: 'Visual Search',
      description: 'Find similar artworks',
      icon: Search,
      image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_6ac023f3-b669-4d66-a044-e2295cf25a1d.png?tr=w-200,h-200`,
      position: { x: 0, y: 150 }
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-24 bg-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3b82f6,_transparent_70%)] opacity-[0.07]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#3b82f6,_transparent_70%)] opacity-[0.07]"></div>
      </div>
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MEgwVjBoNjB2NjBoLS41ek01OSAxSDFWNTloNThWMXoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iLjAyIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Free Instant Analysis • No Registration Required
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Discover Your Art's True Value
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Upload a photo of your artwork or antique and get instant AI-powered insights. No account needed, completely free.
          </p>

          {/* Social Proof Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-white.svg"
                alt="Trustpilot"
                className="h-6 sm:h-7"
              />
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-[#00b67a]" />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-600">4.9/5 (2.5k+ reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png"
                alt="Google"
                className="h-6"
              />
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-[#fbbc05]" />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-600">4.8/5 (1.8k+ reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-[1200px] mx-auto h-[28rem] md:h-[32rem]">
          {/* Service Cards - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-105"
                  style={{
                    left: `calc(50% + ${service.position.x}px)`,
                    top: `calc(50% + ${service.position.y}px)`,
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-blue-100 transition-all duration-300 w-64 group border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10 group-hover:to-black/5 transition-colors"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center gap-2">
                          {service.name}
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 left-1/2 -z-10"
                    style={{
                      width: Math.abs(service.position.x),
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.1))',
                      transform: `rotate(${Math.atan2(service.position.y, service.position.x) * (180 / Math.PI)}deg)`,
                      transformOrigin: service.position.x > 0 ? 'left' : 'right'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Enhanced Center Upload Area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs z-10">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-blue-400/10 rounded-2xl opacity-90 blur-md"></div>
            <div className="absolute -inset-4 border-2 border-blue-200 rounded-2xl"></div>
            <form
              onDragEnter={handleDrag}
              onSubmit={(e) => e.preventDefault()}
              className="relative h-full"
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
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="px-6 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
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
                    />
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Mobile Service Grid - Redesigned to be more compact */}
          <div className="mt-48 md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      <h3 className="font-medium text-gray-900 text-sm">{service.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}