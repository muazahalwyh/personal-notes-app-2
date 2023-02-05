import React from "react";
import PropTypes from "prop-types";
import { ImPlus } from "react-icons/im";

function AddButton({  onAdd }) {
  
  return (
    <button className="action" onClick={() => onAdd() }>
      <ImPlus/>
    </button>
  );
}

AddButton.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default AddButton;