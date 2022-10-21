import { Form, Input, Button, Select } from 'antd'
import React, { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { CameraOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import messages from 'src/asset/lang/messages'
import useAuth from 'src/hook/useAuth'

import './style.scss'
const { Option } = Select
export const Addsong = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        console.log("ok")
        console.log(selectedFile)
    };

    const navigate = useNavigate()
    const { user } = useAuth()

    const handleSubmit = async (values) => {
        console.log("ok")
        console.log(selectedFile)

        // try {
        //     const newPackage = {
        //         parking_lot_id: parseInt(values.parking_lot_id),
        //         name: values.name,
        //         type_id: parseInt(values.type_id),
        //         vehicle_type_id: parseInt(values.vehicle_type_id),
        //         price: parseInt(values.price),
        //     }
            
        //     alert(response.data.message)
        //     navigate(`/parking-lots/${values.parking_lot_id}/packages`)
        // } catch (error) {
        //     alert(error.response.data.message)
        // }
    }


    return (
        <div className="add-package-content">
            <div className="title">Add song</div>
            <Form
                name="addprofile"
                className="add-package-content__sub"
                onFinish={handleSubmit}
            >
                <div className="add-package-content__sub__info">
                    <div className="add-package-content__sub__info__item">
                        <span className="span">Name</span>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="textbox" size="medium" />
                        </Form.Item>
                    </div>

                    <div className="add-package-content__sub__info__item">
                        <span className="span">Title</span>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="textbox" size="medium" />
                        </Form.Item>
                    </div>

                    <div className="add-package-content__sub__info__item">
                        <span className="span">Describe</span>
                        <Form.Item
                            name="describe"
                            rules={[
                                {
                                    required: true,
                                    message: messages['text_required'],
                                },
                            ]}
                        >
                            <Input className="textbox" size="medium" />
                        </Form.Item>
                    </div>

                </div>
                <div>
                    <input type="file" name="file" onChange={changeHandler} />
                    <div>
                        <button onClick={handleSubmission}>Submit</button>
                    </div>
                </div>

                <div className="add-package-content__sub__button">
                    <Button className="button-gray">
                        <Link to="/home">Cancel</Link>
                    </Button>
                    <Button
                        className="button-blue"
                        type="primary"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    )
}

