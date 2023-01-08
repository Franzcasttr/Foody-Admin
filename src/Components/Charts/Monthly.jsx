import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Monthly = ({ monthlyRevenue }) => {
  const result =
    monthlyRevenue &&
    monthlyRevenue.map((rev, index) => {
      const { Month, totalAmount } = rev;

      return { name: Month, uv: totalAmount / 100 };
    });

  const data = result;

  return (
    <div className=' section-center p-4 rounded-md drop-shadow-6xl bg-white'>
      <p className='mb-8'>Last 6 Months (Revenue)</p>

      <ResponsiveContainer width='100%' height={300}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='uv'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Monthly;
