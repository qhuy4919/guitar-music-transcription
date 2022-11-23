import React, {useEffect,useState} from "react";

import "./Modal.css";
import { TabSheet } from 'src/component';

function Modal({ setOpenModal,str}) {
  const [tab,settab] = useState()

  useEffect(() => {
    settab({'bpm':120,'notes':str})
    
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
            }}
          >
            X
          </button>
        </div>
        <>
          {
              tab && <TabSheet key={1} processedSong={tab}/>
          }
        </>
      </div>
    </div>
  );
}

export default Modal;