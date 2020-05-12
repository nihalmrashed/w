import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "./Pages.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      type: "",
      redirect: false,
      reg: false
    };
  }
  regis = () => {
    this.setState({ reg: true });
  };

  login = async () => {
    const body = {
      email: this.state.email,
      password: this.state.pass
    };
    await axios
      .post(
        "https://sftst.herokuapp.com/api/user/login",
        body,
        ("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept")
      )
      .then(res => res.data)
      .then(json => {
        console.log(json);

        this.setState({
          redirect: true,
          type: json.data.type
        });
        localStorage.setItem("email", json.data.email);
        localStorage.setItem("password", json.data.password);
        localStorage.setItem("type", json.data.type);
        localStorage.setItem("id", json.data._id);
        window.location.reload(true);
      })
      .catch(error => {
        alert("Wrong password or email");
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    if (this.state.redirect) {
      if (this.state.type === "user") {
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
        return (
          <Redirect
            to={{
              pathname: `/cook`,
              state: {
                email: this.state.email,
                password: this.state.pass,
                type: this.state.type
              }
            }}
          />
        );
      }
    } else {
      if (this.state.reg) {
        return (
          <Redirect
            to={{
              pathname: `/`
            }}
          />
        );
      } else {
        return (
          <div>
            <h2 className="p">Login to order!</h2>
            <Container className="center">
              <Form className="login-form">
                <Col>
                  <br></br>
                  <FormGroup>
                    <Label for="exampleEmail"></Label>
                    <Input
                      type="email"
                      name="email"
                      value={this.state.value}
                      onChange={this.handleChange("email")}
                      id="exampleEmail"
                      placeholder="E-mail address"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword"></Label>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.value}
                      onChange={this.handleChange("pass")}
                      id="examplePassword"
                      placeholder="Password"
                    />
                  </FormGroup>
                </Col>
                <Button color="danger" fluid size="large" onClick={this.login}>
                  Login
                </Button>{" "}
                <Button color="danger" fluid size="large" onClick={this.regis}>
                  Register
                </Button>
              </Form>
            </Container>
          </div>
        );
      }
    }
  }
}

export default Login;
