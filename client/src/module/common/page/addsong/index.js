import { Form, Input, Button, Select } from 'antd'
import React, { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { CameraOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import messages from 'src/asset/lang/messages'
import useAuth from 'src/hook/useAuth'
import uploadFile from 'src/access/uploadFile'
import Modal from 'src/component/modal/Modal'
import './style.scss'
const { Option } = Select
export const Addsong = () => {
    const [bpm, setbpm] = useState("");
    const [str, setstr] = useState("");
    const [fileList, setFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const navigate = useNavigate()
    const { user } = useAuth()

    const handleSubmit = async (values) => {

        try {
            const newSong = new FormData()
            newSong.append('name',values.name)
            newSong.append('title',values.title)
            newSong.append('describe',values.describe)
            newSong.append('type',"1")
            newSong.append('group',"123")
            newSong.append('file',selectedFile)
            const response = await uploadFile.uploadFileSong(newSong)
            setstr(response.data.tablature)
            setbpm(values.bpm)
            console.log(values.bpm)
            // alert(response.data.message)

        } catch (error) {
            // alert(error.response.data.message)
        }
        setModalOpen(true);
    }

    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="add-package-content">
            {/* test */}
            <div className="App">

      {modalOpen && <Modal setOpenModal={setModalOpen} bpm ={"80"} str={str}  />}
    </div>

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

