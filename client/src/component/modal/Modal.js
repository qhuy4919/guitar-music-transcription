import React, {useEffect,useState} from "react";

import "./Modal.css";
import { TabSheet } from 'src/component';

function Modal({ setOpenModal,bpm,str}) {
  const [tab,settab] = useState()


  useEffect(() => {
    settab({'bpm':bpm,'notes':str})
    
  },[str])

  useEffect(() => {
    console.log("abc",tab);
  })

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
              localStorage.setItem('modal',"False")
              localStorage.setItem('bpm',"200")
            }}
          >
            X
          </button>
        </div>
        <>
          {
              tab && <TabSheet key={tab} processedSong={tab}/>
          }
        </>
      </div>
    </div>
  );
}

export default Modal;