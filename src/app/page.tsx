import React from 'react';
import Hero from './(HomePage)/Hero';

import PopularProducts from './(HomePage)/PopularProducts';
import SpecialBannersAndCategories from './(HomePage)/SpecialBannersAndCategories';

const Home = () => {
  
  return (
    <div>
      <Hero />
      <PopularProducts />
      <SpecialBannersAndCategories />
    </div>
  );
};

export default Home;