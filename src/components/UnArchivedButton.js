import React from "react";
import PropTypes from "prop-types";
import { MdUnarchive } from "react-icons/md";

function UnArchivedButton({ id, onUnArchive }) {
  return (
    <button className="action" id={id} onClick={() => onUnArchive(id) }>
      <MdUnarchive/>
    </button>
  );
}

UnArchivedButton.propTypes = {
  id: PropTypes.string.isRequired,
  onUnArchive: PropTypes.func,
}

export default UnArchivedButton;