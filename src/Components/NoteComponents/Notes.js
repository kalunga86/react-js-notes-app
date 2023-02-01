import { React, useState, useEffect } from "react";
import "../css/Note.css";
import Note from "./Note";
import CreateNote from "./CreateNote";
import { v4 as uuid } from "uuid";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");

    //get text and store in state
    const textHandler = (e) => {
        setInputText(e.target.value);
    }

    //add new note to the state array
    const saveHandler = () => {
        setNotes((prevState) => [
            ...prevState, {
                id:uuid(),
                text: inputText,
            },
        ]);
        // clear the textarea
        setInputText("");
    };

    //delete note function
    const deleteNote = (id) => {
        const filteredNotes = notes.filter((note) => note.id !== id);
        setNotes(filteredNotes);
    };

    //save data to local storage
    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes]);

    //get the saved notes and add them to the array
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if(data) {
            setNotes(data);
        }
    }, []);
    
    return(
        <div className="notes">
            {notes.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  deleteNote={deleteNote}
                 />
            ))}
            <CreateNote 
                textHandler={textHandler}
                saveHandler={saveHandler}
                inputText={inputText}
            />
        </div>
    );
}

export default Notes;