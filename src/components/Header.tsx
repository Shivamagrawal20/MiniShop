import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={28} className="text-accent-400" />
            <h1 className="text-2xl font-bold tracking-tight">
              Mini<span className="text-accent-400">Shop</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-block text-sm font-medium text-white/80">
              Manage your products with ease
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;