import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(()=>{
     axios.get("http://localhost:3001/api/getAll")
     .then(res=>setNotes(res.data))
  },[]);

  return (
    <div>
      <Header />
      <CreateArea notes={notes} setNotes={setNotes}/>
      <Note notes={notes} setNotes={setNotes}/>
      <Footer />
    </div>
  );
}

export default App;
