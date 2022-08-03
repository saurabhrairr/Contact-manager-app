import React, { useRef } from "react";
import "./ImportContactsBox.css";
import { parse } from "papaparse";

function ImportContactsBox({ setOpenModal, setuserCookie, userCookie, notify }) {

  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  let csvjson = [];
  const draganddrop = (e) => {

    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (result) => {
      // console.log(reader.result);
      let csvString ="name,designation,company,industry,email,phoneNo,country\n"+(reader.result.split('\n').slice(1)).join('\n')
      // console.log(csvString);
      const out = parse(csvString.slice(0, -1), {
        header: true,
      }).data;

      csvjson = out;
      console.log(csvjson);
      fetch("https://contactsmanager-server.herokuapp.com/user/addcontacts", {
        // Adding method type
        method: "POST",
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": userCookie.token//"eyJhbGciOiJIUzI1NiJ9.ZGluZXNoYm9yc2VAZ21haWwuY29t.GcNFxh1NL1qMb17t48u33Jo9am194niNyFonB8r1G9Q"
        },
        body: JSON.stringify({
          data: csvjson
        })
      })
        // Converting to JSON
        .then(response => {
          return response.json()
        }).then((res)=>{
          // console.log(res);
          if(res.status==="success"){
            modalRef.current.click();
            notify("CSV File is Uploaded", "Import Complete");
          }
          else{
            console.log(res.message);
            window.alert(res.message);
          }
        }).catch(err=>{console.log(err)})
      //
    };
    reader.readAsText(e.dataTransfer.files[0]);
  };
  return (
    <div onClick={closeModal} ref={modalRef} className="modalBackground">
      <input type="file" onDrop={draganddrop} className="import-contact-box-file-input" />
      <div className="modalContainer" >
        <img className="import-contact-box-img" src="GroupimportIcon.svg" alt="GroupimportIcon" />
        <div className="import-contact-box-import-file-name">Import File</div>
        <div className="import-contact-box-msg">Drag and Drop CSV File to Upload</div>
        <div onClick={() => { setOpenModal(false); }} id="cancelBtn">Cancel</div>
      </div>
    </div>

  );
}

export default ImportContactsBox;
