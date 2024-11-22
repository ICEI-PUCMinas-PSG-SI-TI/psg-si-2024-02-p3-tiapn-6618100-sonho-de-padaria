import Image from 'next/image'
import React from 'react'
import logo from '../public/logo.svg'

export default function Header() {
  return (
    <div className="header-div">
        <Image src={logo} alt='logo' className="logo-header"/>
        <span className="header-title">SONHO DE PADARIA</span>
    </div>
  )
}
