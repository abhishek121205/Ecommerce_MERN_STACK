import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import AdminProduct from '../components/AdminProduct';
import SummaryApi from '../common/commonApi';

const Allproduct = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    setAllProduct(dataResponse.data)
  }

  useEffect(() => {
    fetchAllProduct()
  }, [openUpload,allProduct])

  return (
    <div className='w-full'>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button onClick={() => setOpenUpload(true)} className='transition-all border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full'>Upload product</button>
      </div>

      {/* displaying all products */}
      <div className='flex items-start flex-wrap py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((val, index) => {
            return (
              <AdminProduct data={val} key={index + "allProduct"} fetchdata={fetchAllProduct} />
            )
          })
        }
      </div>


      {/* upload product component */}
      {
        openUpload ?
          <UploadProduct onClose={() => setOpenUpload(false)} /> :
          null
      }
    </div>
  )
}

export default Allproduct
