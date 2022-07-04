import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [logindata, setLoginData] = useState([]);

  const history = useNavigate();

  const Birthday = () => {
    const getuser = localStorage.getItem("user_login");
    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);

      setLoginData(user);
    }
  };

  const userlogout = () => {
    localStorage.removeItem("user_login");
    history("/");
  };

  useEffect(() => {
    Birthday();
  }, []);

  return (
    <>
      {logindata.length === 0 ? (
        ""
      ) : (
        <div>
          <header className="topbar">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark space-x-5">
              <h1 className="space-x-1 mb-2">{logindata[0].name}</h1>
              <Button
                className="btn btn-dark btn-lg  text-black rounded-full text-center mb-1 p-0"
                style={{ height: "30px", width: "8%" }}
                onClick={userlogout}
              >
                Logout
              </Button>
            </nav>
          </header>

          <aside className="left-sidebar">
            <div className="scroll-sidebar  ps ps--theme_default ps--active-y">
              <nav className="sidebar-nav">
                <ul id="sidebarnav" style={{ marginLeft: "15px" }}>
                  <li>
                    <h1>Menu</h1>
                  </li>

                  <li>
                    <Link
                      className="waves-effect waves-dark"
                      to="/orderform"
                      aria-expanded="false"
                    >
                      <span className="hide-menu">New Order</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="waves-effect waves-dark"
                      to="/ordertable"
                      aria-expanded="false"
                    >
                      <span className="hide-menu">Order Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="waves-effect waves-dark"
                      to="/orderitems"
                      aria-expanded="false"
                    >
                      <span className="hide-menu">Order Items</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="waves-effect waves-dark"
                      to="/workorder"
                      aria-expanded="false"
                    >
                      <span className="hide-menu">Work Order</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
