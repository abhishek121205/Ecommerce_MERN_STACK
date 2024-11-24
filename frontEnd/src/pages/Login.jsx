import React, { useContext, useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom"
import SummaryApi from '../common/commonApi';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

  const [isShow,setIsShow] = useState(false);
  const [data,setData] = useState({});
  const navigate = useNavigate();

  const { fetchUser, fetchUserAddToCart } = useContext(Context);  

  const handleChange = (e)=>{
    let {name,value} = e.target;
    setData({...data,[name]:value});
  }

  const handleSubmit = async(e)=>{
     e.preventDefault();
     
     const dataResponse = await fetch(SummaryApi.logIn.url,{
      method : SummaryApi.logIn.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const addedData = await dataResponse.json();

    if(addedData.success){
      toast.success(addedData.message);
      navigate("/");
      fetchUser();
      fetchUserAddToCart();
    }
    if(addedData.error){
      toast.error(addedData.message);  
    }
  }

  return (
    <section id="login">
      <div className='container mx-auto p-4'>
        <div className='bg-white p-4 w-full max-w-sm mx-auto '>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt="login icons" />
          </div>
          <form className='pt-6 flex flex-col gap-y-3' onSubmit={handleSubmit}>
            <div className=''>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input type="email" 
                placeholder='Enter email' 
                name='email'
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div className=''>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={isShow?"text":"password"} 
                placeholder='Enter password' 
                name='password'
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer text-xl'>
                  <span>{isShow?<FaRegEyeSlash onClick={()=>setIsShow(false)} />:<FaRegEye onClick={()=>setIsShow(true)} />}</span>  
                </div>
              </div>
              <Link to={"/forgot-password"} className="mt-4 block w-fit ml-auto hover:underline hover:text-red-600" >Forgot password?</Link>
            </div>

            <button className='bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Login</button>
          </form>
          <p className='my-5'>Don't have an account ? <Link to={"/signup"} className='hover:text-red-600 hover:underline' >Sign up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login
