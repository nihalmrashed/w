import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      showRegistration: false,
      redirectmenu: false,
      redirectlogin: false
    };
  }

  componentDidMount() {}

  handleEmailInput = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordInput1 = event => {
    this.setState({ password1: event.target.value });
  };

  handlePasswordInput2 = event => {
    this.setState({ password2: event.target.value });
  };

  showLogin = () => {
    this.setState({ redirectlogin: true });
  };

  handleRegister = async(event) => {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      alert("Not valid email format");
    }

    if (this.state.password1 === this.state.password2) {
      await axios
        .post("https://sftst.herokuapp.com/api/user/register", {
          email: this.state.email,
          password: this.state.password1,
          type: "user"
        })
        .then(response => {
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("password", response.data.password);
          localStorage.setItem("type", response.data.type);
          this.setState({ redirectmenu: true });
        })
        .catch(error => {
          alert("User already exists");
        });
    } else {
      alert("Passwords don't match");
    }
  };

  render() {
    if (this.state.redirectmenu) {
      return (
        <Redirect
          to={{
            pathname: `/user`,
            state: {
              email: this.state.email,
              password: this.state.pass,
              type: this.state.type
            }
          }}
        />
      );
    } else {
      if (this.state.redirectlogin) {
        return (
          <Redirect
            to={{
              pathname: `/login`
            }}
          />
        );
      } else {
        return (
          <div>
            <h2 className="p">Register</h2>
            <Container className="center">
              <Form className="signin-form">
                <Col>
                  <br></br>
                  <FormGroup>
                    <Label for="exampleEmail"> </Label>
                    <Input
                      type="email"
                      name="email"
                      value={this.state.value}
                      onChange={this.handleEmailInput}
                      id="exampleEmail"
                      placeholder="E-mail address"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="password1"> </Label>
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
                    <Label for="password2"> </Label>
                    <Input
                      type="password"
                      name="password2"
                      value={this.state.value}
                      onChange={this.handlePasswordInput2}
                      id="password2"
                      placeholder="Confirm Password"
                    />
                  </FormGroup>
                </Col>
                <Button
                  color="danger"
                  fluid
                  size="large"
                  onClick={this.handleRegister}
                >
                  Register
                </Button>
                {"  "}
                <Button
                  color="danger"
                  fluid
                  size="large"
                  onClick={this.showLogin}
                >
                  Login
                </Button>
              </Form>
            </Container>
          </div>
        );
      }
    }
  }
}

export default Register;
