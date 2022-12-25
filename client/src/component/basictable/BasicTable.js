import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import listsongApi from 'src/access/listsongApi'
import { useEffect, useState } from 'react'
import Modal from 'src/component/modal/Modal'

export const BasicTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [str, setStr] = useState(localStorage['str']);
  const [modalOpen, setModalOpen] = useState(false);
  const getData = async () => {
    const response = await listsongApi.getlistall()
    let dataSong1 = response.data.list_audio
    console.log("data", dataSong1)
    const dataSoure = []
    dataSong1.map(item => {
      dataSoure.push({ pk: item.pk, id: item.pk, title: item.fields.title, describe: item.fields.describe, group: item.fields.group, name: item.fields.name })
    })
   
    setDataSource(dataSoure)
    if (localStorage['modal'] == "True"){
      setModalOpen(true)

    }
  };

  useEffect(() => {

    getData()
  }, [])
  const columns = [
    { field: 'pk', headerName: 'Id', width: 130 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'describe', headerName: 'Describe', width: 250 },
    { field: 'group', headerName: 'Group', width: 250 },
    {
      field: "action",
      headerName: "Action",

      flex: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <EyeOutlined onClick={() => handleView(params.row.id)} />
            <DeleteOutlined onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      },
    }
  ];

  const handleView = async(id) => {
    const response = await listsongApi.getcode(id)
    setStr(response.data.code)
    localStorage.setItem('str',response.data.code)
    setModalOpen(true);

  };

  const handleDelete = async (id) => {  
    let text = "Do you want to delete this song?";
    if (window.confirm(text) == true) {
      const response = await listsongApi.deletecode(id)
      window.location.reload()
    }
  };

  return (
    <div>
    <div style={{ height: 550, width: '100%' }}>
      
      <DataGrid
        rows={dataSource}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </div>
    {modalOpen && <Modal setOpenModal={setModalOpen} bpm ={"80"} str={str}  />}</div>
  );
};