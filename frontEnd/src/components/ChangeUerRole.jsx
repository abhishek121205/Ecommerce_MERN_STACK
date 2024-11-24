import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common/commonApi';
import { toast } from 'react-toastify';

const ChangeUerRole = ({userName,email,role,onClose,userId,callAllUsers}) => {

  const [userRole, setUserRole] = useState(role);

  const handleOnChange = (e)=>{
    setUserRole(e.target.value)
  }

  const updateUser = async()=>{
    const fetchApi = await fetch(SummaryApi.updateUser.url,{
        method : SummaryApi.updateUser.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            userId : userId,
            role : userRole
        })
    })

    const responseData = await fetchApi.json();
    console.log(responseData);
    
    if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callAllUsers()
    }
  }

  return (
    <div className='bg-slate-200 bg-opacity-30 fixed left-0 right-0 top-0 bottom-0 w-full h-full z-10 flex justify-center items-center'>
        <div className='bg-white shadow-md p-4 w-full max-w-sm'>
            <div className='flex justify-between items-baseline'>
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <button onClick={onClose} className='bg-red-700 text-white rounded-full p-1'><IoMdClose /></button>
            </div>
            <p>Name : {userName}</p>
            <p>Email : {email}</p>
            <div className='flex items-center justify-between my-4'>
                <p>Role :</p>
                <select name="" id="" className='border px-4 py-1' value={userRole} onChange={handleOnChange}>
                    {
                        Object.values(ROLE).map((val,index)=>(
                            <option value={val} key={index}>{val}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={updateUser} className='mx-auto block border p-2 rounded-full px-3 py-1 bg-red-600 text-white hover:bg-red-700'>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUerRole
