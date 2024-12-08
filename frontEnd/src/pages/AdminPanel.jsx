import React from 'react'
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AllUsers from './AllUsers';
import Allproduct from './Allproduct';
import AllOrder from './AllOrder';

const AdminPanel = () => {
    const user = useSelector(state => state.user.user);
    return (
        <>
            <div className='md:hidden container mx-auto p-4'>
                <h1>This view is optimized for larger screens. Please switch to a desktop or tablet for full access to the admin panel.</h1>
            </div>
            <div className='hidden md:flex min-h-[calc(100vh-120px)]'>
                <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                    <div className='h-32 py-20 flex flex-col justify-center items-center'>
                        <div className='text-5xl cursor-pointer relative flex justify-center'>
                            {
                                user?.profilePic ?
                                    <img src={user.profilePic} alt={user?.userName} className='w-20 h-20 rounded-full object-cover' /> :
                                    <FaRegCircleUser />
                            }
                        </div>
                        <p className='capitalize text-lg font-semibold'>{user?.userName}</p>
                        <p className='text-sm'>{user?.role}</p>
                    </div>
                    {/* navigation */}
                    <div>
                        <nav className='grid p-4'>
                            <Link to="allUsers" className='px-2 py-1 hover:bg-slate-100' >All Users</Link>
                            <Link to="allProducts" className='px-2 py-1 hover:bg-slate-100' >Product</Link>
                            <Link to="allOrders" className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
                        </nav>
                    </div>
                </aside>

                <main className='w-full h-full p-2'>
                    <Routes>
                        <Route path="allUsers" element={<AllUsers />} />
                        <Route path="allProducts" element={<Allproduct />} />
                        <Route path="allOrders" element={<AllOrder />} />
                    </Routes>
                </main>
            </div>
        </>
    )
}

export default AdminPanel
