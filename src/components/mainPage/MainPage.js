import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions";

//import materialui
import Button from "@material-ui/core/Button";

import ListBook from "../listBook/ListBook";

class MainPage extends React.Component {
  state = {
    active: false
  };
  componentDidMount() {
    if (this.props.user !== null && this.props.user.auth !== undefined) {
      this.props.getUser(this.props.user.auth.data.token);
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  checkResponse = _ => {
    if (this.props.user !== null && this.props.user.info !== undefined) {
      const user = this.props.user.info.data;
      return (
        <Link to={`/users/${user.id}`}>
          <Button color="inherit">{`${user.name} detail`}</Button>
        </Link>
      );
    }
    return;
  };

  //TODO(): Fazer o html css tela principal
  render() {
    return (
      <div>
        <ListBook />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { getUser }
)(MainPage);
