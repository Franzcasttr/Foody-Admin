import React from 'react';

const RecentUser = ({ userData }) => {
  return (
    <div className='my-9 p-5 text-left bg-white rounded-lg overflow-x-auto'>
      <p className='text-xl mb-4'>Recent Users</p>
      <table className='border-collapse w-full p-12'>
        <thead className='bg-clr text-white'>
          <tr>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Full Name
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Email
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Role
            </th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {userData &&
            userData.slice(0, 5).map((user, index) => {
              const { name, email, role } = user;
              return (
                <tr key={index}>
                  <td className='p-3 text-lg tracking-wide primary2 text-left'>
                    {name}
                  </td>
                  <td className='p-3 text-lg tracking-wide primary2 text-left'>
                    {email}
                  </td>
                  <td className='p-3 text-lg tracking-wide primary2 text-left'>
                    {role}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUser;
