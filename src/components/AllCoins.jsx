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
        <div className='border border-dark container w-75'>
            <div className='d-flex align-items-center justify-content-between'>
                <h1>Coins</h1>
                <p><Link to='/coin/new'>Add Coin</Link></p>
            </div>
            <div>
                { allCoins.map((coin, index) => {
                return (
                    <div key={index} className='border border-danger m-3'>
                        <div className='d-flex justify-content-evenly align-items-center p-3'>
                        <p className='text-start'><img src={coin.img} alt="coin" height ="150px"/></p>
                        <h1 className="fst-italic fw-bold align-middle">{coin.name}</h1>
                        </div>
                        <Link to ={`/coin/details/${coin._id}`} className=" m-1 btn btn-lg btn-primary">View-Update Coin</Link>
                        <button className=" m-1 btn btn-lg btn-danger" onClick={(e) => {deleteCoin(e,coin._id)}}>Remove Coin</button>
                    </div>
                    )
                })}
            </div>
        </div>
        )
}
        
export default AllCoins;