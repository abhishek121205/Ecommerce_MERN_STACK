import React, { useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom"
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common/commonApi';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [isShow,setIsShow] = useState(false);
  const [isConfirmShow,setIsConfirmShow] = useState(false);
  const [data,setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e)=>{
    let {name,value} = e.target;
    setData({...data,[name]:value});
  }

  const handleUploadImg = async(e)=>{
    const file = e.target.files[0]
    const imagePic = await imageToBase64(file)
    setData({...data,profilePic:imagePic})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault(); 
     
    if(data.password == data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const addedData = await dataResponse.json();
      if(addedData.success){
        toast.success(addedData.message);
        navigate("/login")  
      }
      if(addedData.error){
        toast.error(addedData.message);  
      }
    }else{
      toast.error("confirm password not match");  
    }
  }

  return (
    <section id="signup">
      <div className='container mx-auto p-4'>
        <div className='bg-white p-4 w-full max-w-sm mx-auto '>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type="file" className='hidden' onChange={handleUploadImg}/>
              </label>
            </form>
          </div>
          <form className='pt-6 flex flex-col gap-y-3' onSubmit={handleSubmit}>
            
            <div className=''>
              <label>User Name:</label>
              <div className='bg-slate-100 p-2'>
                <input type="text" 
                placeholder='Enter name' 
                name='userName'
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>
            
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
            </div>

            <div className=''>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={isConfirmShow?"text":"password"} 
                placeholder='Enter password' 
                name='confirmPassword'
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer text-xl'>
                  <span>{isConfirmShow?<FaRegEyeSlash onClick={()=>setIsConfirmShow(false)} />:<FaRegEye onClick={()=>setIsConfirmShow(true)} />}</span>  
                </div>
              </div>
            </div>

            <button className='bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Sign In</button>
          </form>
          <p className='my-5'>Already have an account ? <Link to={"/login"} className='hover:text-red-600 hover:underline' >Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
