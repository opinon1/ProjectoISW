import React from 'react'
import { Navbar } from '../Components';
import { Home, LogOut, Notifications, Patients, Profile, UpdateProgress } from '../Pages';

export const Router = () => {

    return (
        <>
            <Navbar/>

            <div class='main-content'>
                <Home/>
                <Notifications/>
            </div>

            <div class='main-content'>
                <UpdateProgress/>
                <Patients/>
                <Profile/>
                <LogOut/>
            </div>

        </>
    )
}
