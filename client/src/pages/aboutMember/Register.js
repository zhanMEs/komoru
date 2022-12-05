import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SignIn from '../../components/SignIn/SignIn';
import '../../components/SignIn/SignIn.css'

export default function Register() {
  return (
    <div className='register--wrap'>
      <Navbar />
      <div className='signIn--container'>
        <SignIn />
      </div>
    </div>
  )
}