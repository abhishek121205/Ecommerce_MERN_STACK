import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common/commonApi';
import { useDispatch } from 'react-redux';
import { setVerified, setVerifiedEmail } from '../store/userSlice';
import loginIcons from "../assest/signin.gif"
import { toast } from 'react-toastify';


const ForgotPassword = () => {
  const dispatch = useDispatch(); 
  const [email, setEmail] = useState({});
  const [otp, setOtp] = useState({});
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  }

  const handleOtp = (e) => {
    let { name, value } = e.target;
    setOtp({ ...otp, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.forgetPassword.url, {
      method: SummaryApi.forgetPassword.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(email)
    })
    const receivedData = await dataResponse.json();
    if (receivedData.success) {
      toast.success(receivedData.message);
      dispatch(setVerifiedEmail(email))
      setVerify(true);
      setEmail({});
    }
    if (receivedData.error) {
      toast.error(receivedData.message);
    }
  }

  const handleVerification = async () => {
    const dataResponse = await fetch(SummaryApi.verifyOtp.url, {
      method: SummaryApi.verifyOtp.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(otp)
    })

    const receivedData = await dataResponse.json();

    if (receivedData.success) {
      toast.success(receivedData.message);
      dispatch(setVerified(true));
      setVerify(false);
      setOtp({});
      navigate("/changePassword")
    }
    if (receivedData.error) {
      toast.error(receivedData.message);
    }
  }
  return (
    <section id="forgotPassword">
      <div className='container mx-auto p-4'>
        <div className='bg-white p-4 w-full max-w-sm mx-auto '>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt="login icons" />
          </div>
          {
            verify ?
              <div className='pt-6 flex flex-col gap-y-3'>
                <div className=''>
                  <label>Verify OTP:</label>
                  <div className='bg-slate-100 p-2'>
                    <input type="text"
                      placeholder='Enter OTP'
                      name='otp'
                      onChange={handleOtp}
                      required
                      className='w-full h-full outline-none bg-transparent' />
                  </div>
                </div>
                <button onClick={handleVerification} className='bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Verify OTP</button>
              </div> :
              <form className='pt-6 flex flex-col gap-y-3' onSubmit={handleSubmit}>
                <div className=''>
                  <label>Email:</label>
                  <div className='bg-slate-100 p-2'>
                    <input type="email"
                      placeholder='Enter email'
                      name='email'
                      onChange={handleChange}
                      required
                      className='w-full h-full outline-none bg-transparent' />
                  </div>
                </div>
                <button className='bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Submit</button>
              </form>
          }
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
