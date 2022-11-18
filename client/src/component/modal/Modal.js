import React, {useEffect,useState} from "react";

import "./Modal.css";
import { TabSheet } from 'src/component';

function Modal({ setOpenModal,str}) {
  const [tab,settab] = useState("")
  useEffect(() => {
    settab(str)
  },[str])
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
          <button
            onClick={() => {
              console.log(tab)
            }}
          >
            haha
          </button>
        </div>
        <TabSheet TabsProps={tab} />
      </div>
    </div>
  );
}

export default Modal;