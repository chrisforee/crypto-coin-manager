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
    <form onSubmit={submitHandler}>
        {errors.map((err, index)=> <p key = {index}>{err}</p>)}
            <div>
                <h1>Add Coin</h1> 
            </div>
            <div>
                <label>Name:</label>
                <input type="text" className='form-label' name='name' onChange={onChangeHandler}></input>
            </div>
            <div>
                <label>Logo:</label>
                <input type="text" className='form-label' name='img' onChange={onChangeHandler}></input>
            </div>
            <div>
                <label>URL:</label>
                <input type="text" className='form-label' name='website' onChange={onChangeHandler}></input>
            </div>
            <div>
                <label className='m-3'>Amount Held:</label>
                <input type="number" className='form-label' name='held' onChange={onChangeHandler}></input>
            </div>
            <div>
            <label>Owned Goal:</label>
            <input type="number" className='form-label' name='goal' onChange={onChangeHandler}></input>
            </div>
            <button type="submit">Add Coin</button>
            <Link to="/">Back to Coin Board</Link>
        </form>
        </div>
  )
}

export default CoinForm;