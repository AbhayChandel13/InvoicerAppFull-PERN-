import React, { useState, useEffect } from "react";
export default function MainDetails({ name, address }) {
    let [workorder, setWorkOrder] = useState([]);
    let [companydetail, setCompanydetail] = useState([]);

     const getCompanydetails = async () => {
       try {
         const response = await fetch(
           "http://localhost:5000/api/v1/billingdata/companydetail"
         );
         const jsonData = await response.json();

         setCompanydetail(jsonData);
         console.log(jsonData);
       } catch (err) {
         console.error(err.message);
       }
     };

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

   useEffect(() => {
     getCompanydetails();
   }, []);


  return (
    <>
      {/* <section className="flex flex-col items-end justify-end">
        <h2 className="font-bold text-3xl uppercase mb-1">{name}</h2>
        <p>{address}</p>
      </section> */}

      {companydetail.map(
        ({
          companyid,
          email,
          phone,
          gst,
          companyname,
          address_line1,
          address_line2,
          address_line3,
          pincode,
          msme,
          export_import,
        }) => (
          <React.Fragment key={companyid}>
            <section className="flex flex-col items-end justify-end">
              <h2 className="text-2xl uppercase font-bold ">{companyname}</h2>
              {/* <h2 className="text-2xl uppercase font-bold ">{clientname}</h2> */}
              <p>{email}</p>
              <p>{address_line1}</p>
              <p>{address_line2}</p>
              <p>{address_line3}</p>
              <p>{pincode}</p>
              <p>GST No :{gst}</p>
              <p>Phone No :{phone}</p>
              <p>
                {msme},{export_import}
              </p>
            </section>
          </React.Fragment>
        )
      )}
    </>
  );
}
