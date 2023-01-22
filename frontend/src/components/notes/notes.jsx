import './note.css';
export default function Note(props){

    return (
        <div className="notes">
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
        </div>
    )
}