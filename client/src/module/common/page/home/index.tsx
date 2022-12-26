import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/AuthProvider";
import { TabSheet } from 'src/component';
import {
    Form,
    Input,
    Spin,
} from 'antd';
import type { UploadProps } from 'antd';
import { Upload, Button } from 'antd';
import { toast } from 'react-toastify';
import { InboxOutlined } from '@ant-design/icons';
import { CommandAPI } from 'src/access';
import ReactAudioPlayer from 'react-audio-player';
import uploadFile from 'src/access/uploadFile'
import './style.scss';
import axios from 'axios'

const { Dragger } = Upload;
const FORM_LAYOUT = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const TAIL_LAYOUT = {
wrapperCol: { offset: 8, span: 16 },
};


export const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [tabsheet, setTabSheet] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<any>([]);
    const [audioResource, setAudioResource] = useState<any>()
    

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,

        beforeUpload (file) {
            setFileList([file]);
            return false;
        },
        onRemove (file: any) {
            const index = fileList.indexOf(file);
            const newFileList = [...fileList];
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        fileList: fileList
      };

      const handleSubmit = async (values: any) => {
        setLoading(true);
        console.log(values);
        localStorage.setItem('bpm',"200")
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('group', values.group);
            formData.append('file', values.file.fileList[0].originFileObj);
            formData.append('type', "1");
            const headers = { 
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            };
            const resp = await axios.post('https://chexanhblog.online/audio/upload/',formData, { headers })
            if(resp) {
                setTabSheet(resp.data.tablature);
                setLoading(true);
            }
            setLoading(false);

            
            
        }catch(error: any) {
            setLoading(false);
            var error_messsage = error.message;
            console.log(error.message);
            toast.error(error_messsage, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
            })
        }
    }

    return (
        <div className='home-container'>
            <div className="title">Upload song</div>
            <section id='section-input'>
                <Spin spinning={isLoading}>
                <div className="transcriber-form">
                    <Form
                        {...FORM_LAYOUT}
                        form={form}
                        layout={"vertical"}
                        onFinish={handleSubmit}
                    >
                    <Form.Item name='name' label='Track'>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='group' label='Artist'>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='file' label='Upload File' valuePropName="file">
                        <Dragger 
                        accept='.wav'
                        {...uploadProps}
                        >
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>
                        </Form.Item>
                        <Form.Item {...TAIL_LAYOUT}>
                            <Button type="primary" htmlType="submit" className="submit-btn">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                </Spin>
                
            </section>        
            {
                fileList[0] && 
                <div className="original-audio">

                <div className="audio-title">Original Audio: {fileList[0].name ?? 'Unknown'}</div>
                    <ReactAudioPlayer
                    key={JSON.stringify(fileList)}
                    src={URL.createObjectURL(fileList[0])}
                    controls
                />
                </div>
            }
            <div className="tablature-wrapper">
            <TabSheet key={tabsheet} tex={tabsheet}/>
            </div>
        </div>
    )
}
