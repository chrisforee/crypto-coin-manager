import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllCoins = () => {
    const [allCoins, setAllCoins] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/coin/all')
        .then(res => { console.log(res.data)
            setAllCoins(res.data.data);
        })
        .catch(err => console.error("Error in showAllCoins", err))
    },[loaded])

    const deleteCoin = (e, coinId) => {
        console.log("Deleting Coin", coinId)
        axios.delete(`http://localhost:8000/api/coin/delete/${coinId}`)
        .then((response)=>{
            console.log("Delete was successful", response)
            setLoaded(!loaded)
        })
    }

    return(
        <div>
            <div>
                <h1>Coins</h1>
                <p><Link to='/coin/new'>Add Coin</Link></p>
            </div>
            <div>
                { allCoins.map((coin, index) => {
                return (
                    <div key={index}>
                        <div>
                        <p ><img src={coin.img} alt="coin" height ="150px"/></p>
                        <h1 >{coin.name}</h1>
                        </div>
                        <Link to ={`/coin/details/${coin._id}`} >View-Update Coin</Link>
                        <button  onClick={(e) => {deleteCoin(e,coin._id)}}>Remove Coin</button>
                    </div>
                    )
                })}
            </div>
        </div>
        )
}
        
export default AllCoins;