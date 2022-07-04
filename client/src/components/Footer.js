import React, { useState, useEffect } from "react";
export default function Footer({ email, website }) {
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
      <footer className="p-2  md:px-4 md:py-6 dark:bg-gray-800 text-center">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        
          {/* {workorder.map(({ email, website, order_id }) => (
            <React.Fragment key={order_id}>
              <span>Your email :</span>
              <span> {email}</span>

              <span>Website :</span>
              <span> {website}</span>
            </React.Fragment>
          ))}
           */}
           Thank You For Visiting Us !
        
      </footer>
    </>
  );
}
