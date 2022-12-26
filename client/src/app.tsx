
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Layout } from 'src/component'
import { PrivateRoute } from 'src/helpers/PrivateRoute';
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
  // getItem('jwt')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<PrivateRoute component={Home}/>}  />
            <Route path='list' element={<PrivateRoute component={TablatureList}/>} />
            <Route path='list/:song_id' element={<PrivateRoute component={TablatureDetail}/>} />
            <Route path="edit-profile" element={<PrivateRoute component={Editprofile}/>}  />
            <Route path="change-password" element={<PrivateRoute component={ChangePassword}/>}  />
            <Route path="profile" element={<PrivateRoute component={Profile}/>}  />
            <Route path="addsong" element={<PrivateRoute component={Addsong}/>}  />
            <Route path="listsong" element={<PrivateRoute component={Listsong}/>}  />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
  
}
