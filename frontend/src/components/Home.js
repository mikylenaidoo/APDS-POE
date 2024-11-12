// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  UserCheck, 
  CreditCard, 
  Globe, 
  X, 
  Info, 
  ArrowRight 
} from 'lucide-react';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <CreditCard className="w-8 h-8 text-green-600" />,
      title: "Secure Transactions",
      description: "All your payment information is securely stored and transmitted with top-notch encryption.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-green-600" />,
      title: "Easy Registration",
      description: "Register quickly with your personal and account details in just a few steps.",
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "International Payments",
      description: "Make seamless payments internationally using reliable SWIFT codes.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Employee Verification",
      description: "Our dedicated staff verify and process your transactions promptly and accurately.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="text-3xl font-bold text-green-700">
            International Bank
          </div>
          <div className="flex gap-6">
            <Link to="/login">
              <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 transition-all flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex items-center justify-center pt-32 pb-20">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-green-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-lime-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-green-700 mb-6">
            Welcome to Your International Payment Portal
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8">
            Securely register and make international payments through our online banking platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-lg font-medium text-green-600 border border-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2"
            >
              <Info className="w-5 h-5" />
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700">Why Choose Us?</h2>
            <p className="text-gray-600 mt-4">
              We provide a secure and efficient way to manage your international payments with top-notch features.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-green-700">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              About Our Payment System
            </h2>
            <p className="text-gray-700 mb-6">
              Our international payment system allows customers to securely register and make international payments via our online banking platform. Our dedicated staff verify and process transactions promptly, ensuring your payments are handled efficiently and securely.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
              >
                Close
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:underline">About Us</Link></li>
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:underline">Payment Solutions</Link></li>
              <li><Link to="#" className="hover:underline">Account Management</Link></li>
              <li><Link to="#" className="hover:underline">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:underline">Blog</Link></li>
              <li><Link to="#" className="hover:underline">FAQs</Link></li>
              <li><Link to="#" className="hover:underline">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:underline">Terms of Service</Link></li>
              <li><Link to="#" className="hover:underline">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} International Bank. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
