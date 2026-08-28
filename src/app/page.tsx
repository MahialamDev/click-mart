import React from 'react';
import Hero from './(HomePage)/Hero';
import { getCurrentUser } from '@/lib/auth';
import PopularProducts from './(HomePage)/PopularProducts';
import SpecialBannersAndCategories from './(HomePage)/SpecialBannersAndCategories';

const Home = () => {
  const user = getCurrentUser();
  console.log(user)
  return (
    <div>
      <Hero />
      <PopularProducts />
      <SpecialBannersAndCategories />
    </div>
  );
};

export default Home;