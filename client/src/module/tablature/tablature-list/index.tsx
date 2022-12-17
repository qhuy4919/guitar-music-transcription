import React from 'react'
import { Table } from 'antd';
import { useNavigate } from "react-router-dom";
import './style.scss';

const dataSource = [
    {
      key: '1',
      track: 'Wind Song',
      artist: 'Kotaro Oshio',
      view: 12,
      type: 'JSON'
    },
    {
        key: '2',
        track: 'Twilight',
        artist: 'Kotaro Oshio',
        view: 5,
        type: 'JSON'
      },
  ];
  
  const columns = [
    {
      title: 'Track',
      dataIndex: 'track',
      key: 'track',
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'key'
    }
  ];

export const TablatureList = () => {
  let navigate = useNavigate();

  
  return (
    <div className='tablature-list'>
        <Table dataSource={dataSource} 
            columns={columns} 
            onRow={(record, rowIndexv) => {
                return {
                    onClick: (e) => {
                        navigate(`/list/${record.key}`);
                    }
                }
            }}
        />
    </div>
  )
}
