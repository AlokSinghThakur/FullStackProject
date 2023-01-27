import './Notes.css';
export default function Notes(props){

    return (
        <div className="notes">
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
        </div>
    )
}