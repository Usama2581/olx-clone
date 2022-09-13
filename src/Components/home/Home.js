import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAds } from '../../config/Firebase';
import { useEffect } from 'react';
import Header from '../Header/Header';

function Home() {
  const navigate = useNavigate()
  const [ads, setAds] = useState([])
 
  const receiveAds = async () => {
    let result = await getAds()
    setAds(result)
  }

  useEffect(() => {
      receiveAds();
  }, [])
  
  return (
    <div>
      <Header />
      
      {
         ads.map(item => {
          return <div onClick={() => navigate(`/details/${item.id}`)}>
            <img src={item.url} alt="" width='200' height='200' />
            <h2>{item.title}</h2>
            <p>{item.price}</p>
            <p>{item.location}</p>
          </div>
         })
        }
    </div>
  )
}

export default Home