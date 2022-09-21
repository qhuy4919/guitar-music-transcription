import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'

export const Register = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onSubmit = () => {}

  return (
    <div className="form-panel">
      <div className="form-wrapper">
        <div className="form-header">
          <p>Register</p>
        </div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            required
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
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
            label="Password"
            name="re-password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className="form-button-section"
          >
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
            <Button htmlType="button">Reset</Button>
          </Form.Item>
        </Form>
        <p>
          Already have account?{' '}
          <Link to="/login">
            <Button type="link">login</Button>
          </Link>
        </p>
      </div>
    </div>
  )
}
