import React from 'react';
import { PlusCircle, PackageSearch } from 'lucide-react';

interface TabsProps {
  activeTab: 'submission' | 'products';
  setActiveTab: (tab: 'submission' | 'products') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200">
      <button
        className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
          activeTab === 'submission'
            ? 'border-primary-600 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        onClick={() => setActiveTab('submission')}
      >
        <PlusCircle size={18} />
        <span>Product Submission</span>
      </button>
      
      <button
        className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
          activeTab === 'products'
            ? 'border-primary-600 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        onClick={() => setActiveTab('products')}
      >
        <PackageSearch size={18} />
        <span>My Products</span>
      </button>
    </div>
  );
};

export default Tabs;