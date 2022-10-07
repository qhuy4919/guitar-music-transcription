import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export const Register = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onSubmit = () => {}

  return (
    <div className="content-container">
      <div className="content">
            <div className="login-box">
      <h2>Sign Up</h2>

        <Form>
        <div className="user-box">
          <Form/>
          <label>First Name</label>
        </div>
        <div className="user-box">
          <Form/>
          <label>Password</label>
        </div>
        <div className="user-box">
          <Form/>
          <label>Password</label>
        </div>
        <div className="user-box">
          <Form/>
          <label>Username</label>
        </div>
        <div className="user-box">
          <Form/>
          <label>Password</label>
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
  

  )
}
