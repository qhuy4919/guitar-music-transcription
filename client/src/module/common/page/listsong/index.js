import React from 'react'
import listsongApi from 'src/access/listsongApi'
import { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useNavigate } from "react-router-dom";
import './style.scss';
import Modal from 'src/component/modal/Modal'
import { DeleteOutlined } from '@ant-design/icons';
import { BasicTable } from 'src/component/basictable/BasicTable';

const columns = [
  {
    title: 'Name',
    render: (record) => record.fields.name,
    key: 'name',
  },
  {
    title: 'Title',
    render: (record) => record.fields.title,
    key: 'title',
  },
  {
    title: 'Describe',
    render: (record) => record.fields.describe,
    key: 'describe',
  },
  {
    title: 'Group',
    render: (record) => record.fields.group,
    key: 'group'
  },
  {
    title: 'Action',
    icon: <DeleteOutlined/>,
    render: () => (<button onClick ={console.log("123 thung rác")}><DeleteOutlined /></button> ),
    key: 'action'
  }
];


export const Listsong = () => {
  const [str, setstr] = useState("");
  const [dataSource, setDataSource] = useState([])
  const [modalOpen, setModalOpen] = useState(false);



  const handleSubmit = async (values) => {
    console.log(values)

    try {
      const response = await listsongApi.getcode(values)
      setstr(response.data.code)

    } catch (error) {
      // alert(error.response.data.message)
    }
    setModalOpen(true);
  }

  // return (
  //   <div className='tablature-list'>
  //     {/* <BasicTable/> */}
  //     {modalOpen && <Modal setOpenModal={setModalOpen} bpm={"80"} str={str} />}
  //     <Table dataSource={dataSource}
  //       columns={columns}
  //       onRow={(record, rowIndexv) => {
  //         return {
  //           onClick: (e) => {
  //             handleSubmit(`${record.pk}`);
  //           }
  //         }
  //       }}
  //     />
  //   </div>
  // )
  return (
    <div className="App">
        <div className="title">List song</div>
        <BasicTable />
    </div>
  );
}
