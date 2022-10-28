import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Layout } from 'src/component'
import { Home, Login, Register, Addsong, Listsong, Profile, Editprofile, ChangePassword } from 'src/module'
import './app.scss'

export default function RootApplication(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="edit-profile" element={<Editprofile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addsong" element={<Addsong />} />
            <Route path="listsong" element={<Listsong />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
