import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { RealtimeAccess } from './access/mqtt'
import './app.scss'


export default function RootApplication(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Layout />}>
                        <Route index element={<Landing />} />
                        <Route path='login' element={<Auth authRoute='login' />} />
                        <Route path='register' element={<Auth authRoute='register' />} />
                        </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
