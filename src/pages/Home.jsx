import React from 'react';
import ContentCarousel from '../components/home/ContentCarousel';
import BestSeller from '../components/home/BestSeller';
import NewProduct from '../components/home/NewProduct';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Carousel */}
      {/* <ContentCarousel /> */}

      {/* Best Seller Section */}
      <section className="py-8">
        <h2 className="text-center text-5xl font-semibold mt-4 text-gray-800">Best Sellers</h2>
        <p className="text-center text-gray-600 mb-4">Discover our top-selling products</p>
        <BestSeller />
      </section>

      {/* New Products Section */}
      <section className="py-8">
        <h2 className="text-center text-3xl font-semibold mt-4 text-gray-800">New Arrivals</h2>
        <p className="text-center text-gray-600 mb-4">Explore the latest arrivals in our store</p>
        <NewProduct />
      </section>
    </div>
  );
}

export default Home;
