import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import '../../assets/styles/style.css';
import { FreeMode, Pagination } from 'swiper';

const MobileView = ({ userData, productData, orderData }) => {
  const total =
    orderData &&
    orderData.reduce(
      (a, b) => a + Number(b.items.length),

      0
    );

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className='mySwiper'>
        <div className='mobile md:hidden'>
          <div className=''>
            {/* data1 */}
            <SwiperSlide>
              <div className='flex flex-col text-center items-center gap-4 h-fit p-3 bg-clr text-white rounded-md w-full'>
                <div>
                  <HiOutlineUserGroup className='p-1 greenlight text-5xl rounded-md' />
                </div>
                <div className='font-bold flex flex-col gap-1 text-base '>
                  <div>{userData && userData.length}</div>
                  <div>
                    {userData && userData.length > 1 ? 'Users' : 'User'}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {/* end data1 */}
            {/* data2 */}
            <SwiperSlide>
              <div className='flex flex-col text-center items-center gap-4 h-fit p-3 bg-lightblue  text-white rounded-md w-full'>
                <div>
                  <IoFastFoodOutline className='p-1 bg-white text-5xl rounded-md text-red-400' />
                </div>
                <div className='font-bold flex flex-col gap-1 text-base'>
                  <div>{productData && productData.length}</div>
                  <div>
                    {productData && productData.length > 1
                      ? 'Products'
                      : 'Product'}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {/* end data2 */}
            {/* data3 */}
            <SwiperSlide>
              <div className='flex flex-col text-center items-center gap-4 h-fit p-3 bg-text  text-white rounded-md w-full'>
                <div>
                  <BsBoxSeam className='p-1 bg-white text-5xl rounded-md primary' />
                </div>
                <div className='font-bold flex flex-col  items-center gap-1 text-base '>
                  <div>{total}</div>
                  <div>{total > 1 ? 'Orders' : 'Order'}</div>
                </div>
              </div>
            </SwiperSlide>

            {/* end data3 */}
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default MobileView;
