import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Pricing() {
  const { theme } = useApp();

  const plans = [
    {
      name: "Basic Bidder",
      price: "Free",
      description: "Perfect for casual bidders",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Participate in all auction types",
        "Basic bid tracking",
        "Email notifications",
        "Standard customer support",
        "Mobile app access"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro Bidder",
      price: "$19",
      period: "/month",
      description: "For serious investors",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Everything in Basic",
        "Advanced analytics",
        "Priority notifications",
        "Auto-bidding features",
        "Priority customer support",
        "Exclusive auction access"
      ],
      buttonText: "Start Pro Trial",
      popular: true
    },
    {
      name: "Seller Pro",
      price: "$49",
      period: "/month",
      description: "For property sellers",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "List unlimited properties",
        "Advanced listing tools",
        "Marketing boost features",
        "Detailed analytics",
        "Dedicated account manager",
        "Custom auction settings"
      ],
      buttonText: "Start Selling",
      popular: false
    }
  ];

  const feeStructure = [
    {
      category: "Buyer Fees",
      items: [
        { description: "Successful bid fee", fee: "2.5% of winning bid" },
        { description: "Payment processing", fee: "2.9% + $0.30" },
        { description: "Failed payment fee", fee: "$25" }
      ]
    },
    {
      category: "Seller Fees",
      items: [
        { description: "Listing fee", fee: "Free for first 5 listings" },
        { description: "Success fee", fee: "5% of final sale price" },
        { description: "Featured listing", fee: "$50 per listing" }
      ]
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-blue-900/80 to-green-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Star className="h-4 w-4 mr-2" />
              Transparent Pricing
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Simple
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                Pricing
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Choose the plan that fits your needs. Start for free and upgrade as you grow. 
              No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-xl ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 shadow-xl' 
                  : theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm hover:shadow-lg transition-all`}>
                
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    plan.popular 
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Fee Structure
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Transparent fees with no hidden charges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feeStructure.map((category, index) => (
              <div key={index} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {category.category}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </span>
                      <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {item.fee}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-12 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-green-900 to-blue-900' : 'bg-gradient-to-r from-green-600 to-blue-600'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Questions About Pricing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our team is here to help you choose the right plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </a>
              <a
                href="/help"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}