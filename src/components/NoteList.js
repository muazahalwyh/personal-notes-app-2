import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
    if(notes.length >0){
    return(
        <section className="notes-list">
            {notes.map((note) =>(
                <NoteItem 
                key={note.id}
                id={note.id}
                title={note.title}
                createdAt={note.createdAt}
                body={note.body}
                archived={note.archived}
                {...note}
                />
            ))
            }
        </section>
    );
    } else
    return (
        <section className="notes-list-empty">
            <p>Tidak ada catatan</p>
        </section>
    )
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}
 
export default NoteList;