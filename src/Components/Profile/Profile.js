import React, { useEffect, useState } from 'react'
import { getProfile } from '../../config/Firebase'
import Ads from '../Createad/Ads'
import Header from '../Header/Header'

function Profile() {
  let [user, setUser] = useState([])

  const receiveData = async () => {
    let result = await getProfile()
    setUser(result)
  }

  useEffect(() => {
    receiveData()
  })
  return (
    <div>
        <Header />
        {
          user.map(item => {
            return <div>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.age}</p>
              <p>{item.gender}</p>
            </div>
          })
        }
    </div>
  )
}

export default Profile