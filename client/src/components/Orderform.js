import React from "react";
import TableForm from "./TableForm";
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

const OrderForm = () => {
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;
  //console.log(today);

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
  const [invoicedate, setinvoicedate] = useState(today);
  const [invoicenumber, setInvoicenumber] = useState("");
  const [gst, setGst] = useState("");
  const [duedate, setduedate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [igst, setIgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [tax, setTax] = useState("");
  const [taxc, setTaxc] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [subtotal, setSubtotal] = useState([]);
  const [total, setTotal] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [dateserror, setErrorDates] = useState(null);
  const [datesmessage, setMessageDates] = useState("");
  const [emailerror, setErrorEmail] = useState(null);
  const [emailmessage, setMessageEmail] = useState("");
  const [phoneerror, setPhoneError] = useState(null);
  const [phonemessage, setPhoneMessage] = useState("");
  const [accnoerror, setAccnoError] = useState(null);
  const [accnomessage, setAccnoMessage] = useState("");

  const componentRef = useRef();
  const handlePrint = () => {
    window.print();
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (
      // !name ||
      !email ||
      !invoicedate
      // !phone ||
      // !gst ||
      // !clientname ||
      // !invoicedate ||
      // !duedate ||
      // !bankAccount ||
      // !bankName
    ) {
      //alert("Field can't be empty");
      errors.push(" Email, Date Field can't be empty");
      toast.error(errors, {
        position: "top-center",
      });
    }
    const values = e.target.value;
    // if (clientname.includes("_")) {
    //   setError("You cannot use an underscore");
    //   errors.push("Clientname is wrong,You cannot use an underscore");
    // } else {
    //   setError(null);
    //   setMessage(values);
    // }

    const regex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.match(regex)) {
      setErrorEmail(null);
      setMessageEmail(values);
    } else {
      setErrorEmail("Invalid Email");
      errors.push("Invalid Email");
      toast.error(" Invalid Email", {
        position: "top-center",
      });
    }

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
    // if (bankAccount.length !== 16) {
    //   toast.error(" Invalid Account Number", {
    //     position: "top-center",
    //   });
    //   setAccnoError("Invalid Account Number");
    //   errors.push("Invalid Account Number");
    // } else {
    //   setAccnoError(null);
    //   setAccnoMessage(values);
    // }

    if (!invoicedate) {
      toast.error("Please Select Date", {
        position: "top-center",
      });
      setErrorDates("Enter Invoice Date ");
      errors.push("Date field is empty");
    } else {
      setErrorDates(null);
      setMessageDates(values);
    }

    console.log(errors);

    if (errors.length > 0) {
      //alert("Wrong Data!!");
      toast.error(" Wrong Data", {
        position: "top-center",
      });
    } else {
      toast.success("Data Added To Database , Successfully!", {
        position: "top-center",
      });
      try {
        let res = await fetch("http://localhost:5000/api/v1/billingdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            address,
            phone,
            bankName,
            bankAccount,
            invoicedate,
            invoicenumber,
            website,
            clientname,
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
          }),
        });

        //window.location = "/orderform";
        setTimeout(function () {
          navigate("/ordertable", { replace: true });
        }, 2000);
        console.log(res);

        const data = await res.json();
        if (data.status === 422 || !data) {
          window.alert("Invalid data");
          console.log("Invalid data");
        } else {
          window.alert("data send");
          console.log(" data ok ");
        }
      } catch (err) {
        console.log(err);
      }
    }
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
                      <ToastContainer />
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
                            maxLength={10}
                            value={phone}
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
                            maxLength={6}
                            value={gst}
                            onChange={(e) => setGst(e.target.value)}
                          />
                        </div>
                      </article>

                      <article className="md:grid grid-cols-2 gap-10">
                        <div className="flex flex-col">
                          <label htmlFor="Invoivenumber">Invoice Number</label>
                          <input
                            type="text"
                            name="invoiceno"
                            id="invoiceno"
                            placeholder="Invoice Number"
                            autoComplete="off"
                            maxLength={5}
                            value={invoicenumber}
                            onChange={(e) => setInvoicenumber(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="invoiceDate">Invoice Date</label>
                          <input
                            type="date"
                            name="invoiceDate"
                            id="theDate"
                            placeholder="Invoice Date"
                            min="2022-06-01"
                            max="2022-07-30"
                            //defaultValue={today}
                            value={invoicedate}
                            onChange={(e) => setinvoicedate(e.target.value)}
                          />
                        </div>
                      </article>

                      {/* This is our table form */}
                      <article>
                        <TableForm
                          description={description}
                          setDescription={setDescription}
                          quantity={quantity}
                          setQuantity={setQuantity}
                          price={price}
                          setPrice={setPrice}
                          igst={igst}
                          setIgst={setIgst}
                          cgst={cgst}
                          setCgst={setCgst}
                          tax={tax}
                          setTax={setTax}
                          taxc={taxc}
                          setTaxc={setTaxc}
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
                          onClick={handleSubmit}
                          className="mt-5 bg-green-500 py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300"
                        >
                          Add Data
                        </button>
                        {/* <button
                          className="mt-5 bg-green-500 py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300"
                            onClick={() => {
                              if (isEditing ===false) {
                                handleSubmit();
                              } else {
                                onSubmit();
                              }
                                }  }                          
                          >
                            {isEditing ? "Update" : "Add Data"}
                          </button> */}
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

export default OrderForm;
