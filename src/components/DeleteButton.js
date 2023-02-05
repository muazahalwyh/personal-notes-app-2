import React from "react";
import PropTypes from "prop-types";
import { BsFillTrashFill } from "react-icons/bs";

function DeleteButton({ id, onDelete }) {
  
  return (
    <button className="action" id={id} onClick={() => onDelete(id) }>
      <BsFillTrashFill/>
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteButton;