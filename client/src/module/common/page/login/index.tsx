import { useRef, useState, useEffect } from 'react'
import useAuth from 'src/hook/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import axios from 'axios'
import './style.scss'
const LOGIN_URL = '/auth'


export const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form] = Form.useForm()

  const [userName, setUserName] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState<string>('')

  // useEffect(() => {
  //   setError('')
  // }, [user, pwd])

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({ user, pwd, roles, accessToken })
      setUser('')
      setPwd('')
      navigate(from, { replace: true })
    } catch (err: any) {
      if (!err?.response) {
        setError('No Server Response')
      } else if (err.response?.status === 400) {
        setError('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setError('Unauthorized')
      } else {
        setError('Login Failed')
      }
    }
  }

  const onResetField = () => {
    setError('')
    form.resetFields()
  }
  const state = {
    text: "",
  };

  return (
    <div className="container">
    <div className="img-bg">
      <img src="https://online.berklee.edu/takenote/wp-content/uploads/2021/01/acoustic_guitar_techniques_article_image_2021.jpg" />
    </div>
    <div className="content-container">
      <div className="content">
            <div className="login-box">
      <h2>Login</h2> 
        <Form>
        <div className="user-box">
          <Form />
          <Input type="text" name="userName" value={userName} placeholder="User name" onChange={ e => setUserName(e.target.value)}/>
        </div>
        <div className="user-box">
          <Form/>
          <Input type="password" name="pasword" value={pwd} placeholder="Password" onChange={ e => setPwd(e.target.value)}/>
        </div>
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </Form>
    </div>
      </div>
    </div>
  

    
    </div>

  )
}
