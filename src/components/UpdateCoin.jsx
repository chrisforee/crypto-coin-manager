import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import {useParams} from 'react-router'

const UpdateCoin = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const {id} = useParams();

    const [formInfo, setFormInfo] = useState({
        name: "",
        img: "",
        website: "",
        discord: "",
        twitter: "",
        held: "",
        goal: "",
})

useEffect(()=>{
    axios.get(`http://localhost:8000/api/coin/update/${id}`)
        .then(response => {
            console.log(response)
            setFormInfo(response.data.data)
        })
        .catch(err => console.log("Edit page get request:", err))
},[id])

const onChangeHandler = (e) => {
    setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.value
    })
}
const submitHandler = (e) =>{
    console.log(formInfo)
    e.preventDefault()
    axios.put(`http://localhost:8000/api/coin/update/${id}`, formInfo)
        .then(response =>{
            console.log("PUT request: ", response)
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
            <h1>Update Coin</h1> 
        </div>
            <div className='text-start m-3'>
                <label className='m-3'>Name:</label>
                <input type="text" className='form-label' name='name' value={formInfo.name}  onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
                <label className='m-3'>Logo:</label>
                <input type="text" className='form-label' name='img' value={formInfo.img}  onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
                <label className='m-3'>URL:</label>
                <input type="text" className='form-label' name='website' value={formInfo.website}  onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
                <label className='m-3'>Amount Held:</label>
                <input type="number" className='form-label' name='held' value={formInfo.held}  onChange={onChangeHandler}></input>
            </div>
            <div className='text-start m-3'>
            <label className='m-3'>Owned Goal:</label>
                <input type="number" className='form-label' name='goal' value={formInfo.goal}  onChange={onChangeHandler}></input>
            </div>
            <button className=" m-2 btn btn-primary btn-lg" type="submit">Update Coin</button>
            <Link className="m-2 btn btn-danger btn-lg" to="/">Back to Coin Board</Link>
        </form>
        </div>
    )
}

export default UpdateCoin