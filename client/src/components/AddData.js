import React, { useState,useEffect} from "react";
// import formReducers from "./formReducers";
import "bootstrap/dist/css/bootstrap.min.css";


const AddData = () => {

  const [total, setTotal] = useState();


  const [formValues, setFormValues] = useState([
    {
      item_name: "",
      quantity: "",
      amount: "",
    },
  ]);

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {item_name: "", quantity: "", amount: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.id] = e.target.value;
    setFormValues(newFormValues);
  };


  const [billdata, setBillData] = useState([{
    bill_no: "",
    bill_date: "",
    bill_to_email_id: "",
    total_amount:"",
    item_name: "",
    quantity: "",
    amount: "",
  }]);

  let name, value;

  const handleInputs = (e) => {
    //  console.log(e);
    name = e.target.name;
    value = e.target.value;

    // let newFormValues = [...formValues];
    // newFormValues[i][e.target.name] = e.target.value;
    // setFormValues(newFormValues);
    

    setBillData({ ...billdata, [name]: value });
  };


   useEffect(() => {
     setTotal(
      formValues.reduce(
         (acc, curr) => acc + Number(curr.amount) * curr.quantity,
         0
       )
     );
   }, [formValues]);

  //   const [data, setData] = useState([{...billdata,...formValues }])

  //  const handleformdata = ({ target: { name, value } }) => {
  //    setData((values) => {
  //      return { ...values, [name]: value };
  //    });
  //  };




  const addbilldata = async (e) => {
    e.preventDefault();

    const {
      bill_no,
      bill_date,
      bill_to_email_id,
      total_amount,
      item_name,
      quantity,
      amount,
    } = billdata;


    const res = await fetch("http://localhost:5000/api/v1/billingdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bill_no,
        bill_date,
        bill_to_email_id,
        total_amount,
        item_name,
        quantity,
        amount,
      }),
    });
   
    
   window.location = "/";
   console.log(res);

   const data = await res.json();
   if(data.status === 422 || !data) {
    window.alert("Invalid data");
    console.log("Invalid data");
   }
   else{
    window.alert("data send");
     console.log("data ok");
   }

  };
  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Invoicer</h4>
              <form className="form-horizontal p-t-20 ">
                <div className="form-group row">
                  <label htmlFor="bill to" className="col-sm-2 control-label">
                    Bill To
                  </label>

                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        name="bill_to_email_id"
                        id="bill_to_email_id"
                        placeholder="Enter Email"
                        value={billdata.bill_to_email_id}
                        onChange={(e) => handleInputs(e)}
                      />

                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="ti-email"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />
                  {formValues.map((el, index) => (
                    <div className="row">
                      <div className="col-sm-4 nopadding">
                        <div className="form-group">
                          <label htmlFor="item">Item</label>
                          <input
                            type="text"
                            className="form-control"
                            name="item_name"
                            id="item_name"
                            placeholder="Item"
                            value={formValues.item_name}
                            // onChange={(e) => handleChange(index,e)}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-4 nopadding">
                        <div className="form-group">
                          <label htmlFor="item">Quantity</label>
                          <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            id="quantity"
                            placeholder="Quantity"
                            value={formValues.quantity}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 nopadding">
                        <div className="amounthai">
                          <label htmlFor="amount">Amount</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              name="amount"
                              id="amount"
                              value={formValues.amount}
                              onChange={(e) => handleChange(index, e)}
                              placeholder="Amount"
                            />

                            {index ? (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeFormFields(index)}
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                            ) : null}

                            <div className="input-group-append">
                              <button
                                className="btn btn-success"
                                type="button"
                                onClick={() => addFormFields()}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="form-group row">
                    <label
                      htmlFor="invoive_no"
                      className="col-sm-3 control-label"
                    >
                      Bill_Number
                    </label>

                    <div className="col-sm-9">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="bill_no"
                          id="bill_no"
                          placeholder="Enter_Bill_Number"
                          value={billdata.bill_no}
                          onChange={(e) => handleInputs(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="pass4" className="col-sm-3 control-label">
                      bill_date
                    </label>

                    <div className="col-sm-9">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="bill_date"
                          id="bill_date"
                          placeholder="bill_date"
                          value={billdata.bill_date}
                          onChange={(e) => handleInputs(e)}
                        />
                        {/* <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="ti-date"></i>
                      </span>
                    </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="offset-sm-3 col-sm-9 ">
                      <button
                        type="submit"
                        className="btn btn-success waves-effect waves-light"
                        name="add"
                        id="add"
                        value="Add Data"
                        onClick={addbilldata}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="form-group m-b-40">
                <label htmlFor="Invoicve_No">bill_no &emsp;</label>
                <input
                  type="text"
                  placeholder="Enter_bill_no"
                  value={billdata.bill_no}
                />
              </div>

              <div className="form-group m-b-40">
                <label htmlFor="Invoicve_No">bill_date &ensp;</label>
                <input
                  type="date"
                  placeholder="Enter_bill_date"
                  value={billdata.bill_date}
                />
              </div>
              <hr />
              <span className="bar"></span>
              <label htmlFor="input6">Payment Mode</label>
              <div className="form-group m-b-40">
                <select className="form-control p-0" id="input6">
                  <option>--Select--</option>
                  <option>On Reciept</option>
                  <option>Cash</option>
                  <option>Online Payment</option>
                </select>
              </div>

              <hr />
              <span>Subtotal</span>
              <span>
                <input
                  value={total}
                  style={{
                    width: "100px",
                    float: "right",
                  }}
                />
              </span>
              <br />
              <br />
              <span>Other discount </span>
              <br />
              <br />
              <span>Shipping </span>
              <hr />
              <span> Other Amount </span>
              <br />
              <br />
              <span>
                <b>Total(tax excl.)</b>
                <span>
                  <input
                    id="total"
                    name="total"
                    value={total}
                    style={{ width: "100px", float: "right" }}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
            
}

export default AddData;


