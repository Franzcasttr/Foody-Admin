import React from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';

const UserTable = ({
  setConfirmation,
  setOpenEditForm,
  userData,
  setEditUser,
  setDeleteUser,
}) => {
  return (
    <div className='bg-white p-4  rounded-lg mb-2 overflow-x-auto'>
      <table className='border-collapse w-full'>
        <thead className='text-left border-b-2 border-b-gray-400'>
          <tr>
            <th className='sticky pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Name
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Email
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Role
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Action
            </th>
          </tr>
        </thead>
        {userData &&
          userData.map((data, index) => {
            const { _id, name, profileimage, email, role } = data;

            return (
              <tbody key={index} className=''>
                <tr>
                  <td className='pr-24 mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2 '>
                    <div className='flex gap-3 items-center'>
                      <img
                        src={profileimage}
                        alt={name}
                        className='w-[44px] h-[43px] rounded-full  object-cover'
                      />
                      <p>{name}</p>
                    </div>
                  </td>
                  <td className='pr-8 mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2 '>
                    {email}
                  </td>
                  <td className='pr-8 mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2'>
                    <p className='capitalize'>{role}</p>
                  </td>
                  <td className=' text-3xl mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2'>
                    <div className='flex gap-8'>
                      <button
                        className='cursor-pointer text-[#F9258B]'
                        onClick={() => {
                          setConfirmation(true);
                          setDeleteUser(_id);
                        }}>
                        <MdDeleteSweep />
                      </button>
                      <button
                        className='cursor-pointer primary'
                        onClick={() => {
                          setOpenEditForm(true);
                          setEditUser(data);
                        }}>
                        <RiPencilFill />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default UserTable;
