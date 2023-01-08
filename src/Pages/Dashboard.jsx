import React from 'react';
import { useEffect } from 'react';
import Dashboard from '../Components/Dashboard/Dashboard';

const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className='section-center md:mt-8'>
      <Dashboard />
    </section>
  );
};

export default DashboardPage;
