import React from 'react';
import Modal from 'react-modal';

const defaultState = {
  username: "",
  password: "",
  modalOpen: false,
  modalType: "login"
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalType) {
    this.setState({username: "", password: "", modalOpen: true, modalType});
  }

  closeModal() {
    this.props.clearErrors();
    this.setState({modalOpen: false});
  }

  swapForm() {
    if (this.state.modalType === "login") {
      return (<button onClick={this.openModal.bind(this, "signup")}
        className="swap-button">sign up here!</button>);
    } else {
      return (<button onClick={this.openModal.bind(this, "login")}
        className="swap-button">log in here!</button>);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (this.state.modalType === 'login') {
      this.props.login(user);
    } else {
      this.props.signup(user);
    }
  }

  update(field) {
    return (e) => (
      this.setState({[field]: e.target.value})
    );
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <ul>
          {this.props.errors.map((err, idx) => (
            <li key={`error-${idx}`}>{err}</li>
          ))}
        </ul>
      );
    }
  }

  render() {
    const submitText = this.state.modalType === "login" ? "Log In" : "Sign Up";
    const formText = submitText.toLowerCase();
    const buttonStyle = this.props.buttonStyle;
    return(
      <div>
        <ul className="login-signup">
          <li>
            <button className={buttonStyle}
              onClick={this.openModal.bind(this, 'login')}
              >Log In</button>
          </li>
          <li>
            <button className={buttonStyle}
              onClick={this.openModal.bind(this, 'signup')}
              >Sign Up</button>
          </li>
        </ul>

        <Modal
          contentLabel="Modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          className="modal-form" overlayClassName="modal-form-overlay">
          <nav className="modal-content">
            <div className="welcome">
              <h2 className="welcome"> Welcome to Snowscape!</h2>
              <div>Please {formText} below or {this.swapForm()}</div>
            </div>
            {this.renderErrors()}
            <form onSubmit={this.handleSubmit} className="login-form">
              <input type="text"
                value={this.state.username}
                onChange={this.update("username")}
                className="text-input"
                placeholder=" Enter Username">
              </input>
              <br />
              <input type="password"
                value={this.state.password}
                onChange={this.update("password")}
                className="text-input"
                placeholder=" Enter Password">
                </input>
              <br />
              <input type="submit" value={submitText}></input>
            </form>
          </nav>
        </Modal>
      </div>
    );
  }
}

export default AuthForm;
