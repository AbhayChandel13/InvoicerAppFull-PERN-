import React,{useState,useEffect} from 'react';
import Header from '../Header/Header';
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import Ordertable from './Ordertable';
import { ToastContainer, toast } from "react-toastify";
import TableForm from './TableForm';

const UpdateOrder = () => {
     
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([]);

    
     const [clientname, setClientname] = useState("");
     const [email, setEmail] = useState("");
     const [phone, setPhone] = useState("");
     const [invoicedate, setInvoicedate] = useState();
     const [gst, setGst] = useState("");

     let orderId = window.location.pathname.split("/update/")[1];
    //console.log("orderid from update",orderId)

       useEffect(() => {
         getSingleOrder();
       },[]);
      
     const getSingleOrder = async () => {
        try {
      const response = await fetch(
        `http://localhost:5000/api/v1/billingdata/getoderbyid/${orderId}`
      );
      const jsonData = await response.json();
      // setOrderTable(jsonData);
      console.log(jsonData);

      setClientname(jsonData.clientname);
      setEmail(jsonData.email);
      setPhone(jsonData.phone);
      //setInvoicedate(jsonData.invoicedate);
      setGst(jsonData.gst);
    } catch (err) {
      console.error(err.message);
    }
  };


     const onSubmit = async(e) => {  
        e.preventDefault();    
      try {
       
        // console.log(clientname);
        let body = {clientname,email,phone,gst}
        const response = await fetch(
          `http://localhost:5000/api/v1/billingdata/updateorder/${orderId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        toast.success("Order Updated Successfully!", {
          position: "top-center",
        });
        setTimeout(function () {
          window.location.replace("/ordertable");
        }, 2000);
         //window.location = "/ordertable";
        // const jsonData = await response.json();
        // console.log(jsonData);
      } catch (err) {
        console.error(err.message);
      }
     }

    
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <ToastContainer autoClose={2000} />
                  <Container>
                    <Row>
                      <Col>
                        <center>
                          <h2 className="text-3xl">Update Order</h2>
                        </center>

                        <Form onSubmit={onSubmit}>
                          <Form.Group>
                            <label>Client Name</label>
                            <Form.Control
                              placeholder="Enter  Client Name"
                              type="text"
                              name="clientname"
                              value={clientname}
                              onChange={(e) => setClientname(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group>
                            <label>E-mail</label>
                            <Form.Control
                              placeholder="Enter E-mail"
                              type="email"
                              name="name"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group>
                            <label>Phone Number</label>
                            <Form.Control
                              placeholder="Enter PhoneNumber"
                              type="number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <label>GST Number</label>
                            <Form.Control
                              type="text"
                              placeholder="Enter GST Number"
                              value={gst}
                              onChange={(e) => setGst(e.target.value)}
                            />
                          </Form.Group>
                          {/* <Form.Group>
                            <article className="md:grid grid-cols-3 gap-10">
                              <div className="flex flex-col">
                                <label>Invoice Date</label>
                                <Form.Control
                                  type="date"
                                  //value={invoicedate}
                                  //  helperText={errors?.phonenumber}
                                  //  onChange={(e) => setPhonenumber(e.target.value)}
                                />
                              </div>
                              <div className="flex flex-col">
                                <label>Due Date</label>
                                <Form.Control
                                  type="date"
                                  placeholder="yyyy-mm-dd"
                                  min="1997-01-01"
                                  max="2030-12-31"
                                  // value={duedate}
                                  //  helperText={errors?.phonenumber}
                                  //onChange={(e) =>setPhonenumber(e.target.value)}
                                />
                              </div>
                              <div className="flex flex-col">
                                <label>GST Number</label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter GST Number"
                                  value={ordertable.gst}
                                  //  helperText={errors?.phonenumber}
                                   onChange={(e) => setGst(e.target.value)}
                                />
                              </div>
                            </article>
                          </Form.Group> */}
                        </Form>
                        <article>
                          <TableForm
                            description={description}
                            setDescription={setDescription}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            price={price}
                            setPrice={setPrice}
                            amount={amount}
                            setAmount={setAmount}
                            list={list}
                            setList={setList}
                            total={total}
                            setTotal={setTotal}
                          />
                        </article>
                        <Button
                          type="button"
                          className="form-elem to-blue-600 text-black font-bold"
                          onClick={onSubmit}
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateOrder 