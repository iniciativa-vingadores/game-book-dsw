import React from "react";
import { createError } from "../../actions";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";

//import css
import "./UserForm.css";

class UserForm extends React.Component {
  state = {
    name: { value: "", isValid: false, message: "" },
    email: { value: "", isValid: false, message: "" },
    password: { value: "", isValid: false, message: "" },
    confirmPassword: { value: "", isValid: false, message: "" }
  };

  componentDidMount() {
    if (this.props.type === "EDITAR") {
      const { data } = this.props;
      this.setState({
        name: { value: data.name, isValid: false, message: "" },
        email: { value: data.email, isValid: false, message: "" }
      });
    }
  }

  onChangeValue = e => {
    this.setState({
      [e.target.name]: { ...this.state[e.target.name], value: e.target.value }
    });
  };

  onButtonReturn = _ => {
    if (this.state.password.value !== this.state.confirmPassword.value) {
      this.props.createError({ message: "Senhas diferentes." });
    } else {
      const terms = {
        name: this.state.name.value,
        email: this.state.email.value,
        password: this.state.password.value
      };

      this.props.onSubmitForm(terms);
    }
  };

  render() {
    const { type } = this.props;

    return (
      <div className="format">
        <img
          className="imagemR"
          src={process.env.PUBLIC_URL + "/book.png"}
          alt="logo"
        />
        <form className="formwrapper" onSubmit={e => e.preventDefault()}>
          <TextField
            className="input"
            variant="outlined"
            label="nome"
            type="textfield"
            name="name"
            value={this.state.name.value}
            onChange={this.onChangeValue}
          />
          <br />
          <TextField
            className="input"
            variant="outlined"
            label="email"
            type="textfield"
            name="email"
            value={this.state.email.value}
            onChange={this.onChangeValue}
          />
          <br />
          <TextField
            className="input"
            label="senha"
            variant="outlined"
            type="password"
            name="password"
            value={this.state.password.value}
            onChange={this.onChangeValue}
          />
          <br />
          <TextField
            className="input"
            label="confirmar senha"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword.value}
            onChange={this.onChangeValue}
          />
          <br />
          <Button
            className="myButton"
            variant="contained"
            type="button"
            onClick={this.onButtonReturn}
          >
            <strong>{type}</strong>
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { error: state.error };
};

export default connect(
  mapStateToProps,
  { createError }
)(UserForm);
