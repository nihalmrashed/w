import React, { Component } from "react";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardDeck,
  Row,
  Col,
  Button
} from "reactstrap";
import axios from "axios";
import "./Pages.css";

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount = () => {
    axios
      .post("https://sftst.herokuapp.com/api/order/view", {})
      .then(response => {
        let filtered = response.data.data.filter(o => o.status !== "finished");
        this.setState({ orders: filtered });
        console.log(this.state.orders);
      })
      .catch(error => {
        console.log("error is ", error);
      });
  };

  done = e => {
    axios
      .post("https://sftst.herokuapp.com/api/order/log", {
        orderId: e.target.id,
        price: e.price,
        date: e.date,
        finish: Date.now(),
        products: e.products
      })
      .then()
      .catch(error => {
        console.log("error is ", error);
        alert(error);
      });
    axios
      .post("https://sftst.herokuapp.com/api/order/update", {
        orderId: e.target.id,
        finish: Date.now(),
        status: "finished",
        cookId: localStorage.getItem("id")
      })
      .then(response => {
        window.location.reload(true);
      })
      .catch(error => {
        console.log("error is ", error);
        alert(error);
      });
  };

  render() {
    let cards = this.state.orders.map(item => {
      let prod = item.products.map(e => e.quantity + "x " + e.name);
      return (
        <Col sm={3} md={4}>
          <Card className="card">
            <CardBody>
              <CardTitle>{item.start}</CardTitle>
              <CardSubtitle>{item._id}</CardSubtitle>
              <CardText>Products: {prod}</CardText>
              <Button onClick={this.done} id={item._id}>
                Done!
              </Button>
            </CardBody>
          </Card></Col>
      );
    });
    if(this.state.orders.length!==0){
    return (
      <Container className="gap">
        <Row>
          <CardDeck className="card-deck">{cards}</CardDeck>
        </Row>
      </Container>
    );}else{ return (
      <div>
        <h2>No On-going Orders</h2>
      </div>
    );}
  }
}

export default Terminal;
