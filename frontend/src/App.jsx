// import './App.css';
import Navbar from './components/navbar/navbar';
import Note from './components/notes/notes';
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);

  function getAllNotes() {
    axios.get('http://localhost:5000/newnotes').then(
      (response) => {
        setNotes(response.data.results);
      }
    )
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  function saveNote() {
    axios.post("http://localhost:5000/newnotes", {
      desc: "New Post call ",
      title: "UI Post call"
    }).then((response) => {
      setNotes(response.data.results);
    });

  }

  return (
    <div className="App">
      <Navbar></Navbar>
      <div id="app">
        {
          notes.map((item) => {
            return <Note title={item.title} desc={item.desc} />
          })
        }
        <button className='addNote' type='button' onClick={saveNote}>+</button>
      </div>
    </div>
  );
}

export default App;
