import React from 'react';
import Navbar from './Navbar';
import Note from './Notes';
import axios from 'axios';
import { useEffect, useState } from "react";
import './Home.css'


function App() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  // const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));



  function getAllNotes() {
    axios.get('http://localhost:5000/newNotes',{withCredentials:true}).then(
      (response) => {
        setNotes(response.data.results);
      }
    )
  }


  useEffect(() => {
    getAllNotes();
  }, []);


  const [show, setShow] = useState(true)
  const closeModal = () => setShow(false);


  function saveNote() {
    axios.post('http://localhost:5000/addnewnotes', {
      desc: desc, title: title
    },{withCredentials:true})
      .then((response) => {
        getAllNotes()
      }
      )

    setShowModal(false)
  }

  return (
    <>
      <div className='app'>
        <Navbar></Navbar>

        <div>
          {
            notes.map((item) => {
              return <Note title={item.title} desc={item.desc} />
            })
          }
        </div>

        <button
          className="addNote"
          type="button"
          onClick={(e) => {
            setShowModal(true);
          }}
        >
          +
        </button>


        {showModal ?
          <div className="popup" show={showModal}>
            <div className="popup-content">
              <div className="row navstyle">
                <h2 style={{ color: "#031218", margin: "10px" }}>
                  Create a new note
                </h2>
                {/* <AiFillCloseCircle style={{color: "#031218", margin: "10px"}} onClick={closeModal}/> */}
              </div>
              <div className="row">
                <h4 style={{ color: "#031218", margin: "10px" }}>Title</h4>
                <input className="string-input" style={{ margin: "10px" }} placeholder="Note title here" type="text" value={title} onChange={(e) => {
                  setTitle(e.target.value)
                }} />
              </div>

              <div className="row">
                <h4 style={{ color: "#031218", margin: "10px" }}>Description</h4>
                <textarea className="string-input" style={{ margin: "10px" }} placeholder="Note description here" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>
              <div className="row" style={{ justifyContent: "end" }}>
                <button style={{ padding: "5px 20px", margin: "0 5px", border: "none", borderRadius: "10px", color: "white", background: "#031218" }}  onClick={closeModal}>Discard</button>
                <button style={{ padding: "5px 20px", margin: "0 5px", border: "none", borderRadius: "10px", color: "black", background: "#00f3ed" }} onClick={saveNote}>Save</button>
              </div>
            </div>
          </div>
          : null
        }
      </div>
    </>


  )
}

export default App;
