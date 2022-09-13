import React, { useState } from 'react'
import swal from 'sweetalert'
import { postAd } from '../../config/Firebase'
import Header from '../Header/Header'

function Ads() {

    let[adsDetails, setAdsDetails] = useState({})
    let[img, setImg] = useState({})
    // const [imgUrl, setImgUrl] = useState({}) 


    const updateAd = (e, key) => {
        setAdsDetails({ ...adsDetails, [key]: e.target.value })
    }

    const handleFiles = async (e) => {
        setImg(e.target.files[0])
    }
   

    const submit = async () => {
        try {
            await postAd(img, adsDetails)
            swal("Ad Posted", "", "succes")
            
        } catch (e) {
            swal(e.message, "", "error")
        }
    } 
    return (
        <div>
            <Header />
            <h1>Create Ads</h1>
            <input type="text" placeholder='title' onChange={(e) => updateAd(e, 'title')} />
            <input type="tel" placeholder='price' onChange={(e) => updateAd(e, 'price')} />
            <input type="text" placeholder='location' onChange={(e) => updateAd(e, 'location')} />
            <input type="text" placeholder='description' onChange={(e) => updateAd(e, 'description')} />
            <input type="file" onChange={handleFiles} />
            <button onClick={submit}>Post Ad</button>
        </div>
    )
}

export default Ads