import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link} from 'react-router-dom'
import {useParams} from 'react-router'

const CoinDetails = () => {
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
    axios.get(`http://localhost:8000/api/coin/${id}`)
        .then(response => {
            console.log("SetForm info GET request", response)
            setFormInfo(response.data.data)
        })
        .catch(err => console.log("Edit page get request error:", err))
},[id])
    return (
        <div className='border border-dark container w-75'>
            <h1>{formInfo.name}</h1>
            <div className='d-flex align-items-top justify-content-evenly'>
            <h3 className='border border-warning p-3'><img src={formInfo.img} alt="coin" height ="250px"/></h3>
            <div className='border border-danger p-3'>
                <h1>About</h1>
                <h3 className='m-3'>URL: {formInfo.website}</h3>
                <h3 className='m-3'>Discord: {formInfo.discord}</h3>
                <h3>Twitter: {formInfo.twitter}</h3>
                <h3>Coins Owned: {formInfo.held}</h3>
                <h3>Owned Goal: {formInfo.goal}</h3>
            </div>
            </div>
            <Link className="m-2 btn btn-danger btn btn-lg" to="/">Back to Coin board</Link>
            <Link to ={`/coin/update/${id}`} className=" m-1 btn btn-lg btn-primary">Update Coin</Link>
        </div>
    )
}

export default CoinDetails