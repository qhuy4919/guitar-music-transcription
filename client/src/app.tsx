import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Layout } from 'src/component'
import { Home, 
  Login, 
  Register, 
  Addsong, 
  Listsong, 
  Profile, 
  Editprofile, 
  ChangePassword, 
  TablatureList,
  TablatureDetail,
} from 'src/module'
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
            <Route path='list' element={<TablatureList/>}/>
            <Route path='list/:song_id' element={<TablatureDetail/>}/>
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
