import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom'
import { Input, Radio, Form, Button, DatePicker } from 'antd'
import messages from 'src/asset/lang/messages'
import auth from 'src/access/auth'
import './style.scss'

export const Editprofile = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        try {
            auth.getuser().then((response)=>{
                setUser(response.data)
            })

        } catch (error) {
        }
      },[])

    const handleSubmit = async (values) => {

        try {
            const newEdit = new FormData()
            newEdit.append('name',values.name)
            newEdit.append('email',values.email)

            const response = await auth.edituser(newEdit)
            console.log(values)
            alert(response.data.message)
            navigate('/profile')
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="edit-profile-content">
            <div className="title">Profile</div>
            <Form
                name="edit-profile"
                className="edit-profile-content__sub"
                onFinish={handleSubmit}
                fields={[
                    {
                        name: ['name'],
                        value: user.name,
                    },
                    {
                        name: ['username'],
                        value: user.username,
                    },
                    {
                        name: ['email'],
                        value: user.email,
                    }
                ]}
            >
                <div className="edit-profile-content__sub__info">
                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Name</span>
                        <Form.Item
                            name="name"
                            initialValue={user.name}
                            rules={[
                                {
                                    required: true,
                                    message: messages['name_required'],
                                },
                            ]}
                        >
                            <Input
                                type="name"
                                placeholder="name"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">User name</span>
                        <Form.Item
                            name="username"
                            initialValue={user.username}
                            rules={[
                                {
                                    required: true,
                                    message: messages['name_required'],
                                },
                            ]}
                        >
                            <Input
                                type="username"
                                placeholder="username"
                                size="large"
                                className="textbox"
                                readonly="readonly"
                            />
                        </Form.Item>
                    </div>

                    <div className="edit-profile-content__sub__info__item">
                        <span className="span">Email</span>
                        <Form.Item
                            name="email"
                            initialValue={user.email}
                            rules={[
                                {
                                    type: 'email',
                                    message: messages['invalid_email'],
                                },
                                {
                                    required: true,
                                    message: messages['email_required'],
                                },
                            ]}
                        >
                            <Input
                                type="email"
                                placeholder="Email"
                                size="large"
                                className="textbox"
                            />
                        </Form.Item>
                    </div>

                    <div className="button-edit">
                        <Button className="button-gray">
                            <Link to={`/profile`}>Cancel</Link>
                        </Button>
                        <Button
                        className="button-blue"
                        type="primary"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

