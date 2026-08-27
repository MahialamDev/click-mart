import React from 'react';
import Hero from './(HomePage)/Hero';
import Test from './(HomePage)/Test';
import { getCurrentUser } from '@/lib/auth';

const Home = () => {
  const user = getCurrentUser();
  console.log(user)
  return (
    <div>
      <Hero />
      <Test />
    </div>
  );
};

export default Home;