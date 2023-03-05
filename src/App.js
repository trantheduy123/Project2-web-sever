import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "../node_modules/react-router-bootstrap/";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Imgnav from "./components/Imgnav";
import Category from "./components/Category";
import logo from "./logo.svg";
import "./App.css";
import "./App.css";
import "./CSS/sticky.css";
import BackToUp from "@uiw/react-back-to-top";
import Button from "react-bootstrap/Button";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DayNightToggle from "react-day-and-night-toggle";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ThemeContext } from "./ThemeContext";
import OrderScreen from "./screens/OrderScreen";
import { getError } from "./utils";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const context = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "./signin";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar
            bg='dark'
            variant='dark'
            className='Navbar  Navbar-overlay'
            expand='lg'
          >
            <Container className='overlay'>
              <img src={logo} className='App-logo' alt='logo' />
              <Button
                variant='dark'
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className='fas fa-bars'></i>
              </Button>

              <LinkContainer to='/'>
                <Navbar.Brand className='nav-band'>
                  <div className='nav-men'>Men's</div>
                </Navbar.Brand>
              </LinkContainer>
              <div>
                <DayNightToggle
                  className='fui-button-shiny-2'
                  onClick={context.toggleTheme}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  checked={isDarkMode}
                />
              </div>

              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <SearchBox />
                <Nav className='me-auto  w-100  justify-content-end'>
                  <Link to='/cart' className='nav-link'>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/orderhistory'>
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className='dropdown-item'
                        to='#signout'
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
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Imgnav />
          <Category />
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className='flex-column text-white w-100 p-2'>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`search/category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main className={context.theme}>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />

              <Route path='/cart' element={<CartScreen />} />
              <Route path='/search' element={<SearchScreen />} />
              <Route path='/signin' element={<SignInScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />}></Route>
              <Route
                path='/orderhistory'
                element={<OrderHistoryScreen />}
              ></Route>
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />

              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer></footer>
        <BackToUp>TOP</BackToUp>;
      </div>
    </BrowserRouter>
  );
}

export default App;
