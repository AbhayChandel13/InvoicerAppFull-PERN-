import { useState, useRef, useEffect } from "react";
//import ReactToPrint from "react-to-print";
import {
  Row,
  Container,
  Col,
  Table,
} from "react-bootstrap";
import SearchBox from "./searchbox";
import Header from "./../Header/Header";


const Orderitems = () => {
  let [orderitems, setOrderItems] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");

  const componentRef = useRef();
  const handlePrint = () => {
    window.print();
  };

  const getorderitems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/billingdata/items");
      const jsonData = await response.json();

      setOrderItems(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getorderitems();
  }, []);

  if (searchQuery) {
    orderitems = orderitems.filter(
      (m) =>
        m.orderdetails_id.toString().startsWith(searchQuery.toString()) ||
        m.order_id.toString().startsWith(searchQuery.toString()) ||
        m.description.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
                    <Container>
                      <Row>
                        <Col>
                          <center>
                            <h1 className="card-title  justify-content text-center text-4xl font-bold text-green-800 font-sans">
                              Order-Items
                            </h1>
                          </center>
                        </Col>
                      </Row>
                      <div
                        // ref={componentRef}
                        // handlePrint={handlePrint}
                        className="flex items-center m-2"
                      >
                        <Row>
                          <Col>
                            <Table striped bordered hover variant="light-grey">
                              {/* <thead>
                                <tr>
                                  <th colSpan="12" className="text-left">
                                    <SearchBox
                                      value={searchQuery}
                                      onChange={handleSearch}
                                    />
                                  </th>
                                </tr>
                              </thead> */}

                              <thead>
                                <tr className="text-center">
                                  <th style={{ width: "10%" }}>Items_id</th>
                                  <th style={{ width: "10%" }}>Order_id</th>
                                  <th style={{ width: "10%" }}>Description</th>
                                  <th style={{ width: "10%" }}>Quantity</th>
                                  <th style={{ width: "10%" }}>Price</th>                                  
                                  <th style={{ width: "10%" }}>Amount</th>
                                  {/* <th style={{ width: "8%" }}>Edit</th> */}
                                  {/* <th style={{ width: "5%" }}>Delete</th> */}
                                  {/* <th style={{ width: "8%" }}>Print</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {orderitems.map((orderitems, i) => (
                                  <tr key={i}>
                                    <td>{orderitems.orderdetails_id}</td>
                                    <td>{orderitems.order_id}</td>
                                    <td>{orderitems.description}</td>
                                    <td>{orderitems.quantity}</td>
                                    <td>{orderitems.price}</td>                                  
                                    <td>{orderitems.amount}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </div>
                    </Container>
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

export default Orderitems;
