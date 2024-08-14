import React, { useState } from "react";
import './PostJobForm.scss'
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { postApi } from "../../services/ApiConfig";


const PostJobForm = () => {
    const {user} = useSelector(state => {return state.user});
    const [obj, setObj] = useState({
        title: "",
        longDesc: "",
        price:"",
        jobLocation: user.address
      });
      const onRegister = (event) => {
        event.preventDefault();
        
        postApi("http://localhost:8080/seeker/job/create", obj).then((res)=>{
          toast.success(`Job created successfully !`);


        }).catch((error)=>{
            console.log(error);
          toast.error(error.response.data.message)
        });
      };
console.log(obj);
  return (
    <form onSubmit={onRegister}>
      <div className="form-group">
        <label htmlFor="job-name">Give a Title to Your Job</label>
        <input
          type="text"
          id="job-name"
          name="job-name"
          required
          onChange={(event) =>  { setObj((prev)=> ({...prev,title:event.target.value}))  } }
        />
      </div>
      <div className="form-group">
        <label htmlFor="job-desc">Job Description</label>
        <textarea
          id="job-desc"
          name="job-desc"
          required
          onChange={(event) =>  { setObj((prev)=> ({...prev,longDesc:event.target.value}))  } }
        />
      </div>
      <div className="form-group">
        <label htmlFor="coins">Price</label>
        <input
          type="text"
          id="coins"
          name="coins"
          required
          onChange={(event) =>  { setObj((prev)=> ({...prev,price:event.target.value}))  } }
        />
      </div>
      <button type="submit" >Submit</button>
    </form>
  );
};

export default PostJobForm;
