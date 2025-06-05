import React from 'react';
import Link from 'next/link';
import { FiSearch, FiUser, FiShoppingBag, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-black py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-white font-bold text-xl mr-8">
            <img src="/images/logo.png" alt="Tapin Shop" className="w-25 h-12" />
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-purple-500 font-medium flex items-center gap-2">
              Accounts
              <FiChevronDown />
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2">
              Items
              <FiChevronDown />
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white">
              Boosting
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex relative">
            <input 
              type="text" 
              placeholder="Search in Tapin Shop..." 
              className="bg-gray-900 text-white pl-4 pr-10 py-2 rounded-full w-64 focus:outline-none focus:ring-1 focus:ring-purple-600 text-sm" 
            />
            <button className="absolute right-3 top-2.5 text-gray-400">
              <FiSearch size={18} />
            </button>
          </div>
          
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <FiUser size={22} />
          </button>
          
          <div className="relative">
            <button className="text-gray-400 hover:text-white transition-colors duration-200">
              <FiShoppingBag size={22} />
            </button>
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 