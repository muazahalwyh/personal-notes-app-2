import React from "react";
import PropTypes from "prop-types";
import{Link} from "react-router-dom";
import { showFormattedDate } from "../utils/index";

function NoteItemBody({ id, title, body, createdAt}){
    return (
        <article>
            <h3 className="note-item__title">
                <Link to={`/notes/${id}`}>{title}</Link></h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{body}</p>
        </article>
    );
}

NoteItemBody.propTypes = {
    id: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    createdAt:PropTypes.string.isRequired,
    body:PropTypes.string.isRequired,
}

export default NoteItemBody;