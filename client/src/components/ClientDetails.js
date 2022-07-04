import React, { useState, useEffect } from "react";

export default function ClientDetails({  clientAddress }) {
  let [workorder, setWorkOrder] = useState([]);

  const getWorkOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/billingdata/orderitems"
      );
      const jsonData = await response.json();

      setWorkOrder(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWorkOrder();
  }, []);

  return (
    <>
      {workorder.map(({ clientname, order_id }) => (
        <React.Fragment key={order_id}>
          <section className="mt-4" >
            <span className="">Bill To</span>
            <h2 className="text-2xl uppercase font-bold ">{clientname}</h2>

            {/* <h2 className="text-2xl uppercase font-bold ">{clientname}</h2> */}
            <p>{clientAddress}</p>
          </section>
        </React.Fragment>
      ))}
    </>
  );
}
