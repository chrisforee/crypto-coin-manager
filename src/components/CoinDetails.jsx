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
            console.log("SetForm info GET request success", response)
            setFormInfo(response.data.data)
        })
        .catch(err => console.log("Edit page get request error:", err))
},[id])
    return (
        <div>
            <h1>{formInfo.name}</h1>
            <div>
            <h3><img src={formInfo.img} alt="coin" height ="250px"/></h3>
            <div>
                <h1>About</h1>
                <h3>URL: {formInfo.website}</h3>
                <h3>Discord: {formInfo.discord}</h3>
                <h3>Twitter: {formInfo.twitter}</h3>
                <h3>Coins Owned: {formInfo.held}</h3>
                <h3>Owned Goal: {formInfo.goal}</h3>
            </div>
            </div>
            <Link to="/">Back to Coin board</Link>
            <Link to ={`/coin/update/${id}`}>Update Coin</Link>
        </div>
    )
}

export default CoinDetails