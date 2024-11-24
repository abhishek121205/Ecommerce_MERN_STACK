import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/commonApi';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const Order = () => {
  const [data, setData] = useState([]);
  const fetchOrder = async () => {
    const response = await fetch(SummaryApi.order.url, {
      method: SummaryApi.order.method,
      credentials: "include"
    })

    const responseData = await response.json();
    if (responseData.suucess) {
      setData(responseData.data)
    }

  }

  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <div>
      {
        !data[0] && (
          <p>No Order Available</p>
        )
      }
      <div className='p-4'>
        {
          data.map((val) => (
            <div key={val._id}>
              <p className='font-medium text-lg'>{moment(val.createdAt).format("LL")}</p>
              <div className='border rounded'>
                <div className='flex flex-col lg:flex-row justify-between'>
                  <div className='flex flex-col gap-2'>
                    {
                      val?.productDetails.map((product, index) => (
                        <div key={product.productId} className='flex gap-3'>
                          <img src={product.image[0]}
                            className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                          />
                          <div>
                            <h2 className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</h2>
                            <div className='flex items-center gap-5 mt-1'>
                              <h2 className='text-red-500'>{displayINRCurrency(product.price)}</h2>
                              <p>Quantity : {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                    <div>
                      <h2 className='text-lg font-medium'>Payment Details</h2>
                      <p className='ml-1'>Payment Method : {val.paymentDetails.payment_method_type}</p>
                      <p className='ml-1'>Payment Status : {val.paymentDetails.payment_status}</p>
                    </div>
                    <div>
                      <h2 className='text-lg font-medium'>Shipping Options</h2>
                      {
                        val.shipping_options.map((shipping, index) => (
                          <p key={shipping.shipping_rate + index} className='ml-1'>
                            Shipping Amount : {shipping.shipping_amount}
                          </p>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <h1 className='font-semibold ml-auto w-fit lg:text-lg'>Total Amount : {val.totalAmount}</h1>
              </div>
            </div >
          ))
        }
      </div>
    </div>
  )
}

export default Order
