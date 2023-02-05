import React from "react";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import PropTypes from "prop-types";

function AddPage () {
    const navigate = useNavigate();

    async function onAddNoteHandler(note){
        await addNote(note);
        navigate('/');
    }

    return(
        <section className="add-new-page">
            <NoteInput addNote={onAddNoteHandler}/>
        </section>
    )
}

AddPage.propTypes={
    note: PropTypes.func,
}

export default AddPage;