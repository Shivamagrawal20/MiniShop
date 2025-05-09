import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import ProductSubmission from './components/ProductSubmission';
import MyProducts from './components/MyProducts';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState<'submission' | 'products'>('submission');

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 animate-fade-in">
          {activeTab === 'submission' ? (
            <ProductSubmission />
          ) : (
            <MyProducts />
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Mini E-Commerce Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;