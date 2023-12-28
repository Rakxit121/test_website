import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../apis/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    const data = {
      email: email,
      password: password,
    };

  //   const response = loginUserApi(data)
  //   if(response.data.success == false){
  //     toast.error(response.data.message);
  //   }
  //   else if(response.data.success == true){
  //     toast.success(response.data.message);
  //   }else{
  //     toast.error("Server error");
  //   }
  // };


    loginUserApi(data).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // Handle successful login, such as redirecting to another page home page
          // got to home page
          // window.location.href = '/home';

          localStorage.setItem('token',res.data.token) // set token in local storage

          const jsonDecode  = JSON.stringify(res.data.userData) // set user in local storage
          localStorage.setItem('user' , jsonDecode)

        }
      })
      .catch((err) => {
        toast.error('Server error');
        console.error(err.message);
      });
  };

  return ( 
    <>
      <h1 className='m-4'>Login to your Account!</h1>
      <form className='m-4 w-25'>
        <label>Email</label>
        <input
          onChange={changeEmail}
          type='text'
          className='form-control mb-2'
          placeholder='Enter your Email'
        />
        <label>Password</label>
        <input
          onChange={changePassword}
          type='password'
          className='form-control mb-3'
          placeholder='Enter your Password'
        />
        <button onClick={handleSubmit} className='btn btn-primary w-100 mb-2'>
          Login
        </button>
        <a href='#' className='text-black text-decoration-none'>
          Forgot Password?
        </a>
      </form>
    </>
  );
};  

export default LoginPage;