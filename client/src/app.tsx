import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Layout } from 'src/component'
import { Home, Login, Register } from 'src/module'
import './app.scss'

export default function RootApplication(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
