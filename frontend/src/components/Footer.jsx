import React from 'react';
import { Link } from 'react-router-dom';
import { SunDim, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <SunDim className="h-6 w-6 text-amber-500" />
              <span className="text-lg font-black tracking-tight uppercase bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                SolarPortal
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Premium solar solutions designed for clean, affordable, and reliable sustainable energy transformation.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm font-semibold text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400">Home</Link></li>
              <li><Link to="/collections" className="text-sm font-semibold text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400">Our Collections</Link></li>
              <li><Link to="/admin-login" className="text-sm font-semibold text-gray-400 hover:text-purple-500 dark:text-gray-500 dark:hover:text-purple-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2.5 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <span>support@solarportal.com</span>
              </li>
              <li className="flex items-center space-x-2.5 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <span>+234 812 345 6789</span>
              </li>
              <li className="flex items-center space-x-2.5 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Ibadan, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Social Icons Section (Using Clean Inline SVGs to avoid package bugs) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-wider uppercase">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 shadow-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 shadow-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 shadow-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" w="20" h="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800/80 text-center">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500">
            &copy; {currentYear} SolarPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
