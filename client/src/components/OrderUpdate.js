import React from "react";
import TableFormUpdt from "./TableFormUpdt";
import ClientDetails from "./ClientDetails";
import MainDetails from "./MainDetails";
import Dates from "./Dates";
import Headerdata from "./Headerdata";
import Notes from "./Notes";
import Table from "./Table";
import Footer from "./Footer";
import { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import Header from "./../Header/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const OrderUpdate = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientname, setClientname] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoicenumber, setInvoicenumber] = useState("");
  const [invoicedate, setInvoicedate] = useState("");
  const [gst, setGst] = useState("");

  const [notes, setNotes] = useState("");
  const [orderdetails_id, setOrderdetails_id] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [igst, setIgst] = useState("");
  const [cgst, setCgst] = useState("");
  const [tax, setTax] = useState("");
  const [taxc, setTaxc] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [subtotal, setSubtotal] = useState([]);
  const [total, setTotal] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [emailerror, setErrorEmail] = useState(null);
  const [emailmessage, setMessageEmail] = useState("");
  const [phoneerror, setPhoneError] = useState(null);
  const [phonemessage, setPhoneMessage] = useState("");
  const [accnoerror, setAccnoError] = useState(null);
  const [accnomessage, setAccnoMessage] = useState("");

  let orderId = window.location.pathname.split("/orderUpdate/")[1];
  //console.log("orderid from update", orderId);

  useEffect(() => {
    getSingleOrder();
  }, []);

  useEffect(() => {
    getItemlist();
  }, []);

  const getSingleOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/billingdata/getoderbyid/${orderId}`
      );
      const jsonData = await response.json();
      // setOrderTable(jsonData);
      console.log(jsonData);

      setName(jsonData.name);
      setWebsite(jsonData.website);
      setAddress(jsonData.address);
      setClientname(jsonData.clientname);
      setEmail(jsonData.email);
      setPhone(jsonData.phone);
      setGst(jsonData.gst);
      setIgst(jsonData.igst);
      setCgst(jsonData.cgst);
      setInvoicedate(jsonData.invoicedate);
      setInvoicenumber(jsonData.invoicenumber);
      setSubtotal(jsonData.subtotal);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getItemlist = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/billingdata/itemlist/${orderId}`
      );
      const jsonData = await response.json();

      setList(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    // if (!name || !address || !phone || !email || !gst || !clientname) {
    //   //alert("Field can't be empty");
    //   errors.push("Field can't be empty");
    //   toast.error("Yor are missing a mandatory field", {
    //     position: "top-center",
    //   });
    // }
    // const values = e.target.value;
    // if (clientname.includes("_")) {
    //   setError("You cannot use an underscore");
    //   errors.push("Clientname is wrong,You cannot use an underscore");
    // } else {
    //   setError(null);
    //   setMessage(values);
    // }

    // const regex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // if (email.match(regex)) {
    //   setErrorEmail(null);
    //   setMessageEmail(values);
    // } else {
    //   setErrorEmail("Invalid Email");
    //   errors.push("Invalid Email");
    //   toast.error(" Invalid Email", {
    //     position: "top-center",
    //   });
    // }

    // if (phone.length > 10 || phone.length === 0) {
    //   setPhoneError("Invalid Phone Number ");
    //   errors.push("Invalid Phone Number ");
    //   toast.error(" Invalid Phone Number", {
    //     position: "top-center",
    //   });
    // } else {
    //   setPhoneError(null);
    //   setPhoneMessage(values);
    // }

    // console.log(errors);

    if (errors.length > 0) {

      //alert("Wrong Data!!");
      toast.error(" Wrong Data", {
        position: "top-center",
      });
    }
    else {
      toast.success("Order Updated Successfully!", {
        position: "top-center",
      });
      setTimeout(function () {
        //window.location.replace("/ordertable");
        navigate("/ordertable", { replace: true });
      }, 2000);


      try {
        // console.log(list);
        // console.log(total);
        let body = {
          name,
          address,
          website,
          clientname,
          email,
          phone,
          invoicedate,
          invoicenumber,
          gst,
          tax,
          taxc,
          subtotal,
          total,
          list,
          description,
          quantity,
          price,
          igst,
          cgst,
          amount,

        };
        const response = await fetch(
          `http://localhost:5000/api/v1/billingdata/updateorder/${orderId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        console.log(response);

        //window.location = "/ordertable";
        // const jsonData = await response.json();
        // console.log(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const componentRef = useRef();
  const handlePrint = () => {
    window.print();
  };


  return (
    <>
      <Header />

      {/* {showInvoice ? (
        <>
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <ToastContainer autoClose={2000} />
                      <ReactToPrint
                        trigger={() => (
                          <button className="bg-blue-500 mb-5 text-black font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-black-500 transition-all duration-300">
                            Print/Download
                          </button>
                        )}
                        content={() => componentRef.current}
                      />
                      <div ref={componentRef} className="p-5">
                        <Headerdata handlePrint={handlePrint} />
                        <MainDetails name={name} address={address} />

                        <ClientDetails
                          clientname={clientname}
                          clientAddress={clientAddress}
                        />

                        <Dates invoicedate={invoicedate} duedate={duedate} />

                        <Table
                          orderdetails_id={orderdetails_id}
                          description={description}
                          quantity={quantity}
                          price={price}
                          igst={igst}
                          cgst={cgst}
                          tax={tax}
                          taxc={taxc}
                          amount={amount}
                          list={list}
                          setList={setList}
                          subtotal={subtotal}
                          total={total}
                          setTotal={setTotal}
                        />

                        <Notes notes={notes} />

                        <Footer
                          name={name}
                          email={email}
                          website={website}
                          phone={phone}
                          bankAccount={bankAccount}
                          bankName={bankName}
                          gst={gst}
                        />
                      </div>
                      <button
                        onClick={() => setShowInvoice(false)}
                        className="mt-5 bg-blue-500 py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                      >
                        Edit Information
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : ( */}
      <>
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="flex flex-col justify-center">
                      <ToastContainer autoClose={2000} />
                      <article className="md:grid grid-cols-2 gap-10">
                        <div className="flex flex-col">
                          <label htmlFor="name">Your full name</label>
                          <input
                            type="text"
                            name="text"
                            id="name"
                            placeholder="Enter your name"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="address">Enter your address</label>

                          <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter your address"
                            autoComplete="off"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </article>
                      <article className="md:grid grid-cols-2 gap-10">
                        <div className="flex flex-col">
                          <label htmlFor="email">Enter your email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          {emailerror && (
                            <label
                              className="text-red-500 mt-0"
                              htmlFor="message"
                            >
                              {emailerror}
                            </label>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="website">Enter your website</label>
                          <input
                            type="url"
                            name="website"
                            id="website"
                            placeholder="Enter your website"
                            autoComplete="off"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>
                      </article>
                      <article className="md:grid grid-cols-2 gap-10">
                        <div className="flex flex-col">
                          <label htmlFor="phone">Enter your phone</label>

                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Enter your phone"
                            autoComplete="off"
                            value={phone}
                            maxLength={10}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {phoneerror && (
                            <label
                              className="text-red-500 mt-0"
                              htmlFor="message"
                            >
                              {phoneerror}
                            </label>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="bankName">Enter your bank name</label>
                          <input
                            type="text"
                            name="bankName"
                            id="bankName"
                            placeholder="Enter your bank name"
                            autoComplete="off"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                        </div>
                      </article>
                      <article className="md:grid grid-cols-2 gap-10">
                        <div className="flex flex-col">
                          <label htmlFor="bankAccount">
                            Enter bank account number
                          </label>
                          <input
                            type="text"
                            name="bankAccount"
                            id="bankAccount"
                            placeholder="Enter bank account number"
                            autoComplete="off"
                            value={bankAccount}
                            maxLength={16}
                            onChange={(e) => setBankAccount(e.target.value)}
                          />
                          {accnoerror && (
                            <label
                              className="text-red-500 mt-0"
                              htmlFor="message"
                            >
                              {accnoerror}
                            </label>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="clientName">
                            Enter your client's name
                          </label>
                          <input
                            type="text"
                            name="clientName"
                            id="clientName"
                            placeholder="Enter your client's name"
                            autoComplete="off"
                            value={clientname}
                            onChange={(e) => setClientname(e.target.value)}
                          />
                          {error && (
                            <label
                              className="text-red-500 mt-0"
                              htmlFor="message"
                            >
                              {error}
                            </label>
                          )}
                        </div>
                      </article>
                      <article className="md:grid grid-cols-2 gap-10">
                        <div className="flex flex-col">
                          <label htmlFor="clientAddress">
                            Enter your client's address
                          </label>
                          <input
                            type="text"
                            name="clientAddress"
                            id="clientAddress"
                            placeholder="Enter your client's address"
                            autoComplete="off"
                            value={clientAddress}
                            onChange={(e) => setClientAddress(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="gstnumber">
                            Enter your GST Number
                          </label>
                          <input
                            type="text"
                            name="GSTNumber"
                            id="GSTNumber"
                            placeholder="Enter GST Number"
                            autoComplete="off"
                            maxLength="6"
                            value={gst}
                            onChange={(e) => setGst(e.target.value)}
                          />
                        </div>
                      </article>

                      <article className="md:grid grid-cols-2 gap-10">
                        <div className="flex flex-col">
                          <label htmlFor="invoicenumber">Invoice Number</label>
                          <input
                            type="text"
                            name="invoicenumber"
                            id="invoicenumber"
                            placeholder="Invoice Number"
                            autoComplete="off"
                            value={invoicenumber}
                            onChange={(e) => setInvoicenumber(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="invoiceDate">Invoice Date</label>
                          <input
                            type="date"
                            name="invoiceDate"
                            id="invoiceDate"
                            placeholder="Invoice Date"
                            autoComplete="off"
                            min="2022-06-01"
                            max="2022-07-30"
                            value={invoicedate}
                            onChange={(e) => setInvoicedate(e.target.value)}
                          />
                        </div>
                      </article>

                      {/* This is our table form */}
                      <article>
                        <TableFormUpdt
                          orderdetails_id={orderdetails_id}
                          setOrderdetails_id={setOrderdetails_id}
                          description={description}
                          setDescription={setDescription}
                          quantity={quantity}
                          setQuantity={setQuantity}
                          price={price}
                          igst={igst}
                          tax={tax}
                          setTax={setTax}
                          taxc={taxc}
                          setTaxc={setTaxc}
                          setIgst={setIgst}
                          cgst={cgst}
                          setCgst={setCgst}
                          setPrice={setPrice}
                          amount={amount}
                          setAmount={setAmount}
                          list={list}
                          setList={setList}
                          subtotal={subtotal}
                          setSubtotal={setSubtotal}
                          total={total}
                          setTotal={setTotal}
                        />
                      </article>

                      <label htmlFor="notes">Additional Notes</label>
                      <textarea
                        name="notes"
                        id="notes"
                        cols="30"
                        rows="5"
                        placeholder="Additional notes to the client"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                      <article className="md:grid grid-cols-1 gap-10">
                        {/* <button
                            onClick={() => setShowInvoice(true)}
                            className="mt-5 bg-blue-500 py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
                          >
                            Preview Invoice
                          </button> */}
                        <button
                          onClick={onSubmit}
                          className="mt-5 bg-green-500 py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300"
                        >
                          Update
                        </button>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default OrderUpdate;
