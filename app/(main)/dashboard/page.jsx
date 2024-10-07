import { useUser } from "@clerk/nextjs";
import React from 'react'

const Dashboard = () => {
    const {isLoaded, user} = useUser();
    console.log(user)
  return (
    <div>
      
    </div>
  )
}

export default Dashboard

