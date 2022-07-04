import React, { useState,useEffect } from "react";

export default function Dates({ invoicedate, duedate }) {
    let [workorder, setWorkOrder] = useState([]);

  const getWorkOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/billingdata/orderitems"
      );
      const jsonData = await response.json();

      setWorkOrder(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWorkOrder();
  }, []);



  return (
    <>
      <article className="mt-3 mb-6 flex items-end justify-end">
        <ul>
          {workorder.map(({ invoicenumber }) => (
            <li className="p-1 " key={invoicenumber}>
              <span className="font-bold">Invoicer number:</span>
              <React.Fragment>{invoicenumber}</React.Fragment>
            </li>
          ))}

          {workorder.map(({ invoicenumber, invoicedate }) => (
            <li className="p-1 bg-gray-100" key={invoicenumber}>
              <span className="font-bold">Invoice date:</span>
              <React.Fragment>{invoicedate}</React.Fragment>
            </li>
          ))}
          {/* {invoicedate} */}

          {/* {workorder.map(({ duedate, invoicenumber }) => (
            <li className="p-1" key={invoicenumber}>
              <span className="font-bold">Due date:</span>
              <React.Fragment>{duedate}</React.Fragment>
            </li>
          ))} */}
          {/* {duedate} */}
        </ul>
      </article>

      {/* <article className="mt-3 mb-6 flex">
        <ul>
          {workorder.map(({ invoicenumber, gst}) => (
            <li className="p-1 " key={invoicenumber}>
              <span className="font-bold">GST No:</span>
              <React.Fragment>{gst}</React.Fragment>
            </li>
          ))}
          {workorder.map(({ invoicenumber,phone  }) => (
            <li className="p-1 " key={invoicenumber}>
              <span className="font-bold">Phone No:</span>
              <React.Fragment>{phone}</React.Fragment>
            </li>
          ))}
        </ul>
      </article> */}
    </>
  );
}
