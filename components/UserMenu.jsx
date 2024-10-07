"use client";
import { UserButton, UserButtonAction } from '@clerk/nextjs';
import { ChartNoAxesColumn } from 'lucide-react';
import React from 'react';

const UserMenu = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "h-10 w-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link 
          label="My Events" 
          href="/events" 
          labelIcon={<ChartNoAxesColumn size={15} />}
        />
        <UserButton.Action 
          label="Manage Account" 
          onClick={() => {
            // Add an action handler here (e.g., navigate or perform some action)
            console.log('Manage Account clicked');
          }}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}

export default UserMenu;
