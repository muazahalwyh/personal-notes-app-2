import React from 'react';
import PropTypes from 'prop-types';
 
class RegisterInput extends React.Component {
  constructor(props) {
    super(props)
 
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
 
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPassword= this.onConfirmPassword.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
 
  onNameChange(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }
 
  onEmailChange(event) {
    this.setState(() => {
      return {
        email: event.target.value
      };
    });
  }
 
  onPasswordChange(event) {
    this.setState(() => {
      return {
        password: event.target.value
      };
    })
  }

  onConfirmPassword(event) {
    this.setState(() => {
      return {
        confirmPassword: event.target.value
      };
    })
  }
 
  onSubmitHandler(event) {
    event.preventDefault();
    if( this.state.password === this.state.confirmPassword)
    {
      this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    });
    }else{
      window.alert("Password and Password Confirm must be same.");
    }
  }
 
  render() {
    return (
      <form className="input-register" onSubmit={this.onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={this.state.name} onChange={this.onNameChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={this.state.email} onChange={this.onEmailChange} />
        <label htmlFor="password"> Password </label>
        <input type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.onPasswordChange} />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" value={this.state.confirmPassword} onChange={this.onConfirmPassword} />
        <button>Register</button>
      </form>
    )
  }
}
 
RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
 
export default RegisterInput;