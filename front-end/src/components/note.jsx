import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
const Note=({notes,setNotes}) =>{
  const deleteNote=(id)=>{
    axios.post("http://localhost:3001/api/delete",{id})
    .then(res=>setNotes(res.data))
  }

  return (
    <div className="note">
    {
      notes.map(keeper=>(
        <div key={keeper._id}>
      <h1>{keeper.title}</h1><p>{keeper.content}</p><button onClick={() => deleteNote(keeper._id)}>
          <DeleteIcon />
        </button>
        </div>
    ))
    }
      
    </div>
  );
}

export default Note;