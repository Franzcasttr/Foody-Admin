import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import LoginSVG from '../assets/SVG/LoginSVG';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { selectCurrentToken, setCredentials } from '../features/auth/authSlice';

const initialState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [values, setValues] = useState(initialState);
  const [login] = useLoginMutation();
  const token = useSelector(selectCurrentToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const handleChange = (e) => {
    setValues((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      if (location.state === null) {
        navigate('/');
      } else {
        navigate(location.state.from);
      }
    }
  }, [token]);

  return (
    <div className='section-center mt-6 md:mt-28 '>
      <div className='flex flex-col md:flex-row md:gap-8'>
        <div className='md:flex md:flex-col-reverse mb-7'>
          <div className='grid place-content-center'>
            <LoginSVG className='w-[300px] h-[300px] md:w-[400px]' />
          </div>
          <div className='text'>
            <h1 className='text-center text-3xl md:text-5xl font-semibold'>
              Hungry? You're
              <br />
              in the right place
            </h1>
            <p className='text-center md:text-xl md:mt-2'>
              Welcome to administrative
              <br />
              page.
            </p>
          </div>
        </div>

        <form
          className='flex justify-center  md:m-auto flex-col md:w-2/6 gap-2 p-8 bg-white rounded-md drop-shadow-6xl mb-4'
          onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input
            className='bg-none outline-none h-5 border-b-[2px] border-green-400 border-opacity-20 mb-6 '
            type='text'
            name='email'
            id='username'
            placeholder='Enter your username'
            required
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor='pass'>Password</label>
          <input
            className='bg-none outline-none h-5 border-b-[2px] border-green-400 border-opacity-20 mb-6 '
            type='password'
            name='password'
            id='pass'
            placeholder='Enter your password'
            required
            value={values.password}
            onChange={handleChange}
          />
          <button
            className='greenlight rounded-md p-2 text-white cursor-pointer'
            onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
