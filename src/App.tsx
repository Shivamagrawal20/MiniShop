import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import ProductSubmission from './components/ProductSubmission';
import MyProducts from './components/MyProducts';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState<'submission' | 'products'>('submission');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 animate-fade-in">
          {activeTab === 'submission' ? (
            <ProductSubmission />
          ) : (
            <MyProducts />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;