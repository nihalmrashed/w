import React, { Component } from "react";
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import {
  Redirect
} from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      password1: "",
      password2: ""
    };
  }

  componentDidMount() {}

  handlePasswordInput1 = event => {
    this.setState({ password1: event.target.value });
  };

  handlePasswordInput2 = event => {
    this.setState({ password2: event.target.value });
  };

  handleSubmit = async(event) => {
    if (this.state.password1 === this.state.password2) {
      await axios
        .post("https://sftst.herokuapp.com/api/user/password", {
          userId: localStorage.getItem("id"),
          password: localStorage.getItem("password"),
          newPassword: this.state.password1
        })
        .then(response => {
          localStorage.setItem("password", this.state.password1);
          this.setState({ done: true });
        })
        .catch(error => {
          console.log("error! ", error);
        });
    } else {
      alert("Passwords don't match");
    }
  };

  render() {
    if (this.state.done) {
      return (
        <Redirect
          to={{
            pathname: `/user`
          }}
        />
      );
    } else {
      return (
        <div>
          <h2 className="p">Change Password</h2>
          <Container className="center">
            <Form className="login-form">
              <Col>
                <br></br>
                <FormGroup>
                  <Label for="password1"></Label>
                  <Input
                    type="password"
                    name="password1"
                    value={this.state.value}
                    onChange={this.handlePasswordInput1}
                    id="password1"
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label for="password2"></Label>
                <Input
                  type="password"
                  name="password2"
                  value={this.state.value}
                  onChange={this.handlePasswordInput2}
                  id="password2"
                  placeholder="Confirm Password"
                />
              </FormGroup></Col>
              <Button
                color="danger"
                fluid="true"
                size="large"
                onClick={this.handleSubmit}
              >
                Update
              </Button>
            </Form>
          </Container>
        </div>
      );
    }
  }
}
export default Profile;
