import React, { Component } from "react";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Button,
  Table,
  CardHeader,
  CardFooter,
  CardDeck
} from "reactstrap";
import axios from "axios";
import {
  HashRouter,
  Switch,
  Route,
  Link,
  BrowserRouter,
  browserHistory,
  Redirect,
  withRouter
} from "react-router-dom";

import "./Pages.css";

class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount = async () => {
    await axios
      .post("https://sftst.herokuapp.com/api/order/view", {})
      .then(response => {
        console.log(response.data.data);
        let ordersData = response.data.data
          .filter(o => o.userId === localStorage.getItem("id"))
          .reverse();
        this.setState({ orders: ordersData });
      });
    await axios
      .post("https://sftst.herokuapp.com/api/order/diff", {
        orders: this.state.orders
      })
      .then(response => {
        const orderInfo = this.state.orders;
        for (let i = 0; i < response.data.data.length; i++) {
          for (let y = 0; y < orderInfo.length; y++) {
            //Assiging the time diff to the order
            if (
              parseInt(response.data.data[i]._id) === parseInt(orderInfo[y]._id)
            ) {
              orderInfo[y].timeDiff = response.data.data[i].timeDiff;
              //Assigning a class to the time left span depending on how much time is left on the order
              if (response.data.data[i].timeDiff === 0) {
                orderInfo[y].timeStatus = "time-up";
              } else if (
                response.data.data[i].timeDiff === 2 ||
                response.data.data[i].timeDiff === 1
              ) {
                orderInfo[y].timeStatus = "two-minute-warning";
              } else {
                orderInfo[y].timeStatus = "pending";
              }
            }
          }
        }
        this.setState({ orders: orderInfo });
      });
    console.log(this.state.orders);
    setInterval(() => this.tick(), 60000);
  };

  //De-incrementing all of the orders, this is run every minute
  tick = () => {
    const orders = this.state.orders;
    for (let i = 0; i < orders.length; i++) {
      //If the time is not up yet, tick down one minute
      if (orders[i].timeDiff !== 0) {
        orders[i].timeDiff--;
        //Setting appropriate time status
        if (orders[i].timeDiff === 0) {
          orders[i].timeStatus = "time-up";
        } else if (orders[i].timeDiff === 2) {
          orders[i].timeStatus = "two-minute-warning";
        }
      }
    }
    this.setState({ orders: orders });
  };

  render() {
    if (!localStorage.getItem("id")) {
      return <Redirect to="/login" />;
    }

    console.log(this.state.orders);
    let orderCards = this.state.orders.map(order => {
      if (order.status !== "finished") {
        return (
          <Col sm={2} md={4}>
            <Card className="card">
              <CardHeader tag="h3">Order # {order._id}</CardHeader>
              <CardBody>
                <CardText>Expected Finish Time: {order.finish}</CardText>
                <CardText>
                  <span className={order.timeStatus}>
                    Time left: {order.timeDiff} minutes
                  </span>
                </CardText>
                <Table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Item total price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map(item => (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.itemSubTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>Total order price: ${order.price}</CardFooter>
            </Card>
          </Col>
        );
      } else {
        return (
          <Card className="card">
            <CardHeader tag="h3">Order # {order._id}</CardHeader>
            <CardBody>
              <CardText>Finish time: {order.finish}</CardText>
              <CardText>
                <span className="finished">Order finished</span>
              </CardText>
              <Table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Item total price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map(item => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.itemSubTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>Total order price: ${order.price}</CardFooter>
          </Card>
        );
      }
    });
    if (this.state.orders.length !== 0) {
      return (
        <div>
          <h2>Your Orders!</h2>
          <Container>
            <Row>
              <CardDeck className="card-deck">{orderCards}</CardDeck>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <h2>No Past Orders</h2>
        </div>
      );
    }
  }
}
export default OrderView;
