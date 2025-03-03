import React from 'react';
import { Shield, CreditCard, Lock, DollarSign, CheckCircle2, FileText, Camera, Search, Award, FileCheck, Wallet, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const features = [
    { icon: FileText, text: 'Detailed condition report' },
    { icon: DollarSign, text: 'Market value assessment' },
    { icon: Camera, text: 'High-resolution photography' },
    { icon: Search, text: 'Authentication analysis' },
    { icon: Award, text: 'USPAP compliant documentation' },
    { icon: Shield, text: 'Digital certificate' },
    { icon: FileCheck, text: 'Secure PDF delivery' },
    { icon: Lock, text: 'Expert consultation' }
  ];

  const paymentMethods = [
    {
      name: 'PayPal',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42c-.022.145-.047.29-.078.438-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9L8.14 21.337h4.606c.432 0 .8-.314.868-.74l.036-.23.681-4.32.044-.237c.068-.427.436-.74.868-.74h.546c3.537 0 6.297-1.436 7.104-5.618.34-1.774.016-3.26-.892-4.3-.274-.316-.613-.585-.997-.808z"/>
        </svg>
      )
    },
    {
      name: 'Stripe',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
        </svg>
      )
    },
    {
      name: 'Credit Cards',
      icon: CreditCard
    },
    {
      name: 'Google Pay',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M21.435 7.084h-9.79V10.73h5.61c-.52 2.565-2.7 3.647-5.61 3.647a6.172 6.172 0 0 1-6.193-6.24 6.172 6.172 0 0 1 6.193-6.24c1.534 0 2.917.524 4.006 1.379l2.715-2.67C16.751.227 14.446-.238 12.245-.238 5.463-.238 0 5.144 0 11.825S5.463 23.89 12.245 23.89c6.26 0 10.428-4.4 10.428-10.576 0-1.137-.236-1.984-.45-2.84l-.788-3.39z"/>
        </svg>
      )
    },
    {
      name: 'Apple Pay',
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M7.078 23.55c-.473-.316-.893-.703-1.244-1.15-.383-.463-.738-.95-1.064-1.454-.766-1.12-1.365-2.345-1.78-3.636-.5-1.502-.743-2.94-.743-4.347 0-1.57.34-2.94 1.002-4.09.49-.9 1.22-1.653 2.1-2.182.85-.53 1.84-.82 2.84-.84.35 0 .73.05 1.13.15.29.08.64.21 1.07.37.55.21.85.34.95.37.32.12.59.17.8.17.16 0 .39-.05.645-.13.145-.05.42-.14.81-.31.386-.14.692-.26.935-.35.37-.11.728-.21 1.05-.26.39-.06.777-.08 1.148-.05.71.05 1.36.2 1.94.42 1.02.41 1.843 1.05 2.457 1.96-.26.16-.5.346-.725.55-.487.43-.9.94-1.23 1.505-.43.77-.65 1.64-.644 2.52.015 1.083.29 2.035.84 2.86.387.6.904 1.114 1.534 1.536.31.21.582.355.84.45-.12.375-.252.74-.405 1.1-.347.807-.76 1.58-1.25 2.31-.432.63-.772 1.1-1.03 1.41-.402.48-.79.84-1.18 1.097-.43.285-.935.436-1.452.436-.35.015-.7-.03-1.034-.127-.29-.095-.576-.202-.856-.323-.293-.134-.596-.248-.905-.34-.38-.1-.77-.148-1.164-.147-.4 0-.79.05-1.16.145-.31.088-.61.196-.907.325-.42.175-.695.29-.855.34-.324.096-.656.154-.99.175-.52 0-1.004-.15-1.486-.45zm6.854-18.46c-.68.34-1.326.484-1.973.436-.1-.646 0-1.31.27-2.037.24-.62.56-1.18 1-1.68.46-.52 1.01-.95 1.63-1.26.66-.34 1.29-.52 1.89-.55.08.68 0 1.35-.25 2.07-.228.64-.568 1.23-1 1.76-.435.52-.975.95-1.586 1.26z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Professional appraisal services starting from $59. No hidden charges, just honest expertise.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Professional Appraisal</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Each appraisal includes a comprehensive evaluation of your item with detailed documentation and market analysis.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">What's included</h4>
              <div className="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature.text} className="flex gap-x-3">
                  <feature.icon className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Starting from</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$59</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a
                  href="https://appraisily.com/start/"
                  className="mt-10 block w-full rounded-xl bg-primary px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                >
                  Start Your Appraisal
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Satisfaction guaranteed or your money back
                </p>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <p className="text-sm font-medium text-gray-600 mb-4">100% Secure Payment</p>
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.name}
                        className="text-gray-600 w-8 h-8"
                        title={method.name}
                      >
                        <method.icon className="w-full h-full" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Lock className="h-3 w-3" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Ready to Get Started?</h3>
              <p className="mt-4 text-lg text-gray-600">
                Get your professional art appraisal today with our expert team
              </p>
              <div className="mt-8">
                <a
                  href="https://appraisily.com/start/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}