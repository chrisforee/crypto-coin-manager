import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CoinForm = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const [formInfo, setFormInfo] = useState({
        name: "",
        img: "",
        website: "",
        discord: "",
        twitter: "",
        held: "",
        goal: "",
    })
    const onChangeHandler = (e) => {
    setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.value
    })
}
    const submitHandler = (e) =>{
        console.log(formInfo)
        e.preventDefault()
        axios.post("http://localhost:8000/api/coin/new", formInfo)
            .then(response =>{
                console.log("Post request: ", response)
                navigate("/")
            })
            .catch((err) => {
                const errorResponse = err.response.data.error.errors;
                console.log("This is the catch: ",  err.response.data.error.errors)
                const errorArr = [];
                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message);
            }
            setErrors(errorArr);
        })
}
    return (
        <div>
    <form className="border border-dark p-3 w-50" onSubmit={submitHandler}>
        {errors.map((err, index)=> <p key = {index} className="text-danger">{err}</p>)}
            <div className='d-flex align-items-center justify-content-evenly'>
                <h1>Add Coin</h1> 
            </div>
            <div className='text-start m-3'>
                <label className='m-3'>Name:</label>
                <input type="text" className='form-label' name='name' onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
                <label className='m-3'>Logo:</label>
                <input type="text" className='form-label' name='img' onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
                <label className='m-3'>URL:</label>
                <input type="text" className='form-label' name='website' onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
                <label className='m-3'>Amount Held:</label>
                <input type="number" className='form-label' name='held' onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
            <label className='m-3'>Owned Goal:</label>
            <input type="number" className='form-label' name='goal' onChange={onChangeHandler}></input>
            </div>
            <button className=" m-2 btn btn-primary btn-lg " type="submit">Add Coin</button>
            <Link className="m-2 btn btn-danger btn-lg" to="/">Back to Coin Board</Link>
        </form>
        </div>
  )
}

export default CoinForm;