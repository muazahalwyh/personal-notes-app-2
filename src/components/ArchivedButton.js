import React from "react";
import PropTypes from "prop-types";
import { MdArchive } from "react-icons/md";

function ArchivedButton({ id, onArchive }) {
  return (
    <button className="action" id={id} onClick={() => onArchive(id) }>
      <MdArchive/>
    </button>
  );
}

ArchivedButton.propTypes = {
  id: PropTypes.string,
  onArchive: PropTypes.func,
}

export default ArchivedButton;