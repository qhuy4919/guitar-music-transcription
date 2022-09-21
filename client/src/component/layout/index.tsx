import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './style.scss'

export const Layout = () => {
  return (
    <div className="main-layout">
      <nav id='nav-bar'>
        <Link to="/">Home</Link> |<Link to="login">Login</Link> |
        <Link to="register">Register</Link>
      </nav>
      <Outlet />
    </div>
  )
}
