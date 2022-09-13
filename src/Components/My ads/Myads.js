import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { myAds } from '../../config/Firebase'
import Header from '../Header/Header'

function Myads() {
    let [ads, setAds] = useState([])
    const navigate = useNavigate()


    const receiveAds = async () => {
        let result = await myAds()
        setAds(result)
    }
    
    
    useEffect(() => {
        receiveAds();
    })
    return (
        <div>
            <Header />
            {
                ads.map(item => {
                  return <div onClick={ () => navigate(`/details/${item.id}`)}>
                  <img src={item.url}/>
                  <h2>{item.title}</h2>
                  <p>{item.location}</p>
                  <p>{item.price}</p>
                  </div>
                })
            }
        </div>
    )
}

export default Myads