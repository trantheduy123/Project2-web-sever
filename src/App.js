import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "../node_modules/react-router-bootstrap/";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";

import ShippingAddressScreen from "./screens/ShippingAddressScreen";

import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar className='Navbar'>
            <Nav.Item className='Navbar-overlay'>
              <Container>
                <LinkContainer to='/'>
                  <Navbar.Brand className='nav-band'>
                    <div className='nav-men'>
                      Men's
                      <div className='nav-men-item'>
                        Fashions fade, style is eternal
                      </div>{" "}
                    </div>
                    <p className='nav-clothes'>Clothes</p>
                  </Navbar.Brand>
                </LinkContainer>
                <div className='nav-cart'>
                  <Nav className='me-auto'>
                    <Link to='/cart' className='nav-link'>
                      <span style={{ color: "white" }}>Cart</span>
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg='danger'>
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>
                    {userInfo ? (
                      <NavDropdown
                        title={userInfo.name}
                        id='basic-nav-dropdown'
                      >
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>User profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/orderhistory'>
                          <NavDropdown.Item>Oder History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <Link
                          className='dropdown-item'
                          to='/signin'
                          onClick={signoutHandler}
                        >
                          Sign Out
                        </Link>
                      </NavDropdown>
                    ) : (
                      <Link className='nav-link' to='/signin'>
                        Sign In
                      </Link>
                    )}
                  </Nav>
                </div>
              </Container>
            </Nav.Item>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SignInScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />

              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
