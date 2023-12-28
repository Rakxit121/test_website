
import Navbar from '../components/Navbar'
import { testApi } from '../apis/api'
import React, {useEffect} from 'react'


const Homepage = () => {
  useEffect(() => {
    testApi().then((res) => {
      console.log(res.data)
    })
  },[])


  return (
    <div>
      <h1>Welcome to Homepage!</h1>
    </div>
  )
}

export default Homepage

