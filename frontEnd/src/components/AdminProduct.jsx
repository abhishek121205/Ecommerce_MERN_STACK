import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common/commonApi';
import { toast } from 'react-toastify';

const AdminProduct = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);
    const deleteProduct = async (id) => {
        const fetchData = await fetch(SummaryApi.deleteProduct.url, {
            method: SummaryApi.deleteProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({ id: id })
        })

        const dataResponse = await fetchData.json();
        if (dataResponse.success) {
            toast(dataResponse.message)
        }
        if (dataResponse.error) {
            toast(dataResponse.message)
        }
    }

    return (
        <div className='p-2 md:w-[50%] lg:w-[25%]'>
            <div className='bg-white rounded p-3 w-full flex justify-center items-center flex-col'>
                <div className='w-32 h-32'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-1'>{data?.productName}</h1>
                <div>
                    <p className='font-semibold'>
                        {
                            displayINRCurrency(data?.sellingPrice)
                        }
                    </p>
                </div>
                <div className='w-full flex justify-end gap-2'>
                    <div className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                    <div className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={() => deleteProduct(data?._id)}>
                        <MdDelete />
                    </div>
                </div>
            </div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }
        </div>
    )
}

export default AdminProduct