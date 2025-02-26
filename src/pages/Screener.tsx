import React from 'react';
import ImageUploader from '../components/ImageUploader';

export default function Screener() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Upload Your Artwork
          </h1>
          <ImageUploader />
        </div>
      </div>
    </div>
  );
}