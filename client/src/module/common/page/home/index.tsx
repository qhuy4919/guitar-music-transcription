import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import './style.scss';

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

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }


    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        // onChange(info) {
        //   const { status } = info.file;
        //   if (status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        //   }
        //   if (status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        //   } else if (status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        //   }
        // },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

      const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('group', values.group);
            formData.append('file', values.file.file.originFileObj);
            formData.append('type', "1");

            const resp = await CommandAPI.song.single(formData);
            console.log('resp', resp);
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
                        <Dragger {...uploadProps}>
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
            <div className="tablature-wrapper">
            <TabSheet key={tabsheet} tex={tabsheet}/>
            </div>
        </div>
    )
}
