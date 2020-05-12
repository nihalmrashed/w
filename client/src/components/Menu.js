import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Container,
  Table,
  CardDeck,
  InputGroup
} from "reactstrap";
import axios from "axios";
import ReactModal from "react-modal";
import "./Pages.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      ssproducts: [],
      orderQuantities: {},
      orderQuantitiesArray: [],
      showModal: false,
      subTotal: 0,
      avgTime: 0
    };
  }

  componentDidMount = async() => {
    await axios
      .post("https://sftst.herokuapp.com/api/product/view", {})
      .then(response => {
        this.setState({ products: response.data.data });
        this.soldout();
      })
      .catch(error => {
        console.log("error is ", error);
      });
  };

  handleOpenModal = () => {
    //Deleting any inputs that are 0 from the quantities state
    const orderQuantities = this.state.orderQuantities;
    for (let x in orderQuantities) {
      if (orderQuantities[x] === "0") {
        delete orderQuantities[x];
      }
    }

    //Checking to see if there is any invalid input
    for (let i in orderQuantities) {
      if (isNaN(orderQuantities[i])) {
        this.clearInputs();
        this.handleCloseModal();
        alert("Invalid input! Quantity must be a NUMBER");
        return;
      }
    }
    //Checking to see if any input is submitted, if none, throws an error alert
    for (let y in orderQuantities) {
      if (orderQuantities[y].length !== 0) {
        //Updates the orderQuantitiesArray with the values in the inputs
        //the orderQuantitiesArray controls what is shown within the modal
        this.updateOrderQuantitiesArray();
        this.setState({ showModal: true });
        return;
      }
    }
    alert("Invalid input! You must order something to submit");
  };

  handleCloseModal = () => {
    this.clearInputs();
    this.setState({ orderQuantitiesArray: [] });
    this.setState({ orderQuantities: {} });
    this.setState({ subTotal: 0 });
    this.setState({ showModal: false });
  };

  handleSubmit = async() => {
    const quantities = this.state.orderQuantities;
    const references = this.refs;
    let avg = 0;
    let num = 0;
    //preventing sending quantity items that are invalid such as 0 or nothing
    for (let i in quantities) {
      if (quantities[i] === "" || quantities[i] === "0") {
        delete quantities[i];
      }
    }
    for (let i in quantities) {
      num += quantities[i];
    }
    let sum = 0;
    let splitStr = num.split("");

    for (let i = 0; i < splitStr.length; i++) {
      sum += parseInt(splitStr[i]);
    }
    avg = this.state.avgTime / sum;
    avg.toFixed(5);
    await axios
      .post("https://sftst.herokuapp.com/api/order/create", {
        start: Date.now(),
        products: this.state.orderQuantitiesArray,
        price: this.state.subTotal,
        status: "submitted",
        duration: avg,
        userId: localStorage.getItem("id")
      })
      .then(response => {
        //Alerting the user of their order #
        const alertString =
          "Your order is submitted! Order #: " +
          response.data.data["_id"] +
          "/n Your order time is " +
          avg;
        alert(alertString);
        this.clearInputs();
        this.handleCloseModal();
        window.location.reload(true);
      })
      .catch(error => {
        console.log("error is ", error);
        alert(error);
      });
  };

  handleQuantityChange = () => {
    let newOrderQuantities = this.state.orderQuantities;
    const references = this.refs;
    //Grabbing all of the values in the different text inputs for each menu item
    for (let i in references) {
      newOrderQuantities[i] = references[i]["value"];
    }
    //Deleting any which are blank
    for (let y in newOrderQuantities) {
      if (newOrderQuantities[y].length === 0) {
        delete newOrderQuantities[y];
      }
    }
    this.setState({ orderQuantities: newOrderQuantities });
  };

  updateOrderQuantitiesArray = async() => {
    await axios
      .post("https://sftst.herokuapp.com/api/product/view", {})
      .then(response => {
        const quantityArray = [];
        const quantityObj = this.state.orderQuantities;
        let time = 0;
        Object.keys(quantityObj).forEach(function(key) {
          for (let i = 0; i < response.data.data.length; i++) {
            if (key.toString() === response.data.data[i]._id.toString()) {
              const itemSubTotal = parseFloat(
                response.data.data[i].price * quantityObj[key]
              ).toFixed(2);
              time += response.data.data[i].time * quantityObj[key];
              const ref = "item" + key;
              quantityArray.push({
                product: response.data.data[i]._id,
                name: response.data.data[i].name,
                quantity: quantityObj[key],
                itemSubTotal: itemSubTotal
              });
            }
          }
        });
        let subTotal = 0;
        for (let x = 0; x < quantityArray.length; x++) {
          subTotal += Number.parseFloat(quantityArray[x].itemSubTotal);
        }
        subTotal.toFixed(2);
        this.setState({ subTotal: subTotal });
        this.setState({ avgTime: time });
        this.setState({ orderQuantitiesArray: quantityArray });
      })
      .catch(error => {});
  };

  //Clears all of the inputs
  clearInputs = () => {
    const mains = this.state.products;
    //Clearing out all of the text boxes
    for (let i in this.refs) {
      this.refs[i]["value"] = "";
    }
  };

  handleUpArrow = e => {
    const id = e.target.name;
    const quantities = this.state.orderQuantities;
    for (let i in this.refs) {
      if (i === id) {
        if (
          this.refs[i]["value"].length === 0 ||
          isNaN(this.refs[i]["value"])
        ) {
          this.refs[i]["value"] = "1";
          quantities[i] = "1";
          this.setState({ orderQuantities: quantities });
        } else if (this.refs[i]["value"] >= 0) {
          let quantity = parseInt(this.refs[i]["value"]);
          quantity++;
          this.refs[i]["value"] = quantity.toString();
          quantities[i] = quantity.toString();
          this.setState({ orderQuantities: quantities });
        }
      }
    }
  };

  handleDownArrow = e => {
    const id = e.target.name;
    const quantities = this.state.orderQuantities;
    for (let i in this.refs) {
      if (i === id) {
        if (
          this.refs[i]["value"].length === 0 ||
          this.refs[i]["value"] === "0" ||
          isNaN(this.refs[i]["value"])
        ) {
          this.refs[i]["value"] = "0";
          quantities[i] = "0";
          this.setState({ orderQuantities: quantities });
        } else {
          let quantity = parseInt(this.refs[i]["value"]);
          quantity--;
          this.refs[i]["value"] = quantity.toString();
          quantities[i] = quantity.toString();
          this.setState({ orderQuantities: quantities });
        }
      }
    }
  };

  soldout = async () => {
    let products = this.state.products;
    let sproducts = [];
    for (let j in products) {
      let ing;
      var sold_out = false;
      for (let i = 0; i < !sold_out && products[j].recipe.length; i += 1) {
        await axios
          .post("https://sftst.herokuapp.com/api/ingredient/viewbyID", {
            ingredientId: products[j].recipe[i].ingredient
          })
          .then(response => {
            ing = response.data.data;
          })
          .catch(error => {
            console.log("error is ", error);
          });

        if (products[j].recipe[i].quantity > ing.stock) {
          sold_out = true;
        }
      }
      sproducts[j] = { item: products[j], sold_out: sold_out };
    }
    this.setState({ ssproducts: sproducts });
  };

  render() {
    if (this.state.ssproducts) {
      let cards = this.state.ssproducts.map(item => {
        if (!item.sold_out) {
          return (
            <Card className="card">
              <CardImg
                className="img-adjusted"
                top
                width="100%"
                src={item.item.image}
                alt="Card image cap"
              />

              <CardBody>
                <CardTitle>{item.item.name}</CardTitle>
                <CardSubtitle>${item.item.price}</CardSubtitle>
              </CardBody>
              <form id={item.item._id}>
                <div className="arrow-buttons">
                  <InputGroup>
                    <Button
                      color="secondary"
                      className="up-button"
                      onClick={this.handleUpArrow}
                      name={item.item._id}
                    >
                      +
                    </Button>
                    <input
                      type="text"
                      name={item.item._id}
                      ref={item.item._id}
                      onChange={this.handleQuantityChange}
                      className="form-control"
                    />
                    <Button
                      color="secondary"
                      className="down-button"
                      onClick={this.handleDownArrow}
                      name={item.item._id}
                    >
                      -
                    </Button>
                  </InputGroup>
                </div>
              </form>
            </Card>
          );
        }
        if (item.sold_out) {
          return (
            <Card className="card">
              <CardImg
                className="img-adjusted"
                top
                width="100%"
                src={item.item.image}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>{item.item.name}</CardTitle>
                <CardSubtitle>${item.item.price}</CardSubtitle>
                <CardSubtitle className="sold-out-notification">
                  SOLD OUT
                </CardSubtitle>
              </CardBody>
            </Card>
          );
        }
      });
      return (
        <div>
          <h2>Menu</h2>
          <Container>
            <Row>
              <CardDeck className="card-deck">{cards}</CardDeck>
            </Row>
          </Container>

          <ReactModal isOpen={this.state.showModal}>
            <h1>Confirm your order</h1>
            <Table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Item Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderQuantitiesArray.map(item => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.itemSubTotal}</td>
                  </tr>
                ))}
                <th>SubTotal: ${this.state.subTotal.toFixed(2)}</th>
                <th></th>
                <th></th>
              </tbody>
            </Table>
            <Button onClick={this.handleCloseModal}>Cancel</Button>{" "}
            <Button onClick={this.handleSubmit}>Submit!</Button>
          </ReactModal>
          <br />
          <Button
            outline
            color="danger"
            className="submit-button"
            onClick={this.handleOpenModal}
          >
            Submit Order
          </Button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Menu;
