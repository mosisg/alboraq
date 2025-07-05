import React from 'react';
import Hero from '../components/Hero';
import SpecialOffers from '../components/SpecialOffers';
import PopularDestinations from '../components/PopularDestinations';
import WhyChooseUs from '../components/WhyChooseUs';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <SpecialOffers />
      <PopularDestinations />
      <WhyChooseUs />
    </>
  );
};

export default Home;