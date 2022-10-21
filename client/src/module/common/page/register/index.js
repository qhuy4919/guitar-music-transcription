import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import {
    UserOutlined,
    UnlockOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import messages from 'src/asset/lang/messages'
import auth from 'src/access/auth'
import background from 'src/asset/image/background.png'
import './style.scss'

export const Register = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
            const response = await auth.register(values)
            alert(response.data.message)
            navigate('/register')
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert(error.response.data.message)
        }
    }
    return (
        <div className="register-container">
            <div className="register-container__sub">
                <img
                    className="register-container__sub__image"
                    src={background}
                    alt={'backgound'}
                />
                <div className="register-container__sub__content">
                    <Form
                        name="register"
                        className="register-container__sub__content__form"
                        onFinish={handleSubmit}
                    >

                        <h2>Music tablature</h2>
                        <div className="register-container__sub__content__form__item">
                            <i>
                                <UserOutlined />
                            </i>
                            <Form.Item
                                className="form-item"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['name_required'],
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="User name"
                                    className="input email"
                                />
                            </Form.Item>
                        </div>

                        <div className="register-container__sub__content__form__item">
                            <i>
                                <MailOutlined />
                            </i>
                            <Form.Item
                                className="form-item"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['email_required'],
                                    },
                                    {
                                        type: 'email',
                                        message: messages['invalid_email'],
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                    className="input email"
                                />
                            </Form.Item>
                        </div>

                        <div className="register-container__sub__content__form__item">
                            <i>
                                <UnlockOutlined />
                            </i>
                            <Form.Item
                                className="form-item"
                                name="password"
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
                                    placeholder="Password"
                                    className="input password"
                                />
                            </Form.Item>
                        </div>

                        <div className="register-container__sub__content__form__item">
                            <i>
                                <UnlockOutlined />
                            </i>
                            <Form.Item
                                className="form-item"
                                name="confirm-password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            messages[
                                                'confirm_password_require'
                                            ],
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
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
                                    placeholder="Confirm password"
                                    className="input confirm-password"
                                />
                            </Form.Item>
                        </div>

                        <Button
                            className="button-submit"
                            type="primary"
                            htmlType="submit"
                        >
                            REGISTER
                        </Button>
                        <p className="have-an-account">
                            Already have an account?{' '}
                            <a className="have-an-account" href="/login">
                                Login now
                            </a>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    )
}
