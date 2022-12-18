import React from 'react'
import listsongApi from 'src/access/listsongApi'
import { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useNavigate } from "react-router-dom";
import './style.scss';
import Modal from 'src/component/modal/Modal'
import { DeleteOutlined } from '@ant-design/icons';
import { BasicTable } from 'src/component/basictable/BasicTable';

export const Listsong = () => {
  return (
    <div className="App">
        <div className="title">List song</div>
        <BasicTable />
    </div>
  );
}
