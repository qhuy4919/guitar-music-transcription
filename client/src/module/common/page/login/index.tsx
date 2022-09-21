import { useRef, useState, useEffect } from 'react'
import useAuth from 'src/hook/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import axios from 'axios'
import '../register/style.scss';
const LOGIN_URL = '/auth'

export const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form] = Form.useForm()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setError('')
  }, [user, pwd])

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

  return (
    <div className="form-panel">
      <div className="form-wrapper">
        <div className="form-header">
          <p>Log in</p>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className="form-button-section"
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button htmlType="button" onClick={onResetField}>
              Reset
            </Button>
          </Form.Item>
        </Form>
        {/* {error && <p style={{color: 'red'}}>{error}</p>} */}
        <p>
          Don&apos;t have account?{' '}
          <Link to={'/register'}>
            <Button type="link" style={{ padding: '0' }}>
              register
            </Button>
          </Link>
        </p>
      </div>
    </div>
  )
}
