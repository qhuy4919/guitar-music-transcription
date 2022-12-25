import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import messages from 'src/asset/lang/messages'
import { Form, Input } from 'antd'
import auth from 'src/access/auth'
import './style.scss'

export const ChangePassword = () => {
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
            console.log(values)
            const newPass = new FormData()
            newPass.append('old_password',values.currentPassword)
            newPass.append('new_password',values.newPassword)

            console.log(newPass)
            const response = await auth.changePassword(newPass)
            alert(response.data.message)
            navigate(`/profile/`)
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert(error.response.data.message)
        }
    }
    return (
        <div className="change-password-content">
            <div className="title">Change Password</div>
            <Form
                name="changePassword"
                className="change-password-content__sub"
                onFinish={handleSubmit}
            >
                <div className="change-password-content__sub__info">
                    <div className="change-password-content__sub__info__item">
                        <span className="span">Current password</span>
                        <Form.Item
                            name="currentPassword"
                            className="change-password-content__sub__info__item__item"
                            rules={[
                                {
                                    required: true,
                                    message: messages['password_required'],
                                },
                                {
                                    type: 'string',
                                    min: 6,
                                    max: 24,
                                    message:
                                        messages['invalid_password_length'],
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Current password"
                                className="text"
                            />
                        </Form.Item>
                    </div>

                    <div className="change-password-content__sub__info__item">
                        <span className="span">New password</span>
                        <Form.Item
                            name="newPassword"
                            className="change-password-content__sub__info__item__item"
                            rules={[
                                {
                                    required: true,
                                    message: messages['password_required'],
                                },
                                {
                                    type: 'string',
                                    min: 6,
                                    max: 24,
                                    message:
                                        messages['invalid_password_length'],
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="New password"
                                className="text"
                            />
                        </Form.Item>
                    </div>

                    <div className="change-password-content__sub__info__item">
                        <span className="span">Enter a new password</span>
                        <Form.Item
                            name="confirmNewPassword"
                            className="change-password-content__sub__info__item__item"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message:
                                        messages['confirm_password_require'],
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('newPassword') ===
                                                value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error(
                                                messages[
                                                    'confirm_password_not_match'
                                                ],
                                            ),
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="Confirm new password"
                                className="text"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="change-password-content__sub__button">
                    <button className="button-cancel">
                        <Link to={`/profile`}>Cancel</Link>
                    </button>
                    <button
                        className="button-save"
                        type="primary"
                        htmlType="submit"
                    >
                        Save
                    </button>
                </div>
            </Form>
        </div>
    )
}