import axios from "axios";
import { useEffect, useState } from 'react';
import './body.css';

const Body = () => {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        getAllNotes();
    }, []);
    function getAllNotes() {
        axios.get("http://localhost:5000/newnotes").then((response) => {
            setNotes(response.data.results);
        });
    }
    function saveNote(desc, noteTitle) {
        axios.post('http://localhost:4000/newnotePost', {
            description: desc, title: noteTitle
        })
            .then((response) => {
                setNotes(response.data.results)
            }
            )
    }

    return (
        <div>
            {
                notes.map((item) => {
                    return (<notes title={item.title} desc={item.desc} />)
                })
            }
            <button onClick={saveNote}>+</button>
        </div>

    )
}

export default Body;


