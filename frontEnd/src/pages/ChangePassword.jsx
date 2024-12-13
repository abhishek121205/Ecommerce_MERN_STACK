import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginIcons from "../assest/signin.gif"
import { toast } from 'react-toastify';
import SummaryApi from '../common/commonApi';
import { setVerified, setVerifiedEmail } from '../store/userSlice';

const ChangePassword = () => {
    const [data, setData] = useState({});
    const [isShow, setIsShow] = useState(false);
    const { verified } = useSelector(state => state?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.changePassword.url, {
            method: SummaryApi.changePassword.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ password: data.password, email: verified.verifiedEmail })
        })
        const addedData = await dataResponse.json();
        if (addedData.success) {
            toast.success(addedData.message);
            dispatch(setVerified(false));
            dispatch(setVerifiedEmail(""));
            navigate("/login")
        }
        if (addedData.error) {
            toast.error(addedData.message);
        }
    }

    return (
        <section id="changePassword">
            <div className='container mx-auto p-4'>
                <div className='bg-white p-4 w-full max-w-sm mx-auto '>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt="login icons" />
                    </div>
                    <form className='pt-6 flex flex-col gap-y-3' onSubmit={handleSubmit}>
                        <div className=''>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={isShow ? "text" : "password"}
                                    placeholder='Enter password'
                                    name='password'
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl'>
                                    <span>{isShow ? <FaRegEyeSlash onClick={() => setIsShow(false)} /> : <FaRegEye onClick={() => setIsShow(true)} />}</span>
                                </div>
                            </div>
                        </div>
                        <button className='bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Change</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword
