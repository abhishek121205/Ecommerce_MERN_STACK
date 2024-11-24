import React from 'react'
import SUCCESSIMAGE from "../assest/success.gif"
import { Link } from "react-router-dom"

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
      <img src={SUCCESSIMAGE} alt="" className='mix-blend-multiply' width={150} height={150} />
      <p className='text-green-600 font-bold text-xl'>Payment Successfull</p>
      <Link to={'/order'} className='p-2 px-3 mt-5 border border-green-600 rounded font-semibold hover:bg-green-600 text-white'>See Order</Link>
    </div>
  )
}

export default Success
