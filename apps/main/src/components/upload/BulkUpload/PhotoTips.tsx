import React from 'react';

export function PhotoTips() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
      <h3 className="font-medium text-gray-900 mb-2">Tips for Better Appraisals</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Main Photo</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Clear, well-lit photo of entire item</li>
            <li>• Include frame if framed</li>
            <li>• Avoid glare and reflections</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Additional Photos</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Close-ups of signatures/marks</li>
            <li>• Back showing labels/stamps</li>
            <li>• Details of damage/repairs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}