import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";
import DeleteButton from "../components/DeleteButton";
import UnArchivedButton from "../components/UnArchivedButton";
import ArchivedButton from "../components/ArchivedButton";

function NoteDetail({ note, onDelete, onArchive, onUnArchive}){
    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{note.title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
            <div className="detail-page__body">{note.body}</div>
            <div className="detail-page__action">
            {note.archived === true ? <UnArchivedButton id={note.id} onUnArchive={onUnArchive} /> 
                : <ArchivedButton id={note.id} onArchive={onArchive} /> }
                <DeleteButton id={note.id} onDelete={onDelete} />
            </div>
        </section>
    )
}

NoteDetail.propTypes ={
    note: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    onUnArchive: PropTypes.func.isRequired,
}

export default NoteDetail;