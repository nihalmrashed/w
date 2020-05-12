import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import FontAwesome from "react-fontawesome";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      location: ""
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  render() {
    console.log(localStorage);
    let dropDown = null;
    if (localStorage.getItem("type") === "user") {
      dropDown = (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <FontAwesome className="super-crazy-colors" name="edit" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="/user">Menu</DropdownItem>
            <DropdownItem href="/order">Orders</DropdownItem>
            <DropdownItem href="/profile">Change Password</DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/"onClick={this.logout}>Logoff</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    } else if (localStorage.getItem("type") === "cook") {
      dropDown = (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <FontAwesome className="super-crazy-colors" name="edit" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="/cook">Orders</DropdownItem>
            <DropdownItem href="/profile">Change Password</DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/" onClick={this.logout}>Log Out</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }

    return (
      <div>
        <Navbar color="grey" className="navbar-dark bg-dark" light expand="md">
          <NavbarBrand>The Noodle Box</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>{localStorage.getItem("email")}</NavLink>
              </NavItem>
              {dropDown}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    ); 
  }
}
export default NavBar;
