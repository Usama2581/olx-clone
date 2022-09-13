import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAd } from '../../config/Firebase'

function Details() {
    const[ad, setAd] = useState()
    const params = useParams()
    let { adId } = params

    const receiveAds = async () => {
        let result = await getAd(adId)
        setAd(result)
    }

    useEffect(() => {
        receiveAds();
    }, [])

    if(!ad){
        return <h2>Loading...</h2>
    }

    let{ url, title, price, description, location } = ad
  return (
    <div>
       <img src={url} />
       <h1>{title}</h1>
       <p>{price}</p>
       <p>{location}</p>
       <p>{description}</p>
    </div>
  )
}

export default Details