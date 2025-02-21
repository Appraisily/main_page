import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, Package, ArrowRight, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ServiceType = 'standard' | 'insurance' | 'tax';

interface ReviewItem {
  id: string;
  preview: string;
  description: string;
}

export default function ReviewPage() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState<ServiceType>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated items - in real app, these would come from the upload step
  const items: ReviewItem[] = [
    {
      id: '1',
      preview: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400&h=300',
      description: ''
    },
    {
      id: '2',
      preview: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=400&h=300',
      description: ''
    }
  ];

  const calculateTotal = () => {
    const basePrice = {
      standard: 59,
      insurance: 89,
      tax: 129
    }[serviceType];

    const itemCount = items.length;
    const discount = itemCount >= 5 ? {
      standard: 0.10,
      insurance: 0.15,
      tax: 0.20
    }[serviceType] : 0;

    const subtotal = basePrice * itemCount;
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    return { subtotal, discountAmount, total };
  };

  const { subtotal, discountAmount, total } = calculateTotal();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here we would submit the items and create a payment session
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/bulk-appraisal/success/123');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items Review */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Review Items
                  </h1>
                  <p className="text-gray-600">
                    {items.length} items for appraisal
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 p-4 border rounded-lg">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={item.preview}
                        alt="Item preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">
                      <textarea
                        placeholder="Add description (optional)"
                        className="w-full h-24 p-3 border rounded-md"
                        value={item.description}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Selection & Checkout */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select Service Type
              </h2>
              <Select
                value={serviceType}
                onValueChange={(value: ServiceType) => setServiceType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Appraisal</SelectItem>
                  <SelectItem value="insurance">Insurance Appraisal</SelectItem>
                  <SelectItem value="tax">Tax Appraisal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Volume Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-4 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full mt-4 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}