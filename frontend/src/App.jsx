import './App.css';
import Body from './components/body/body';
import Navbar from './components/navbar/navbar';
import Note from './components/notes/notes';
import axios from 'axios';

function App() {

  let notes = [];
  function getAllNotes(){
    axios.get('').then(
      (response)=>{
        console.log(response.data)
      }
    )

  }
  return (
    <div className="App">
      <Navbar></Navbar>
      <Body>
        <Note></Note>
      </Body>
      
    </div>
  );
}

export default App;
