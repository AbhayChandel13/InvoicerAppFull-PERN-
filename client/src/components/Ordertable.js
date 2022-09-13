import React, { useState, useRef, useEffect } from "react";
import WorkOrder from "./WorkOrder";
import { Row, Container, Col, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import Header from "./../Header/Header";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../App.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Ordertable = () => {
  let [ordertable, setOrderTable] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  console.log("startdate:", start);
  console.log("Enddate:", end);

  const componentRef = useRef();

  useEffect(() => {
    getordertable();
  }, []);

  const getordertable = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/billingdata");
      const jsonData = await response.json();

      setOrderTable(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/billingdata/getoderbydates/${start}/${end}`
      );
      const jsonData = await response.json();

      console.log("Filterred data:", jsonData);
      setOrderTable(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteRow = async (id) => {
    if (window.confirm("Are You Sure, You want to delete?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/billingdata/${id}`,
          {
            method: "DELETE",
          }
        );
        const jsonData = await response.json();
        // console.log(jsonData);
      } catch (err) {
        console.error(err.message);
      }
      getordertable();
    }
  };

  if (searchQuery) {
    ordertable = ordertable.filter(
      (m) =>
        m.invoicedate.toString().startsWith(searchQuery.toString()) ||
        m.clientname.toLowerCase().startsWith(searchQuery.toLowerCase())
      //m.order_id.toString().startsWith(searchQuery.toString()) ||
      //m.invoicenumber.toString().startsWith(searchQuery.toString()) ||
      //m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  // if (searchQuery === "pasthours") {
  //   const DAY = 5 * 60 * 60 * 1000;
  //   const aDayAgo = new Date(Date.now() - DAY);
  //   const final = ordertable.filter(
  //     ({ invoicedate }) => new Date(invoicedate) > aDayAgo
  //   );

  //   ordertable = final;

  //   console.log("finaldate:", final);
  // } else if (searchQuery === "past24hours") {
  //   const DAY = 24 * 60 * 60 * 1000;
  //   const aDayAgo = new Date(Date.now() - DAY);
  //   const final = ordertable.filter(
  //     ({ invoicedate }) => new Date(invoicedate) > aDayAgo
  //   );

  //   ordertable = final;

  //   console.log("finaldate:", final);
  // } else if (searchQuery === "lastweek") {
  //   const DAY = 7 * 24 * 60 * 60 * 1000;
  //   const aDayAgo = new Date(Date.now() - DAY);
  //   const final = ordertable.filter(
  //     ({ invoicedate }) => new Date(invoicedate) > aDayAgo
  //   );
  //   ordertable = final;

  //   console.log("finaldate:", final);
  // } else if (searchQuery === "lastmonth") {
  //   const DAY = 30 * 24 * 60 * 60 * 1000;
  //   const aDayAgo = new Date(Date.now() - DAY);
  //   const final = ordertable.filter(
  //     ({ invoicedate }) => new Date(invoicedate) > aDayAgo
  //   );
  //   ordertable = final;

  //   console.log("finaldate:", final);
  // } else {
  //   ordertable = ordertable.filter(
  //     (m) =>
  //       m.invoicedate.toString().startsWith(searchQuery.toString()) ||
  //       m.clientname.toLowerCase().startsWith(searchQuery.toLowerCase())
  //     //m.order_id.toString().startsWith(searchQuery.toString()) ||
  //     // m.invoicenumber.toString().startsWith(searchQuery.toString()) ||
  //     //m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  //   );
  // }

  const handleClick = useReactToPrint({
    content: () => componentRef.current,
  });

  // const handleClick=(event)=>{
  // console.log(event.currentTarget.id);

  // }
  // const handlePrint = (event) => {
  //   console.log(event.currentTarget.id);
  //   window.print();

  // };

  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-horiz-scroll">
                    <ToastContainer />
                    <Container>
                      <Row>
                        <Col>
                          <center>
                            <h1 className="card-title  justify-content text-center text-4xl font-bold text-green-800 font-sans">
                              Order Table
                            </h1>
                          </center>
                        </Col>
                      </Row>
                      <div className="flex items-center m-2">
                        <Row>
                          <Col>
                            <Table striped bordered hover variant="light-grey">
                              <thead>
                                <tr>
                                  <th colSpan="12">
                                    Start Date
                                    <input
                                      type="date"
                                      name="dateStart"
                                      value={start}
                                      onChange={(e) => setStart(e.target.value)}
                                    />
                                    End Date
                                    <input
                                      type="date"
                                      name="dateend"
                                      value={end}
                                      onChange={(e) => setEnd(e.target.value)}
                                    />
                                    <input
                                      className="ml-3 bg-blue-500  rounded shadow border-2 border-grey-500 hover:bg-transparent hover:text-green-500 transition-all duration-300"
                                      type="submit"
                                      value="Search"
                                      onClick={onSubmit}
                                    />
                                  </th>
                                </tr>
                                <tr>
                                  <th
                                    colSpan="12"
                                    className="text-left"
                                    //bgcolor="grey"
                                  >
                                    {/* <SearchBox
                                      value={searchQuery}
                                      onChange={handleSearch}
                                      //selected={startDate}
                                      // onChange={(e) =>
                                      // onChange(e.currentTarget.value)
                                      // }
                                      //startDate={startDate}
                                      //endDate={endDate}
                                      //selectsRange
                                      //inline
                                    /> */}
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder={"Search by ClientName"}
                                        value={searchQuery}
                                        onChange={(e) =>
                                          setSearchQuery(e.target.value)
                                        }
                                        // onChange={(e) =>onChange(e.currentTarget.value)}
                                        // onChange={(e) =>(e.currentTarget.value)}
                                      />

                                      <div className="input-group-append ">
                                        <button
                                          className="input-group-text"
                                          style={{ height: "47px" }}
                                        >
                                          <FaSearch />
                                        </button>
                                      </div>
                                    </div>
                                  </th>
                                </tr>
                              </thead>

                              <thead>
                                <tr className="text-center">
                                  <th style={{ width: "5%" }}>Print</th>
                                  <th style={{ width: "5%" }}>Edit</th>
                                  <th style={{ width: "5%" }}>Delete</th>
                                  <th style={{ width: "5%" }}>Order_id</th>
                                  <th style={{ width: "7%" }}>InvoiceNo.</th>
                                  <th style={{ width: "8%" }}>InvoiceDate</th>
                                  <th style={{ width: "7%" }}>ClientName</th>
                                  <th style={{ width: "8%" }}>Email</th>
                                  <th style={{ width: "8%" }}>Address</th>
                                  <th style={{ width: "8%" }}>Name</th>
                                  <th style={{ width: "10%" }}>Phone</th>
                                  {/* <th style={{ width: "10%" }}>GST</th>
                                  <th style={{ width: "10%" }}>IGST</th>
                                  <th style={{ width: "10%" }}>CGST</th> */}
                                  <th style={{ width: "5%" }}>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ordertable.map((ordertable, i) => (
                                  <tr key={i}>
                                    <td>
                                      <button
                                        className="p-1 bg-blue-500  rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                                        id={ordertable.order_id}
                                        onClick={() => {
                                          handleClick();
                                        }}
                                      >
                                        Print
                                      </button>
                                    </td>
                                    <td>
                                      <button>
                                        <Link
                                          to={`/orderUpdate/${ordertable.order_id}`}
                                          className="btn text-primary"
                                        >
                                          <FaEdit className="text-green-500 font-bold text-4xl p-1" />
                                        </Link>
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        className="p-2"
                                        onClick={() =>
                                          deleteRow(ordertable.order_id)
                                        }
                                      >
                                        <MdDelete className="text-red-500 font-bold text-4xl" />
                                      </button>
                                    </td>
                                    <td>{ordertable.order_id}</td>
                                    <td>{ordertable.invoicenumber}</td>
                                    <td>
                                      {ordertable.invoicedate.split("T")[0]}
                                    </td>
                                    <td>{ordertable.clientname}</td>
                                    <td>{ordertable.email}</td>
                                    <td>{ordertable.address}</td>
                                    <td>{ordertable.name}</td>
                                    <td>{ordertable.phone}</td>
                                    <td>{ordertable.total}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </div>
                    </Container>
                  </div>

                  <div
                    // style={{ visibility: show ? "visible" : "hidden" }}
                    style={{ display: "none" }}
                  >
                    <WorkOrder
                      ref={componentRef}
                      handleClick={handleClick}
                      id={ordertable.order_id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ordertable;
