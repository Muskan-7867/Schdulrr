"use client"
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesColumn } from 'lucide-react'
import React from 'react'

const UserMenu = () => {
  return (
    <UserButton
    appearance={{
        elements:{
            avatarBox:"h-10 w-10",
        },
    }}
    >
      <UserButton.MenuItems>
        <UserButton.Link label='My Events'
        href='/events'
         labelIcon={<ChartNoAxesColumn size={15}/>}>
     </UserButton.Link>
        <UserButton.Action label="managAaccount"/>
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserMenu
