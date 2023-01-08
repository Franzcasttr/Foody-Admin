const RecentOrder = ({ orderData }) => {
  return (
    <div className=' p-5 mb-8 text-left bg-white rounded-lg overflow-x-auto shadow-md'>
      <p className='text-xl mb-4'>Recent Orders</p>
      <table className='border-collapse w-full'>
        <thead className='bg-lightblue text-white'>
          <tr>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Customer Name
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Address
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Product
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Order Date
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Status
            </th>
          </tr>
        </thead>
        {orderData &&
          orderData.slice(0, 10).map((data, index) => {
            const { user, addressId, items, orderStatus } = data;
            const { name: userName, profileimage } = user;
            const { street, province, city, barangay, postalcode } = addressId;

            const item = items.map((item, index) => {
              const { productId } = item;
              return (
                <div key={index}>
                  {productId.name}
                  <br />
                </div>
              );
            });
            const date = items.map((item, index) => {
              const { date } = item;
              return (
                <div key={index}>
                  {date}
                  <br />
                </div>
              );
            });

            return (
              <tbody key={index} className=''>
                <tr>
                  <td className='p-3 pr-24 text-lg tracking-wide primary2 '>
                    <div className='flex gap-3 items-center'>
                      <img
                        src={profileimage}
                        alt={userName}
                        className='w-[44px] h-[43px] rounded-full  object-cover'
                      />
                      <p>{userName}</p>
                    </div>
                  </td>
                  <td className='p-3 text-lg tracking-wide primary2 '>
                    {street}, {barangay}, {province},<br />
                    {city}, {postalcode}
                  </td>
                  <td className='p-3 text-lg tracking-wide primary2'>{item}</td>
                  <td className='p-3 text-lg tracking-wide primary2'>{date}</td>

                  <td className='p-3 text-lg tracking-wide primary2'>
                    {(orderStatus === 'completed' && (
                      <div className='p-2 bg-clr rounded-full text-white text-center'>
                        {orderStatus}
                      </div>
                    )) ||
                      (orderStatus === 'preparing' && (
                        <div className='p-2 bg-text rounded-full text-white text-center'>
                          {orderStatus}
                        </div>
                      )) ||
                      (orderStatus === 'delivered' && (
                        <div className='p-2 bg-lightblue rounded-full text-white text-center'>
                          {orderStatus}
                        </div>
                      ))}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default RecentOrder;
