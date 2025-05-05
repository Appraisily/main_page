import React from 'react';
import { Camera, Image, Lightbulb } from 'lucide-react';

export function PhotoTips() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-blue-600" />
        <h3 className="text-base font-medium text-gray-900">Tips for Better Appraisals</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex gap-3">
          <div className="mt-1 flex-shrink-0">
            <div className="p-1.5 bg-blue-100 rounded-md">
              <Camera className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Main Photo</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">•</span>
                <span>Clear, well-lit photo of entire item</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">•</span>
                <span>Include frame if framed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">•</span>
                <span>Avoid glare and reflections</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="mt-1 flex-shrink-0">
            <div className="p-1.5 bg-blue-100 rounded-md">
              <Image className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Photos</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">•</span>
                <span>Close-ups of signatures/marks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">•</span>
                <span>Back showing labels/stamps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">•</span>
                <span>Details of damage/repairs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}