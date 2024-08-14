import React, { useEffect, useState } from 'react';
import './SignUpForm.scss';
import bgImage from "../../Home_images/SignUp_page_background.png";
import Logo from "../../components/navbar/NavbarLogin";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postApi } from '../../services/ApiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {user} = useSelector(state=> state.user);
  const [obj, setObj] = useState({
    email: "",
    name: "",
    password:"",
    aadhar:"",
    age: 0,
    phoneNumber : "",
    address: {
      state: "",
      city: "",
      area: ""
    }
  });
  if(user.email !== ""){
    nav("/profile");
  }
  const onRegister = (event) => {
    event.preventDefault();
    
    postApi("http://localhost:8080/seeker/register", obj).then((res)=>{
      toast.success(`Welcome ${res.data.name} !`);
      dispatch(setUser(res.data))
      nav("/profile");
    }).catch((error)=>{
      toast.error("Already Signed Up ")
    });
  };

  const handleChange = (field, value) => {
    setObj(prev => ({
      ...prev,
      ...field === 'state' || field === 'city' || field === 'area'
        ? { address: { ...prev.address, [field]: value } }
        : { [field]: value }
    }));
  };

  

  return (
    <>
      <div className='nav'>
        <Logo />
        <button onClick={()=>{nav("/Login")}}>Log in</button>
      </div>
      
      <div className="container">
        <div className="form-container">
          <form onSubmit={onRegister}>
            <div className="form-group">
              <label htmlFor="first-name">Full Name</label>
              <input type="text" id="first-name" name="first-name" required onChange={(event) => handleChange('name', event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" required onChange={(event) => handleChange('city', event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" required onChange={(event) => handleChange('state', event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="pincode" name="pincode" required onChange={(event) => handleChange('area', event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="mobile-number">Mobile Number</label>
              <input type="text" id="mobile-number" name="mobile-number" required />
              <button type="button" className="otp-button">Get OTP</button>
              <button type="button" className="otp-button">Resend OTP</button>
              <input placeholder='enter otp' type="text" className="otp" name="otp" required onChange={(event) => handleChange('phoneNumber', event.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required onChange={(event) => handleChange('email', event.target.value)} />
              <button type="button" className="otp-button">Get OTP</button>
              <button type="button" className="otp-button">Resend OTP</button>
              <input placeholder='enter otp' type="text" className="otp" name="otp" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required onChange={(event) => handleChange('password', event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="aadhar-number">Aadhar Number</label>
              <input type="text" id="aadhar-number" name="aadhar-number" required onChange={(event) => handleChange('aadhar', event.target.value)} />
            </div>
            <div className="form-group1">
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">Yes, I understand and agree to the Seeker Terms of Service, including the User Agreement and Privacy Policy.</label>
            </div>
            <button type="submit" className="submit-button">Create my account</button>
            <p>Already have an account? <a href="/Login">Log in</a></p>
          </form>
        </div>
        <div id="background-image">
          <img src={bgImage} alt="background" />
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
