import React from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    }

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const { value } = event.target;

    this.setState((prevState) => {
      return {
        ...prevState,
        title: value.length > 50 ? value.slice(0, 50) : value,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    this.setState({ title: "", body: "" });
  } 

  render() {
    const { title, body } = this.state;
    return (
      <form className="add-new-page__input" onSubmit={this.onSubmitEventHandler}>
        <input className="add-new-page__input__title"
          type="text"
          placeholder="Catatan Rahasia Saya..."
          onChange={this.onTitleChangeEventHandler}
          value={title}
          required
        />

        <textarea className="add-new-page__input__body"
          type="text"
          placeholder="Sebenarnya Saya Adalah...."
          onChange={this.onBodyChangeEventHandler}
          value={body}
          required
        />
        <div className="add-new-page__action">
          <button className="action" type="submit"><FaCheck/></button>
        </div>
      </form>
    );
  }
}

NoteInput.propTypes={
  addNote:PropTypes.func.isRequired,
}

export default NoteInput;