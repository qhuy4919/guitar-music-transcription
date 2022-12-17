import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import listsongApi from 'src/access/listsongApi'
import { useEffect, useState } from 'react'

export const BasicTable = () => {
  const [dataSource, setDataSource] = useState([])

  const getData = async () => {
    const response = await listsongApi.getlistall()
    let dataSong1 = response.data.list_audio
    const dataSoure = []
    dataSong1.map(item => {
      dataSoure.push({ pk: item.pk, id: item.pk, title: item.fields.title, describe: item.fields.describe, group: item.fields.group, name: item.fields.name })
    })
    console.log("data", dataSoure)
    setDataSource(dataSoure)
  };

  useEffect(() => {

    getData()
  }, [])
  const columns = [
    { field: 'pk', headerName: 'Id', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'describe', headerName: 'Describe', width: 130 },
    { field: 'group', headerName: 'Group', width: 130 },
    {
      field: "action",
      headerName: "Action",

      flex: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <EyeOutlined onClick={() => handleView()} />
            <DeleteOutlined onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      },
    }
  ];

  const handleView = () => {
    console.log("view")
    // console.log("abcd", dataSong)
  };

  const handleDelete = async (id) => {  
    console.log("delete",id)
  };

  return (
    <div style={{ height: 550, width: '90%' }}>
      <DataGrid
        rows={dataSource}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </div>
  );
};